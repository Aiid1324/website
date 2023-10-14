
$(document).ready(function(){
    $("#calcular_ruta").click(function(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                var cadenaRuta = latitude+","+longitude+";41.373013,2.145689";
                $("#coordenadas").val(cadenaRuta);
                $("#formulario_rutas").submit();
            });
        }
    });
});