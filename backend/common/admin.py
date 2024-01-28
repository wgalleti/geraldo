from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from common.models import (
    Payment,
    Unity,
    ProductGroup,
    Product,
    Buyer,
    Supplier,
)


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        "erp_code",
        "name",
    )


@admin.register(Unity)
class UnityAdmin(admin.ModelAdmin):
    list_display = (
        "erp_code",
        "name",
    )


@admin.register(ProductGroup)
class ProductGroupAdmin(admin.ModelAdmin):
    list_display = (
        "erp_code",
        "name",
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "erp_code",
        "name",
        "base_code",
        "bar_code",
        "priority",
    )


@admin.register(Buyer)
class BuyerAdmin(admin.ModelAdmin):
    list_display = (
        "erp_code",
        "name",
        "alias",
        "email",
    )


@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = (
        "erp_code",
        "name",
        "alias",
        "document",
        "email",
        "display_rating",
    )

    def display_rating(self, obj):
        rating_html = ""
        for _ in range(obj.rating):
            rating_html += "⭐"
        return format_html(rating_html)

    display_rating.short_description = _("Rating")
