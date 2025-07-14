from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ['name', 'phone_number', 'is_staff']
    search_fields = ['name']
    ordering = ['phone_number']

    fieldsets = (
        (None, {'fields': ('phone_number', 'password')}),
        ('Personal information', {'fields': ('name', 'avatar')}),
        ('Premissions', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone_number', 'name', 'avatar', 'password1', 'password2'),
        }),
    )