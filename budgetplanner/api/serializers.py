from rest_framework.serializers import ModelSerializer, CharField
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from users.models import CustomUser, Wallet, Transaction, TransactionCategory

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
        # password2 = self.validated_data['password2']

        # if password != password2:
        #     raise ValidationError({'password': 'Passwords must match'})

        # try:
        #     validate_password(
        #         password=self.validated_data['password'], user=account)
        # except ValidationError as err:
        #     raise ValidationError({'password': err.messages})

        account.set_password(password)
        account.save()
        return account

# class CategorySerializer(ModelSerializer):
#     class Meta:
#         model = Category
#         fields = '__all__'
