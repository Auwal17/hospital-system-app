from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    # 1. Define the exact choices allowed for roles
    ROLE_CHOICES = (
        ('doctor', 'Doctor'),
        ('patient', 'Patient'),
        ('admin', 'Admin'),
    )
    
    # 2. Add a new 'role' column to the default User table
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='patient')

    def __str__(self):
        # This just makes it look pretty in the admin panel
        return f"{self.username} - {self.role}"