from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from base.mixins import BaseModelCompanyMixin, UUIDIDMixin


class BaseERPCodeMixin(BaseModelCompanyMixin):
    erp_code = models.CharField(
        max_length=255,
        verbose_name=_("ERP code"),
        null=True,
        blank=True,
    )

    class Meta:
        abstract = True


class Payment(BaseERPCodeMixin):
    name = models.CharField(
        max_length=255,
        verbose_name=_("Name"),
    )

    def __str__(self):
        return f"{self.erp_code}-{self.name}"

    class Meta:
        verbose_name = _("Payment")
        verbose_name_plural = _("Payments")


class Unity(BaseERPCodeMixin):
    name = models.CharField(
        max_length=255,
        verbose_name=_("Name"),
    )

    def __str__(self):
        return f"{self.erp_code}-{self.name}"

    class Meta:
        verbose_name = _("Unity")
        verbose_name_plural = _("Unities")


class ProductGroup(BaseERPCodeMixin):
    name = models.CharField(
        max_length=255,
        verbose_name=_("Name"),
    )

    def __str__(self):
        return f"{self.erp_code}-{self.name}"

    class Meta:
        verbose_name = _("Product group")
        verbose_name_plural = _("Product groups")


class Priority(models.TextChoices):
    NORMAL = "normal", _("Normal")
    HIGH = "high", _("High")
    NO_WAITING = "no_waiting", _("No waiting")


class Product(BaseERPCodeMixin):
    product_group = models.ForeignKey(
        "common.ProductGroup",
        on_delete=models.DO_NOTHING,
        verbose_name=_("Product group"),
        related_name="groups",
    )
    name = models.CharField(
        max_length=255,
        verbose_name=_("Name"),
    )
    unity = models.ForeignKey(
        "common.Unity",
        on_delete=models.DO_NOTHING,
        verbose_name=_("Unity"),
        related_name="unities",
    )
    base_code = models.CharField(
        max_length=255,
        verbose_name=_("Base Code"),
    )
    bar_code = models.CharField(
        max_length=255,
        verbose_name=_("Bar Code"),
    )
    priority = models.CharField(
        max_length=255,
        choices=Priority,
        default=Priority.NORMAL,
        verbose_name=_("Priority"),
    )

    def __str__(self):
        return f"{self.erp_code}-{self.name}"

    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")


class Buyer(UUIDIDMixin, BaseERPCodeMixin):
    name = models.CharField(
        max_length=255,
        verbose_name=_("Name"),
    )
    alias = models.CharField(
        max_length=255,
        verbose_name=_("Alias"),
    )
    email = models.EmailField(
        unique=True,
        verbose_name=_("Email"),
    )

    def __str__(self):
        return f"{self.erp_code}-{self.name}"

    class Meta:
        verbose_name = _("Buyer")
        verbose_name_plural = _("Buyers")


class Supplier(UUIDIDMixin, BaseERPCodeMixin):
    name = models.CharField(
        max_length=255,
        verbose_name=_("Name"),
    )
    alias = models.CharField(
        max_length=255,
        verbose_name=_("Alias"),
    )
    document = models.CharField(
        max_length=255,
        unique=True,
        verbose_name=_("Document"),
    )
    email = models.EmailField(
        unique=True,
        verbose_name=_("Email"),
    )
    rating = models.IntegerField(
        default=1,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5),
        ],
        verbose_name=_("Rating"),
    )

    def __str__(self):
        return f"{self.erp_code}-{self.name}"

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = _("Supplier")
        verbose_name_plural = _("Suppliers")
