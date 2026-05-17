from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        # This tells Django to convert ALL columns in the database into JSON
        fields = '__all__'