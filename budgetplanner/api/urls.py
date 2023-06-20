from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('register', views.registerUser, name="register"),
    path('user/<str:username>', views.getUser),
    path('user/id/<str:pk>', views.getUserById),

    path('wallets/', views.getUsersWallets),
    path('wallets/<str:pk>', views.getWalletById),
    path('wallet/transactions/<str:pk>', views.getWalletsTransactions),
    path('wallet/transaction_categories/<str:pk>',
         views.getWalletsTransactionCategories),

    path('transactions/create', views.createTransaction),
    path('transactions/edit/<str:pk>', views.editTransaction),
    path('transactions/delete/<str:pk>', views.deleteTransaction),

    path('categories/create', views.createCategory),
    path('categories/edit/<str:pk>', views.editCategory),
    path('categories/delete/<str:pk>', views.deleteCategory),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('wallets/categories/all', views.getAllWalletsCategories),
]
