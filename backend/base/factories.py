import factory

from base.models import User, Company, Profile


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ("username",)

    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    username = factory.LazyAttribute(lambda x: f"{x.first_name}_{x.last_name}")
    email = factory.LazyAttribute(lambda x: f"{x.username}@mail.com")
    is_staff = False
    is_active = True
    is_buyer = factory.Iterator([True, False])
    is_supplier = factory.Iterator([True, False])
    is_manager = factory.Iterator([True, False])


class CompanyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Company
        django_get_or_create = ("document",)

    name = factory.Faker("company")
    document = factory.Faker("ssn")


class ProfileFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Profile
        django_get_or_create = (
            "company",
            "user",
        )

    company = factory.SubFactory(CompanyFactory)
    user = factory.SubFactory(UserFactory)
    photo = factory.django.ImageField(color="blue")
    bio = factory.Faker("paragraph")


def prepare_data(rows=10):
    if Company.objects.count() == 0:
        CompanyFactory.create_batch(1)

    UserFactory.create_batch(rows)
    ProfileFactory.create_batch(rows)
