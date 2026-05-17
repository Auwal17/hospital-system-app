from django.contrib import admin
from .models import CustomUser

# This single line adds our custom table to the visual dashboard
admin.site.register(CustomUser)