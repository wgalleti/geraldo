from rest_framework import viewsets

from price.api.v1.serializers import PriceSerializerV1, PriceItemSerializerV1
from price.models import (
    Price,
    PriceItem,
)


class PriceViewSetV1(viewsets.ModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializerV1


class PriceItemViewSetV1(viewsets.ModelViewSet):
    queryset = PriceItem.objects.all()
    serializer_class = PriceItemSerializerV1
