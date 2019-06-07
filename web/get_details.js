function renderDetails() {
    let pid = document.location.search.replace('?', '').split('=')[1]
    let data = '{"image":"https:\/\/i.dmarge.com\/2015\/09\/officine-generale-960x960.jpg","cost":"20","name":"Shirt","desc":"A T-shirt (or t shirt, or tee) is a style of unisex fabric shirt named after the T shape of its body and sleeves. Traditionally it has short sleeves and a round neckline, known as a crew neck, which lacks a collar. T-shirts are generally made of a stretchy, light and inexpensive fabric and are easy to clean. Made from 100% cotton only in our store."}'
    /*
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        
    }
    xhr.open(
            'GET',
            `http://centaurus-13.ics.uci.edu:1025/webservices/v1/api/product/${pid}`
    );
    xhr.send();
    */
    replaceSubstitutes(pid, JSON.parse(data));
}

function replaceSubstitutes(pid, data) {
    renderDetailName(data.name);
    renderDetailId(pid);
    renderDetailCost(data.cost);
    renderDetailImg(data.image);
    renderDetailDescription(data.desc);
    updateRedirectUrl(pid);
}

function renderDetailName(name) {
    let descElement = document.getElementById('product-name');
    descElement.textContent = descElement.textContent.replace(
            '{{name}}', name);
}

function renderDetailId(id) {
    let idElement = document.getElementById('id');
    idElement.textContent = idElement.textContent.replace(
            '{{id}}', id);
}

function renderDetailCost(cost) {
    let costElement = document.getElementById('cost');
    costElement.textContent = costElement.textContent.replace(
            '{{cost}}', cost);
}

function renderDetailImg(url) {
    let imgElement = document.getElementById('imgs');
    imgElement.src = url;
}

function renderDetailDescription(desc) {
    let descElement = document.getElementById('desc');
    descElement.textContent = descElement.textContent.replace(
            '{{desc}}', desc);
}

function updateRedirectUrl(id) {
    let buttonElement = document.getElementById('redirect-button');
    buttonElement.setAttribute(
            'onclick', `window.location='/HelloWorldApp/Basket?pid=${id}`);
}
