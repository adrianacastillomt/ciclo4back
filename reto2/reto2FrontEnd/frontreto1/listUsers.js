var id = 0;
var emailDb = '';
var zonas = [
    'Villa Santana', 'Rio Otun', 'Centro', 'Villavicencio','Oriente','Universidad','Boston','El Jardin','Cuba',
    'Consota', 'Olimpica', 'Ferrocarril', 'San Joaquin', 'Perla del Otun', 'El Oso', 'San Nicolas', 'El Rocio', 'Del Cafe', 'El Poblado'
];
var types = new Map();
types.set('ADM','Administrador');
types.set('ASE','Asesor Comercial');
types.set('COORD','Coordinador de Zona');

var usuario;

$(document).ready(function () {
    $.support.cors = true;

    cargarUsuarios();
    cargarZonas();
    cargarTypes();

    usuario = getUser();

    switch(usuario.type) {
        case "ADM":
            $('#userFilterDiv').hide();
            break;
        case "ASE":
            $('#agregarUserBtn').hide();
            $('h3').html('Usuarios');
            break;
        case "COORD":
            $('#agregarUserBtn').hide();
            $('h3').html('Usuarios');
            break;
    }
});


function cargarZonas() {
    $.each(zonas, function (index, obj) {
        $("#userzone").append('<option value="'+zonas[index]+'">'+zonas[index]+'</option>');
    });
}

function cargarTypes() {
    for (let [key, value] of types.entries()) {
        $("#usertype").append('<option value="'+key+'">'+value+'</option>');
    }
}

function cargarUsuarios() {
    let endpoint = "all";
    let monthBirthDay = $('#userMonthFilter').val();
    
    if (monthBirthDay)
        endpoint = "birthday/" + monthBirthDay;
        
    $.ajax({
        //url del servicio
        url: "http://localhost:80/api/user/" + endpoint,
        type: 'GET',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",
        
        success: function (usuarios) {
            //escribe en la consola del desarrollador para efectos de depuración
            console.log(usuarios);	
            poblarTabla(usuarios);
        },
 
        error: function (xhr, status) {	
            console.log(xhr);
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function filtrarUser() {

}

function poblarTabla(usuarios) {
    if ($("#tablaUsuarios tbody").length == 0) {
        $("#tablaUsuarios").append("<tbody></tbody>");
    } else {
        $("#tablaUsuarios tbody").empty();
    }

    $.each(usuarios, function (index, obj) {
        let html = `<tr>
            <td>${obj.identification}</td>
            <td>${obj.name}</td>
            <td>${obj.email}</td>
            <td>${types.get(obj.type)}</td>
            <td>${obj.zone}</td>`;

        if (usuario.type === 'ADM') {
            html += 
                `<td>   
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editUserModal" onclick="cargarUser('${obj.id}');">Editar</button>
                </td>
                <td>
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteUserModal" onclick="borrarUser('${obj.id}');">Eliminar</button>
                </td>`;
        }
        
        html += `</tr>`;

        $("#tablaUsuarios tbody").append(html);
    });
}

function limpiarFormulario() {
    $("#userid").val('');
    $("#username").val('');
    $("#useraddress").val('');
    $("#usercel").val('');
    $("#useremail").val('');
    $("#userpass").val('');
    $("#usertype").val('');
}

function agregarUser() {
    $('#btn_guardar').show();
    $('#btn_editar').hide();

    $('#addModalLabel').show();
    $('#editModalLabel').hide();

    limpiarFormulario();
}

function cargarUser(idUser) {
    id = idUser;
	
    $('#btn_guardar').hide();
    $('#btn_editar').show();

    $('#addModalLabel').hide();
    $('#editModalLabel').show();

    $.ajax({
        url: "http://localhost:80/api/user/" + id,
        type: 'GET',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json", 
        success: function(data) {
            emailDb = data.email;

            let birthtDay = data.birthtDay;
            birthtDay = birthtDay.substring(0, birthtDay.indexOf("T", birthtDay));

            $("#userid").val(data.identification);
            $("#username").val(data.name);
            $("#userbirthtDay").val(birthtDay);
            $("#useraddress").val(data.address);
            $("#usercel").val(data.cellPhone);
            $("#useremail").val(data.email);
            $("#userpass").val(data.password);
            $("#usertype").val(data.type);
            $("#userzone").val(data.zone);
        },
        error: function (xhr, status) {	
            console.log(xhr);
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function borrarUser(idUser) {
    id = idUser;
}

function eliminarUser() {
    $.ajax({
        //url del servicio
        url: "http://localhost:80/api/user/" + id,
        type: 'DELETE',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",
        
        success: function (data) {
            console.log(data);
            $('#btn_closeDelete').click();
            cargarUsuarios();
        },
 
        error: function (xhr, status) {	
            console.log(xhr);
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function editarUser() {
    var newMail = $("#useremail").val();

    if ((newMail !== emailDb) 
            && verificarEmail()){
        alert("No fue posible crear el usuario, el correo ya existe");
        return;
    }

    let birthday= $("#userbirthtDay").val();
    let position = birthday.indexOf("-");
    let monthBirthDay = birthday.substring(position+1,position+3);

    let datos = {
        id: id,
        identification: $("#userid").val(),
        name: $("#username").val(),
        birthtDay: birthday,
        monthBirthtDay: monthBirthDay,
        address: $("#useraddress").val(),
        cellPhone: $("#usercel").val(),
        email: $("#useremail").val(),
        password: $("#userpass").val(),
        zone: $("#userzone").val(),
        type: $("#usertype").val()
    }

    let datosPeticion = JSON.stringify(datos);
    console.log(datosPeticion);

    $.ajax({
        url: "http://localhost:80/api/user/update",
        data: datosPeticion,
        type: 'PUT',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",

        success: function (respuesta) {
            console.log(respuesta);
            emailDb = '';
            limpiarFormulario();
            $('#btn_close').click();
            cargarUsuarios();
        },
        error: function (xhr, status) {		
            console.log("algo falló");	
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function guardarUser() {

    if (verificarEmail()) {
        alert("No fue posible crear la cuenta, el correo ya existe");
        return;
    }

    let birthday= $("#userbirthtDay").val();
    let position = birthday.indexOf("-");
    let monthBirthDay = birthday.substring(position+1,position+3);

    let datos = {
        identification: $("#userid").val(),
        name: $("#username").val(),
        birthtDay: birthday,
        monthBirthtDay: monthBirthDay,
        address: $("#useraddress").val(),
        cellPhone: $("#usercel").val(),
        email: $("#useremail").val(),
        password: $("#userpass").val(),
        zone: $("#userzone").val(),
        type: $("#usertype").val()
    }

    let datosPeticion = JSON.stringify(datos);

    $.ajax({
        url: "http://localhost:80/api/user/new",
        data: datosPeticion,
        type: 'POST',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",

        success: function (respuesta) {
            console.log(respuesta);
            $('#btn_close').click();
            cargarUsuarios();
        },
        error: function (xhr, status) {		
            console.log("algo falló");	
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function verificarEmail(email){
    var existe = true;

    $.ajax({
        //url del servicio
        url: "http://localhost:80/api/user/emailexist/" + email,
        type: 'GET',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",
        async: false,

        success: function (respuesta) {
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