from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario

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
