#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
git pull
npm install
pm2 restart prettycache-dev
