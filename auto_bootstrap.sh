#!/usr/bin/env sh

superuser_name=$(whiptail --title "Create superuser" --inputbox "Input superuser name" 10 60 3>&1 1>&2 2>&3)
[ $? -ne 0 ] || [ -z "$superuser_name" ] && echo "Operation aborted by user" && return 1

superuser_mail=$(whiptail --title "Create superuser" --inputbox "Input superuser mail" 10 60 3>&1 1>&2 2>&3)
[ $? -ne 0 ] || [ -z "$superuser_mail" ] && echo "Operation aborted by user" && return 1

superuser_password=$(whiptail --title "Create superuser" --passwordbox "Input superuser password" 10 60 3>&1 1>&2 2>&3)
[ $? -ne 0 ] || [ -z "$superuser_password" ] && echo "Operation aborted by user" && return 1

password_repeat=$(whiptail --title "Create superuser" --passwordbox "Confirm superuser password" 10 60 3>&1 1>&2 2>&3)
[ $? -ne 0 ] || [ -z "$password_repeat" ] && echo "Operation aborted by user" && return 1

[ "$superuser_password" != "$password_repeat" ] &&  echo "Passwords mismatch" && return 1

start_on_complete=false
whiptail --title "Configure" --yesno "Do you want to run server after configuration complete?" 10 60
[ $? -eq 0 ] && start_on_complete=true

base_path=$(whiptail --title "Configure" --menu "Choose base_path" 15 60 4 \
"1" "http://localhost:5000/" \
"2" "http://cs.entryhse.tk/" 3>&1 1>&2 2>&3)
[ $? -ne 0 ] && echo "Operation aborted by user" && return 1

case "$base_path" in
"1")
    printf "// const BASE_PATH = 'http://cs.entryhse.tk/';\nconst BASE_PATH = 'http://localhost:5000/';" > ./test_system/static/js/base_path.js
    printf "# BASE_PATH = 'http://cs.entryhse.tk/'\nBASE_PATH = 'http://localhost:5000/'" > test_system/test_system/base_path.py
    ;;
"2")
    printf "const BASE_PATH = 'http://cs.entryhse.tk/';\n// const BASE_PATH = 'http://localhost:5000/';" > ./test_system/static/js/base_path.js
    printf "BASE_PATH = 'http://cs.entryhse.tk/'\n# BASE_PATH = 'http://localhost:5000/'" > test_system/test_system/base_path.py
    ;;
*)
    echo "Operation aborted by user" && return 1
    ;;
esac

printf "$superuser_name\nsuperuser_mail\n$superuser_password" > .superuser.txt
docker-compose build

sed -i'.original' -e 's/^STATIC_ROOT/# STATIC_ROOT/' ./test_system/test_system/settings.py

docker-compose run --rm djangoapp /bin/bash -c "python3 test_system/manage.py makemigrations"
docker-compose run --rm djangoapp /bin/bash -c "python3 test_system/manage.py migrate"
docker-compose run --rm djangoapp /bin/bash -c "cat .superuser.txt | python3 test_system/manage.py initadmin"
docker-compose run --rm djangoapp /bin/bash -c "python3 test_system/manage.py initscale"

sed -i'.original' -e 's/^# STATIC_ROOT/STATIC_ROOT/' ./test_system/test_system/settings.py
rm ./test_system/test_system/settings.py.original

docker-compose run djangoapp python3 test_system/manage.py collectstatic --no-input
docker-compose run --rm djangoapp /bin/bash -c "cp -r ./test_system/static/* ../static"

[ "$start_on_complete" = true ] && docker-compose up
