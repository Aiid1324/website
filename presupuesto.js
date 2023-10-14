//1. Verificación datos personales formulario

//1.1 Comprobacion nombre
var nombre = document.getElementById("nombre");
var errorNombre = document.getElementById("errorNombre");
var nombreCorrecto = false;
nombre.addEventListener('blur',function(){
    nombreCorrecto = false;
    const restriccionNombre = /^[a-zA-Z]{1,15}$/;
    if(restriccionNombre.test(nombre.value) && nombre.value != null){
        errorNombre.style.display = "none"; // oculta el mensaje de error
        nombreCorrecto = true;
    }
    else{
        errorNombre.style.display = "block"; // muestra el mensaje de error
        errorNombre.textContent = "El nombre no es válido";
    }
});


//1.2 Comprobacion apellidos
var apellidos = document.getElementById("apellidos");
var errorApellidos = document.getElementById("errorEpellidos");
var apellidosCorrectos = false;
apellidos.addEventListener('blur', function(){
    apellidosCorrectos = false;
    const restriccionApellidos = /^[a-zA-Z\s]{1,40}$/;
    if(restriccionApellidos.test(apellidos.value)){
        errorApellidos.style.display = "none"; // oculta el mensaje de error
        apellidosCorrectos = true;
    }
    else{
        errorApellidos.style.display = "block"; // muestra el mensaje de error
        errorApellidos.textContent = "Apellidos no válidos";
    }
});

//1.3 Comprobacion email
var email = document.getElementById("email");
var errorEmail =document.getElementById("errorEmail");
var emailCorrecto = false;
email.addEventListener('blur', function name(){
    emailCorrecto = false;
    const restriccionEmail = /^(.+\@.+\..+)$/;
    if(restriccionEmail.test(email.value)){
        errorEmail.style.display = "none"; // oculta el mensaje de error
        emailCorrecto = true;
    }
    else{
        errorEmail.style.display = "block"; // muestra el mensaje de error
        errorEmail.textContent = "Email no válido";
    }
});

//1.4 Comprobacion telefono
var telefono = document.getElementById("telefono")
var errorTelefono = document.getElementById("errorTelefono");
var telefonoCorrecto = false;
telefono.addEventListener('blur', function(){
    telefonoCorrecto = false;
    const restriccionTelefono = /^[0-9]{9}$/;
    if(restriccionTelefono.test(telefono.value)){
        errorTelefono.style.display = "none"; // oculta el mensaje de error
        telefonoCorrecto = true;
    }
    else{
        errorTelefono.style.display = "block"; // muestra el mensaje de error
        errorTelefono.textContent = "Teléfono no válido";
    }
});

//2. Cálculo del presupuesto

//2.1 Calculo del precio en funcion de la categoría seleccionada
var categoria = document.getElementById("categoria");
var resultadoCategoria = 0;
var precioCategoria = 0;
var categoriaCorrecta = false;

categoria.addEventListener('change', actualizarCategoria);

function actualizarCategoria() {
    categoriaCorrecta = false;
    precioCategoria = 0;
    if(categoria.value !== 'opcion'){
        categoriaCorrecta = true;
        switch (categoria.value) {
            case 'cocina':
              precioCategoria = 2000;
              break;
            case 'comedor':
              precioCategoria = 800;
              break;
            case 'sala-estar':
              precioCategoria = 1500;
              break;
            case 'dormitorio':
              precioCategoria = 700;
              break;
            case 'banio':
              precioCategoria = 500;
              break;
            case 'decoracion':
              precioCategoria = 100;
              break;
        }
    }
    resultadoCategoria = precioCategoria;
    calcularEstimado(resultadoCategoria, resultadoPlazo, resultadoExtra);
}


//2.2 Cálculo del precio en función del plazo de entrega
var plazo = document.getElementById("plazo");
var resultadoPlazo = 0;
var precioPlazo = 0;

plazo.addEventListener('input', actualizarPlazo);

function actualizarPlazo(){
    precioPlazo = 0;
    if(categoria.value !== ('opcion' && 'decoracion')){
        if (plazo.value > 0 && plazo.value < 7) {
            precioPlazo = 400;
        } else if (plazo.value >= 7 && plazo.value < 14) {
            precioPlazo = 150;
        } else if (plazo.value >= 14 && plazo.value < 31) {
            precioPlazo = 50;
        } else {
            precioPlazo = 0;
        }
    }
    resultadoPlazo = precioPlazo;
    calcularEstimado(resultadoCategoria, resultadoPlazo, resultadoExtra);
}


//2.3 Calcular precio en funcion de los extras seleccionados

var selectores = document.querySelectorAll('input[type=checkbox]');

for (var i = 0; i < selectores.length; i++) {
    selectores[i].addEventListener('change', calcularExtras);
}

var resultadoExtra = 0;

function calcularExtras() {
    resultadoExtra = 0;
    if (document.getElementById("medidas-especiales").checked) {
        resultadoExtra += 150;
    }
    if (document.getElementById("color").checked) {
        resultadoExtra += 100;
    }
    if (document.getElementById("restaurados").checked) {
        resultadoExtra += 70;
    }
    calcularEstimado(resultadoCategoria, resultadoPlazo, resultadoExtra);
}


//2.4 Calcular precio estimado total

var estimado = 0;

function calcularEstimado(resultadoCategoria, resultadoPlazo, resultadoExtra){
    estimado = resultadoCategoria + resultadoPlazo+ resultadoExtra;
    document.getElementById("estimado").textContent = estimado + " euros.";
}


var formulario = document.getElementById("formulario");
var mensajeEnvio = document.getElementById("mensaje-envio");

formulario.addEventListener('submit', function(evento){
    if(nombreCorrecto && apellidosCorrectos && emailCorrecto && telefonoCorrecto && categoriaCorrecta){
        
        var campos = this.getElementsByTagName("input");
    
        // Recorrer los campos y borrar sus valores
        for (var i = 0; i < campos.length; i++) {
        campos[i].value = "";
        }

        //Borramos los datos introducidos en el desplegable y en el campo de informacion adicional
        categoria.value = 'opcion';
        document.getElementById("informacion").value = "";

        //Desmarcamos los checkbox
        for (var i = 0; i < selectores.length; i++) {
            selectores[i].checked = false;
        }

        //Reestablecemos el precio estimado
        estimado = 0;
        document.getElementById("estimado").style.display = 'none';
    }
    else{
        evento.preventDefault();
        mensajeEnvio.style.display = 'block';
        mensajeEnvio.style.color = 'red';
        mensajeEnvio.textContent = "Por favor, revise los datos introducidos.";
    }    
});







    
    



