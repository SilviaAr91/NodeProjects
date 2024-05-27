const heartIcon = document.getElementById('heartIcon');
const likeCount = document.getElementById('likeCount');
let contadorLikes = 0;

// Función para manejar el clic en el corazón
heartIcono.addEventListener('click', () => {
  contadorLikes++; // Incrementar el contador de likes
  likeCount.textContent = contadorLikes; // Actualizar el texto del contador de likes
  // Cambiar el color del corazón
  if (heartIcono.classList.contains('clicked')) {
    heartIcono.classList.remove('clicked'); // Remover la clase 'clicked' para volver al color original
  } else {
    heartIcono.classList.add('clicked'); // Agregar la clase 'clicked' para cambiar el color
  }
});