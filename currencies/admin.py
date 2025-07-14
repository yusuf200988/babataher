from django.contrib import admin

from .models import Currency


@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = ['title', 'current_price', 'last_price', 'updated_time']
    search_fields = ['title']