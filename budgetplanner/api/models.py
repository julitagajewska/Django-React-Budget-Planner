from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from PIL import Image


# # Wallet
# class Wallet(models.Model):
#     users = models.ManyToManyField(CustomUser)
#     categories = models.ManyToManyField('WalletCategory', blank=True)
#     name = models.CharField(max_length=50)
#     balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)

#     def __str__(self):
#         return self.name


# class WalletCategory(models.Model):
#     name = models.CharField(max_length=50)


# class OperationType(models.Model):
#     TYPE = (
#         ('income', 'income'),
#         ('expense', 'expense')
#     )

#     status = models.CharField(max_length=100, choices=TYPE, default='expense')


# class TransactionCategory(models.Model):
#     name = models.CharField(max_length=50)
#     operationType = models.ForeignKey(OperationType, on_delete=models.CASCADE)
#     wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
#     operationType = models.ForeignKey(OperationType, on_delete=models.CASCADE)


# class Transaction(models.Model):
#     name = models.CharField(max_length=50)
#     value = models.DecimalField(max_digits=100, decimal_places=2)
#     description = models.CharField(max_length=250)
#     recipient = models.CharField(max_length=30)
#     date = models.DateTimeField(auto_now_add=False)
#     wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
#     category = models.ForeignKey(TransactionCategory, on_delete=models.CASCADE)
#     operationType = models.ForeignKey(OperationType, on_delete=models.CASCADE)

# class Profile(models.Model):  # Użytkownik
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     image = models.ImageField(default='default.jpg', upload_to='profile_pics')
#     wallets = models.ManyToManyField('Wallet')  # many to many

#     def __str__(self):
#         return f'{self.user.username} Profile'  # Wypisuje username

#     def save(self, *args, **kwargs):  # resize
#         super().save(*args, **kwargs)
#         img = Image.open(self.image.path)

#         if img.height > 300 or img.width > 300:
#             output_size = (300, 300)
#             img.thumbnail(output_size)
#             img.save(self.image.path)


# Kategoria


# TODO: WalletCategory
# ex. personal wallet, shared wallet, savings wallet
# Cannot be changed by a user

# TODO: TransactionCategory
# ex. food, education, transport, entertainment
# Can be modified by wallet owners

# class Category(models.Model):
#     wallets = models.ManyToManyField(Wallet, blank=True)  # many to many
#     name = models.CharField(max_length=50)
#     category_type = models.ForeignKey(
#         'CategoryType', on_delete=models.CASCADE)  # jeden do wielu

#     def __str__(self):
#         return self.name

# Typ Kategorii( Czy do transakcji przychodzącej czy wychodzącej)


# class CategoryType(models.Model):
#     INCOMING = 'incoming'
#     OUTGOING = 'outgoing'
#     WALLET = 'Wallet'
#     NAME_CHOICES = [
#         (INCOMING, 'Incoming'),
#         (OUTGOING, 'Outgoing'),
#         (WALLET, 'Wallet')
#     ]
#     name = models.CharField(max_length=50, choices=NAME_CHOICES)

#     def __str__(self):
#         return self.name

# # Transakcja


# class Transaction(models.Model):
#     wallet = models.ForeignKey(
#         Wallet, on_delete=models.CASCADE)  # jeden do wielu
#     category = models.ForeignKey(
#         Category, on_delete=models.CASCADE)  # jeden do wielu
#     transaction_type = models.ForeignKey(
#         'TransactionType', on_delete=models.CASCADE)  # jeden do wielu
#     value = models.DecimalField(max_digits=100, decimal_places=2)
#     description = models.CharField(max_length=250)
#     recipient = models.CharField(max_length=30)  # odbiorca
#     # automatycznie bierze czas systemowy
#     date = models.DateTimeField(auto_now_add=False)

#     def __str__(self):
#         return f"{self.value} transaction made on {self.date} to {self.recipient}"

# # Typ transakcji( przychodząca/ wychodząca)


# class TransactionType(models.Model):
#     INCOMING = 'incoming'
#     OUTGOING = 'outgoing'
#     NAME_CHOICES = [
#         (INCOMING, 'Incoming'),
#         (OUTGOING, 'Outgoing')
#     ]
#     name = models.CharField(max_length=50, choices=NAME_CHOICES)

#     def __str__(self):
#         return self.name
