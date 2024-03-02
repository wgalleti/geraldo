from rest_framework.decorators import action
from rest_framework.response import Response

from base.api.v1.views import BaseViewSetV1
from base.utils.transform import choice_to_list
from common.api.v1.serializers import (
    PaymentSerializerV1,
    UnitySerializerV1,
    ProductSerializerV1,
    BuyerSerializerV1,
    SupplierSerializerV1,
    ProductGroupSerializerV1,
)
from common.models import (
    Payment,
    Unity,
    Product,
    Buyer,
    Supplier,
    ProductGroup,
    Priority,
)


class PaymentViewSetV1(BaseViewSetV1):
    serializer_class = PaymentSerializerV1
    queryset = Payment.objects.all()


class UnityViewSetV1(BaseViewSetV1):
    serializer_class = UnitySerializerV1
    queryset = Unity.objects.all()


class ProductGroupViewSetV1(BaseViewSetV1):
    serializer_class = ProductGroupSerializerV1
    queryset = ProductGroup.objects.all()


class ProductViewSetV1(BaseViewSetV1):
    serializer_class = ProductSerializerV1
    queryset = Product.objects.all()
    filterset_fields = (
        "id",
        "name",
    )

    @action(detail=False, methods=["get"])
    def priority(self, request, pk=None):
        return Response(choice_to_list(Priority.choices))


class BuyerViewSetV1(BaseViewSetV1):
    serializer_class = BuyerSerializerV1
    queryset = Buyer.objects.all()


class SupplierViewSetV1(BaseViewSetV1):
    serializer_class = SupplierSerializerV1
    queryset = Supplier.objects.all()
    search_fields = (
        "id",
        "name",
        "email",
    )
