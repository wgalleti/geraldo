from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from base.api.v1.serializers import CompanySerializerV1
from common.api.v1.serializers import (
    BuyerSerializerV1,
    SupplierSerializerV1,
    PaymentSerializerV1,
)
from price.models import (
    Price,
    PriceItem,
)


class PriceItemSerializerV1(serializers.ModelSerializer):
    quantity_pending = serializers.DecimalField(
        max_digits=15,
        decimal_places=4,
        read_only=True,
    )
    subtotal = serializers.DecimalField(
        max_digits=15,
        decimal_places=4,
        read_only=True,
    )
    value_total = serializers.DecimalField(
        max_digits=15,
        decimal_places=4,
        read_only=True,
    )

    class Meta:
        model = PriceItem
        fields = "__all__"


class PriceSerializerV1(serializers.ModelSerializer):
    price_items = PriceItemSerializerV1(
        many=True,
        read_only=True,
    )
    completed_percent = serializers.IntegerField(
        read_only=True,
    )
    items_count = serializers.IntegerField(
        read_only=True,
    )
    value_total = serializers.DecimalField(
        max_digits=15,
        decimal_places=4,
        read_only=True,
    )

    company_data = serializers.SerializerMethodField("_company_data")
    buyer_data = serializers.SerializerMethodField("_buyer_data")
    supplier_data = serializers.SerializerMethodField("_supplier_data")
    payment_data = serializers.SerializerMethodField("_payment_data")
    payment_refer_data = serializers.SerializerMethodField("_payment_refer_data")
    status_data = serializers.SerializerMethodField("_status_data")
    priority_data = serializers.SerializerMethodField("_priority_data")
    duration_time = serializers.CharField(
        max_length=255,
        read_only=True,
    )

    def _company_data(self, obj):
        return CompanySerializerV1(obj.company).data

    def _buyer_data(self, obj):
        return BuyerSerializerV1(obj.buyer).data

    def _supplier_data(self, obj):
        return SupplierSerializerV1(obj.supplier).data

    def _payment_data(self, obj):
        return PaymentSerializerV1(obj.payment).data

    def _payment_refer_data(self, obj):
        return PaymentSerializerV1(obj.payment_refer).data

    def _status_data(self, obj):
        return obj.get_status_display()

    def _priority_data(self, obj):
        return obj.get_priority_display()

    class Meta:
        model = Price
        fields = "__all__"

    def validate(self, attrs):
        quantity_refer = self.instance.quantity_refer
        quantity = attrs.get("quantity", 0)

        if quantity == 0:
            raise ValidationError(_("Quantity cannot be 0"))

        if quantity > quantity_refer:
            raise ValidationError(_("Quantity cannot be greater than quantity_refer"))

        return attrs
