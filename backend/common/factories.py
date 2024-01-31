import factory

from base.factories import BaseFactory
from base.models import Company
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


class BuyerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Buyer

    company = factory.LazyAttribute(lambda obj: Company.objects.first())
    name = factory.Faker("name")
    alias = factory.Faker("first_name")
    email = factory.Faker("email")


class SupplierFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Supplier

    company = factory.LazyAttribute(lambda obj: Company.objects.first())
    name = factory.Faker("name")
    alias = factory.Faker("first_name")
    document = factory.Faker("ssn")
    email = factory.Faker("email")
    rating = factory.Faker("pyint", min_value=1, max_value=5)
