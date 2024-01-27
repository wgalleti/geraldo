from django.db import models
from django.utils.translation import gettext_lazy as _

from base.mixins import BaseModelMixin, UUIDIDMixin
from common.models import Priority


class PriceStatus(models.TextChoices):
    WAITING = "waiting", _("Waiting")
    FILLING_IN = "filling_in", _("Filling in")
    FINISHED = "finished", _("Finished")
    CANCELLED = "canceled", _("Cancelled")


class PriceBuyerDataMixin(models.Model):
    payment_refer = models.ForeignKey(
        "common.Payment",
        on_delete=models.DO_NOTHING,
        related_name="payment_refers",
    )
    buyer = models.ForeignKey(
        "common.Buyer",
        on_delete=models.DO_NOTHING,
    )
    started_at = models.DateField()
    expire_at = models.DateField()
    recommendation = models.TextField(
        null=True,
        blank=True,
    )
    priority = models.CharField(
        max_length=255,
        choices=Priority,
        default=Priority.NORMAL,
    )

    class Meta:
        abstract = True


class Price(UUIDIDMixin, PriceBuyerDataMixin):
    status = models.CharField(
        max_length=255,
        choices=PriceStatus,
        default=PriceStatus.WAITING,
    )
    erp_code = models.CharField(
        max_length=255,
        unique=True,
    )
    payment = models.ForeignKey(
        "common.Payment",
        related_name="payments",
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True,
    )

    supplier = models.ForeignKey(
        "common.Supplier",
        on_delete=models.DO_NOTHING,
    )

    def __str__(self):
        return f"{self.pk}-{self.erp_code}"


class PriceItemBuyerDataMixin(models.Model):
    product = models.ForeignKey(
        "common.Product",
        on_delete=models.DO_NOTHING,
    )
    product_observation = models.TextField(
        null=True,
        blank=True,
    )
    unity = models.ForeignKey(
        "common.Unity",
        on_delete=models.DO_NOTHING,
    )
    quantity_refer = models.DecimalField(
        max_digits=15,
        decimal_places=6,
    )

    class Meta:
        abstract = True


class PriceItem(UUIDIDMixin, PriceItemBuyerDataMixin):
    price = models.ForeignKey(
        "price.Price",
        on_delete=models.CASCADE,
    )
    quantity = models.DecimalField(
        max_digits=15,
        decimal_places=6,
    )
    unitary = models.DecimalField(
        max_digits=15,
        decimal_places=6,
    )
    tax = models.DecimalField(
        max_digits=15,
        decimal_places=6,
        default=0,
        null=True,
        blank=True,
    )
    shipping = models.DecimalField(
        max_digits=15,
        decimal_places=6,
        default=0,
        null=True,
        blank=True,
    )
    discount = models.DecimalField(
        max_digits=15,
        decimal_places=6,
        default=0,
        null=True,
        blank=True,
    )
    rounding = models.DecimalField(
        max_digits=15,
        decimal_places=6,
        default=0,
        null=True,
        blank=True,
    )
    supplier_observation = models.TextField(
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.pk}-{self.price.erp_code}-{self.product.erp_code}"
