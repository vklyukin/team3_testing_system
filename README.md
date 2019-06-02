# English Language Testing System
###### Django Testing System for HSE freshmen. It is set to help HSE Foreign Languages Department automate process of language quality assessment.

###### This fork goal is to move project to PostgreSQL and to make a Docker container over existing system.


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

## Getting started

##### *Note that commands like python3, apt-get and pip3 can differ depending on your operation system!*

> To use this project on your local machine you should make python virtual environment and run it.

```shell
python3 -m venv myvemv
source myvenv/bin/activate
```
> Then you should install all required packages.

```shell
pip3 install -r requirements.txt
sudo apt-get install antiword abiword unrtf poppler-utils libjpeg-dev \
pstotext
```
> After all packages were installed you should make debug mode True in the settings.py file, so Django could serve static files on you localhost.

```python
# test_system/settings.py
DEBUG = True
```
> And then You are ready to run this application on your local machine.

```shell
python3 manage.py runserver
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
