import pytest
from django.core.exceptions import ValidationError

from base.factories import CompanyFactory
from common.models import (
    Payment,
    Unity,
    ProductGroup,
    Product,
    Priority,
    Buyer,
    Supplier,
)


@pytest.mark.django_db
@pytest.mark.parametrize(
    "model, data, display",
    [
        (
            Payment,
            {
                "name": "Test Payment",
            },
            "XPTO-Test Payment",
        ),
        (
            Unity,
            {
                "name": "Test Unity",
            },
            "XPTO-Test Unity",
        ),
        (
            ProductGroup,
            {
                "name": "Test ProductGroup",
            },
            "XPTO-Test ProductGroup",
        ),
        (
            Product,
            {
                "name": "Test Product",
                "base_code": "ABCD",
                "bar_code": "78999999999",
                "priority": Priority.NORMAL,
            },
            "XPTO-Test Product",
        ),
        (
            Buyer,
            {
                "name": "Test Buyer",
                "alias": "Buyer",
                "email": "buyer@geraldo.io",
            },
            "XPTO-Test Buyer",
        ),
        (
            Supplier,
            {
                "name": "Test Supplier",
                "alias": "Supplier",
                "document": "50.326.999/9999-99",
                "email": "supplier@geraldo.io",
                "rating": 4,
            },
            "XPTO-Test Supplier",
        ),
    ],
)
def test_basic_create(model, data, display):
    code = "XPTO"
    row = model.objects.create(erp_code=code, company=CompanyFactory(), **data)
    assert model.objects.count() == 1
    assert row.erp_code == code
    for key, value in data.items():
        assert getattr(row, key) == value
    assert str(row) == display


@pytest.mark.django_db
@pytest.mark.parametrize(
    "rating",
    [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
    ],
)
def test_supplier_ratting(rating):
    data = {
        "name": "Test Supplier",
        "erp_code": "XPTO",
        "alias": "Supplier",
        "document": "50.326.999/9999-99",
        "email": "supplier@geraldo.io",
        "rating": rating,
        "company": CompanyFactory(),
    }
    raise_error = rating not in [1, 2, 3, 4, 5]
    if raise_error:
        with pytest.raises(ValidationError):
            instance = Supplier(**data)
            instance.save()
    else:
        instance = Supplier(**data)
        instance.save()
