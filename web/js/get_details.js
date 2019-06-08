function renderDetails() {
    let pid = document.location.search.replace('?', '').split('=')[1]
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState != 4 || this.status != 200) {
            return;
        }
        replaceSubstitutes(pid, JSON.parse(this.response));
    }
    xhr.open(
            'GET',
            `http://localhost:8080/Java-web-services/v1/api/product/${pid}`
    );
    xhr.send();
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
            '{{cost}}', `$${cost / 100}.00`);
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
    var f = function wtf() {
        let url = '/Store/Basket?pid=' + id;
        window.location = url;
    };
    buttonElement.onclick = f;
}
