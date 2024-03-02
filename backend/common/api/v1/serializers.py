from base.api.v1.serializers import BaseNotERPSerializerV1, BaseCompanySerializerV1
from common.models import (
    Payment,
    Unity,
    Product,
    Buyer,
    Supplier,
    ProductGroup,
)


class PaymentSerializerV1(BaseNotERPSerializerV1, BaseCompanySerializerV1):
    class Meta:
        model = Payment
        fields = "__all__"


class UnitySerializerV1(BaseNotERPSerializerV1, BaseCompanySerializerV1):
    class Meta:
        model = Unity
        fields = "__all__"


class ProductGroupSerializerV1(BaseNotERPSerializerV1, BaseCompanySerializerV1):
    class Meta:
        model = ProductGroup
        fields = "__all__"


class ProductSerializerV1(BaseNotERPSerializerV1, BaseCompanySerializerV1):
    class Meta:
        model = Product
        fields = "__all__"


class BuyerSerializerV1(BaseNotERPSerializerV1, BaseCompanySerializerV1):
    class Meta:
        model = Buyer
        fields = "__all__"


class SupplierSerializerV1(BaseNotERPSerializerV1, BaseCompanySerializerV1):
    class Meta:
        model = Supplier
        fields = "__all__"
