import re

from elasticsearch_dsl import Document, Text, Float, Integer, connections

connections.create_connection(hosts=['http://localhost:9200/'])

class ProductIndex(Document):
    product_name = Text()
    category_name = Text()
    discounted_price = Float()
    mrp = Float()
    product_count = Integer()
    image_url = Text()  
    class Index:
        name = 'products'  

def index_product(product):
    product_doc = ProductIndex(
        product_name=product.product_name,
        category_name=product.category_name,
        discounted_price=product.discounted_price,
        mrp=product.mrp,
        product_count=product.product_count,
        image_url=product.image_url  
    )
    product_doc.save()

def search_products(query):
    price_range = {
        'min': None,
        'max': None
    }

    if 'under' in query:
        match = re.search(r'under\s*(\d+)', query)
        if match:
            price_range['max'] = float(match.group(1))
            query = query.replace(match.group(0), '').strip() 
    if 'below' in query:
        match = re.search(r'below\s*(\d+)', query)
        if match:
            price_range['max'] = float(match.group(1))
            query = query.replace(match.group(0), '').strip()  
    if 'above' in query:
        match = re.search(r'above\s*(\d+)', query)
        if match:
            price_range['min'] = float(match.group(1))
            query = query.replace(match.group(0), '').strip()

    search = ProductIndex.search()
    
    if query:
        search = search.query("multi_match", query=query, fields=['product_name', 'category_name', 'description', 'tags'])

    if price_range['max'] is not None:
        search = search.filter("range", discounted_price={"lt": price_range['max']})
    if price_range['min'] is not None:
        search = search.filter("range", discounted_price={"gt": price_range['min']})

    return search.execute()
