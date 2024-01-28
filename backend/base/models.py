from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from base.mixins import UUIDIDMixin, BaseModelMixin


class Company(UUIDIDMixin):
    name = models.CharField(
        max_length=255,
        db_index=True,
        verbose_name=_("Name"),
    )
    document = models.CharField(
        max_length=255,
        db_index=True,
        unique=True,
        verbose_name=_("Document"),
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Company")
        verbose_name_plural = _("Companies")


class User(AbstractUser):
    is_buyer = models.BooleanField(
        default=False,
        verbose_name=_("Is Buyer"),
    )
    is_supplier = models.BooleanField(
        default=False,
        verbose_name=_("Is Supplier"),
    )
    is_manager = models.BooleanField(
        default=False,
        verbose_name=_("Is Manager"),
    )

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")


class Profile(UUIDIDMixin):
    company = models.ForeignKey(
        Company,
        on_delete=models.DO_NOTHING,
        verbose_name=_("Company"),
    )
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        verbose_name=_("User"),
    )
    photo = models.ImageField(
        blank=True,
        upload_to="profile/",
        verbose_name=_("Photo"),
    )
    bio = models.TextField(
        blank=True,
        verbose_name=_("Bio"),
    )

    def __str__(self):
        return f"{self.pk} - {self.user.username}"

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")
