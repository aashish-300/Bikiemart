# Generated by Django 4.1.7 on 2023-03-19 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]