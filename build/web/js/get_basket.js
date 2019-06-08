function get_basket() {
    // let data = '{"1":{"image":"https:\/\/i.dmarge.com\/2015\/09\/officine-generale-960x960.jpg","cost":"20","name":"Shirt","desc":"A T-shirt (or t shirt, or tee) is a style of unisex fabric shirt named after the T shape of its body and sleeves. Traditionally it has short sleeves and a round neckline, known as a crew neck, which lacks a collar. T-shirts are generally made of a stretchy, light and inexpensive fabric and are easy to clean. Made from 100% cotton only in our store."},"2":{"image":"https:\/\/s3.amazonaws.com\/livetoimpress\/basics\/lst\/white.jpg","cost":"25","name":"Long Shirt","desc":"A T-shirt (or t shirt, or tee) is a style of unisex fabric shirt named after the T shape of its body and sleeves. Traditionally it has short sleeves and a round neckline, known as a crew neck, which lacks a collar. T-shirts are generally made of a stretchy, light and inexpensive fabric and are easy to clean. Long sleeve t-shirt adds length to the sleeves. Made from 100% cotton only in our store."},"3":{"image":"https:\/\/images-na.ssl-images-amazon.com\/images\/I\/51BmB81FHYL._UX679_.jpg","cost":"30","name":"Smart Shirt","desc":"Our smart shirt is light and comfortable. Lightweight and quick dry Fit optimized for regulation of moisture\/heat Excellent UV Protection 99.9% Antibacterial Treatment (no odors) Pocket on the right side with a YKK zipper to store the device 73% Polyamide Micro\/27% Elastane Designed to stand up to tough conditions Machine washable (piling and stretching resistant)"},"4":{"image":"https:\/\/assets.adidas.com\/images\/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy\/5fdb4a6cba254ed59934a962007d86a7_9366\/Tiro_19_Training_Pants_Black_D95957_21_model.jpg","cost":"15","name":"Sports Pants","desc":"Our jogger pants are a kind of sweat pants that are made of a soft fabric. It\u2019s relatively loose with tight elastic at the ankles. It\u2019s comfortable and shields wind so can be worn for for long jogs or if you want to feel warm on a cold day."},"5":{"image":"https:\/\/oldnavy.gap.com\/webcontent\/0015\/261\/176\/cn15261176.jpg","cost":"20","name":"Khakis","desc":"Khaki pants. Khaki is a color, a light shade of brown with a yellowish tinge. Khaki is an equal mix of sage and buff so it is considered a quinary color.[1] Khaki has been used by many armies around the world for uniforms, including camouflage. It has been used as a color name in English since 1848 when it was first introduced as a military uniform, and was called both drab and khaki"},"6":{"image":"https:\/\/www.thousandmile.com\/image\/cache\/catalog\/PRODUCTS\/Bottoms\/1212%20Summer%20Short\/1212-DEN_1600-798x798.jpg","cost":"15","name":"Shorts","desc":"Shorts are a garment worn over the pelvic area, circling the waist and splitting to cover the upper part of the legs, sometimes extending down to the knees but not covering the entire length of the leg."},"7":{"image":"https:\/\/assets.adidas.com\/images\/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy\/5c23ebd41b8040f18dffa88a003573d0_9366\/Trefoil_Crew_Socks_6_Pairs_Black_BH6437_03_standard.jpg","cost":"5","name":"Socks","desc":"Black and white socks. A sock is an item of clothing worn on the feet and often covering the ankle or some part of the calf. Some type of shoe or boot is typically worn over socks. In ancient times, socks were made from leather or matted animal hair."},"8":{"image":"https:\/\/www.cyclegear.com\/_a\/product_images\/0383\/9834\/reax_tasker_leather_gloves_black_750x750.jpg","cost":"10","name":"Gloves","desc":"Warm gloves.Gloves are pieces of clothing which cover your hands and wrists and have individual sections for each finger. You wear gloves to keep your hands warm or dry or to protect them."},"9":{"image":"https:\/\/thisiscontact.net\/wp-content\/uploads\/sites\/23\/2018\/02\/BSDT_WhiteHoodie_Back-600x621.jpg","cost":"30","name":"Hoodie","desc":"Our jogger pants are a kind of sweat pants that are made of a soft fabric. It\u2019s relatively loose with tight elastic at the ankles. It\u2019s comfortable and shields wind so can be worn for for long jogs or if you want to feel warm on a cold day."},"10":{"image":"https:\/\/cdn.shopify.com\/s\/files\/1\/0128\/9452\/products\/apparel_outerwear_tsm_fleece-varsity_black_01_1024x1024.jpg","cost":"40","name":"Jacket","desc":"A jacket is a mid-stomach\u2013length garment for the upper body. A jacket typically has sleeves, and fastens in the front or slightly on the side. A jacket is generally lighter, tighter-fitting, and less insulating than a coat, which is outerwear. Some jackets are fashionable, while others serve as protective clothing."}}'
    // d = JSON.parse(data);
    // renderBasketItems(d);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState != 4 || this.status != 200) {
            return;
        }
        renderBasketItems(JSON.parse(this.response));
    };
    xhr.open('GET',
            ' http://centaurus-13.ics.uci.edu:1025/webservices/v1/api/product/');
    xhr.send();
}

