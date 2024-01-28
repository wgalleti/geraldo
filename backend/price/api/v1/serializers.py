from rest_framework import serializers

from price.models import (
    Price,
    PriceItem,
)


class PriceSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = "__all__"


class PriceItemSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = PriceItem
        fields = "__all__"
