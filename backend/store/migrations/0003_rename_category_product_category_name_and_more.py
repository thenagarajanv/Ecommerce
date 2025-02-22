# Generated by Django 5.1.1 on 2024-09-27 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_alter_product_category_delete_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='category',
            new_name='category_name',
        ),
        migrations.AlterField(
            model_name='product',
            name='product_count',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='product_name',
            field=models.CharField(max_length=500),
        ),
    ]
