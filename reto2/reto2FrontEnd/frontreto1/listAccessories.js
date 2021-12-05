var id = 0;
var refDb = '';

$(document).ready(function () {
    $.support.cors = true;

    cargarProductos();
});

function cargarProductos() {
    $.ajax({
        url: "http://localhost:80/api/accessory/all",
        type: 'GET',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",
        
        success: function (productos) {
            console.log(productos);	
            poblarTabla(productos);
        },
 
        error: function (xhr, status) {	
            console.log(xhr);
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function poblarTabla(productos) {
    if ($("#tablaAcc tbody").length == 0) {
            $("#tablaAcc").append("<tbody></tbody>");
    } else {
        $("#tablaAcc tbody").empty();
    }

    $.each(productos, function (index, obj) {
        $("#tablaAcc tbody").append(
            "<tr>" +
				"<td>"+
'<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editAccModal" onclick="cargarAcc(\''+ obj.reference + '\');">Editar</button>'+
"</td>"+
"<td>"+
'<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteAccModal" onclick="borrarAcc(\''+ obj.reference + '\');">Eliminar</button>'+
"</td>"+
                "<td>" + obj.reference + "</td>" +
                "<td>" + obj.brand+ "</td>" +
                "<td>" + obj.category + "</td>" +
                "<td>" + obj.material + "</td>" +
                "<td>" + obj.description + "</td>" +
                "<td>" + (obj.avaliability ? 'Si' : 'No') + "</td>" +
                "<td>" + obj.price + "</td>" +
                "<td>" + obj.quantity + "</td>" +
                "<td>" + obj.photography + "</td>" +
            "</tr>"
        );
    
    });
}

function limpiarFormulario() {
    $("#accreference").val('');
    $("#accbrand").val('');
    $("#acccat").val('');
    $("#accmat").val('');
    $("#accdescr").val('');
    $("#accav").val('');
    $("#accprice").val('');
    $("#accstock").val('');
    $("#accphoto").val('');
}

function agregarAcc() {
    $('#btn_guardar').show();
    $('#btn_editar').hide();

    $('#addModalLabel').show();
    $('#editModalLabel').hide();

    $("#accreference").prop('disabled', false);

    limpiarFormulario();
}

function cargarAcc(idAcc) {
    id = idAcc;
	
    $('#btn_guardar').hide();
    $('#btn_editar').show();

    $('#addModalLabel').hide();
    $('#editModalLabel').show();

    $.ajax({
        url: "http://localhost:80/api/accessory/" + id,
        type: 'GET',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json", 
        success: function(data) {
            refDb = data.reference;

            $("#accreference").val(data.reference);
            $("#accbrand").val(data.brand);
            $("#acccat").val(data.category);
            $("#accmat").val(data.material);
            $("#accdescr").val(data.description);
            $("#accav").val(data.avaliability);
            $("#accprice").val(data.price);
            $("#accstock").val(data.quantity);
            $("#accphoto").val(data.photography);

            $("#accreference").prop('disabled', true);
        },
        error: function (xhr, status) {	
            console.log(xhr);
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function borrarAcc(idProd) {
    id = idProd;
}

function eliminarAcc() {
    $.ajax({
        //url del servicio
        url: "http://localhost:80/api/accessory/" + id,
        type: 'DELETE',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",
        
        success: function (data) {
            console.log(data);
            $('#btn_closeDelete').click();
            cargarProductos();
        },
 
        error: function (xhr, status) {	
            console.log(xhr);
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function editarAcc() {

    let datos = {
        reference: $("#accreference").val(),
        brand: $("#accbrand").val(),
        category: $("#acccat").val(),
        material: $("#accmat").val(),
        description: $("#accdescr").val(),
        avaliability: $("#accav").val(),
        price: $("#accprice").val(),
        quantity: $("#accstock").val(),
        photography: $("#accphoto").val()
    }

    let datosPeticion = JSON.stringify(datos);

    $.ajax({
        url: "http://localhost:80/api/accessory/update",
        data: datosPeticion,
        type: 'PUT',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",

        success: function (respuesta) {
            console.log(respuesta);
            limpiarFormulario();
            $('#btn_close').click();
            cargarProductos();
        },
        error: function (xhr, status) {		
            console.log("algo falló");	
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function guardarAcc() {
    let newref = $("#accreference").val();

    if (verificarReferencia(newref)) {
        alert("No fue posible crear el producto, la referencia ya existe");
        return;
    }

    let datos = {
        reference: newref,
        brand: $("#accbrand").val(),
        category: $("#acccat").val(),
        material: $("#accmat").val(),
        description: $("#accdescr").val(),
        avaliability: $("#accav").val(),
        price: $("#accprice").val(),
        quantity: $("#accstock").val(),
        photography: $("#accphoto").val()
    }

    let datosPeticion = JSON.stringify(datos);

    $.ajax({
        url: "http://localhost:80/api/accessory/new",
        data: datosPeticion,
        type: 'POST',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",

        success: function (respuesta) {
            console.log(respuesta);
            $('#btn_close').click();
            cargarProductos();
        },
        error: function (xhr, status) {		
            console.log("algo falló");	
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function verificarReferencia(referencia){
    var existe = true;

    $.ajax({
        //url del servicio
        url: "http://localhost:80/api/accessory/" + referencia,
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