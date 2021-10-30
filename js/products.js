//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var minCost;
var maxCost;
const ORDEN_ASC = 1;
const ORDEN_DESC = 2;
const ORDEN_POR_RELEVANCIA = 3;

var buscar;


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(productos => {
        prodData = productos.data;
        showProducts(prodData);
    });
});

function sortProductos(criterio, array) {
    let result = [];
    if (criterio === 1) {
        result = array.sort(
            function (a, b) {
                if (a.cost < b.cost) { return -1; }
                if (a.cost > b.cost) { return 1; }
                return 0;
            }
        );
    } else if (criterio === 2) {
        result = array.sort(
            function (a, b) {
                if (a.cost > b.cost) { return -1; }
                if (a.cost < b.cost) { return 1; }
                return 0;
            }
        );
    } else if (criterio === 3) {
        result = array.sort(
            function (a, b) {
                if (a.soldCount > b.soldCount) { return -1; }
                if (a.soldCount < b.soldCount) { return 1; }
                return 0;
            }
        );
    
    }

    return result;
}



function showProducts(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let producto = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(producto.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(producto.cost) <= maxCost))) {
            if (buscar == undefined || producto.name.toLowerCase().indexOf(buscar) != -1 || producto.description.toLowerCase().indexOf(buscar)!= -1) {

                htmlContentToAppend += `
                <div class="col-md-4 col-sm-6 col-12">
               
                <div class="card"  style="width: 18rem;">
                   <img src="${producto.imgSrc}" class="card-img-top" alt="${producto.name}">
                   <div class="card-body">
                     <h5 class="card-title">${producto.name}</h5>
                     <small class="card-text">${producto.soldCount} productos vendidos.</small>
                     <p class="card-text">${producto.description}</p>
                     <p style="text-align: right;" ><strong  class="card-text">${producto.currency} ${producto.cost}</strong></p>
                     
                     <a href="product-info.html" class="btn btn-light">Ver producto</a>
                    </div>
                </div>
            
            </div>
            `
            }
        }
        document.getElementById("productos-list-container").innerHTML = htmlContentToAppend;
    }
}




//evento al cargar la pagina
document.addEventListener("DOMContentLoaded", function (e) {


    document.getElementById("sortAsc").addEventListener("click", function () {
        sortProductos(ORDEN_ASC, prodData);
        showProducts(prodData);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortProductos(ORDEN_DESC, prodData);
        showProducts(prodData);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function () {
        sortProductos(ORDEN_POR_RELEVANCIA, prodData);
        showProducts(prodData);
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProducts(prodData);
    });

    document.getElementById("btnFiltro").addEventListener("click", function () {

        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showProducts(prodData);
    });
    document.getElementById("buscador").addEventListener("input", function () {
        buscar = document.getElementById("buscador").value.toLowerCase();
        showProducts(prodData);
    })
});