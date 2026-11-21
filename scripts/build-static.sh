#!/usr/bin/env bash
#
# Static export build for the GitHub Pages user site.
#
# Resolves the deployment target, enforces the user-site base-path contract,
# runs the Next.js static export, and guarantees out/.nojekyll exists.
#
# Resolution order for owner/name:
#   1. REPO_OWNER / REPO_NAME environment variables (explicit)
#   2. GITHUB_REPOSITORY ("owner/name") fallback
#
# This portfolio's production target is etalyahsimpson/etalyahsimpson.github.io
# (a user site): BASE_PATH must resolve to the EMPTY string so every asset is
# served from the site root. Set ALLOW_ANY_REPO=1 to build in a fork for test
# purposes; production deployment (CI) keeps the strict check.

set -euo pipefail

cd "$(dirname "$0")/.."

log() { printf '%s\n' "$*"; }

OWNER="${REPO_OWNER:-}"
NAME="${REPO_NAME:-}"

if [[ -z "$OWNER" || -z "$NAME" ]]; then
  if [[ -n "${GITHUB_REPOSITORY:-}" ]]; then
    IFS='/' read -r gh_owner gh_name <<< "$GITHUB_REPOSITORY"
    OWNER="${OWNER:-$gh_owner}"
    NAME="${NAME:-$gh_name}"
  fi
fi

if [[ -z "$OWNER" || -z "$NAME" ]]; then
  log "ERROR: could not resolve repository owner/name."
  log "Set REPO_OWNER and REPO_NAME, or run inside GitHub Actions (GITHUB_REPOSITORY)."
  exit 1
fi

# Normalize case-insensitively.
OWNER_LC="$(printf '%s' "$OWNER" | tr '[:upper:]' '[:lower:]')"
NAME_LC="$(printf '%s' "$NAME" | tr '[:upper:]' '[:lower:]')"

DEPLOYMENT_KIND="GitHub project site"
BASE_PATH="/${NAME}"

if [[ "$NAME_LC" == "${OWNER_LC}.github.io" ]]; then
  DEPLOYMENT_KIND="GitHub user site"
  BASE_PATH=""
fi

log "Resolved repository owner: $OWNER"
log "Resolved repository name: $NAME"
log "Deployment kind: $DEPLOYMENT_KIND"
if [[ -n "$BASE_PATH" ]]; then
  log "Resolved BASE_PATH: $BASE_PATH"
else
  log "Resolved BASE_PATH: (empty)"
fi

EXPECTED_OWNER="etalyahsimpson"
EXPECTED_REPO="etalyahsimpson.github.io"
if [[ "$OWNER_LC" != "$EXPECTED_OWNER" || "$NAME_LC" != "$EXPECTED_REPO" ]]; then
  if [[ "${ALLOW_ANY_REPO:-0}" != "1" ]]; then
    log "ERROR: production deploy target mismatch."
    log "Expected ${EXPECTED_OWNER}/${EXPECTED_REPO} (case-insensitive), got ${OWNER}/${NAME}."
    log "Set ALLOW_ANY_REPO=1 only for non-production test builds."
    exit 1
  fi
  log "WARNING: ALLOW_ANY_REPO=1; building a non-production target."
fi

if [[ "$DEPLOYMENT_KIND" == "GitHub user site" ]]; then
  log "Expected root: https://${OWNER_LC}.github.io/"
fi

COMMIT_SHA="${GITHUB_SHA:-$(git rev-parse HEAD 2>/dev/null || printf 'unavailable')}"
log "Git commit SHA: $COMMIT_SHA"

export NEXT_PUBLIC_BASE_PATH="$BASE_PATH"

log "Running Next.js static export..."
npm run build:next

if [[ ! -f "out/index.html" ]]; then
  log "ERROR: out/index.html missing after export."
  exit 1
fi

# GitHub Pages must not run Jekyll processing on this output.
touch out/.nojekyll

log "Static export complete: out/ is ready (${DEPLOYMENT_KIND}, base path '${BASE_PATH}')."
