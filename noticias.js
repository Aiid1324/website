
let noticias = [];
const noticiasContainer = document.getElementById('contenedorNoticias');
let indiceNoticiaActual = 0;

function cargarNoticias() {
  console.log("entra en la funcion cargar noticias");
  const url = new URL('noticias.json', document.currentScript.src);
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("carga los datos");
      console.log("noticiasContainer:", noticiasContainer);
      if (!noticiasContainer) {
        console.error('El contenedor de noticias no existe en el documento HTML');
        return;
      }

      // Función que agrega la siguiente noticia al contenedor y espera 7 segundos antes de llamar a la función nuevamente
      function agregarSiguienteNoticia() {
        // Si ya se han agregado todas las noticias, reiniciar el proceso desde el principio
        if (indiceNoticiaActual >= data.noticias.length) {
          indiceNoticiaActual = 0;
        }

        // Crear elemento para la noticia
        const noticiaElem = document.createElement('div');
        noticiaElem.classList.add('noticia');

        // Agregar contenido de la noticia
        const tituloElem = document.createElement('h3');
        tituloElem.textContent = data.noticias[indiceNoticiaActual].titulo;
        noticiaElem.appendChild(tituloElem);

        const textoElem = document.createElement('p');
        textoElem.textContent = data.noticias[indiceNoticiaActual].texto;
        noticiaElem.appendChild(textoElem);

        // Agregar elemento al contenedor
        noticiasContainer.innerHTML = '';
        noticiasContainer.appendChild(noticiaElem);

        // Agregar la noticia al array global de noticias
        noticias.push(noticiaElem);

        // Incrementar el índice de la noticia actual y llamar a la función para agregar la siguiente noticia en 7 segundos
        indiceNoticiaActual++;
        setTimeout(agregarSiguienteNoticia, 7000);
      }

      // Comenzar el proceso de agregar noticias
      agregarSiguienteNoticia();
    })
    .catch(error => {
      console.error('Ocurrió un error al cargar las noticias:', error);
    });
}

cargarNoticias();


