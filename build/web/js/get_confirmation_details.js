/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function get_confirmation_details() {
    get_orderer_details();
    get_ordered_product_details();
    
}

function get_orderer_details() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (this.status != 200 || this.readyState != 4) {
            return false;
        }
        let response = JSON.parse(this.response);
        let ks = Object.keys(response).map(function(k) {
            return Number(k);
        });
        let latest_order = Math.max(...ks);
        let target_order = response[latest_order];
        replace_orderer_placeholders(target_order);
    };
    xhr.open(
            'GET',
            ' http://centaurus-13.ics.uci.edu:1025/webservices/v1/api/order'
    )
    xhr.send();
}

function replace_orderer_placeholders(target_order) {
    let nameElement = document.getElementById('orderer-info');
    nameElement.textContent = nameElement.textContent.replace(
            '{{first_name}}', target_order.firstname);
    nameElement.textContent = nameElement.textContent.replace(
            '{{last_name}}', target_order.lastname);
    nameElement.textContent = nameElement.textContent.replace(
            '{{suffix}}', target_order.suffix);
    
    let addressElement = document.getElementById('address');
    addressElement.textContent = addressElement.textContent.replace(
            '{{address}}', target_order.shipping_address);
    
    let shippingMethodElement = document.getElementById('shipping');
    shippingMethodElement.textContent = shippingMethodElement.textContent.
            replace('{{shipping}}', target_order.delivery_method);
    
    let lastFourElement = document.getElementById('last4card');
    lastFourElement.textContent = lastFourElement.textContent.
            replace('{{last4card}}',
            target_order.credit_card_number.substring(12, 16));
}

function get_ordered_product_details() {
    let productIds = document.getElementById('ordered-pids').textContent.
            trim().split(' ');
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (this.status != 200 || this.readyState != 4) {
            return false;
        }
        let target = document.getElementById('pid-container');
        let response = JSON.parse(this.response);
        productIds.forEach(function(productId) {
            let p = document.createElement('p');
            p.textContent = response[productId].name;
            p.style.cssText = 'text-align: center; width: 100%';
            target.appendChild(p);
            target.appendChild(document.createElement('br'));
        });
    };
    xhr.open(
            'GET',
            ' http://centaurus-13.ics.uci.edu:1025/webservices/v1/api/product'
    )
    xhr.send();
}

