/**
 * Cargar la libreria de Jquery y ubicar el cursor en el campo de registrar
 */
 $(document).ready(function () {
    estadoInicial()
});

/**
 * Intenta autenticar al usuario en la aplicaciòn
 */
function registrar(){
    //capturar los datos que ingreso el usuario en la pagina
    let name = $("#username").val()
    let email = $("#useremail").val()
    let password = $("#password").val()
    let repeatpassword = $("#passwordrepeat").val()

    if (verificarEmail()){
        alert("No fue posible crear la cuenta, el correo ya existe")
        $("#useremail").focus();
        return
    }

    let datos={
        email : $("#useremail").val(),
        password : $("#password").val(),
        name : $("#username").val()
    }

    let datosPeticion = JSON.stringify(datos)

    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        url: "http://localhost:8081/api/user/new",
        
        //envio datos capturados por el usuario a la peticion
        data: datosPeticion,
        type: 'POST',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",

        //success: funcion con acciones si todo sale ok
        success: function (respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            console.log(respuesta);
            resultado(respuesta)
            limpiarFormulario();	
        },
        //error: funcion con acciones si hay error
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            //$("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);		
            console.log("algo falló");	
        },
        //complete: funcion con al final de la petición
        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

/**
 * valida si en el id viene un dato nulo, o viene el codigo del usuario
 * 
 * Configura mensaje de bienvenida o de error según el caso
 */
function resultado(respuesta){
    let id = respuesta.id
    let nombre= respuesta.name

    if (id==null)
        alert("Usuario no registrado : " + nombre)
    else
        alert("Bienvenido : " + id + " "+ nombre)

}

function verificarEmail(){
    var email = $("#useremail").val();
    var existe = true;
    $.ajax({
        //url del servicio
        url: "http://localhost:8081/api/user/"+email,
        type: 'GET',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",
        async: false,

        success: function (respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            console.log(respuesta);	
            existe=respuesta;
        },
 
        error: function (xhr, status) {	
            console.log("algo falló");	
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
    return existe;

}

function estadoInicial(){
    $("#username").focus()
}

function validarContrasenas(){

    contrasena1 = $("#password").val()
    contrasena2 = $("#passwordrepeat").val()

    if (contrasena1 !== contrasena2){
        alert("Las contraseñas no coinciden")
        $("#passwordrepeat").val('')
        $("#passwordrepeat").focus();
    } 
}

function limpiarFormulario() {
    $('#username').val('');
    $('#useremail').val('');
    $('#password').val('');
    $('#passwordrepeat').val('');
}