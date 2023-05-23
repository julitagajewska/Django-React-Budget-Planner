from rest_framework.serializers import ModelSerializer
from .models import Category, Wallet, Transaction
# from .models import Transaction


# class TransactionSerializer(ModelSerializer):
#     class Meta:
#         model = Transaction
#         fields = '__all__'

class WalletsSerializer(ModelSerializer):
    class Meta:
        model = Wallet
        fields = '__all__'


class TransactionsSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
