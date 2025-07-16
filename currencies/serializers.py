from rest_framework import serializers

from .models import Currency

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ['id', 'title', 'avatar', 'symbol', 'current_price', 'last_price', 'description', 'created_time', 'updated_time']