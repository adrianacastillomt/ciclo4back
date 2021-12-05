$(document).ready(function(){
    $("#password").focus()
});

function login(){
//leemos los datos

    let email= $("#useremail").val()
    let password= $("#password").val()

    $.ajax({

        url:"http://localhost:80/api/user/"+email+"/"+password,
        type: 'GET',
        contentType: "application/JSON; charset=utf-8",
        dataType: "json", 

        success: function(data){
            console.log(data);
            verificarUsuario(data);
        },
        error: function(result, sts, err) {
            console.log("algo falló");
            alert("ocurrio un error, intente mas tarde")
        }


    });
}

function verificarUsuario(usuario){
    if (!usuario.id){
        alert("no existe un usuario")
    }
    else {
        alert("Bienvenido " + usuario.name);
        sessionStorage.setItem('user', JSON.stringify(usuario));

        window.location.replace("index.html");
    }
        

}



