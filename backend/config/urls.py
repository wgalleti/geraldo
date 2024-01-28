from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/bases/", include("base.urls")),
    path("api/commons/", include("common.urls")),
    path("api/prices/", include("price.urls")),
]
