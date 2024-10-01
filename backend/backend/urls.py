# # ecommerce/urls.py
# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include('store.urls')),
# ]

# backend/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('store/', include('store.urls')),  # Include your store app URLs
]
