from django.contrib import admin
from django import forms
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField

# Register your models here.
from .models import CustomUser, Wallet, WalletCategory, OperationType, TransactionCategory, Transaction

admin.site.register(Wallet)
admin.site.register(WalletCategory)
admin.site.register(OperationType)
admin.site.register(TransactionCategory)
admin.site.register(Transaction)


class CustomUserAdmin(UserAdmin):
    fieldsets = (
        *UserAdmin.fieldsets,
        (
            'Wallets',
            {
                'fields': ('wallets', 'profile_picture')
            }
        )
    )


admin.site.register(CustomUser, CustomUserAdmin)
