//script semilla para crear servicios de ejemplo
const { sequelize } = require("../src/config/db");

//Manejo mejorado de errores de importación
let User, Service;
try {
  User = require("../src/models/Users");
    Service = require("../src/models/Service");
} catch (error) {
  console.error("Error al importar modelos:", error.message);
  console.log("Asegúrate de que los archivos de modelo existen y están correctamente definidos.");
  process.exit(1);
}

//Datos de servicios de ejemplo
const serviciosData = [
    {
        nombre: "Desarrollo Web Frontend",
        descripcion: "Creación de interfaces de usuario modernas y responsivas.",
        precio: 1500.0,
    },  
    {
        nombre: "Desarrollo Web Backend",
        descripcion: "Implementación de lógica de servidor y bases de datos.",  
        precio: 2000.0,
    },
    {
        nombre: "Diseño UX/UI",
        descripcion: "Diseño de experiencias de usuario excepcionales.",
        precio: 1200.0,
    },
];  
//Función para insertar servicios de ejemplo
async function crearServiciosSemilla() {
    try {
        console.log("🔄 Conectando a la base de datos...");

        //Verificar conexión con timeout
        const connectionTimeout = setTimeout(() => {
            console.error("❌ Timeout: No se pudo conectar a la base de datos en 10 segundos.");
            console.log("💡 Verifica que MySQL esté ejecutandose y la configuración sea correcta");
            process.exit(1);
        }, 10000); //10 segundos

        await sequelize.authenticate();
        clearTimeout(connectionTimeout);
        console.log("✅ Conexión establecida");

        console.log("🔄 Sincronizando modelos...");
        await sequelize.sync({ force: false });
        console.log("✅ Modelos sincronizados");

        //Verificar si ya existen servicios
        const serviciosExistentes = await Service.count();
        if (serviciosExistentes > 0) {
            console.log(`⚠️  Ya existen ${serviciosExistentes} servicios en la base de datos. No se crearán servicios semilla.`);
            console.log("Si deseas regenerar los servicios, elimina los existentes manualmente primero.")


            const respuesta = await new Promise((resolve) => {
                const readline = require("readline").createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
                readline.question("¿Deseas continuar y agregar mas servicios existentes? (s/n): ", (answer) => {
                    readline.close();
                    resolve(answer.toLowerCase()=== 's' || answer.toLowerCase() === 'si');
                });
            });
            if (!respuesta) {
                console.log("Operación cancelada.");
                return;     
            }
        }
        //Obtener usuarios disponibles (excluyendo clientes para asignar servicios a admins/superadmins)
        const usuarios  = await User.findAll({
            where: {
                activo: true,
                rol: ["admin", "superadmin"],
            },
        });

        if (usuarios.length === 0) {
            console.log("❌ No se encontraron usuarios admin o superadmin activos.");
            console.log("Ejecuta primero el script createSuperAdmin.js o crea usuarios admin.");
            return;
        }

        console.log(`✅ Encontrandos ${usuarios.length} usuarios disponibles para...`);
        console.log("🔄 Creando servicios semilla...");

        const serviciosCreados = [];

        for (let i=0; i < serviciosData.length; i++) {
            const servicioData = serviciosData[i];
            //Asignar usuario de forma circular
            const usuarioAsignado = usuarios[i % usuarios.length];

            const servicio = await Service.create({
                nombre: serviciosData.nombre,
                descripcion: serviciosData.descripcion,
                precio: serviciosData.precio,
                usuarioId: usuarioAsignado.id, 
            });

            serviciosCreados.push({
                id: servicio.id,
                nombre: servicio.nombre,
                precio: servicio.precio,
                usuario: usuarioAsignado.nombre,
            });

            console.log(`   ✔️ Servicio creado: ${servicio.nombre} (ID: ${servicio.id}) asignado a ${usuarioAsignado.nombre}`);
        }

        console.log(`\n🎉 Servicios semilla creados exitosamente!`);
        console.log(`Total servicios creados: ${serviciosCreados.length}\n`);
        console.log(`\n Resumen de servicios creados:`);
        console.log('-'.repeat(80));
        serviciosCreados.forEach((servicio) => {
            console.log(`ID: ${servicio.id} | Nombre: ${servicio.nombre} | Precio: $${servicio.precio} | Usuario: ${servicio.usuario}`);
        });
        console.log('-'.repeat(80));
    } catch (error) {
        console.error("❌ Error al crear servicios semilla:", error);
    }
    finally {
        await sequelize.close();
        console.log("🔒 Conexión cerrada");
    }       
}

crearServiciosSemilla();




