function getScore() {
    var elements = document.getElementsByName("score");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return parseInt(elements[i].value);
        }
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("star").innerHTML = `
    <div class="star-rating">
    
    <input id="star-5" type="radio" name="score" value="5" />
    <label for="star-5" title="5 star">
    <i class="active fa fa-star"></i>
    </label>
        
    <input id="star-4" type="radio" name="score" value="4" />
    <label for="star-4" title="4 star">
    <i class="active fa fa-star"></i>
    </label>

    <input id="star-3" type="radio" name="score" value="3" />
    <label for="star-3" title="3 star">
    <i class="active fa fa-star"></i>
    </label>
    
    <input id="star-2" type="radio" name="score" value="2" />
    <label for="star-2" title="2 star">
    <i class="active fa fa-star"></i>
    </label>
    
    <input id="star-1" type="radio" name="score" value="1" checked />
    <label for="star-1" title="1 star">
    <i class="active fa fa-star"></i>
    </label>

    </div>
    `;
})