from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.conf import settings
from PIL import Image


class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('User must have an email address')
        if not username:
            raise ValueError('User must have an email address')
        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True

        user.set_password(password)
        user.save(using=self._db)
        return user


def get_profile_image_filepath(self, filename):
    return f'profile_images/{self.pk}/{"progfile_image.png"}'


def get_default_profile_image():
    return "default/default.png"


class CustomUser(AbstractUser):
    # username = models.CharField(max_length=30, unique=True)
    # date_joined = models.DateTimeField(
    #     verbose_name="date joined", auto_now_add=True)
    # last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    # is_admin = models.BooleanField(default=False)
    # is_active = models.BooleanField(default=True)
    # is_staff = models.BooleanField(default=False)
    # is_superuser = models.BooleanField(default=False)
    # hide_email = models.BooleanField(default=True)
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(
        default='default.jpg', upload_to='profile_pictures')
    wallets = models.ManyToManyField('Wallet', blank=True)

    # objects = MyAccountManager()

    # USERNAME_FIELD = 'username'
    # REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    # def get_profile_image_filename(self):
    #     return str(self.profile_image)[str(self.profile_picture).index(f'profile_pictures/{self.pk}/'):]

    # def has_perm(self, perm, obj=None):
    #     return self.is_admin

    # def has_module_perms(self, app_label):
    #     return True


class Wallet(models.Model):
    users = models.ManyToManyField(CustomUser)
    categories = models.ManyToManyField('WalletCategory', blank=True)
    name = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.name


class WalletCategory(models.Model):
    name = models.CharField(max_length=50)


class OperationType(models.Model):
    TYPE = (
        ('income', 'income'),
        ('expense', 'expense')
    )

    status = models.CharField(max_length=100, choices=TYPE, default='expense')


class TransactionCategory(models.Model):
    name = models.CharField(max_length=50)
    operationType = models.ForeignKey(OperationType, on_delete=models.CASCADE)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    operationType = models.ForeignKey(OperationType, on_delete=models.CASCADE)


class Transaction(models.Model):
    name = models.CharField(max_length=50)
    value = models.DecimalField(max_digits=100, decimal_places=2)
    description = models.CharField(max_length=250)
    recipient = models.CharField(max_length=30)
    date = models.DateTimeField(auto_now_add=False)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    category = models.ForeignKey(TransactionCategory, on_delete=models.CASCADE)
    operationType = models.ForeignKey(OperationType, on_delete=models.CASCADE)
