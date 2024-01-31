import factory

from base.models import Company
from common.models import (
    Payment,
    Unity,
    ProductGroup,
    Product,
    Buyer,
    Supplier,
    Priority,
)


class PaymentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Payment
        django_get_or_create = ("name",)

    company = factory.LazyAttribute(lambda obj: Company.objects.first())
    name = factory.Faker("last_name")


class UnityFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Unity
        django_get_or_create = ("name",)

    company = factory.LazyAttribute(lambda obj: Company.objects.first())
    name = factory.Faker("file_extension")


class ProductGroupFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ProductGroup
        django_get_or_create = ("name",)

    company = factory.LazyAttribute(lambda obj: Company.objects.first())
    name = factory.Faker("job")


class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product
        django_get_or_create = ("name",)

    company = factory.LazyAttribute(lambda obj: Company.objects.first())
    product_group = factory.SubFactory(ProductGroupFactory)
    name = factory.Faker("vin")
    unity = factory.SubFactory(UnityFactory)
    base_code = factory.Faker("ean", length=8)
    bar_code = factory.Faker("ean", length=13)
    priority = factory.Iterator([Priority.NORMAL, Priority.HIGH, Priority.NO_WAITING])


class BuyerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Buyer
        django_get_or_create = ("email",)

    company = factory.LazyAttribute(lambda obj: Company.objects.first())
    name = factory.Faker("name")
    alias = factory.Faker("first_name")
    email = factory.Faker("email")


class SupplierFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Supplier
        django_get_or_create = ("email",)

    company = factory.LazyAttribute(lambda obj: Company.objects.first())
    name = factory.Faker("name")
    alias = factory.Faker("first_name")
    document = factory.Faker("ssn")
    email = factory.Faker("email")
    rating = factory.Faker("pyint", min_value=1, max_value=5)


def prepare_data(rows=10):
    PaymentFactory.create_batch(rows)
    UnityFactory.create_batch(rows)
    ProductGroupFactory.create_batch(rows)
    ProductFactory.create_batch(rows)
    BuyerFactory.create_batch(rows)
    SupplierFactory.create_batch(rows)
