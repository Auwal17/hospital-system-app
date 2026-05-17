from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet

# 1. Create the router
router = DefaultRouter()

# 2. Register our ViewSet with the router
router.register(r'patients', PatientViewSet)

# 3. Let the router automatically generate all the URL paths
urlpatterns = [
    path('', include(router.urls)),
]