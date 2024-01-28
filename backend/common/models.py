from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from base.mixins import BaseModelCompanyMixin, UUIDIDMixin


class Payment(BaseModelCompanyMixin):
    erp_code = models.CharField(
        max_length=255,
        unique=True,
    )
    name = models.CharField(
        max_length=255,
    )

    def __str__(self):
        return f"{self.erp_code}-{self.name}"


class Unity(BaseModelCompanyMixin):
    erp_code = models.CharField(
        max_length=255,
        unique=True,
    )
    name = models.CharField(
        max_length=255,
    )

    def __str__(self):
        return f"{self.erp_code}-{self.name}"


class ProductGroup(BaseModelCompanyMixin):
    erp_code = models.CharField(
        max_length=255,
        unique=True,
    )
    name = models.CharField(
        max_length=255,
    )

    def __str__(self):
        return f"{self.erp_code}-{self.name}"


class Priority(models.TextChoices):
    NORMAL = "normal", _("Normal")
    HIGH = "high", _("High")
    NO_WAITING = "no_waiting", _("No waiting")


class Product(BaseModelCompanyMixin):
    erp_code = models.CharField(
        max_length=255,
        unique=True,
    )
    name = models.CharField(
        max_length=255,
    )
    base_code = models.CharField(
        max_length=255,
    )
    bar_code = models.CharField(
        max_length=255,
    )
    priority = models.CharField(
        max_length=255,
        choices=Priority,
        default=Priority.NORMAL,
    )

    def __str__(self):
        return f"{self.erp_code}-{self.name}"


class Buyer(UUIDIDMixin, BaseModelCompanyMixin):
    erp_code = models.CharField(
        max_length=255,
        unique=True,
    )
    name = models.CharField(
        max_length=255,
    )
    alias = models.CharField(
        max_length=255,
    )
    email = models.EmailField(
        unique=True,
    )

    def __str__(self):
        return f"{self.erp_code}-{self.name}"


class Supplier(UUIDIDMixin, BaseModelCompanyMixin):
    erp_code = models.CharField(
        max_length=255,
        unique=True,
    )
    name = models.CharField(
        max_length=255,
    )
    alias = models.CharField(
        max_length=255,
    )
    document = models.CharField(
        max_length=255,
        unique=True,
    )
    email = models.EmailField(
        unique=True,
    )
    rating = models.IntegerField(
        default=1,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5),
        ],
    )

    def __str__(self):
        return f"{self.erp_code}-{self.name}"

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
