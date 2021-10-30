//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showArticulos(lista) {
    let articulo = "";
    let resumen = "";
    let subtotal = "" ;

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
                        <input type="number"  id="cantidad${i}" value="${art.count}" onchange="cantTotal(${i}, '${art.currency}')">
                        <p class="mb-1 precio"> $ ${art.currency} ${art.unitCost} c/u </p>
                        
                    </div>
            
                    <div class="row">
                        <div class="col" >
                        <p>Costo total</p>
                        <p id="precioPorCantidad${i}">$ ${art.currency} ${(art.count * art.unitCost)}</p>
                        </div></div>
            
                </div>
            </div>
        `
        resumen += `<div class=" row list-group-item"> 
        <strong> ${art.name} </strong>
        <p align="right" class="subtotal" id="resumen${i}">$ ${art.currency} ${(art.count * art.unitCost)}</p>
        </div>
        `
        subtotal += `$ ${art.currency} ${(art.count * art.unitCost)}`


        document.getElementById("resumen").innerHTML = resumen;
        document.getElementById("articulos").innerHTML = articulo;
        document.getElementById("subTotal").innerHTML = subtotal
    }
    
}
function cantTotal(i, currency) {
    let array = artData ;
        let art = array.articles[i];
        let num = document.getElementById(`cantidad${i}`).value;
        let mult = art.unitCost;
        let precPorCantTot = num * mult
        
        document.getElementById(`precioPorCantidad${i}`).innerHTML =  "$ "+ currency +" "+ precPorCantTot;
        document.getElementById(`resumen${i}`).innerHTML ="$ "+ currency +" "+ precPorCantTot;
        document.getElementById("subTotal").innerHTML = "$ "+ currency +" "+ precPorCantTot;
    
}

function comprar() {
    alert("Su compra ha sido realizada con exito");
    window.location = "inicio.html";
}
function seleccionado() {
    let credito = document.getElementById("credito");
    let parrafo = document.getElementById("seleccionado");
    if (credito.checked) {
        parrafo.innerHTML = "Tarjeta de crédito"
    }else{
        parrafo.innerHTML = "Transferencia bancaria"
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(resultObj => {
        artData = resultObj.data;
        showArticulos(artData.articles);

    });
});