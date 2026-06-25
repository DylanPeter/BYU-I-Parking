#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <sql-file> [psql-args...]"
  exit 1
fi

SQL_FILE="$1"
shift

PGSSLMODE=require psql "$@" -f "$SQL_FILE"
