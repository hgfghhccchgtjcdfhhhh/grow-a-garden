#!/bin/sh

[ -z "$HUSKY" ] && export HUSKY=1

git_root() {
  git rev-parse --show-toplevel 2>/dev/null
}

cd "$(git_root)" || exit 1

export HUSKY_GIT_PARAMS="$*"
