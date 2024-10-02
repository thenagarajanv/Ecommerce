
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

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .elastic_search import search_products

@api_view(['GET'])
def search_view(request):
    query = request.GET.get('q')
    results = search_products(query)
    data = [{
        'product_name': hit.product_name,
        'category_name': hit.category_name,
        'discounted_price': hit.discounted_price,
        'mrp': hit.mrp,
        'product_count': hit.product_count
    } for hit in results]
    return Response(data)


from django.http import JsonResponse
from django.core.management import call_command
from io import StringIO

def get_products(request):
    # Create a StringIO object to capture the output of the command
    output = StringIO()
    
    # Call the command
    call_command('sync_elasticsearch', stdout=output)
    
    # Read the captured output
    products_output = output.getvalue()
    
    # Return the output as a JSON response
    return JsonResponse({'message': products_output})

