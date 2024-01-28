import pytest
from django.db import IntegrityError

from base.factories import CompanyFactory, UserFactory
from base.models import User, Company, Profile

COMPANY_DATA = dict(
    name="William Galleti LLC",
    document="XPTO123",
)

USER_DATA = dict(
    username="William",
    email="william@geraldo.io",
    password="random_pwd@",
)


@pytest.fixture
def create_data():
    def _create_data(model, data):
        if model.__name__ == User.__name__:
            return model.objects.create_user(**data)
        return model.objects.create(**data)

    return _create_data


@pytest.mark.django_db
def test_company_create(create_data):
    company = create_data(Company, COMPANY_DATA)
    assert Company.objects.count() == 1

    assert company.name == COMPANY_DATA["name"]
    assert company.document == COMPANY_DATA["document"]
    assert str(company) == COMPANY_DATA["name"]


@pytest.mark.django_db
def test_company_unique(create_data):
    create_data(Company, COMPANY_DATA)
    with pytest.raises(IntegrityError):
        create_data(Company, COMPANY_DATA)


@pytest.mark.django_db
def test_user_create(create_data):
    user = create_data(User, USER_DATA)
    assert User.objects.count() == 1
    assert user.username == USER_DATA["username"]
    assert user.email == USER_DATA["email"]
    assert user.password != USER_DATA["password"]
    assert user.is_buyer is False
    assert user.is_supplier is False
    assert str(user) == USER_DATA["username"]


@pytest.mark.django_db
def test_profile_create(create_data):
    company = CompanyFactory()
    user = UserFactory()

    Profile.objects.create(
        user=user,
        company=company,
        bio="Random text",
    )

    assert Profile.objects.count() == 1
    profile = Profile.objects.first()
    assert str(profile) == f"{profile.pk} - {profile.user.username}"


@pytest.mark.django_db
def test_profile_unique(create_data):
    company = create_data(Company, COMPANY_DATA)
    user = create_data(User, USER_DATA)

    Profile.objects.create(
        user=user,
        company=company,
        bio="Random text",
    )

    with pytest.raises(IntegrityError):
        Profile.objects.create(
            user=user,
            company=company,
            bio="Random text",
        )
