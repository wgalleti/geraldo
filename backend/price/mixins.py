from django.db import models
from django.utils.translation import gettext_lazy as _

from common.models import Priority


class PriceBuyerDataMixin(models.Model):
    payment_refer = models.ForeignKey(
        "common.Payment",
        on_delete=models.DO_NOTHING,
        related_name="payment_refers",
        verbose_name=_("Payment refer"),
    )
    buyer = models.ForeignKey(
        "common.Buyer",
        on_delete=models.DO_NOTHING,
        verbose_name=_("Buyer"),
    )
    buyer_email = models.EmailField(
        blank=True,
        null=True,
        verbose_name=_("Buyer email denormalized"),
    )
    started_at = models.DateField(
        verbose_name=_("Started at"),
    )
    expire_at = models.DateField(
        verbose_name=_("Expire at"),
    )
    recommendation = models.TextField(
        null=True,
        blank=True,
        verbose_name=_("Recommendation"),
    )
    priority = models.CharField(
        max_length=255,
        choices=Priority,
        default=Priority.NORMAL,
        verbose_name=_("Priority"),
    )

    class Meta:
        abstract = True


class PriceItemBuyerDataMixin(models.Model):
    product = models.ForeignKey(
        "common.Product",
        on_delete=models.DO_NOTHING,
        verbose_name=_("Product"),
    )
    product_observation = models.TextField(
        null=True,
        blank=True,
        verbose_name=_("Product observation"),
    )
    unity = models.ForeignKey(
        "common.Unity",
        on_delete=models.DO_NOTHING,
        verbose_name=_("Unity"),
    )
    quantity_refer = models.DecimalField(
        max_digits=15,
        decimal_places=6,
        verbose_name=_("Quantity refer"),
    )

    class Meta:
        abstract = True
