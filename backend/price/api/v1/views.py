from django.utils.translation import gettext_lazy as _
from django.db import transaction
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from base.api.v1.views import BaseViewSetV1
from price.api.v1.serializers import PriceSerializerV1, PriceItemSerializerV1
from price.models import (
    Price,
    PriceItem,
)
from price.services import PriceService


class BasePriceViewSetV1(BaseViewSetV1):
    def get_queryset(self):
        qs = self.queryset
        is_admin = self.request.user.is_manager or self.request.user.is_superuser
        is_buyer = self.request.user.is_buyer
        is_supplier = self.request.user.is_supplier
        user_email = self.request.user.email

        if is_admin:
            return qs
        if is_buyer:
            return qs.filter(buyer_email=user_email)
        if is_supplier:
            return qs.filter(supplier_email=user_email)

    def perform_update(self, serializer):
        instance = self.get_object()
        is_admin = self.request.user.is_manager or self.request.user.is_superuser
        is_buyer = self.request.user.is_buyer
        is_supplier = self.request.user.is_supplier
        user_email = self.request.user.email
        is_allowed = False

        if is_admin:
            raise PermissionDenied(_("Admins are not allowed to perform this action."))

        if is_buyer:
            is_allowed = instance.buyer_email == user_email
        if is_supplier:
            is_allowed = instance.supplier_email == user_email

        if not is_allowed:
            raise PermissionDenied(_("You are not allowed to perform this action."))

        return super().perform_update(serializer)


class PriceViewSetV1(BasePriceViewSetV1):
    queryset = Price.objects.all()
    serializer_class = PriceSerializerV1

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        service = PriceService(pk=pk)
        service.cancel()
        return Response({"message": _("Canceled")})

    @action(detail=True, methods=["post"])
    def finish(self, request, pk=None):
        service = PriceService(pk=pk)
        service.finish()
        return Response({"message": _("Finished")})

    @action(detail=True, methods=["post"])
    def discount(self, request, pk=None):
        with transaction.atomic():
            value = str(request.data.get("value", 0))
            percent = str(request.data.get("percent", 0))
            instance = self.get_object()
            instance.discount = value
            instance.percent = percent
            instance.save()

            service = PriceService(pk=pk)
            service.apply_discount()
            return Response({"message": _("Applied")})


class PriceItemViewSetV1(BasePriceViewSetV1):
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
