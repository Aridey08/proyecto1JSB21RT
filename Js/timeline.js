// Definición de la función agregarEventoAlTimeline
function agregarEventoAlTimeline(evento) {
  // Acceder al elemento del contenedor del timeline en HTML
  const timelineContainer = document.getElementById('timeline-container');

  // Crear los elementos (DOM)
  const eventElement = document.createElement('div');
  const contentWrapper = document.createElement('div');
  const titleElement = document.createElement('h2');
  const imageElement = document.createElement('img');
  const textElement = document.createElement('p');

  // Establecer el contenido para cada elemento (DOM)
  titleElement.textContent = evento.title;
  imageElement.src = evento.image;
  textElement.textContent = evento.text;

  // Agregar clases a los elementos (DOM)
  eventElement.classList.add('timeline-event');
  contentWrapper.classList.add('event-content-wrapper');
  titleElement.classList.add('event-title');
  imageElement.classList.add('event-image');
  textElement.classList.add('event-text');

  // Agregar elementos al contenedor de contenido
  contentWrapper.appendChild(titleElement);
  contentWrapper.appendChild(imageElement);
  contentWrapper.appendChild(textElement);

  // Agregar el contenedor de contenido al elemento del evento
  eventElement.appendChild(contentWrapper);

  // Agregar el elemento del evento al contenedor del timeline
  timelineContainer.appendChild(eventElement);
}

// Función para obtener los eventos almacenados en el almacenamiento local
function obtenerEventosAlmacenados() {
  const eventosGuardados = localStorage.getItem('eventos');
  return eventosGuardados ? JSON.parse(eventosGuardados) : [];
}

// Función para guardar los eventos en el almacenamiento local
function guardarEventos(eventos) {
  localStorage.setItem('eventos', JSON.stringify(eventos));
}

// Fetch para obtener el conjunto de datos JSON
fetch('zelda-timeline.json')
  .then(response => response.json())
  .then(data => {
    // Ordenar los datos en función de la propiedad "date" en orden ascendente
    data.sort((a, b) => a.date - b.date);

    // Utilizar la variable 'data' ordenada para acceder al conjunto de datos JSON
    console.log(data); // Ejemplo: mostrar el conjunto de datos ordenado en la consola

    // Recorrer los datos ordenados y agregar los eventos al timeline
    data.forEach(evento => {
      agregarEventoAlTimeline(evento);
    });

    // Cargar los eventos almacenados en el timeline al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
      const eventosAlmacenados = obtenerEventosAlmacenados();
      const timelineContainer = document.getElementById('timeline-container');

      eventosAlmacenados.forEach(evento => {
        agregarEventoAlTimeline(evento);
      });
    });

    // Agregar un event listener para el envío del formulario
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();

      // Obtener los valores de entrada del formulario
      const titulo = document.getElementById('event-title').value;
      const fecha = document.getElementById('event-date').value;
      const imagen = document.getElementById('event-image').value;
      const descripcion = document.getElementById('event-description').value;

      // Crear un nuevo objeto de evento
      const nuevoEvento = {
        title: titulo,
        date: fecha,
        image: imagen,
        text: descripcion
      };

      // Agregar el nuevo evento al timeline
      agregarEventoAlTimeline(nuevoEvento);

      // Obtener los eventos almacenados y agregar el nuevo evento
      const eventosAlmacenados = obtenerEventosAlmacenados();
      eventosAlmacenados.push(nuevoEvento);

      // Guardar los eventos actualizados en el almacenamiento local
      guardarEventos(eventosAlmacenados);

      // Limpiar los campos del formulario
      formulario.reset();
    });
    // Obtener referencias a los elementos del DOM
const formularioIcono = document.getElementById('formulario-icono');
const contenedorFormulario = document.getElementById('contenedor-formulario');

// Agregar evento click al icono para mostrar/ocultar el formulario
formularioIcono.addEventListener('click', () => {
  if (contenedorFormulario.style.display === 'none' || contenedorFormulario.style.display === '') {
    contenedorFormulario.style.display = 'block';
  } else {
    contenedorFormulario.style.display = 'none';
  }
});


  })
  .catch(error => {
    console.error('Error al obtener el conjunto de datos JSON:', error);
  });
