function addRowHandlers() {
    var table = document.getElementById("customers");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var passData = function (row) {
            return function () {
                var cell = row.getElementsByTagName("td")[0];
                var id = cell.getElementsByClassName("idbox")[0].innerHTML;
                var url = './Details?pid=' + encodeURIComponent(id)
                document.location.href = url;
            };
        };
        currentRow.onclick = passData(currentRow);
    }
}

function insertIdentifierIntoOrderForm() {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {},
        tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    var input = document.createElement('input')
    input.value = data.id
    input.type = 'hidden'
    input.name = 'identifier'
    var orderForm = document.getElementsByClassName('form_holder').item(0)
    orderForm.prepend(input)
}

function validate(form) {
    var elements = form.elements
    // While inputs of type `number`, `tel`, and `email` come with built in
    // validation, support for enforcing this validation is not universal.
    var quantity = elements.namedItem('quantity').value
    if (isNaN(quantity) || (parseInt(quantity) != Number(quantity))) {
        alert("We cannot submit this form using quantity" + quantity + ": Please fill out a valid quantity.")
        return false
    }
    var firstName = elements.namedItem('first-name').value
    if (firstName === null) {
        alert('We cannot submit this form. Please enter a first name.');
        return false
    }
    var lastName = elements.namedItem('last-name').value
    if (lastName === null) {
        alert('We cannot submit this form. Please enter a last name.')
        return false
    }
    var phoneNumber = elements.namedItem('phone-number').value
    var phoneNumberPattern = '^\([0-9]{3}\) [0-9]{3}-[0-9]{4}|'
    if (phoneNumber.match(phoneNumberPattern) === null) {
        alert(`We cannot submit this form given the number ${phoneNumber}. Please enter a phone number which follows the pattern (XXX) XXX-XXXX.`)
        return false
    }

    composeEmail(form)
    return true;
}

function composeEmail(form) {
    const emailAddress = 'wkhaine@uci.edu'
    const emailSubject = 'Order Form'
    const serializedOrderInfo = serializeOrderInfo(form)
    const emailUrl = `mailto:${emailAddress}?subject=${emailSubject}&body=${serializedOrderInfo}`
    window.open(emailUrl)
}

function serializeOrderInfo(form) {
    let orderInfo = 'Product Order Information:\n'
    for (var i = 0; i < form.elements.length; ++i) {
        if (form.elements.item(i).name === '' || form.elements.item(i).value === '') {
            continue
        }
        let name = toHumanReadableLabel(form.elements.item(i).name)
        let value = form.elements.item(i).value
        orderInfo += `${name}: ${value}\n`
    }
    return encodeURIComponent(orderInfo)
}

function toHumanReadableLabel(label) {
    // Assume that `label` is in the format this-is-a-label.
    return label.split('-').map(captializeWord).join(' ')
}

function captializeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}
