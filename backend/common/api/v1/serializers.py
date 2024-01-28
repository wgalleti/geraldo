from rest_framework import serializers

from common.models import (
    Payment,
    Unity,
    Product,
    Buyer,
    Supplier,
)


class PaymentSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"


class UnitySerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Unity
        fields = "__all__"


class ProductSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class BuyerSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = "__all__"


class SupplierSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = "__all__"
