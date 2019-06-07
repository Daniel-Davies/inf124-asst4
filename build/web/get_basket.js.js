function fillTable() {
    let data = '{"image":"https:\/\/i.dmarge.com\/2015\/09\/officine-generale-960x960.jpg","cost":"20","name":"Shirt","desc":"A T-shirt (or t shirt, or tee) is a style of unisex fabric shirt named after the T shape of its body and sleeves. Traditionally it has short sleeves and a round neckline, known as a crew neck, which lacks a collar. T-shirts are generally made of a stretchy, light and inexpensive fabric and are easy to clean. Made from 100% cotton only in our store."}';
    d = JSON.parse(data);
    renderBasketItems(d);
}

var tableFormat = '<tr><td>' +
        "<div class='flex-container'>"
        "<h1 id='product-name' class='namebox' style='margin: 0%;'>{{name}}</h1>" + 
        "</div> <div class='flex-container' style='margin: 0%;'>" +
        "<h3 id='cost' class='namebox' style='margin: 0%;'>{{cost}}</h3>" +
        "</div><div>" + 
        "<p id='desc'>{{desc}}</p></div></td>" +
        "<td class='cover'>" + 
        "<img id='imgs' style='height: 10vh; width:10vw;' src='{{img}}' />" +
        "</td></tr>";

var total = 0;

function renderBasketItems(items) {
    // May require session management
    let table = document.getElementById('basket-items')
    items.forEach(function(data, index) {
        renderBaksetItem(data, table)
    })
}

function renderBasketItem(data, table) {
    let tableFormatCopy = tableFormat.slice();
    renderSummaryName(tableFormatCopy, data.name);
    renderSummaryCost(tableFormatCopy, data.cost);
    renderSummaryDesc(tableFormatCopy, data.desc);
    renderSummaryImg(tableFormatCopy, data.img);
    table.insertAdjacentHTML('beforeend', tableFormatCopy);
}

function renderSummaryName(table, name) {
    table.replace('{{name}}', name);
}

function renderSummaryCost(table, cost) {
    table.replace('{{cost}}', cost);
    total += Number(cost);
}

function renderSummaryDesc(table, desc) {
    table.replace('{{desc}}', desc);
}

function renderSummaryImg(table, img) {
    table.replace('{{img}}', img)
}

function calcTotal() {
    let totalElement = document.getElementById('total')
    totalElement.textContent = totalElement.textContent.replace(
            '{{total}}', total);
}
