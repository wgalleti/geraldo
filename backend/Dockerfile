FROM python:3.12.0-alpine3.18
LABEL authors="William Galleti <william.galleti@gmail.com>"

RUN \
  apk update && \
  apk add postgresql-dev gcc python3-dev musl-dev zlib-dev jpeg-dev gettext build-base libffi-dev

WORKDIR /api

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PIPENV_VENV_IN_PROJECT 1

COPY Pipfile Pipfile.lock ./

RUN pip install uwsgi
RUN pip install -U pipenv
RUN pipenv install -d --system --deploy --ignore-pipfile

RUN mkdir /sockets

COPY . .

CMD ["uwsgi", "--ini", "uswgi.ini"]
