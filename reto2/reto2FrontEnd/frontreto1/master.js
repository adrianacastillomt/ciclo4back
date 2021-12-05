var usuario;

$(document).ready(function () {
    estadoInicial()
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

function navegar(page) {
    $('#page-content').load(page);
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