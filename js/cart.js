//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let artData = [];
let sumaTotal;


function showArticulos(lista) {
    let articulo = "";
    let resumen = "";
    

    for (i = 0; i < lista.length; i++) {
        let art = lista[i];
        articulo += `
        <div class="list-group-item">
                <div class="row">
                    <div class="col-3">
                        <img src="${art.src}" alt="${art.name} " class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${art.name} </h4>
                            
                        </div>
                        <input type="number"  id="cantidad${i}" value="${art.count}" onchange="subTotal(${i})">
                        <p class="mb-1 precio"> $ ${art.currency} ${art.unitCost} c/u </p>
                        
                    </div>
            
                    <div class="row">
                        <div class="col" >
                        <p>Precio unitario</p>
                        <p>$ ${art.currency} <spam id="precio${i}">${art.unitCost}</spam></p>
                        </div></div>
            
                </div>
            </div>
        `
        resumen += `<div class=" row list-group-item"> 
        <strong> ${art.name} </strong>
        <p align="right" class="subtotal">$ ${art.currency} <spam id="precioPorCantidad${i}">${(art.count * art.unitCost)}<spam></p>
        </div>
        `
        


        document.getElementById("resumen").innerHTML = resumen;
        document.getElementById("articulos").innerHTML = articulo;
        subTotal(i)
    }
    
}

function subTotal(i) {

    let precio = parseInt(document.getElementById(`precio${i}`).innerText);
    let num = document.getElementById(`cantidad${i}`).value;
    let subTotal = num * precio;

    
    document.getElementById(`precioPorCantidad${i}`).innerHTML =  subTotal;

    document.getElementById("subTotal").innerHTML = subTotal;
    total(artData)
}
//Hago esta funcion por si en algun momento hay mas de un producto en el carrito
function total(artData) {
    sumaTotal = 0;
    
    for (i = 0; i < artData.articles.length; i++) {
        sumaTotal += parseFloat(document.getElementById(`precioPorCantidad${i}`).innerHTML)
        
    }
    
    calcTotal()
}

function calcTotal() {

    let premium = document.getElementById("premium")
    let express = document.getElementById("express")
    let standard = document.getElementById("standard")
    let costoEnvio;
    
    if (premium.checked == true) {
        costoEnvio = Math.round(sumaTotal * 15) / 100
        
    }
    if (express.checked == true) {
        costoEnvio = Math.round(sumaTotal * 7) / 100
        
    }
    if (standard.checked == true) {
        costoEnvio = Math.round(sumaTotal * 5) / 100
        
    }
    
    
    document.getElementById('total').innerHTML = (sumaTotal + costoEnvio)
    document.getElementById('soloEnvio').innerHTML = costoEnvio ;
    ;

}





function comprar() {
    alert();
    window.location = "inicio.html";
}
function seleccionado() {
    let credito = document.getElementById("credito");
    let parrafo = document.getElementById("seleccionado");
    if (credito.checked) {
        parrafo.innerHTML = "Tarjeta de crédito"
    } else {
        parrafo.innerHTML = "Transferencia bancaria"
    }
}


function valModalCredit() {
       
            document.getElementById("numeroTarjeta").classList.add("was-validated");
            document.getElementById("transfBancaria").classList.remove("was-validated");
}
function valModalTransf() {

    document.getElementById("transfBancaria").classList.add("was-validated");
    document.getElementById("numeroTarjeta").classList.remove("was-validated");
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(resultObj => {
        artData = resultObj.data;
        showArticulos(artData.articles);
        total(artData)

    });
    let premium = document.getElementById('premium')
    let express = document.getElementById('express')
    let standard = document.getElementById('standard')
    premium.addEventListener("click", function () {
        calcTotal()
    })
    express.addEventListener("click", function () {
        calcTotal()
    })
    standard.addEventListener("click", function () {
        calcTotal()
    })

    
});