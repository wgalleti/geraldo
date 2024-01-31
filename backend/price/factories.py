from datetime import timedelta

import factory
from django.utils import timezone

from base.factories import CompanyFactory
from base.models import Company
from common.factories import (
    PaymentFactory,
    BuyerFactory,
    SupplierFactory,
    UnityFactory,
    ProductFactory,
)
from common.models import Priority
from price.models import Price, PriceItem, PriceStatus


class PriceFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Price

    company = factory.LazyAttribute(lambda x: Company.objects.first())
    payment_refer = factory.SubFactory(PaymentFactory)
    buyer = factory.SubFactory(BuyerFactory)
    started_at = factory.LazyAttribute(lambda x: timezone.now())
    expire_at = factory.LazyAttribute(lambda x: x.started_at + timedelta(days=10))
    recommendation = factory.Faker("paragraph")
    priority = factory.Iterator(
        [
            Priority.NORMAL,
            Priority.HIGH,
            Priority.NO_WAITING,
        ]
    )
    status = factory.Iterator(
        [
            PriceStatus.FILLING_IN,
            PriceStatus.WAITING,
        ]
    )
    payment = factory.SubFactory(PaymentFactory)
    supplier = factory.SubFactory(SupplierFactory)

    @factory.post_generation
    def generate_items(obj, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for n in range(extracted):
                PriceItemFactory(price=obj)


class PriceItemFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = PriceItem

    price = factory.SubFactory(PriceFactory)
    company = factory.LazyAttribute(lambda x: Company.objects.first())
    product = factory.SubFactory(ProductFactory)
    product_observation = factory.Faker("paragraph")
    unity = factory.SubFactory(UnityFactory)
    quantity_refer = factory.Faker(
        "pydecimal",
        left_digits=3,
        right_digits=2,
        positive=True,
    )


def prepare_data(rows=10):
    qs_company = Company.objects.all()

    if not qs_company.exists():
        CompanyFactory.create_batch(1)

    for i in range(rows):
        PriceFactory(generate_items=rows)
