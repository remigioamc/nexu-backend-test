from rest_framework import viewsets
from nexuapp.models import Brand, Model
from nexuapp.api.serializer import BrandSerializer, ModelSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


#GET /brands y POST /brands
class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

    def list(self, request):
        brands = Brand.objects.all()
        serializer = BrandSerializer(brands, many=True)
        return Response(serializer.data)

    def create(self, request):
        name = request.data.get('name', '').strip().lower()
        if Brand.objects.filter(name__iexact=name).exists():
            return Response({'error': 'Esa marca ya existe en nuestro inventario'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = BrandSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#GET /models
class ModelViewSet(viewsets.ModelViewSet):
    queryset = Model.objects.all()
    serializer_class = ModelSerializer


#GET /brands/:id/models y POST /brands/:id/models
class BrandModelView(APIView):
    def get(self, request, id):
        if not Brand.objects.filter(id=id).exists():
            return Response({'error': 'Esa marca no existe en nuestro inventario'}, status=status.HTTP_404_NOT_FOUND)
    
        brand = Brand.objects.get(id=id)
        models = Model.objects.filter(brand=brand)
        serializer = ModelSerializer(models, many=True)
        return Response(serializer.data)
    
    def post(self, request, id):

        if not Brand.objects.filter(id=id).exists():
            return Response({'error': 'Esa marca no existe en nuestro inventario'}, status=status.HTTP_404_NOT_FOUND)

        brand = Brand.objects.get(id=id)
        name = request.data.get('name', '').strip().lower()
        if Model.objects.filter(name__iexact=name).exists():
            return Response({'error': 'Esa modelo ya existe en nuestro inventario'}, status=status.HTTP_400_BAD_REQUEST)
        
        data = request.data.copy()
        data['brand'] = brand.id
        serializer = ModelSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#PUT /models/:id
class UpdateModelView(APIView): 
    queryset = Model.objects.all()
    serializer_class = ModelSerializer
    lookup_field = 'id'

    def put(self, request, id): 
        instance = Model.objects.get(id=id)
        
        average_price = request.data.get('average_price')   
        if average_price <= 100000:
            return Response({"error": "El precio debe ser mayor a 100000."}, status=status.HTTP_400_BAD_REQUEST)
        
        instance.average_price = average_price
        instance.save()
        serializer = ModelSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)