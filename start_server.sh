#!/usr/bin/env sh

docker-compose run --rm djangoapp /bin/bash -c "cp -r ./test_system/static/* ../static"
docker-compose up
