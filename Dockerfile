FROM python:3.6

RUN mkdir -p /opt/services/djangoapp/src

COPY . /opt/services/djangoapp/src
WORKDIR /opt/services/djangoapp/src

RUN apt-get update -y && \
    apt-get install -y antiword \ 
    abiword unrtf poppler-utils \
    libjpeg-dev pstotext whiptail

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD ["gunicorn", "--chdir", "test_system", "--bind", ":5000", "test_system.wsgi:application"]

