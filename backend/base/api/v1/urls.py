from rest_framework.routers import DefaultRouter

from base.api.v1.views import CompanyViewSetV1, UserViewSetV1, ProfileViewSetV1

router = DefaultRouter()
router.register(r"companies", CompanyViewSetV1)
router.register(r"users", UserViewSetV1)
router.register(r"profiles", ProfileViewSetV1)

urlpatterns = router.urls
