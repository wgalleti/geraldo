from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("v1/auth/", include("dj_rest_auth.urls")),
    path("v1/bases/", include("base.api.v1.urls")),
    path("v1/commons/", include("common.api.v1.urls")),
    path("v1/prices/", include("price.api.v1.urls")),
]
