from django.core.management.base import BaseCommand
from elasticsearch import Elasticsearch
from your_app.models import Product
from your_app.documents import ProductDocument

class Command(BaseCommand):
    help = 'Sync products from MySQL to Elasticsearch'

    def handle(self, *args, **kwargs):
        es = Elasticsearch(['localhost:9200'])

        products = Product.objects.all()

        for product in products:
            doc = ProductDocument(
                id=product.id,
                product_name=product.product_name,
                category_name=product.category_name,
                image_url=product.image_url,
                mrp=product.mrp,
                discounted_price=product.discounted_price,
            )
            doc.save()  # Save to Elasticsearch

        self.stdout.write(self.style.SUCCESS('Successfully synced products to Elasticsearch'))
