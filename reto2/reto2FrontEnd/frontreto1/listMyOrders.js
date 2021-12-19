var usuario;
var filter;

$(document).ready(function () {
    $.support.cors = true;

    usuario = JSON.parse(sessionStorage.getItem('user'));
    cargarOrdenes();
});

function cargarOrdenes() {
    $.ajax({
        url: "http://localhost:80/api/order/salesman/" + usuario.id,
        type: 'GET',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",
        
        success: function (ordenes) {
            console.log(ordenes);
            poblarTabla(ordenes);
        },
 
        error: function (xhr, status) {	
            console.log(xhr);
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function filtrarPor(filtro) {
    switch (filtro) {
        case "status":
            $('#orderDate').val("");
            break;
        case "date":
            $('#orderStatus').val('');
            break;
        
    }

    filter = filtro;
}

function filtrarOrdenes() {
    if (!filter)
        return;

    let urlFiltro = "";

    switch (filter) {
        case "status": 
            urlFiltro = "state/" + $('#orderStatus').val() + "/" + usuario.id
            break;
        case "date": 
            urlFiltro = "date/" + $('#orderDate').val() + "/" + usuario.id
            break;
        default:
            urlFiltro = "salesman/" + usuario.id
    }

    $.ajax({
        url: "http://localhost:80/api/order/" + urlFiltro,
        type: 'GET',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",
        
        success: function (ordenes) {
            console.log(ordenes);
            poblarTabla(ordenes);
        },
 
        error: function (xhr, status) {	
            console.log(xhr);
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function poblarTabla(ordenes) {
    if ($("#tablaOrders tbody").length == 0) {
            $("#tablaOrders").append("<tbody></tbody>");
    } else {
        $("#tablaOrders tbody").empty();
    }

    $.each(ordenes, function (index, obj) {
        $("#tablaOrders tbody").append(
            "<tr>" +
                "<td>" + new Date(obj.registerDay).toLocaleDateString("en-GB") + "</td>" +
                "<td>" + obj.id + "</td>" +
                "<td>" + obj.status + "</td>" +
                '<td><button type="button" class="btn btn-success" onclick="cargarOrder('+ obj.id + ');">Ver Pedido</button></td>' +
            "</tr>"
        );
    
    });
}

function cargarOrder(idOrder) {
    sessionStorage.setItem('idOrder', idOrder);
    
    navegar("detailsOrder.html");
}