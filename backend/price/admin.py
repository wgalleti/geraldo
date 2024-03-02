from django.contrib import admin

from price.models import Price, PriceItem


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "erp_code",
        "payment",
        "payment_refer",
        "supplier",
        "buyer",
        "status",
        "started_at",
        "expire_at",
        "priority",
    )

    list_filter = (
        "status",
        "priority",
        "expire_at",
        "buyer",
        "supplier",
    )


@admin.register(PriceItem)
class PriceItemAdmin(admin.ModelAdmin):
    list_display = (
        "price",
        "product",
        "quantity",
        "unitary",
        "tax",
        "shipping",
        "discount",
        "rounding",
        "supplier_observation",
    )
