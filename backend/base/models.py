from django.contrib.auth.models import AbstractUser
from django.db import models

from base.mixins import UUIDIDMixin, BaseModelMixin


class Company(UUIDIDMixin):
    name = models.CharField(
        max_length=255,
        db_index=True,
    )
    document = models.CharField(
        max_length=255,
        db_index=True,
    )

    def __str__(self):
        return self.name


class User(AbstractUser):
    is_buyer = models.BooleanField(default=False)
    is_supplier = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)

    def __str__(self):
        return self.username


class Profile(UUIDIDMixin):
    company = models.ForeignKey(
        Company,
        on_delete=models.DO_NOTHING,
    )
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )
    photo = models.ImageField(
        blank=True,
        upload_to="profile/",
    )
    bio = models.TextField(
        blank=True,
    )

    def __str__(self):
        return f"{self.pk} - {self.user.username}"
