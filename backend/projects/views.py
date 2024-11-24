from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario, RegistroAcceso, Tarea,Producto,Compra,DetalleCompra,PedidoCocina
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from datetime import date
from django.utils.timezone import now,timedelta
from django.http import JsonResponse
import json
@api_view(['POST'])
def login(request):
    correo = request.data.get('correo')
    contraseña = request.data.get('contraseña')

    if not correo or not contraseña:
        return Response({"detail": "El correo y la contraseña son requeridos."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        usuario = Usuario.objects.get(correo=correo)

        if contraseña == usuario.contraseña:
            return Response({
                "message":"Inicio de sesion correcto",
                "data":{
                    "id": usuario.id,
                    "nombre": usuario.nombre,
                    "correo": usuario.correo,
                    "rol": usuario.rol,
                    "fecha_registro": usuario.fecha_registro
                }
            })
        else:
            return Response({"detail": "Contraseña incorrecta."}, status=status.HTTP_401_UNAUTHORIZED)

    except Usuario.DoesNotExist:
        return Response({"detail": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@csrf_exempt
def buscar_usuario(request):
    correo = request.data.get('correo', None)  # Cambiar a request.data para consistencia con POST
    
    if not correo:
        return Response({'detail': 'El parámetro "correo" es requerido.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        
        usuario = Usuario.objects.get(correo=correo)
     
        data = {
            'id': usuario.id,
            'nombre': usuario.nombre,
            'correo': usuario.correo,
        }
        return Response(data, status=status.HTTP_200_OK)
    except Usuario.DoesNotExist:
        return Response({'detail': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
  
@api_view(['GET'])
def registro_ingreso_por_dia(request):
    try:
        hoy = date.today()
        registros = RegistroAcceso.objects.filter(
            fecha_hora__date=hoy
        ).select_related('usuario')  # Optimización para evitar múltiples consultas

        data = [
            {
                'id': registro.usuario.id,
                'nombre': registro.usuario.nombre,
                'correo': registro.usuario.correo,
                'tipo_acceso': registro.tipo_acceso,
                'fecha_hora': registro.fecha_hora,
            }
            for registro in registros
        ]

        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'detail': 'Error al obtener los registros de ingreso.', 'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
@api_view(['GET'])
def tareaUsuario(request):
    try:
        tareas=Tarea.objects.select_related('usuario')

        data = [
            {   'id': tarea.id,
                'descripcion': tarea.descripcion,
                'estado': tarea.estado,
                'fecha_creacion': tarea.fecha_creacion,
                'fecha_limite': tarea.fecha_limite,
                'usuarioId':tarea.usuario.id,
                'usuario':tarea.usuario.nombre
            }
            for tarea in tareas
        ]

        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'detail': 'Error al obtener los registros de ingreso.', 'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def compras(request):
    try:
        compras=Compra.objects.select_related('usuario')

        data = [
            {   'id': compra.id,
                'fecha_compra': compra.fecha_compra,
                'total': compra.total,
                'nombre':compra.usuario.nombre,
                'rol':compra.usuario.rol
            }
            for compra in compras
        ]

        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'detail': 'Error al obtener los registros de ingreso.', 'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
      
@api_view(['POST'])
def registrar_compra(request):
    """
    Registra una nueva compra, actualiza el stock de los productos y guarda los detalles de la compra.
    """
    try:
        datos = request.data
        usuario_id = datos.get('usuario_id')
        detalles = datos.get('detalles')  # Lista de productos, cantidades y precios unitarios

        if not usuario_id or not detalles:
            return Response(
                {"detail": "Debe proporcionar el usuario y los detalles de la compra."},
                status=status.HTTP_400_BAD_REQUEST
            )

        usuario = Usuario.objects.get(id=usuario_id)
        total_compra = 0
        with transaction.atomic():
            compra = Compra.objects.create(usuario=usuario, total=0)
            for detalle in detalles:
                producto_id = detalle.get('producto_id')
                cantidad = detalle.get('cantidad')
                precio_unitario = detalle.get('precio_unitario')

                if not producto_id or not cantidad or not precio_unitario:
                    return Response(
                        {"detail": "Los detalles de la compra están incompletos."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                producto = Producto.objects.get(id=producto_id)

                producto.stock += cantidad
                producto.save()

                DetalleCompra.objects.create(
                    compra=compra,
                    producto=producto,
                    cantidad=cantidad,
                    precio_unitario=precio_unitario
                )

                total_compra += cantidad * precio_unitario

            compra.total = total_compra
            compra.save()

        return Response(
            {"detail": "Compra registrada exitosamente.", "compra_id": compra.id},
            status=status.HTTP_201_CREATED
        )

    except Usuario.DoesNotExist:
        return Response(
            {"detail": "El usuario proporcionado no existe."},
            status=status.HTTP_404_NOT_FOUND
        )
    except Producto.DoesNotExist:
        return Response(
            {"detail": "Uno o más productos no existen."},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"detail": "Error al registrar la compra.", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    


@csrf_exempt
def crear_pedido(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            usuario_id = data.get("usuario")
            producto_id = data.get("producto")
            cantidad = data.get("cantidad")
            estado = data.get("estado", "pendiente")  # Valor por defecto: 'pendiente'

            if not usuario_id or not producto_id or not cantidad:
                return JsonResponse({"error": "Faltan datos requeridos."}, status=400)

            try:
                producto = Producto.objects.get(id=producto_id)
            except Producto.DoesNotExist:
                return JsonResponse({"error": "El producto no existe."}, status=404)

            try:
                usuario = Usuario.objects.get(id=usuario_id)
            except Usuario.DoesNotExist:
                return JsonResponse({"error": "El usuario no existe."}, status=404)

            if producto.stock < cantidad:
                return JsonResponse(
                    {"error": "Stock insuficiente para realizar el pedido."}, status=400
                )

            pedido = PedidoCocina.objects.create(
                usuario=usuario,
                producto=producto,
                cantidad=cantidad,
                estado=estado,
            )

            producto.stock -= cantidad
            producto.save()

            return JsonResponse(
                {
                    "message": "Pedido creado exitosamente.",
                    "pedido": {
                        "id": pedido.id,
                        "usuario": pedido.usuario.id,
                        "producto": pedido.producto.id,
                        "cantidad": pedido.cantidad,
                        "estado": pedido.estado,
                        "fecha_registro": pedido.fecha_registro,
                    },
                },
                status=201,
            )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido."}, status=405)

def pedidos_recientes(request):
    if request.method == 'GET':
        try:
            
            hoy = now().date()
            inicio_rango = hoy - timedelta(days=2)
            fin_rango = hoy + timedelta(days=1)  

            pedidos = PedidoCocina.objects.filter(fecha_registro__date__gte=inicio_rango, fecha_registro__date__lt=fin_rango)

            pedidos_data = [
                {
                    "id": pedido.id,
                    "usuario": pedido.usuario.nombre,
                    "producto": pedido.producto.nombre,
                    "cantidad": pedido.cantidad,
                    "estado": pedido.estado,
                    "fecha_registro": pedido.fecha_registro,
                }
                for pedido in pedidos
            ]

            return JsonResponse({"pedidos": pedidos_data}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido."}, status=405)