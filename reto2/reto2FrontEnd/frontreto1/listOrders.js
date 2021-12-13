var usuario;

$(document).ready(function () {
    $.support.cors = true;

    usuario = JSON.parse(sessionStorage.getItem('user'));
    cargarOrdenes();
});

function cargarOrdenes() {
    $.ajax({
        url: "http://localhost:80/api/order/zona/" + usuario.zone,
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
                "<td>" + obj.salesMan.identification+ "</td>" +
                "<td>" + obj.salesMan.name + "</td>" +
                "<td>" + obj.salesMan.email + "</td>" +
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