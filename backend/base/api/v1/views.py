from rest_framework import viewsets

from base.api.v1.serializers import (
    CompanySerializerV1,
    UserSerializerV1,
    ProfileSerializerV1,
)
from base.models import Company, User, Profile


class BaseViewSetV1(viewsets.ModelViewSet):
    ordering_fields = "__all__"

    def list(self, request, *args, **kwargs):
        if bool(self.request.query_params.get("all", False)):
            self.pagination_class = None

        return super().list(request, *args, **kwargs)


class CompanyViewSetV1(BaseViewSetV1):
    serializer_class = CompanySerializerV1
    queryset = Company.objects.all()


class UserViewSetV1(BaseViewSetV1):
    serializer_class = UserSerializerV1
    queryset = User.objects.all()


class ProfileViewSetV1(BaseViewSetV1):
    serializer_class = ProfileSerializerV1
    queryset = Profile.objects.all()
