fetch('zelda-timeline.json')
  .then(response => response.json())
  .then(data => {
    // Sort the data based on the "date" property in ascending order
    data.sort((a, b) => a.date - b.date);

    // Use the sorted 'data' variable to access your JSON dataset
    console.log(data); // Example: Output the sorted dataset to the console

    // Access the timeline container element in the HTML
    const timelineContainer = document.getElementById('timeline-container');

    // Loop through the sorted data and create HTML elements for each event
    data.forEach(event => {
      // Creando elementos (DOM)
      const eventElement = document.createElement('div');
      const contentWrapper = document.createElement('div');
      const titleElement = document.createElement('h2');
      const imageElement = document.createElement('img');
      const textElement = document.createElement('p');

      // Contenido para cada elemento (DOM)
      titleElement.textContent = event.title;
      imageElement.src = event.image;
      textElement.textContent = event.text;

      // Añadir clases al elemento (DOM)
      eventElement.classList.add('timeline-event');
      contentWrapper.classList.add('event-content-wrapper');
      titleElement.classList.add('event-title');
      imageElement.classList.add('event-image');
      textElement.classList.add('event-text');

      // Agregando elementos
      contentWrapper.appendChild(titleElement);
      contentWrapper.appendChild(imageElement);
      contentWrapper.appendChild(textElement);

      //Agregando contenido
      eventElement.appendChild(contentWrapper);

      // Agregando elemento del evento al contenedor timeline
      timelineContainer.appendChild(eventElement);
      // Función para obtener los eventos almacenados en el almacenamiento local

const obtenerEventosAlmacenados = () => {
  const eventosGuardados = localStorage.getItem('eventos');
  return eventosGuardados ? JSON.parse(eventosGuardados) : [];
};

// Función para guardar los eventos en el almacenamiento local
const guardarEventos = (eventos) => {
  localStorage.setItem('eventos', JSON.stringify(eventos));
};

// Cargar los eventos almacenados en el timeline al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const eventosAlmacenados = obtenerEventosAlmacenados();
  const timelineContainer = document.getElementById('timeline-container');

  eventosAlmacenados.forEach(evento => {
    agregarEventoAlTimeline(evento);
  });
});

// Agregar un event listener para la presentación del formulario
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
    date: parseInt(fecha),
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
  console.log(agregarEventoAlTimeline)

  // Limpiar los campos del formulario
  formulario.reset();
});

    });

   
  })
  .catch(error => {
    console.error('Error fetching the JSON dataset:', error);
  });
