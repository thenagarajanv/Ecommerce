# # store/views.py
# from rest_framework import generics
# from .models import Product
# from .serializers import ProductSerializer

# class ProductListCreate(generics.ListCreateAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer


# class ProductDetail(generics.RetrieveAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer


# class ProductByCategory(generics.ListAPIView):
#     serializer_class = ProductSerializer

# store/views.py
# from rest_framework import generics
# from .models import Product
# from .serializers import ProductSerializer

# class ProductListCreateView(generics.ListCreateAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
# store/views.py

from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductByCategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_name = self.kwargs['category_name']
        return Product.objects.filter(category_name=category_name)

