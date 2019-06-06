function getAllProducts() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState != 4 || this.status != 200) {
            return;
        }
        let table = document.getElementById('customers');
        let response = JSON.parse(this.responseText);
        Object.entries(response).forEach(function(key, value) {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            td1 = addName(td1, value.name);
            td1 = addPrice(td1, value.price_in_cents);
            td1 = addId(td1, key);
            td1 = addDescription(td1, value.description);
            td1 = addColorOptions(td1);
            tr.append(td1);
            let td2 = document.createElement('td');
            td2.classList.add('cover')
            td2 = addImage(td2, value.image_url);
            tr.append(td2);
            table.append(tr);
        });
    };
    const endpoint = 'http://centaurus-13.ics.uci.edu:1025/webservices/v1/api/product';
    xhr.open('GET', endpoint);
    xhr.send();
}

function addName(td, name) {
    let nameContainer = document.createElement('div');
    nameContainer.classList.add('flex-container');
    let h1 = document.createElement('h1');
    h1.classList.add('namebox');
    h1.style.cssText = 'margin: 0%;';
    h1.textContent = name;
    nameContainer.appendChild(h1);
    td.append(nameContainer);
    return td;
}

function addPrice(td, priceInCents) {
    let priceContainer = document.createElement('div');
    priceContainer.classList.add('flex-container');
    priceContainer.style.margin = '0%';
    let h3 = document.createElement('h3');
    h3.classList.add('namebox');
    h3.style.cssText = 'margin: 0%;';
    h3.textContent = (parseNumber(priceInCents) / 100).toFixed(2);
    priceContainer.appendChild(h3);
    td.append(priceContainer);
    return td;
}

function addId(td, productId) {
    let idContainer = document.createElement('div');
    idContainer.style.cssText = 'display: flex; justify-content: start;';
    let p = document.createElement('p');
    let b = document.createElement('b');
    let em = document.createElement('em');
    em.textContent = 'Product ID';
    b.appendChild(em);
    // p.textContent = ':'
    p.appendChild(b);
    let u = document.createElement('u');
    u.textContent = productId;
    u.classList.add('idbox');
    p.appendChild(u);
    idContainer.appendChild(p);
    td.appendChild(idContainer);
    return td;
}

function addDescription(td, description) {
    let descriptionContainer = document.createElement('div');
    descriptionContainer.style.cssText = 'display: flex; justify-content: start;';
    let p = document.createElement('p');
    p.textContent = description;
    descriptionContainer.appendChild(p);
    td.appendChild(descriptionContainer);
    return td;
}

function addColorOptions(td) {
    let colorTextContainer = document.createElement('div');
    colorTextContainer.classList.add('flex-container');
    let h2 = document.createElement('h2');
    h2.textContent = 'Select your color:';
    colorTextContainer.appendChild(h2);
    td.appendChild(colorTextContainer);
    let colorOptionContainer = document.createElement('div');
    colorOptionContainer.classList.add('flex-container');
    let select = document.createElement('select');
    select.onclick = 'event.stopPropagation();';
    let optionValues = ['Red', 'White', 'Blue'];
    optionValues.forEach(function(optionValue) {
        let option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue;
        select.appendChild(option);
    });
    colorOptionContainer.appendChild(select);
    td.appendChild(colorOptionContainer);
    return td;
}

function addImage(td, imageUrl) {
    let img = document.createElement('img');
    img.classList.add('cover');
    img.src = imageUrl;
    td.appendChild(img);
    return td;
}
