# from django.core.management.base import BaseCommand
# from elasticsearch import Elasticsearch

# class Command(BaseCommand):
#     help = 'Retrieve all indexed products from Elasticsearch and store them in an array'

#     def handle(self, *args, **kwargs):
#         es = Elasticsearch(['http://localhost:9200/'])

#         # Define the index and search parameters
#         index_name = 'products'  # Replace with your actual index name
#         search_body = {
#             "query": {
#                 "match_all": {}
#             }
#         }

#         # Execute the search query
#         res = es.search(index=index_name, body=search_body, size=10000)  # Adjust size as needed

#         # Store the results in an array
#         products_array = []
#         for hit in res['hits']['hits']:
#             products_array.append(hit['_source'])

#         # Optionally print the results or use the array as needed
#         for product in products_array:
#             self.stdout.write(self.style.SUCCESS(str(product)))

#         self.stdout.write(self.style.SUCCESS(f'Successfully retrieved {len(products_array)} products from Elasticsearch'))


# your_app/management/commands/sync_products.py

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
