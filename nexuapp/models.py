from django.db import models
from django.utils import timezone

# Aquí vamos a crear nuestros modelos 
# Modelo para Brands
class Brand(models.Model):
    #Atributos
    name = models.CharField(max_length=100)

    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)

    #Para que nos muestre el nombre de la marca
    def __str__(self):
        return self.name
    
# Modelo para Models
class Model(models.Model):
    name = models.CharField(max_length=100)
    average_price = models.IntegerField()
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)

    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)

    #Para que nos muestre el nombre de la marca, precio y marca
    def __str__(self):
        return f"Model: {self.name} - ${self.average_price} - Brand: {self.brand}"