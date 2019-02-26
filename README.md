# English Language Testing System
###### Django Testing System for HSE freshmen. It is set to help HSE Foreign Languages Department automate process of language quality assessment.

## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [Usage](#usage)
- [Browser support](#browser-support)

## Main

```text
test_system/
├── account          (login & logout)
├── accounts         (registration)
├── api_time         (time from server)
├── exam             (exam session)
├── file_uploader    (exam file upload api)
├── static           (img, js, css files)
├── student_answer   (students' answers)
├── templates        (HTML files)
├── test_editor      (add, edit and delete questions)
├── test_question    (api for test questions)
├── test_system      (testing system)
├── test_text        (question text model)
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
<base_url>/front_test/test/
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

[⬆ Back to top](#table-of-contents)

## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+

[⬆ Back to top](#table-of-contents)
