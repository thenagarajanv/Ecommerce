# # store/urls.py
# from django.urls import path
# from .views import ProductListCreate, ProductDetail, ProductByCategory

# urlpatterns = [
#     path('product/', ProductListCreate.as_view(), name='product-list-create'),
#     path('product/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
#     path('product/category/<int:category_id>/', ProductByCategory.as_view(), name='products-by-category'),
# ]

# store/urls.py
# from django.urls import path
# from .views import ProductListCreateView

# urlpatterns = [
#     path('products/', ProductListCreateView.as_view(), name='product-list-create'),
# ]


# store/urls.py
from django.urls import path
from .views import search_view
from .views import ProductListCreateView, ProductDetailView, ProductByCategoryView
from .views import get_products 

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),  # Retrieve, update, delete by ID
    path('products/category/<str:category_name>/', ProductByCategoryView.as_view(), name='product-by-category'),  # Get by category
    path('search/', search_view, name='search'),
    path('api/products/', get_products, name='get_products'),
]




