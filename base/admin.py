from django.contrib import admin
from .models import *
# class AdminProduct(admin.ModelAdmin):
#     list_display = ['name', 'image', 'brand', 'category', 'countInStock']




# Register your models here.
    
     
admin.site.register(Product)





# admin.site.register(Order)
# admin.site.register(OrderItem)
# admin.site.register(ShippingAddress)
