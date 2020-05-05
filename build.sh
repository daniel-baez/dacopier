#!/bin/bash

version=`date +'%Y%m%d-%H%M'`

docker build . -t daplay/dacopier:$version
docker push daplay/dacopier:$version
