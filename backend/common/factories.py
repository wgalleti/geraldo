from base.factories import BaseFactory
from common.models import (
    Payment,
    Unity,
    ProductGroup,
    Priority,
    Product,
    Buyer,
    Supplier,
)


class PaymentFactory(BaseFactory):
    class Meta:
        model = Payment


class UnityFactory(BaseFactory):
    class Meta:
        model = Unity


class ProductGroupFactory(BaseFactory):
    class Meta:
        model = ProductGroup


class PriorityFactory(BaseFactory):
    class Meta:
        model = Priority


class ProductFactory(BaseFactory):
    class Meta:
        model = Product


class BuyerFactory(BaseFactory):
    class Meta:
        model = Buyer


class SupplierFactory(BaseFactory):
    class Meta:
        model = Supplier
