#!/bin/bash

docker run \
  -e "DACOPIER_FROM=/from/lsoft" \
  -e "DACOPIER_TO=/to" \
  -v $(pwd)/left:/from \
  -v $(pwd)/right:/to \
  -it dacopier
