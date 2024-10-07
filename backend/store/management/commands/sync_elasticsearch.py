from django.core.management.base import BaseCommand
from elasticsearch import Elasticsearch
from store.models import Product

class Command(BaseCommand):
    help = 'Sync all products from MySQL to Elasticsearch'

    def handle(self, *args, **kwargs):
        es = Elasticsearch(['http://localhost:9200'])

        if not es.ping():
            self.stdout.write(self.style.ERROR('Elasticsearch connection failed'))
            return

        products = Product.objects.all()
        if not products.exists():
            self.stdout.write(self.style.ERROR('No products found in MySQL'))
            return

        for product in products:
            doc = {
                'product_id': product.product_id,
                'product_name': product.product_name,
                'image_url': product.image_url,
                'mrp': product.mrp,
                'discounted_price': product.discounted_price,
                'product_count': product.product_count,
                'category_name': product.category_name,
                'description': product.description,
                'tags': product.tags,
            }

            # Try to index the document
            try:
                es.index(index='products', id=product.product_id, body=doc)
                self.stdout.write(self.style.SUCCESS(f'Indexed product: {product.product_name}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error indexing {product.product_name}: {str(e)}'))

        self.stdout.write(self.style.SUCCESS('Successfully synced products to Elasticsearch'))
