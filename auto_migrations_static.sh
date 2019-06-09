#!/usr/bin/env sh

sed 's/STATIC_ROOT/# STATIC_ROOT/' -i ./test_system/test_system/settings.py
docker-compose run --rm djangoapp /bin/bash -c "python3 test_system/manage.py makemigrations"
docker-compose run --rm djangoapp /bin/bash -c "python3 test_system/manage.py migrate"
sed 's/# STATIC_ROOT/STATIC_ROOT/' -i ./test_system/test_system/settings.py
docker-compose run djangoapp python3 test_system/manage.py collectstatic --no-input

