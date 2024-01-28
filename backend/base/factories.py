from model_bakery import baker

from base.models import User, Company, Profile


class BaseFactory:
    def __new__(cls, *args, **kwargs):
        return cls.create(**kwargs)

    @classmethod
    def create(cls, **kwargs):
        obj = baker.make(cls.Meta.model, **kwargs)
        cls.post_create(obj)
        return obj

    @classmethod
    def post_create(cls, obj):
        pass

    class Meta:
        abstract = True
        model = None


class UserFactory(BaseFactory):
    class Meta:
        model = User


class CompanyFactory(BaseFactory):
    class Meta:
        model = Company


class ProfileFactory(BaseFactory):
    class Meta:
        model = Profile
