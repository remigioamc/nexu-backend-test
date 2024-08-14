from django.contrib import admin
from .models import Brand, Model

# Vamos a registrar los modelos
admin.site.register(Brand)
admin.site.register(Model)

