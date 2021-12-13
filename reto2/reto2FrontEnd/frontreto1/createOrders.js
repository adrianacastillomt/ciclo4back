var id = 0;
var refDb = '';
var productosDb = new Map();
var orders = new Map();

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
        productosDb.set(obj.reference, obj);
        $("#tablaAcc tbody").append(
            "<tr>" +
				"<td>"+
'<button type="button" class="btn btn-primary" id="add_' + obj.reference + '" onclick="cargarOrder(\''+ obj.reference + '\');">Agregar</button>'+
"</td>"+
"<td>"+
'<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteAccModal" id="del_' + obj.reference + '" onclick="borrarOrder(\''+ obj.reference + '\');" style="display:none">Eliminar</button>'+
"</td>"+
                "<td>" + obj.brand+ "</td>" +
                "<td>" + obj.category + "</td>" +
                "<td>" + obj.description + "</td>" +
                "<td>" + obj.price + "</td>" +
                "<td><img src='" + obj.photography+ "' class='img-fluid img-thumbnail'></td>" +
                '<td><input type="number" id="prod_' + obj.reference + '"/ ></td>' +
            "</tr>"
        );
    
    });
}

function cargarOrder(idAcc) {
    let cantidadOrden = $('#prod_' + idAcc).val();

    if(!cantidadOrden || cantidadOrden <= 0) {
        alert('Cantidad invalida');
        return;
    }

    let cantidadEstoque = productosDb.get(idAcc).quantity;

    if(cantidadOrden > cantidadEstoque) {
        alert('Cantidad sobrepasa ' + cantidadEstoque);
        return;
    }

    $('#prod_' + idAcc).prop('disabled', true);
    $('#add_' + idAcc).hide();
    $('#del_' + idAcc).show();

    orders.set(idAcc, cantidadOrden);
}

function borrarOrder(idAcc) {
    $('#prod_' + idAcc).val(0);
    $('#prod_' + idAcc).prop('disabled', false);
    $('#add_' + idAcc).show();
    $('#del_' + idAcc).hide();

    orders.delete(idAcc);
}

function enviarOrder() {
    let usuario = JSON.parse(sessionStorage.getItem('user'));
    let productos = {};
    let quantities ={};

    for (let [key, value] of orders.entries()) {
        quantities[key] = value;
        productos[key] = productosDb.get(key);
    }

    let body = {
        registerDay: Date.now(),
        status: "Pendiente",
        salesMan: usuario,
        products: productos,
        quantities: quantities
    }

    console.log(JSON.stringify(body));

    $.ajax({
        url: "http://localhost:80/api/order/new",
        data: JSON.stringify(body),
        type: 'POST',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",

        success: function (respuesta) {
            console.log(respuesta);
            alert('El código de tu pedido es ' + respuesta.id);
            location.href="index.html";
        },
        error: function (xhr, status) {		
            console.log("algo falló");	
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}