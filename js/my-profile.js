//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let form = document.getElementById("formulario");
let text = document.getElementById("texto");
let datosUser = localStorage.getItem('Datos-User');

function actDatos() {


    form.style = "display: inline-block;";

    text.style = "display: none;";
}

function guardarDatos() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("cel").value;
    let edad = document.getElementById("edad").value;

    localStorage.setItem('Datos-User', JSON.stringify({ nombre: nombre, apellido: apellido, telefono: telefono, email: email, edad: edad }));

    text.style = "display: inline-block;";

    form.style = "display: none;";

    let datosUser = localStorage.getItem('Datos-User');
    if (datosUser) {
        datosUser = JSON.parse(datosUser);
        document.getElementById("name").innerHTML = "Nombre: " + datosUser.nombre;
        document.getElementById("lname").innerHTML = "Apellido: " + datosUser.apellido;
        document.getElementById("anios").innerHTML = "Edad: " + datosUser.edad;
        document.getElementById("mail").innerHTML = "E-mail: " + datosUser.email;
        document.getElementById("tel").innerHTML = "Teléfono de contacto: " + datosUser.telefono;
    }
}
document.addEventListener("DOMContentLoaded", function (e) {

    let datosUser = localStorage.getItem('Datos-User');
    if (datosUser) {
        datosUser = JSON.parse(datosUser);
        document.getElementById("name").innerHTML = "Nombre: " + datosUser.nombre;
        document.getElementById("lname").innerHTML = "Apellido: " + datosUser.apellido;
        document.getElementById("anios").innerHTML = "Edad: " + datosUser.edad;
        document.getElementById("mail").innerHTML = "E-mail: " + datosUser.email;
        document.getElementById("tel").innerHTML = "Teléfono de contacto: " + datosUser.telefono;


        document.getElementById("nombre").value = datosUser.nombre
        document.getElementById("apellido").value = datosUser.apellido
        document.getElementById("email").value = datosUser.email
        document.getElementById("cel").value =  datosUser.telefono
        document.getElementById("edad").value = datosUser.edad


    }





});