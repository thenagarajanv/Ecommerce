from elasticsearch_dsl import Document, Text, Float, Integer, connections

# Define an Elasticsearch connection
connections.create_connection(hosts=['http://localhost:9200/'])

class ProductIndex(Document):
    product_name = Text()
    category_name = Text()
    discounted_price = Float()
    mrp = Float()
    product_count = Integer()

    class Index:
        name = 'products'

def index_product(product):
    product_doc = ProductIndex(
        product_name=product.product_name,
        category_name=product.category_name,
        discounted_price=product.discounted_price,
        mrp=product.mrp,
        product_count=product.product_count
    )
    product_doc.save()

def search_products(query):
    search = ProductIndex.search().query("multi_match", query=query, fields=['product_name', 'category_name'])
    return search.execute()
