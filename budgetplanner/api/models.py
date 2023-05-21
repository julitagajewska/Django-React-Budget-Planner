from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from PIL import Image


class Profile(models.Model):  # Użytkownik
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')
    wallets = models.ManyToManyField('Wallet')  # many to many

    def __str__(self):
        return f'{self.user.username} Profile'  # Wypisuje username

    def save(self, *args, **kwargs):  # resize
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)


class Wallet(models.Model):  # Portfel
    users = models.ManyToManyField(User)  # many to many
    categories = models.ManyToManyField('Category', blank=True)  # many to many
    name = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.name

# Kategoria


class Category(models.Model):
    wallets = models.ManyToManyField(Wallet, blank=True)  # many to many
    name = models.CharField(max_length=50)
    category_type = models.ForeignKey(
        'CategoryType', on_delete=models.CASCADE)  # jeden do wielu

    def __str__(self):
        return self.name

# Typ Kategorii( Czy do transakcji przychodzącej czy wychodzącej)


class CategoryType(models.Model):
    INCOMING = 'incoming'
    OUTGOING = 'outgoing'
    WALLET = 'Wallet'
    NAME_CHOICES = [
        (INCOMING, 'Incoming'),
        (OUTGOING, 'Outgoing'),
        (WALLET, 'Wallet')
    ]
    name = models.CharField(max_length=50, choices=NAME_CHOICES)

    def __str__(self):
        return self.name

# Transakcja


class Transaction(models.Model):
    wallet = models.ForeignKey(
        Wallet, on_delete=models.CASCADE)  # jeden do wielu
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE)  # jeden do wielu
    transaction_type = models.ForeignKey(
        'TransactionType', on_delete=models.CASCADE)  # jeden do wielu
    value = models.DecimalField(max_digits=100, decimal_places=2)
    description = models.CharField(max_length=250)
    recipient = models.CharField(max_length=30)  # odbiorca
    # automatycznie bierze czas systemowy
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.value} transaction made on {self.date} to {self.recipient}"

# Typ transakcji( przychodząca/ wychodząca)


class TransactionType(models.Model):
    INCOMING = 'incoming'
    OUTGOING = 'outgoing'
    NAME_CHOICES = [
        (INCOMING, 'Incoming'),
        (OUTGOING, 'Outgoing')
    ]
    name = models.CharField(max_length=50, choices=NAME_CHOICES)

    def __str__(self):
        return self.name
