var fulImgBox = document.getElementById("fulImgBox");
fulImg = document.getElementById("fulImg");


// agrega el manejador de eventos para el clic en el documento
document.addEventListener('click', function(event) {
    // verifica si el evento de clic se origina fuera de la imagen ampliada
    if (event.target === fulImgBox) {
      // cierra la imagen ampliada
      closeImg();
    }
  });

function openFulImg(reference){
    fulImgBox.style.display = "flex";
    fulImg.src = reference;
   
}

function closeImg(){
    fulImgBox.style.display = "none";
}



