from rest_framework.routers import DefaultRouter

from base.api.v1.views import CompanyViewSetV1, UserViewSetV1, ProfileViewSetV1

router = DefaultRouter()
router.register(r"v1/companies", CompanyViewSetV1)
router.register(r"v1/users", UserViewSetV1)
router.register(r"v1/profiles", ProfileViewSetV1)

urlpatterns = router.urls
