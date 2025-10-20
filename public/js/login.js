const form = document.getElementById('loginForm')
    const mensaje = document.getElementById('mensaje')
    const loginBtn = document.getElementById('loginBtn')

    // Función para mostrar mensajes
    function mostrarMensaje (texto, tipo = 'error') {
      mensaje.textContent = texto
      mensaje.className = `mensaje ${tipo}`
      mensaje.style.display = 'block'

      setTimeout(() => {
        mensaje.style.display = 'none'
      }, 5000)
    }

    // Manejar envío del formulario
    form.addEventListener('submit', async (e) => {
      e.preventDefault()

      const email = document.getElementById('email').value
      const password = document.getElementById('password').value

      // Validaciones básicas
      if (!email || !password) {
        mostrarMensaje('Por favor completa todos los campos')
        return
      }

      // Deshabilitar botón durante el request
      loginBtn.disabled = true
      loginBtn.textContent = 'Iniciando sesión...'

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (response.ok) {
          // Login exitoso
          mostrarMensaje(`¡Bienvenido ${data.usuario.nombre}!`, 'success')

          // Guardar token en localStorage
          localStorage.setItem('token', data.token)
          localStorage.setItem('usuario', JSON.stringify(data.usuario))

          // Redirigir al dashboard después de 1 segundo
          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 1000)
        } else {
          // Error en login
          mostrarMensaje(data.mensaje || 'Error al iniciar sesión')
        }
      } catch (error) {
        console.error('Error:', error)
        mostrarMensaje('Error de conexión. Inténtalo de nuevo.')
      } finally {
        // Rehabilitar botón
        loginBtn.disabled = false
        loginBtn.textContent = 'Iniciar Sesión'
      }
    })

    // Verificar si ya está logueado
    window.onload = () => {
      const token = localStorage.getItem('token')
      const usuario = localStorage.getItem('usuario')

      console.log('Token en localStorage:', token ? 'Existe' : 'No existe')
      console.log('Usuario en localStorage:', usuario ? 'Existe' : 'No existe')

      if (token && usuario) {
        try {
          // Verificar que el usuario sea válido
          const userData = JSON.parse(usuario)
          if (userData && userData.id) {
            console.log('Redirigiendo a dashboard...')
            window.location.href = '/dashboard'
            return
          }
        } catch (error) {
          console.log('Error parsing usuario, limpiando localStorage')
          localStorage.clear()
        }
      }

      // Si llegamos aquí, mostrar formulario de login
      console.log('Mostrando formulario de login')
      document.querySelector('.login-container').classList.add('show')
    }