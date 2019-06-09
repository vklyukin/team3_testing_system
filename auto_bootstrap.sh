#!/usr/bin/env sh

docker-compose build
./auto_migrations_static.sh
docker-compose up
