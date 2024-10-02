# store/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from elasticsearch import Elasticsearch
from django.apps import apps

es = Elasticsearch(['http://localhost:9200'])

@receiver(post_save, sender='store.Product')  # Use string reference
def index_product(sender, instance, **kwargs):
    doc = {
        'product_id': instance.product_id,
        'product_name': instance.product_name,
        'image_url': instance.image_url,
        'mrp': instance.mrp,
        'discounted_price': instance.discounted_price,
        'product_count': instance.product_count,
        'category_name': instance.category_name,
        'description': instance.description,
        'tags': instance.tags,
    }
    es.index(index='products', id=instance.product_id, body=doc)
    print(f'Product {instance.product_name} indexed.')
