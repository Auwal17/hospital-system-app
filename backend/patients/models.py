from django.db import models

class Patient(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    phone_number = models.CharField(max_length=15)
    blood_group = models.CharField(max_length=5, blank=True, null=True) # Optional field
    
    # Automatically records the exact date/time they were registered
    registration_date = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"{self.first_name} {self.last_name}"