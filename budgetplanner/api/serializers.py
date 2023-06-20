from rest_framework.serializers import ModelSerializer, CharField
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from users.models import CustomUser, Wallet, Transaction, TransactionCategory, OperationType

# class TransactionSerializer(ModelSerializer):
#     class Meta:
#         model = Transaction
#         fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'wallets', 'profile_picture']


class WalletsSerializer(ModelSerializer):
    class Meta:
        model = Wallet
        fields = '__all__'


class TransactionSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'


class TransactionCategoriesSerializer(ModelSerializer):
    class Meta:
        model = TransactionCategory
        fields = '__all__'

    # def validate(self, data):
    #     name = data.get('name')
    #     wallet = Wallet.objects.get(id=data['wallet'].id)
    #     operationType = OperationType.objects.get(
    #         id=data['operationType'].id)

    #     if TransactionCategory.objects.filter(name=name, wallet=wallet, operationType=operationType).exists():
    #         raise ValidationError({'category': 'Category already exists'})
    #     return data

    # def update(self, instance, validated_data):
    #     print(self.validated_data['wallet'])
    #     instance.name = self.validated_data['name'],
    #     instance.wallet = self.validated_data['wallet'],
    #     instance.operationType = self.validated_data['operationType'],
    #     instance.save()
    #     return instance

    # def save(self):
    #     category = TransactionCategory(
    #         name=self.validated_data['name'],
    #         wallet=self.validated_data['wallet'],
    #         operationType=self.validated_data['operationType'],
    #     )

    #     category.save()
    #     return category


class RegisterSerializer(ModelSerializer):

    password2 = CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        password = data.get('password')
        password2 = data.get('password2')

        if password != password2:
            raise ValidationError({'password': 'Passwords must match'})

        try:
            validate_password(password=password, user=self.instance)
        except ValidationError as err:
            raise ValidationError({'password': err.messages})

        return data

    def save(self):
        account = CustomUser(
            username=self.validated_data['username'],
            email=self.validated_data['email']
        )
        password = self.validated_data['password']

        account.set_password(password)

        account.save()
        return account
