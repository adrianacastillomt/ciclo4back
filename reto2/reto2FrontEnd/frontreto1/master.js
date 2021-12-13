var usuario;

var types = new Map();
types.set('ADM','Administrador');
types.set('ASE','Asesor Comercial');
types.set('COORD','Coordinador de Zona');

$(document).ready(function () {
    estadoInicial();
    cargarUser();
    cargarMenu();
});

function estadoInicial() {
    usuario = JSON.parse(sessionStorage.getItem('user'));
    
    if (!usuario) {
        console.log('user no encontrado')
        window.location.replace("login.html");
    }
    
    $('#navbarDropdown').html(usuario.name)
}

function logout() {
    sessionStorage.clear();
    window.location.replace("login.html");
}

function cargarMenu() {
    let menu = $('#menuUser');

    menu.empty();

    switch (usuario.type) {
        case "ADM":
            menu.append(`
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!" onclick="navegar('listUsers.html');">Administraci&oacute;n Usuarios</a>
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!" onclick="navegar('listAccessories.html');">Inventario de Productos</a>
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!" onclick="navegar('createOrders.html');">Orden de Pedido</a>
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!" onclick="navegar('listOrders.html');">Listado de Pedidos</a>`
            );
            break;
        case "ASE":
            menu.append(`
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!" onclick="navegar('createOrders.html');">Orden de Pedido</a>`
            );
            break;
        case "COORD":
            menu.append(`
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!" onclick="navegar('createOrders.html');">Orden de Pedido</a>
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!" onclick="navegar('listOrders.html');">Listado de Pedidos</a>`
            );
            break;
        default:
            break;
    }
}

function navegar(page) {
    $('#page-content').load(page);
}

function cargarUser() {
    $("#tablaUsuarios tbody").append(
        "<tr>" +
            "<td>" + usuario.identification+ "</td>" +
            "<td>" + usuario.name + "</td>" +
            "<td>" + usuario.email + "</td>" +
            "<td>" + types.get(usuario.type) + "</td>" +
            "<td>" + usuario.zone + "</td>" +
        "</tr>"
    );
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    
    return vars;
}

window.addEventListener('DOMContentLoaded', event => {

    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});