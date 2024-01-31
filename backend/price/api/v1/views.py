from base.api.v1.views import BaseViewSetV1
from price.api.v1.serializers import PriceSerializerV1, PriceItemSerializerV1
from price.models import (
    Price,
    PriceItem,
)


class PriceViewSetV1(BaseViewSetV1):
    queryset = Price.objects.all()
    serializer_class = PriceSerializerV1


class PriceItemViewSetV1(BaseViewSetV1):
    queryset = PriceItem.objects.all()
    serializer_class = PriceItemSerializerV1
