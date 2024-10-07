
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .elastic_search import search_products
import re

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

# from rest_framework.response import Response


# @api_view(['GET'])
# def search_view(request):
#     query = request.GET.get('q')
#     results = search_products(query)
#     data = [{
#         'product_name': hit.product_name,
#         'category_name': hit.category_name,
#         'discounted_price': hit.discounted_price,
#         'mrp': hit.mrp,
#         'product_count': hit.product_count
#     } for hit in results]
#     return Response(data)

@api_view(['GET'])
def search_view(request):
    query = request.GET.get('q', '')  # Get the search query from the request
    if not query:
        return Response({'error': 'No query provided'}, status=status.HTTP_400_BAD_REQUEST)

    results = search_products(query)

    # Prepare the data to return
    data = [{
        'product_name': hit.product_name,
        'category_name': hit.category_name,
        'discounted_price': hit.discounted_price,
        'mrp': hit.mrp,
        'product_count': hit.product_count,
        'image_url' : hit.image_url
    } for hit in results]

    return Response(data)



from django.http import JsonResponse
from django.core.management import call_command
from io import StringIO

# def get_products(request):
    
#     output = StringIO()
    
#     call_command('sync_elasticsearch', stdout=output)
    
#     products_output = output.getvalue()
    
#     return JsonResponse({'message': products_output})

def get_products(request):
    output = StringIO()
    call_command('sync_elasticsearch', stdout=output)  # Sync your MySQL products to Elasticsearch
    products_output = output.getvalue()
    return JsonResponse({'message': products_output})