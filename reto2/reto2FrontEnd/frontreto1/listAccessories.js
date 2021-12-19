var id = 0;
var refDb = '';
var usuario;

$(document).ready(function () {
    $.support.cors = true;

    cargarProductos();
    usuario = getUser();

    switch(usuario.type) {
        case "ADM":
            $('#accDescrFilterDiv').hide();
            $('#accPriceFilterDiv').hide();
            break;
        case "ASE":
            $('#agregarAccBtn').hide();
            break;
        case "COORD":
            $('#agregarAccBtn').hide();
            $('#accDescrFilterDiv').hide();
            $('#accPriceFilterDiv').hide();
            break;
    }
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

function filtrarAcc(filter) {
    let urlFiltro = "";

    switch (filter) {
        case "descr": 
            if ($('#accDescrFilter').val())
                urlFiltro = "description/" + $('#accDescrFilter').val()
            else
                urlFiltro = "all"

            break;
        case "price": 
            if ($('#accPriceFilter').val())
                urlFiltro = "price/" + $('#accPriceFilter').val()
            else
                urlFiltro = "all"
            
            break;
        default:
            urlFiltro = "all"
    }

    $.ajax({
        url: "http://localhost:80/api/accessory/" + urlFiltro,
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
        let html = `<tr>
        <td>${obj.reference}</td>
        <td>${obj.brand}</td>
        <td>${obj.category}</td>
        <td>${obj.material}</td>
        <td>${obj.description}</td>
        <td>${(obj.availability ? 'Si' : 'No')}</td>
        <td>${obj.price}</td>" +
        <td>${obj.quantity}</td>" +
        <td><img src='${obj.photography}' class='img-fluid img-thumbnail'></td>`;

        if (usuario.type === 'ADM') {
            html += 
            `<td>   
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editAccModal" onclick="cargarAcc('${obj.reference}');">Editar</button>
            </td>
            <td>
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteAccModal" onclick="borrarAcc('${obj.reference}');">Eliminar</button>
            </td>`;
        }
        
        html += `</tr>`;

        $("#tablaAcc tbody").append(
            html
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
            $("#accav").val(data.availability);
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
        availability: $("#accav").val(),
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
        availability: $("#accav").val(),
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