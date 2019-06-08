/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function post_order() {
    let productIds = document.getElementById('basket-item-ids').
            textContent.trim().split(' ');
    let form = document.getElementById('order-form');
    productIds.forEach(function(pid) {
        let data = JSON.stringify({
            'firstname': form.elements['first-name'].value,
            'lastname': form.elements['last-name'].value,
            'suffix': form.elements['suffix'].value, 
            'phone_number': form.elements['phone-number'].value,
            'shipping_address': form.elements['shipping-address'].value,
            'credit_card_number': form.elements['credit-card-number'].value,
            'card_verification_value': form.elements['card-verification-value'].value,
            'billing_address': form.elements['billing-address'].value,
            'delivery_method': form.elements['delivery-method'].value,
            'cost_in_cents': document.getElementById(`${pid}-price-hidden`).textContent,
            'price_in_cents': document.getElementById(`${pid}-price-hidden`).textContent,
            'cid': '1',
            'quantity': '1',
            'pid': pid
        });
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState != 4 || this.status != 200) {
                return;
            }
        };
        xhr.open(
            'POST',
            ' http://centaurus-13.ics.uci.edu:1025/webservices/v1/api/order/'
        );
        xhr.send(data);
    });
}

function redirectToConf() {
    // Redirect with the order IDs
    // Query the DB for the Orders 
    // Display them
    window.location = '/Store/Purchase';
}
