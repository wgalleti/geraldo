from rest_framework import routers

from price.api.v1.views import (
    PriceViewSetV1,
    PriceItemViewSetV1,
)

router = routers.DefaultRouter()
router.register("v1/prices", PriceViewSetV1)
router.register("v1/price-items", PriceItemViewSetV1)

urlpatterns = router.urls
