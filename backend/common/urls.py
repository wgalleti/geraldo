from rest_framework import routers

from common.api.v1.views import (
    PaymentViewSetV1,
    UnityViewSetV1,
    ProductViewSetV1,
    BuyerViewSetV1,
    SupplierViewSetV1,
)

router = routers.DefaultRouter()
router.register(r"v1/payments", PaymentViewSetV1)
router.register(r"v1/unities", UnityViewSetV1)
router.register(r"v1/products", ProductViewSetV1)
router.register(r"v1/buyers", BuyerViewSetV1)
router.register(r"v1/suppliers", SupplierViewSetV1)

urlpatterns = router.urls
