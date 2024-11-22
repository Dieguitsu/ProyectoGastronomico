from rest_framework import routers
from django.urls import path
from .api import (
    UsuarioViewSet,
    ProductoViewSet,
    CompraViewSet,
    DetalleCompraViewSet,
    RegistroAccesoViewSet,
    TareaViewSet,
    PedidoCocinaViewSet,
)
from .views import login

router = routers.DefaultRouter()

# Registro de rutas
router.register('api/usuario', UsuarioViewSet, 'usuario')
router.register('api/producto', ProductoViewSet, 'producto')
router.register('api/compra', CompraViewSet, 'compra')
router.register('api/detalle-compra', DetalleCompraViewSet, 'detalle-compra')
router.register('api/registro-acceso', RegistroAccesoViewSet, 'registro-acceso')
router.register('api/tarea', TareaViewSet, 'tarea')
router.register('api/pedido-cocina', PedidoCocinaViewSet, 'pedido-cocina')

urlpatterns = [
    path('api/login/', login, name='login_usuario'),
]
urlpatterns += router.urls
