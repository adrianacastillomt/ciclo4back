var idOrder;
var orderDb = {};

$(document).ready(function () {
    $.support.cors = true;

    idOrder =sessionStorage.getItem('idOrder');

    console.log('>>>> idOrder ' + idOrder);

    cargarOrder();
});

function cargarOrder() {
    $.ajax({
        url: "http://localhost:80/api/order/" + idOrder,
        type: 'GET',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",
        
        success: function (order) {
            console.log(order);
            orderDb = order;

            poblarTabla(order);
        },
 
        error: function (xhr, status) {	
            console.log(xhr);
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}

function poblarTabla(order) {
    if ($("#tablaOrder tbody").length == 0) {
            $("#tablaOrder").append("<tbody></tbody>");
    } else {
        $("#tablaOrder tbody").empty();
    }

    if ($("#tablaStatus tbody").length == 0) {
        $("#tablaStatus").append("<tbody></tbody>");
    } else {
        $("#tablaStatus tbody").empty();
    }

    $("#tablaStatus tbody").append(
        "<tr>" +
            "<td>" + new Date(order.registerDay).toLocaleDateString("en-GB") + "</td>" +
            "<td>" + order.id + "</td>" +
            "<td>" + order.status + "</td>" +
            "<td>" + 
                `<select id="orderStatus" name="orderStatus" class="form-control">  
                    <option value="">Seleccionar</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Rechazado">Rechazado</option>
                </select>` +
            "</td>" +
            "<td>" + 
                '<button type="button" class="btn btn-success" onclick="changeOrderStatus();">Guardar Estado</button>' +
            "</td>" +
        "</tr>"
    );

    $.each(order.products, function (index, obj) {
        $("#tablaOrder tbody").append(
            "<tr>" +
                "<td><img src='" + obj.photography+ "' class='img-fluid img-thumbnail'></td>" +
                "<td>" + obj.brand + "</td>" +
                "<td>" + obj.category + "</td>" +
                "<td>" + obj.description + "</td>" +
                "<td>" + obj.price + "</td>" +
                "<td>" + order.quantities[index] + "</td>" +
                "<td>" + obj.quantity + "</td>" +
            "</tr>"
        );
    
    });
}

function changeOrderStatus() {
    let status = $('#orderStatus').val();

    if (status) {
        orderDb['status'] = status;
    } else {
        alert('Estado no es valido');
        return;
    }
    
    console.log(JSON.stringify(orderDb));

    $.ajax({
        url: "http://localhost:80/api/order/update",
        data: JSON.stringify(orderDb),
        type: 'PUT',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json",

        success: function (respuesta) {
            console.log(respuesta);
            navegar('listOrders.html');
        },
        error: function (xhr, status) {		
            console.log("algo falló");	
        },
        complete: function (xhr, status) {
            console.log("Todo bien"  + status);
        }
    });
}