# English Language Testing System
###### Django Testing System for HSE freshmen. It is set to help HSE Foreign Languages Department automate process of language quality assessment.

## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [Usage](#usage)
- [Table format](#table-format)
- [Browser support](#browser-support)

## Main

```text
test_system/
├── account          (login & logout)
├── accounts         (registration)
├── api_time         (time from server)
├── dashboard        (base path for teacher console)
├── evaluation       (getting marks after exam)
├── exam             (exam session)
├── file_uploader    (exam file upload api)
├── mark_scaler      (grading scales)
├── media            (files uploaded to the system)
├── speaking_queue   (speaking queue)
├── static           (img, js, css files)
├── student_answer   (students' answers)
├── templates        (HTML files)
├── test_editor      (add, edit and delete questions)
├── test_question    (api for test questions)
├── test_system      (testing system)
├── test_text        (question text model)
├── user_major       (users' majors)
├── user_pref        (student, teacher, admin statuses)
├── users_exam       (user - exam interaction)
└── requirements.txt (required packages)
```

[⬆ Back to top](#table-of-contents)

## Requirements

```
docker
docker-compose
whiptail
```


[⬆ Back to top](#table-of-contents)

## Getting started

> Clone this repo 
```sh
git clone https://github.com/DimaT1/team3_testing_system/
```

> Create constants.py
##### You need to specify SECRET_KEY, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD
```sh
vim test_system/constants.py
```

> Configure & build
```sh
./auto_bootstrap.sh
```

> You can run bash using
```sh
docker-compose run --rm djangoapp /bin/bash
```

> Run server
```sh
docker-compose up
```

> Collect static
```sh
docker-compose run djangoapp python3 test_system/manage.py collectstatic --no-input
```

> Reset docker (not recommended)
```sh
./docker-reser.sh
```


[⬆ Back to top](#table-of-contents)

## Usage

##### *Here is short description of how to use this testing system*

> For the admin interface you should go to

```
<base_url>/admin
```

> For the testing interface you should go to

```
<base_url>/test_system/test/
```

> For the teacher interface you should go to

```
<base_url>/test_editor/
```

> For the file upload interface you should go to

```
<base_url>/test_upload/
```

> For the grade scaling interface you should go to

```
<base_url>/scale/edit/
```

> For the results download and infographics go to

```
<base_url>/scale/result/
```

> For the students lists upload interface go to

```
<base_url>/test_upload/student/
```

> For the exam control panel go to

```
<base_url>/dashboard/manage/
```

> For the exam editor (stream adding) go to

```
<base_url>/dashboard/stream_edit/
```

[⬆ Back to top](#table-of-contents)

## Table format

##### *Here is an example of a student table that should be used to automatically compile a user base*

|Студенческий билет|Фамилия|Имя|Отчество||||
|---|---|---|---|---|---|---|
|**Номер студенческого билета**||||**Образовательная программа**|**Факультет**|**Адрес студенческой почты**|
|*М181БПИНЖ100*|*Иванов*|*Иван*|*Иванович*|*Программная инженерия*|*Факультет компьютерных наук*|iiivanov@edu.hse.ru|
|*М181БПИНЖ101*|*Петров*|*Петр*|*Петрович*|*Прикладная математика и информатика*|*Факультет компьютерных наук*|pppetrov@edu.hse.ru|

[⬆ Back to top](#table-of-contents)

## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)

[⬆ Back to top](#table-of-contents)
