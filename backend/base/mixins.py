import uuid

from django.db import models


class BaseModelMixin(models.Model):
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        abstract = True


class UUIDIDMixin(BaseModelMixin):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True,
    )

    class Meta:
        abstract = True


class BaseModelCompanyMixin(BaseModelMixin):
    company = models.ForeignKey(
        "base.Company",
        on_delete=models.DO_NOTHING,
        related_name="+",
    )

    class Meta:
        abstract = True
