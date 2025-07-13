from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Currency
from .serializers import CurrencySerializer


class CurrencyListView(APIView):

    def get(self, req):
        id = req.query_params.get('id')
        if id:
            currencies = get_object_or_404(Currency, id=id)
            serializer = CurrencySerializer(currencies, context={'request':req})
            return Response(serializer.data)
        else:
            currencies = Currency.objects.all()
            serializer = CurrencySerializer(currencies, many=True, context={'request':req})
            return Response(serializer.data)
    
    def post(self, req):
        serializer = CurrencySerializer(data=req.data, context={'request':req})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, req):
        currency_id = req.query_params.get('id')
        currency = get_object_or_404(Currency, id=currency_id)
        currency.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
