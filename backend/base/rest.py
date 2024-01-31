from collections import OrderedDict

from django.db.models import AutoField, CharField, ForeignKey
from rest_framework import pagination, response
from rest_framework.filters import SearchFilter


class CustomPagination(pagination.LimitOffsetPagination):
    limit_query_param = "take"
    offset_query_param = "skip"

    def get_paginated_response(self, data):
        return response.Response(OrderedDict([("total", self.count), ("data", data)]))


class CustomSearchFilter(SearchFilter):
    def get_search_fields(self, view, request):
        search_fields = getattr(view, "search_fields", None)

        if search_fields is not None:
            return search_fields

        search_fields = []
        for i in view.get_queryset().model._meta.get_fields():
            if isinstance(i, (CharField, AutoField, ForeignKey)):
                if isinstance(i, ForeignKey):
                    for j in i.related_model.objects.model._meta.get_fields():
                        if isinstance(j, (CharField, AutoField)):
                            search_fields.append(
                                f"{str(i).split('.')[-1]}__{str(j).split('.')[-1]}"
                            )
                else:
                    search_fields.append(f"{str(i).split('.')[-1]}")

        return search_fields
