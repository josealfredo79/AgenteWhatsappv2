#!/usr/bin/env bash
set -euo pipefail

# Helper script to trigger a redeploy on Railway
# - If railway CLI is installed, offers to run a deploy command
# - Otherwise, provides safe instructions and an optional git empty commit trigger

REPO_ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$REPO_ROOT"

echo "=== Redeploy helper for AgenteWhatsappv2 ==="

if command -v railway >/dev/null 2>&1; then
  echo "Railway CLI detected. You can use it to deploy."
  echo "Recommended: ensure you're logged in: railway login"
  echo
  echo "To deploy interactively, run:"
  echo "  railway up"
  echo
  echo "If you prefer to trigger a rebuild without cache via UI, open the Railway project and choose 'Redeploy' -> 'Rebuild without cache'."
  echo
  read -r -p "Do you want to run 'railway up' now? (y/N) " yn || true
  if [[ "$yn" =~ ^[Yy]$ ]]; then
    railway up
  else
    echo "Skipped railway up."
  fi
else
  echo "Railway CLI not found on this machine."
  echo "Options to trigger a redeploy with rebuild without cache:" 
  echo "  1) Use Railway dashboard: Deployments -> Redeploy -> Rebuild without cache (recommended)."
  echo "  2) Trigger a git push to the branch connected to Railway."
  echo
  read -r -p "Do you want to create an empty commit and push to trigger a redeploy? (y/N) " yn || true
  if [[ "$yn" =~ ^[Yy]$ ]]; then
    branch=$(git rev-parse --abbrev-ref HEAD)
    echo "Creating empty commit on branch $branch and pushing..."
    git commit --allow-empty -m "ci(redeploy): trigger Railway rebuild" >/dev/null
    git push origin "$branch"
    echo "Push complete. Now go to Railway and choose 'Rebuild without cache' if available."
  else
    echo "No action taken. Use the Railway UI to rebuild without cache when ready."
  fi
fi

echo "Done."
