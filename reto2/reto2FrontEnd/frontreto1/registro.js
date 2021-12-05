/**
 * Cargar la libreria de Jquery y ubicar el cursor en el campo de registrar
 */
 $(document).ready(function () {
    estadoInicial()
});

/**
 * Intenta autenticar al usuario en la aplicaciòn
 */
function registrar() {

    if (verificarEmail()){
        alert("No fue posible crear la cuenta, el correo ya existe")
        $("#useremail").focus();
        return
    }

    let datos = {
        id: Math.floor((Math.random() * 10000) + 1),
        identification: $("#userid").val(),
        email : $("#useremail").val(),
        password : $("#password").val(),
        name : $("#username").val(),
        address: $('#useraddress').val(),
        cellPhone: $('#usercel').val()
    }

    let datosPeticion = JSON.stringify(datos)

    $.ajax({
        //url del servicio
        url: "http://localhost:80/api/user/new",
        
        data: datosPeticion,
        type: 'POST',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",

        success: function (respuesta) {
            console.log(respuesta);
            resultado(respuesta)
            limpiarFormulario();
            window.location.replace("login.html");
        },
        error: function (xhr, status) {	
            console.log("algo falló");	
        },
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
        url: "http://localhost:80/api/user/emailexist/"+email,
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