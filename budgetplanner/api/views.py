from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Transaction
from .serializers import TransactionSerializer


# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/transactions',
            'Method': 'GET',
            'body': None,
            'description': 'Returns an array of transactions'
        }
    ]
    return Response(routes)


@api_view(['GET'])
def getTransactions(request):
    transactions = Transaction.objects.all()
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTransaction(request, id):
    transactions = Transaction.objects.get(id=id)
    serializer = TransactionSerializer(transactions, many=False)
    return Response(serializer.data)
