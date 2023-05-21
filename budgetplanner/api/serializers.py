from rest_framework.serializers import ModelSerializer
from .models import Wallet, Transaction
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
