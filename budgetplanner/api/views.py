from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# from .models import Transaction
# from .serializers import TransactionSerializer

from .serializers import TransactionCategoriesSerializer, TransactionsSerializer, WalletsSerializer
from users.models import Wallet, TransactionCategory

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsersWallets(request):
    user = request.user
    wallets = user.wallet_set.all()
    serializer = WalletsSerializer(wallets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWalletsTransactions(request, pk):
    wallet = Wallet.objects.get(id=pk)
    transactions = wallet.transaction_set.all()
    serializer = TransactionsSerializer(transactions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWalletsTransactionCategories(request, pk):
    wallet = Wallet.objects.get(id=pk)
    transactionCategories = TransactionCategory.objects.all().filter(wallet_id=wallet.id)
    serializer = TransactionCategoriesSerializer(
        transactionCategories, many=True)
    return Response(serializer.data)

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
