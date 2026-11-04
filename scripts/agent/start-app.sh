#!/usr/bin/env bash
# Démarre l'app pour les agents (MCP Playwright + e2e) en arrière-plan :
# `ng serve` (configuration de dev) sur :4200. L'app appelle directement l'API
# hébergée (https://merchstoreapi.applikuapp.com/api) : il n'y a pas d'API mock.
# Attend que le serveur réponde. Logs dans .agent-out/ng-serve.log.
#
# Prérequis : npm ci.
set -euo pipefail

out=.agent-out
mkdir -p "$out/playwright"

nohup npx ng serve --port 4200 > "$out/ng-serve.log" 2>&1 &

if ! timeout "${START_TIMEOUT:-300}" bash -c \
  'until curl -sf http://localhost:4200 >/dev/null; do sleep 3; done'; then
  echo "::error::l'app n'a pas démarré à temps"
  tail -n 50 "$out/ng-serve.log"
  exit 1
fi

# L'API hébergée peut être en veille : on la réveille, sans bloquer si elle ne répond pas.
curl -sf --max-time 60 'https://merchstoreapi.applikuapp.com/api/store/category-list/' >/dev/null \
  || echo "::warning::l'API hébergée ne répond pas : les vérifications dans le navigateur peuvent échouer"

echo "App prête : http://localhost:4200"
