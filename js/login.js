//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("submitBtn").addEventListener('click', function () {
        let inputUser = document.getElementById("inputUser");
        let inputPass = document.getElementById("inputPass");
        let camposCompletos = true;

        if(inputUser.value==='') {
            camposCompletos = false;
            inputUser.classList.add("invalid");
        }else{
            inputUser.classList.remove("invalid");
        }
        if(inputPass.value==='') {
            camposCompletos = false;
            inputPass.classList.add("invalid");
        }else{
            inputPass.classList.remove("invalid");
        }

        if(camposCompletos) {
            window.location = "inicio.html";
        }
        
    })
});