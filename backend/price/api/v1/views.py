from django.utils.translation import gettext_lazy as _
from rest_framework.decorators import action
from rest_framework.response import Response

from base.api.v1.views import BaseViewSetV1
from price.api.v1.serializers import PriceSerializerV1, PriceItemSerializerV1
from price.models import (
    Price,
    PriceItem,
)
from price.services import PriceItemService


class PriceViewSetV1(BaseViewSetV1):
    queryset = Price.objects.all()
    serializer_class = PriceSerializerV1

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        service = PriceItemService(pk=pk)
        service.cancel()
        return Response({"message": _("Canceled")})

    @action(detail=True, methods=["post"])
    def finish(self, request, pk=None):
        service = PriceItemService(pk=pk)
        service.finish()
        return Response({"message": _("Finished")})


class PriceItemViewSetV1(BaseViewSetV1):
    queryset = PriceItem.objects.all().order_by("created_at")
    serializer_class = PriceItemSerializerV1
    search_fields = (
        "id",
        "price_id",
    )
    filterset_fields = (
        "id",
        "price",
    )
