from django.db import models
from django.utils.translation import gettext_lazy as _

from base.mixins import BaseModelMixin, UUIDIDMixin, BaseModelCompanyMixin
from common.models import Priority, BaseERPCodeMixin


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
        verbose_name=_("Payment refer"),
    )
    buyer = models.ForeignKey(
        "common.Buyer",
        on_delete=models.DO_NOTHING,
        verbose_name=_("Buyer"),
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


class Price(UUIDIDMixin, BaseERPCodeMixin, BaseModelCompanyMixin, PriceBuyerDataMixin):
    status = models.CharField(
        max_length=255,
        choices=PriceStatus,
        default=PriceStatus.WAITING,
        verbose_name=_("Status"),
    )
    payment = models.ForeignKey(
        "common.Payment",
        related_name="payments",
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True,
        verbose_name=_("Payment"),
    )

    supplier = models.ForeignKey(
        "common.Supplier",
        on_delete=models.DO_NOTHING,
        verbose_name=_("Supplier"),
    )

    def __str__(self):
        return f"{self.pk}-{self.erp_code}"

    class Meta:
        verbose_name = _("Price")
        verbose_name_plural = _("Prices")


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


class PriceItem(
    UUIDIDMixin, BaseERPCodeMixin, BaseModelCompanyMixin, PriceItemBuyerDataMixin
):
    price = models.ForeignKey(
        "price.Price",
        on_delete=models.CASCADE,
        verbose_name=_("Price"),
    )
    quantity = models.DecimalField(
        max_digits=15,
        decimal_places=6,
        verbose_name=_("Quantity"),
        null=True,
        blank=True,
        default=0,
    )
    unitary = models.DecimalField(
        max_digits=15,
        decimal_places=6,
        verbose_name=_("Unitary"),
        null=True,
        blank=True,
        default=0,
    )
    tax = models.DecimalField(
        max_digits=15,
        decimal_places=6,
        default=0,
        null=True,
        blank=True,
        verbose_name=_("Tax"),
    )
    shipping = models.DecimalField(
        max_digits=15,
        decimal_places=6,
        default=0,
        null=True,
        blank=True,
        verbose_name=_("Shipping"),
    )
    discount = models.DecimalField(
        max_digits=15,
        decimal_places=6,
        default=0,
        null=True,
        blank=True,
        verbose_name=_("Discount"),
    )
    rounding = models.DecimalField(
        max_digits=15,
        decimal_places=6,
        default=0,
        null=True,
        blank=True,
        verbose_name=_("Rounding"),
    )
    supplier_observation = models.TextField(
        null=True,
        blank=True,
        verbose_name=_("Supplier observation"),
    )

    def __str__(self):
        return f"{self.pk}-{self.price.erp_code}-{self.product.erp_code}"

    class Meta:
        verbose_name = _("Price Item")
        verbose_name_plural = _("Price Items")
