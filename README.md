Nubia Lounge

Aplicación móvil para gestionar pedidos personalizados de shishas en locales. Diseñada para ofrecer una experiencia intuitiva y fluida a los clientes, permitiéndoles realizar pedidos directamente desde sus dispositivos móviles al llegar al local.
Planificación y Diseño
Objetivo principal:

Permitir que los usuarios seleccionen y pidan shishas personalizadas desde sus dispositivos móviles al llegar al local.
Características principales:

    Catálogo de sabores de shisha con descripciones.
    Sistema para combinar hasta tres sabores por pedido.
    Botón de cambio de carbones: Permite solicitar al personal un cambio de carbones de forma rápida y eficiente.
    Confirmación del pedido con un resumen.
    (Opcional) Registro de usuarios y/o historial de pedidos para futuras mejoras.

Wireframe inicial
Flujo de la aplicación:

    Pantalla de inicio:
        Botón para empezar el pedido.
        Acceso rápido al botón de cambio de carbones.

    Pantalla de selección:
        Lista de sabores disponibles con descripciones.
        Opciones para seleccionar y combinar hasta 3 sabores.

    Pantalla de resumen:
        Muestra los sabores seleccionados.
        Opción para confirmar el pedido.
Backend (API)
Tecnologías utilizadas

    Node.js: Entorno de ejecución para construir la API.
    Express: Framework para gestionar rutas y controladores.
    MySQL: Base de datos para almacenar los sabores disponibles.
    Nodemon: Herramienta para recargar automáticamente el servidor durante el desarrollo.

Funcionalidades del Backend

    Obtener la lista de sabores desde la base de datos.
    Realizar pedidos personalizados de shishas.
    Solicitar cambio de carbones al personal.

Instalación

    Clona el repositorio:

git clone https://github.com/rhidalgojimenez86/Proyecto-Sishas.git

cd NubiaLounge/BACK

Instala las dependencias:

npm install

Configura las variables de entorno (archivo .env):

DB_HOST=tu_host
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_tu_base_de_datos

Inicia el servidor en modo desarrollo:

    npm run dev

Rutas disponibles
Método    Ruta    Descripción
GET    /sabores    Obtiene todos los sabores.
POST    /pedido    Realiza un pedido.
POST    /carbones    Solicita el cambio de carbones.# Proyecto_Sishas
