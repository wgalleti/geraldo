import datetime
import os
from pathlib import Path

from decouple import Csv, config
from dj_database_url import parse as dburl

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("SECRET_KEY")
DEBUG = config("DEBUG", cast=bool)
ALLOWED_HOSTS = config("ALLOWED_HOSTS", cast=Csv())

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_APPS = [
    "corsheaders",
    "django_extensions",
    "django_filters",
    "rest_framework",
    "dj_rest_auth",
    "rest_framework.authtoken",
]

LOCAL_APPS = [
    "base",
    "common",
    "price",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_APPS + LOCAL_APPS

AUTH_USER_MODEL = "base.User"

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django.middleware.locale.LocaleMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


DEFAULT_DATABASE = "sqlite:///" + os.path.join(BASE_DIR, "web_price.sqlite3")
DATABASES = {"default": config("DATABASE_URL", cast=dburl, default=DEFAULT_DATABASE)}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = config("LANGUAGE_CODE", default="en-us")

TIME_ZONE = config("TIME_ZONE", default="UTC")

USE_I18N = True

USE_L10N = True

USE_TZ = True

LOCALE_PATHS = (os.path.join(BASE_DIR, "locale"),)

STATIC_PATH = config("STATIC_PATH", default="static")
MEDIA_PATH = config("MEDIA_PATH", default="media")

STATIC_URL = f"/{STATIC_PATH}/"
STATIC_ROOT = os.path.join(BASE_DIR, STATIC_PATH)

MEDIA_URL = f"/{MEDIA_PATH}/"
MEDIA_ROOT = os.path.join(BASE_DIR, MEDIA_PATH)

NOTEBOOK_ARGUMENTS = [
    "--ip",
    "0.0.0.0",
    "--allow-root",
    "--no-browser",
]
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

REST_FRAMEWORK = {
    "DEFAULT_PARSER_CLASSES": (
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ),
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
    "DEFAULT_FILTER_BACKENDS": (
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.OrderingFilter",
    ),
    "DEFAULT_PAGINATION_CLASS": "base.rest.CustomPagination",
    "PAGE_SIZE": 20,
    # "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    "COERCE_DECIMAL_TO_STRING": False,
}

JWT_AUTH = {
    "JWT_ENCODE_HANDLER": "rest_framework_jwt.utils.jwt_encode_handler",
    "JWT_DECODE_HANDLER": "rest_framework_jwt.utils.jwt_decode_handler",
    "JWT_PAYLOAD_HANDLER": "rest_framework_jwt.utils.jwt_payload_handler",
    "JWT_PAYLOAD_GET_USER_ID_HANDLER": "rest_framework_jwt.utils.jwt_get_user_id_from_payload_handler",
    "JWT_RESPONSE_PAYLOAD_HANDLER": "rest_framework_jwt.utils.jwt_response_payload_handler",
    "JWT_SECRET_KEY": SECRET_KEY,
    "JWT_GET_USER_SECRET_KEY": None,
    "JWT_PUBLIC_KEY": None,
    "JWT_PRIVATE_KEY": None,
    "JWT_ALGORITHM": "HS256",
    "JWT_VERIFY": True,
    "JWT_VERIFY_EXPIRATION": True,
    "JWT_LEEWAY": 0,
    "JWT_EXPIRATION_DELTA": datetime.timedelta(days=1),
    "JWT_AUDIENCE": None,
    "JWT_ISSUER": None,
    "JWT_ALLOW_REFRESH": True,
    "JWT_REFRESH_EXPIRATION_DELTA": datetime.timedelta(days=7),
    "JWT_AUTH_HEADER_PREFIX": "Bearer",
    "JWT_AUTH_COOKIE": None,
}

REST_AUTH_SERIALIZERS = {
    "TOKEN_SERIALIZER": "base.api.v1.serializers.TokenSerializer",
    "USER_DETAILS_SERIALIZER": "base.api.v1.serializers.UserSerializer",
}

REST_USE_JWT = False

CORS_ORIGIN_ALLOW_ALL = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

EMAIL_BACKEND = config("MAIL_BACKEND")
EMAIL_HOST = config("MAIL_HOST")
DEFAULT_FROM_EMAIL = config("MAIL_DEFAULT_FROM")
SERVER_EMAIL = config("MAIL_SERVER")
EMAIL_HOST_USER = config("MAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("MAIL_HOST_PASSWORD")
EMAIL_PORT = config("MAIL_PORT", cast=int)
EMAIL_USE_TLS = config("MAIL_USE_TLS", cast=bool)
