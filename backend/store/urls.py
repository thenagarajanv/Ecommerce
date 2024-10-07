from django.urls import path
from .views import search_view
from .views import ProductListCreateView, ProductDetailView, ProductByCategoryView
from .views import get_products 

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),  
    path('products/category/<str:category_name>/', ProductByCategoryView.as_view(), name='product-by-category'),  
    path('search/', search_view, name='search'),
    path('api/products/', get_products, name='get_products'),
]




