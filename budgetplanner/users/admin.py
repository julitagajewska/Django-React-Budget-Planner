from django.contrib import admin
from django import forms
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField

# Register your models here.
from .models import CustomUser, Wallet, WalletCategory, OperationType, TransactionCategory, Transaction

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


class TransactionCategoryAdminInline(admin.TabularInline):
    model = TransactionCategory


class TransactionsInlineFormSet(forms.BaseInlineFormSet):
    def clean(self):
        super(TransactionsInlineFormSet, self).clean()


class TransactionForm(forms.ModelForm):
    class Meta:
        model = Transaction
        fields = '__all__'

    # def __init__(self, *args, **kwargs):
    #     super(TransactionForm, self).__init__(*args, **kwargs)
        # self.base_fields["category"].queryset = TransactionCategory.objects.filter(
        #     wallet_id=self.wallet.id)


TransactionFormSet = forms.inlineformset_factory(
    Wallet,
    Transaction,
    form=TransactionForm,
    extra=0
)


class WalletsTransactionsAdminInline(admin.TabularInline):
    model = Transaction
    formset = TransactionFormSet

    def get_formset(self, request, obj=None, **kwargs):
        formset_class = super().get_formset(request, obj, **kwargs)
        formset_class.form.base_fields['category'].queryset = TransactionCategory.objects.filter(
            wallet_id=obj.id)
        return formset_class


class WalletAdmin(admin.ModelAdmin):
    fields = ['name', 'users', 'categories', 'balance']
    inlines = (TransactionCategoryAdminInline, WalletsTransactionsAdminInline)


admin.site.register(Wallet, WalletAdmin)


# def categoryform_factory(wallet_id, operationType_id):
#     class CategoryForm(forms.ModelForm):
#         category = forms.ModelChoiceField(queryset=TransactionCategory.objects.filter(
#             wallet_id=wallet_id, operationType_id=operationType_id))

#     return CategoryForm


# class TransactionForm(forms.ModelForm):
#     class Meta:
#         model = Transaction
#         fields = '__all__'

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         wallet_id = self.data.get('wallet')
#         operation_type_id = self.data.get('operationType')

#         categories = TransactionCategory.objects.filter(
#             wallet_id=wallet_id, operationType_id=operation_type_id)

#         self.fields['category'].queryset = categories


# class TransactionAdmin(admin.ModelAdmin):
#     form = TransactionForm


# admin.site.register(Transaction, TransactionAdmin)
