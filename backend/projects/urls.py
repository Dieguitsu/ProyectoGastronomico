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
from .views import login, buscar_usuario, registro_ingreso_por_dia,tareaUsuario,registrar_compra,compras,crear_pedido,pedidos_recientes
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
    path('api/usuario/buscar', buscar_usuario, name='buscar_usuario'),
    path('api/ingresoDia/', registro_ingreso_por_dia, name='registro_ingreso'),
    path('api/usuarioTarea/', tareaUsuario, name='tarea_usuario'),
    path('api/compras/', registrar_compra, name='registrar_compra'),
    path('api/comprasUsu/', compras, name='compras'),
    path('api/crear-pedido/', crear_pedido, name='crear_pedido'),
    path('api/pedidos-recientes/', pedidos_recientes, name='pedidos_recientes'),

]
urlpatterns += router.urls
