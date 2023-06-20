import json
from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal

# from .models import Transaction
# from .serializers import TransactionSerializer

from .serializers import TransactionCategoriesSerializer, TransactionSerializer, UserSerializer, WalletsSerializer, RegisterSerializer
from users.models import CustomUser, Wallet, TransactionCategory, Transaction, OperationType

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Q


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)

# Views for retreiving database data

# USERS


@api_view(['POST'])
def registerUser(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = "Successfully registered a new user"
            data['email'] = account.email
            data['username'] = account.username
            return Response(data)
        else:
            return Response(serializer.errors, status=400)


# TRANSACTIONS


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTransaction(request):
    data = request.data
    wallet = Wallet.objects.get(id=data['walletID'])
    operationType = OperationType.objects.get(id=data['operationTypeID'])
    category = TransactionCategory.objects.get(id=data['categoryID'])
    transaction = Transaction.objects.create(
        name=data['name'],
        value=data['value'],
        description=data['description'],
        recipient=data['recipient'],
        date=data['date'],
        wallet=wallet,
        operationType=operationType,
        category=category
    )

    if (operationType.id == 1):
        wallet.balance = wallet.balance - \
            Decimal(transaction.value.replace(',', '.'))
    else:
        wallet.balance = wallet.balance + \
            Decimal(transaction.value.replace(',', '.'))

    wallet.save()
    transaction.save()

    serializer = TransactionSerializer(transaction, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editTransaction(request, pk):
    data = request.data
    transaction = Transaction.objects.get(id=pk)

    wallet = Wallet.objects.get(id=data['walletID'])
    operationType = OperationType.objects.get(id=data['operationTypeID'])
    category = TransactionCategory.objects.get(id=data['categoryID'])

    transaction.name = data['name']
    transaction.value = data['value']
    transaction.description = data['description']
    transaction.recipient = data['recipient']
    transaction.date = data['date']
    transaction.wallet = wallet
    transaction.operationType = operationType
    transaction.category = category

    transaction.save()
    if (operationType.id == 1):
        wallet.balance = wallet.balance - \
            Decimal(transaction.value.replace(',', '.'))
    else:
        wallet.balance = wallet.balance + \
            Decimal(transaction.value.replace(',', '.'))

    wallet.save()

    serializer = TransactionSerializer(transaction, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTransaction(request, pk):

    transaction = Transaction.objects.get(id=pk)
    wallet = Wallet.objects.get(id=transaction.wallet.id)
    print(wallet)

    if (transaction.operationType.id == 1):
        wallet.balance = wallet.balance + transaction.value
    else:
        wallet.balance = wallet.balance - transaction.value

    wallet.save()
    transaction.delete()
    return Response('Transaction deleted')

# WALLETS


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsersWallets(request):
    user = request.user
    wallets = user.wallet_set.all()
    serializer = WalletsSerializer(wallets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWalletById(request, pk):
    user = request.user
    wallets = user.wallet_set.all().get(id=pk)
    serializer = WalletsSerializer(wallets, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWalletsTransactions(request, pk):
    wallet = Wallet.objects.get(id=pk)
    transactions = wallet.transaction_set.all()
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWalletsTransactionCategories(request, pk):
    wallet = Wallet.objects.get(id=pk)
    transactionCategories = TransactionCategory.objects.all().filter(wallet_id=wallet.id)
    serializer = TransactionCategoriesSerializer(
        transactionCategories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request, username):
    user = CustomUser.objects.get(username=username)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# Categories
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCategory(request):
    data = request.data
    wallet = Wallet.objects.get(id=data['wallet'])
    operationType = OperationType.objects.get(id=data['operationType'])
    transaction = TransactionCategory.objects.create(
        name=data['name'],
        wallet=wallet,
        operationType=operationType,
    )

    wallet.save()
    transaction.save()

    serializer = TransactionCategoriesSerializer(transaction, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
# @permission_classes([IsAuthenticated])
def editCategory(request, pk):
    data = request.data
    category = TransactionCategory.objects.get(id=pk)

    wallet = Wallet.objects.get(id=data['wallet'])
    operationType = OperationType.objects.get(id=data['operationType'])

    category.name = data['name']
    category.wallet = wallet
    category.operationType = operationType

    category.save()
    wallet.save()

    serializer = TransactionCategoriesSerializer(category, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteCategory(request, pk):
    category = TransactionCategory.objects.get(id=pk)
    category.delete()
    return Response('Category deleted')


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getWalletsCategories(request, pk):
#     print(request)
#     wallet = Wallet.objects.get(id=3)

#     category = Category.objects.get(id=4)

#     categoryWallets = category.wallets.all()

#     walletsTransactionCategories = Category.objects.all().filter(
#         wallet=3)

#     walletCategories = wallet.categories.all()

#     print('Category wallets -----------------------------')
#     print(walletCategories)

#     serializer = CategorySerializer(categoryWallets, many=True)
#     return Response(serializer.data)


# # @api_view(['GET'])
# # def getRoutes(request):
# #     routes = [
# #         {
# #             'Endpoint': '/api/token',
# #             'Method': 'GET',
# #             'body': None,
# #             'description': 'Get tokens'
# #         },
# #         {
# #             'Endpoint': '/api/token/refresh',
# #             'Method': 'GET',
# #             'body': None,
# #             'description': 'Refresh tokens'
# #         },
# #         {
# #             'Endpoint': '/transactions',
# #             'Method': 'GET',
# #             'body': None,
# #             'description': 'Returns an array of transactions'
# #         }
# #     ]
# #     return Response(routes)


# # @api_view(['GET'])
# # def getTransactions(request):
# #     transactions = Transaction.objects.all()
# #     serializer = TransactionSerializer(transactions, many=True)
# #     return Response(serializer.data)


# # @api_view(['GET'])
# # def getTransaction(request, id):
# #     transactions = Transaction.objects.get(id=id)
# #     serializer = TransactionSerializer(transactions, many=False)
# #     return Response(serializer.data)
