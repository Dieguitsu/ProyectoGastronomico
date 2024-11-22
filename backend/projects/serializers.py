from rest_framework import serializers
from .models import Usuario, Producto, Compra, DetalleCompra, RegistroAcceso, Tarea, PedidoCocina

# Serializer para el modelo Usuario
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


# Serializer para el modelo Producto
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'


# Serializer para el modelo Compra
class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = '__all__'


# Serializer para el modelo DetalleCompra
class DetalleCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleCompra
        fields = '__all__'


# Serializer para el modelo RegistroAcceso
class RegistroAccesoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroAcceso
        fields = '__all__'


# Serializer para el modelo Tarea
class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = '__all__'


# Serializer para el modelo PedidoCocina
class PedidoCocinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PedidoCocina
        fields = '__all__'
