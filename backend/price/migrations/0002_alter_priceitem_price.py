# Generated by Django 5.0.1 on 2024-01-31 19:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("price", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="priceitem",
            name="price",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="price_items",
                to="price.price",
                verbose_name="Price",
            ),
        ),
    ]
