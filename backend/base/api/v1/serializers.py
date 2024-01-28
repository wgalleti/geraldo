from rest_framework import serializers

from base.models import Company, User, Profile


class CompanySerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class UserSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class ProfileSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
