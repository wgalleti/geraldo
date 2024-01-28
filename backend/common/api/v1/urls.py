from rest_framework import routers

from common.api.v1.views import (
    PaymentViewSetV1,
    UnityViewSetV1,
    ProductViewSetV1,
    BuyerViewSetV1,
    SupplierViewSetV1,
)

router = routers.DefaultRouter()
router.register(r"payments", PaymentViewSetV1)
router.register(r"unities", UnityViewSetV1)
router.register(r"products", ProductViewSetV1)
router.register(r"buyers", BuyerViewSetV1)
router.register(r"suppliers", SupplierViewSetV1)

urlpatterns = router.urls
