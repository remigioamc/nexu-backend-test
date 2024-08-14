from django.shortcuts import render
from django.http import HttpResponse
from .models import Brand

# Create your views here.
# Vamos a definir una función que va a recibir un parametro el request del usuario
def index(request):
    brands = Brand.objects.all()
    
    return HttpResponse('Hola!')