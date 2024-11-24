from django.db import models
from django.contrib.auth.hashers import make_password,check_password

# Modelo para los usuarios
class Usuario(models.Model):
    ROLES = [
        ('cliente', 'Cliente'),
        ('empleado', 'Empleado'),
        ('admin', 'Administrador'),
        ('dueño', 'Dueño'),
        ('chef', 'Chef'),
        ('jefe de area', 'Jefe de area'),
        ('cocinero', 'Cocinero')
    ]
    
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=255)
    rol = models.CharField(max_length=20, choices=ROLES)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre


# Modelo para los productos
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    categoria = models.CharField(max_length=50, blank=True, null=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre


# Modelo para las compras
class Compra(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_compra = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Compra {self.id} - Usuario: {self.usuario.nombre}"


# Modelo para el detalle de las compras
class DetalleCompra(models.Model):
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Detalle {self.id} - Compra {self.compra.id}"


# Modelo para el registro de accesos
class RegistroAcceso(models.Model):
    TIPOS_ACCESO = [
        ('ingreso', 'Ingreso'),
        ('salida', 'Salida'),
    ]

    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    tipo_acceso = models.CharField(max_length=10, choices=TIPOS_ACCESO)
    fecha_hora = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tipo_acceso} - {self.usuario.nombre}"


# Modelo para las tareas
class Tarea(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('en progreso', 'En Progreso'),
        ('completada', 'Completada'),
    ]

    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    descripcion = models.TextField()
    estado = models.CharField(max_length=15, choices=ESTADOS, default='pendiente')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_limite = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Tarea {self.id} - {self.usuario.nombre}"


# Modelo para los pedidos a la cocina
class PedidoCocina(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('en preparación', 'En Preparación'),
        ('listo', 'Listo'),
    ]

    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Pedido {self.id} - {self.producto.nombre} ({self.estado})"
