# from django.db import models

# class Product(models.Model):
#     product_name = models.CharField(max_length=500)  # Name of the product
#     image_url = models.URLField()                     # URL of the product image
#     mrp = models.DecimalField(max_digits=10, decimal_places=2)  # Maximum Retail Price
#     discounted_price = models.DecimalField(max_digits=10, decimal_places=2)  # Discounted Price
#     product_count = models.DecimalField(max_digits=10, decimal_places=2)  # Count of products available
#     category_name = models.CharField(max_length=200)  # Category name as a string

#     def __str__(self):
#         return self.product_name  # Returns the product name when object is printed

# from django.db import models

# class Product(models.Model):
#     product_id = models.AutoField(primary_key=True)  # Automatically incrementing primary key
#     product_name = models.CharField(max_length=500)
#     image_url = models.URLField()
#     mrp = models.DecimalField(max_digits=10, decimal_places=2)
#     discounted_price = models.DecimalField(max_digits=10, decimal_places=2)
#     product_count = models.DecimalField(max_digits=10, decimal_places=2)
#     category_name = models.CharField(max_length=200)
#     description = models.CharField(max_length=1000)
#     tags = models.CharField(max_length=255)

#     def __str__(self):
#         return self.product_name  # Returns the product name when object is printed



from django.db import models

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)  
    product_name = models.CharField(max_length=500)
    image_url = models.URLField()
    mrp = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2)
    product_count = models.DecimalField(max_digits=10, decimal_places=2)
    category_name = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    tags = models.CharField(max_length=255)

    def __str__(self):
        return self.product_name
