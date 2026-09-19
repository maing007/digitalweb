#!/bin/bash
set -e
cd "$(dirname "$0")/.."
npm install
npm run db:start || true
npm run db:types
npm run build