var tableFormat = '<tr><td>' +
        "<div class='flex-container'>" +
        "<h1 id='product-name' class='namebox' style='margin: 0%;'>{{name}}</h1>" + 
        "</div> <div class='flex-container' style='margin: 0%;'>" +
        "<h3 id='cost' class='namebox' style='margin: 0%;'>{{cost}}</h3>" +
        "<p id='{{id}}-price-hidden' style='display: none'>{{cost}}</p>" +
        "</div><div>" + 
        "<p id='desc'>{{desc}}</p></div></td>" +
        "<td class='cover'>" + 
        "<img id='imgs' style='height: 10vh; width:10vw;' src='{{img}}' />" +
        "</td></tr>";

var total = 0;

function renderBasketItems(items) {
    let table = document.getElementById('basket-items');
    let basketItemIds = document.getElementById('basket-item-ids').textContent.split(' ');
    basketItemIds.filter(function(i) {
        return i != ''; 
    }).forEach(function(basketItemId) {
        renderBasketItem(items[basketItemId], basketItemId, table);
    })
    calcTotal();
}

function renderBasketItem(data, basketItemId, table) {
    let tableFormatCopy = tableFormat.slice();
    tableFormatCopy = renderSummaryName(tableFormatCopy, data.name);
    tableFormatCopy = renderSummaryCost(tableFormatCopy, data.cost);
    tableFormatCopy = renderSummaryDesc(tableFormatCopy, data.desc);
    tableFormatCopy = renderSummaryImg(tableFormatCopy, data.image);
    tableFormatCopy = renderSummaryHiddenPrice(tableFormatCopy, basketItemId, data.cost);
    table.insertAdjacentHTML('beforeend', tableFormatCopy);
}

function renderSummaryName(table, name) {
    return table.replace('{{name}}', name);
    }

function renderSummaryCost(table, cost) {
    total += Number(cost);
    return table.replace('{{cost}}', `$${cost / 100}.00`);
}

function renderSummaryDesc(table, desc) {
    return table.replace('{{desc}}', desc);
}

function renderSummaryImg(table, img) {
    return table.replace('{{img}}', img);
}

function calcTotal() {
    let totalElement = document.getElementById('total');
    totalElement.textContent = totalElement.textContent.replace(
            '{{total}}', `$${total / 100}.00`);
}

function renderSummaryHiddenPrice(table, pid, cost) {
    let tableCpy = table.replace('{{id}}', pid);
    tableCpy = tableCpy.replace('{{cost}}', cost);
    return tableCpy;
}
