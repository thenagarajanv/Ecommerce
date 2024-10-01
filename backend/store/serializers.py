# from rest_framework import serializers
# from .models import Product


# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'

# # store/serializers.py
# from rest_framework import serializers
# from .models import Product

# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = ['id', 'product_name', 'image_url', 'mrp', 'discounted_price', 'product_count', 'category_name']

# store/serializers.py
# from rest_framework import serializers
# from .models import Product

# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = ['id', 'product_name', 'image_url', 'mrp', 'discounted_price', 'product_count', 'category_name']

# store/serializers.py

from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'product_name', 'image_url', 'mrp', 'discounted_price', 'product_count', 'category_name', 'description', 'tags']
