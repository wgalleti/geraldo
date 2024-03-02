from datetime import timedelta

import pytest
from django.utils import timezone

from base.factories import CompanyFactory
from common.factories import (
    PaymentFactory,
    SupplierFactory,
    BuyerFactory,
    ProductFactory,
    UnityFactory,
)
from common.models import Priority
from price.models import Price, PriceStatus, PriceItem


@pytest.fixture
def generate_price():
    data = dict(
        company=CompanyFactory(),
        status=PriceStatus.WAITING,
        erp_code="XPTO",
        payment=PaymentFactory(),
        payment_refer=PaymentFactory(),
        supplier=SupplierFactory(),
        buyer=BuyerFactory(),
        started_at=timezone.now().date(),
        expire_at=timezone.now().date() + timedelta(days=7),
        recommendation="Recommended text info",
        priority=Priority.NORMAL,
    )

    return (
        Price.objects.create(
            **data,
        ),
        data,
    )


@pytest.fixture
def generate_price_item():
    def _generate_price_item(price):
        data = dict(
            price=price,
            company=price.company,
            product=ProductFactory(),
            product_observation="Test observation",
            unity=UnityFactory(),
            quantity_refer=10,
            quantity=10,
            unitary=5,
            tax=0,
            shipping=50,
            discount=10,
            rounding=0,
            supplier_observation="Supplier observation",
        )

        return (
            PriceItem.objects.create(
                **data,
            ),
            data,
        )

    return _generate_price_item


@pytest.mark.django_db
def test_price_create(generate_price):
    row, data = generate_price
    assert Price.objects.count() == 1
    for key, value in data.items():
        assert getattr(row, key) == value
    assert str(row) == f"{row.pk}-{row.erp_code}"


@pytest.mark.django_db
def test_price_item_create(generate_price, generate_price_item):
    price, _ = generate_price
    price_item, data = generate_price_item(price)

    assert PriceItem.objects.count() == 1
    for key, value in data.items():
        assert getattr(price_item, key) == value
    assert (
        str(price_item)
        == f"{price_item.pk}-{price_item.price.erp_code}-{price_item.product.erp_code}"
    )
