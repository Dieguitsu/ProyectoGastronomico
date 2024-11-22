from rest_framework import viewsets, permissions
from .models import Usuario, Producto, Compra, DetalleCompra, RegistroAcceso, Tarea, PedidoCocina
from .serializers import (
    UsuarioSerializer,
    ProductoSerializer,
    CompraSerializer,
    DetalleCompraSerializer,
    RegistroAccesoSerializer,
    TareaSerializer,
    PedidoCocinaSerializer,
)

# ViewSet para el modelo Usuario
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UsuarioSerializer


# ViewSet para el modelo Producto
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductoSerializer


# ViewSet para el modelo Compra
class CompraViewSet(viewsets.ModelViewSet):
    queryset = Compra.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CompraSerializer


# ViewSet para el modelo DetalleCompra
class DetalleCompraViewSet(viewsets.ModelViewSet):
    queryset = DetalleCompra.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = DetalleCompraSerializer


# ViewSet para el modelo RegistroAcceso
class RegistroAccesoViewSet(viewsets.ModelViewSet):
    queryset = RegistroAcceso.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegistroAccesoSerializer


# ViewSet para el modelo Tarea
class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = TareaSerializer


# ViewSet para el modelo PedidoCocina
class PedidoCocinaViewSet(viewsets.ModelViewSet):
    queryset = PedidoCocina.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PedidoCocinaSerializer
