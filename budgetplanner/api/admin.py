from django.contrib import admin
from .models import Profile, Wallet, Category, CategoryType, Transaction, TransactionType

admin.site.register(Profile)
admin.site.register(Wallet)
admin.site.register(Category)
admin.site.register(CategoryType)
admin.site.register(Transaction)
admin.site.register(TransactionType)
