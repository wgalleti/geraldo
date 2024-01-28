from rest_framework import viewsets

from base.api.v1.serializers import (
    CompanySerializerV1,
    UserSerializerV1,
    ProfileSerializerV1,
)
from base.models import Company, User, Profile


class CompanyViewSetV1(viewsets.ModelViewSet):
    serializer_class = CompanySerializerV1
    queryset = Company.objects.all()


class UserViewSetV1(viewsets.ModelViewSet):
    serializer_class = UserSerializerV1
    queryset = User.objects.all()


class ProfileViewSetV1(viewsets.ModelViewSet):
    serializer_class = ProfileSerializerV1
    queryset = Profile.objects.all()
