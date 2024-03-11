from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from base.mixins import BaseModelMixin, UUIDIDMixin, BaseModelCompanyMixin
from common.models import BaseERPCodeMixin
from price.mixins import PriceBuyerDataMixin, PriceItemBuyerDataMixin
from utils.dates import date_diff_translated


class PriceStatus(models.TextChoices):
    WAITING = "waiting", _("Waiting")
    FILLING_IN = "filling_in", _("Filling in")
    FINISHED = "finished", _("Finished")
    CANCELLED = "canceled", _("Cancelled")


class Price(
    UUIDIDMixin,
    BaseERPCodeMixin,
    BaseModelCompanyMixin,
    PriceBuyerDataMixin,
):
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
    supplier_email = models.EmailField(
        blank=True,
        null=True,
        verbose_name=_("Supplier email denormalized"),
    )

    @property
    def duration_time(self):
        return date_diff_translated(self.created_at, timezone.now())

    @property
    def completed_percent(self):
        qs = self.price_items.all()
        pending = qs.filter(filled=True).count()
        quantity = qs.count()
        return pending / quantity * 100

    @property
    def items_pending(self):
        return self.price_items.filter(filled=False).count()

    @property
    def total_tax(self):
        return sum(self.price_items.values_list("tax", flat=True))

    @property
    def total_discount(self):
        return sum(self.price_items.values_list("discount", flat=True))

    @property
    def items_count(self):
        return self.price_items.count()

    @property
    def value_total(self):
        return sum(item.value_total for item in self.price_items.all())

    def __str__(self):
        return f"{self.pk}-{self.erp_code}"

    def save(self, *args, **kwargs):
        self.full_clean()

        # Denormalize data
        self.supplier_email = getattr(self.supplier, "email", None)
        self.buyer_email = getattr(self.buyer, "email", None)

        super().save(*args, **kwargs)

    class Meta:
        verbose_name = _("Price")
        verbose_name_plural = _("Prices")


class PriceItem(
    UUIDIDMixin,
    BaseERPCodeMixin,
    BaseModelCompanyMixin,
    PriceItemBuyerDataMixin,
):
    price = models.ForeignKey(
        "price.Price",
        on_delete=models.CASCADE,
        verbose_name=_("Price"),
        related_name="price_items",
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
    filled = models.BooleanField(
        default=False,
        verbose_name=_("Filled"),
    )
    buyer_email = models.EmailField(
        blank=True,
        null=True,
        verbose_name=_("Buyer email denormalized"),
    )
    supplier_email = models.EmailField(
        blank=True,
        null=True,
        verbose_name=_("Supplier email denormalized"),
    )

    @property
    def quantity_pending(self):
        return self.quantity_refer - self.quantity

    @property
    def subtotal(self):
        return self.unitary * self.quantity

    @property
    def value_total(self):
        return self.subtotal + self.tax + self.shipping - self.rounding - self.discount

    def __str__(self):
        return f"{self.pk}-{self.price.erp_code}-{self.product.erp_code}"

    def save(self, *args, **kwargs):
        self.filled = self.quantity == self.quantity_refer

        # Denormalize data
        self.buyer_email = self.price.buyer_email
        self.supplier_email = self.price.supplier_email

        super().save(*args, **kwargs)

    class Meta:
        verbose_name = _("Price Item")
        verbose_name_plural = _("Price Items")
