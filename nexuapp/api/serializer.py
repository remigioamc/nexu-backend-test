from rest_framework import serializers
from nexuapp.models import Brand, Model

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id','name']

class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = ['name', 'average_price', 'brand']

    