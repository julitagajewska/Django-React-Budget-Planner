from rest_framework.serializers import ModelSerializer
from users.models import Wallet, Transaction, TransactionCategory

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


class TransactionCategoriesSerializer(ModelSerializer):
    class Meta:
        model = TransactionCategory
        fields = '__all__'


# class CategorySerializer(ModelSerializer):
#     class Meta:
#         model = Category
#         fields = '__all__'
