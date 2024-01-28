from rest_framework import viewsets

from common.api.v1.serializers import (
    PaymentSerializerV1,
    UnitySerializerV1,
    ProductSerializerV1,
    BuyerSerializerV1,
    SupplierSerializerV1,
)
from common.models import (
    Payment,
    Unity,
    Product,
    Buyer,
    Supplier,
)


class PaymentViewSetV1(viewsets.ModelViewSet):
    serializer_class = PaymentSerializerV1
    queryset = Payment.objects.all()


class UnityViewSetV1(viewsets.ModelViewSet):
    serializer_class = UnitySerializerV1
    queryset = Unity.objects.all()


class ProductViewSetV1(viewsets.ModelViewSet):
    serializer_class = ProductSerializerV1
    queryset = Product.objects.all()


class BuyerViewSetV1(viewsets.ModelViewSet):
    serializer_class = BuyerSerializerV1
    queryset = Buyer.objects.all()


class SupplierViewSetV1(viewsets.ModelViewSet):
    serializer_class = SupplierSerializerV1
    queryset = Supplier.objects.all()
