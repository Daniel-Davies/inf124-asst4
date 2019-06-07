<!doctype html>

<html lang="en">

<head>
    <meta charset="utf-8">

    <title>Clothes Store</title>
    <meta name="description" content="My clothes store">
    <link href="https://fonts.googleapis.com/css?family=Eczar:400,500" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script src='get_details.js'></script>
</head>

<body onload='renderDetails()'>
    <script src="scripts.js"></script>
    <header class='header'>
        <h3 class='title' style='width: 40vh; line-height: 1em;'>Stryeet Wear</br>
        <span style='font-size: 15px !important;'>by Daniel Davies and William Khaine</span></h3>
        <ul>
            <li><a href='./' class='visiting'>Products</a></li>
            <li><a href='./Order'>Basket</a></li>
        </ul>
    </header>
    <br/>
    
    <div class="flex-container">
        <div style="padding: 0.5vw; border: 2px solid black;">
            <div class="flex-container">
                <h1 id="product-name" style="font-size: 2rem; margin:0">{{name}}</h1>
            </div>
            <div class="flex-container">
                <p id="id" style="margin:0">Product ID: {{id}}</p>
            </div>
            <div class="flex-container">
                <p id="cost" style="margin:0">Product Cost: {{cost}}</p>
            </div>
            <div class="flex-container">
                <img id="imgs" src="{{img}}" style="width:15vw; height: 15vw;"/>
            </div>
        </div>
    </div>
    <div class="flex-container">
        <p id='desc'>{{desc}}</p>
    </div>
    <div class="flex-container">
        <button id='redirect-button' style='cursor:pointer' class="styledBtn" onclick="window.location='/HelloWorldApp/Basket?pid={{pid}}'">Add to cart</button>
    </div>
    <div class="flex-container footer" style="position:fixed;bottom:0;left:0;right:0;">
        <div>
            <p>
                <span>Phone Number</span>
                <span>(949) 123-4567</span>
            </p>
        </div>
        <div>
            <p>
                <span>Email</span>
                <span>
                    <a href='mailto:wkhaine@uci.edu'>stryeetwear@gmail.com</a>
                </span>
            </p>
        </div>
        <div>
            <p>
                <span>Address</span>
                <span>1234 Fake Address Rd.</span>
                <span>Irvine, CA 92321</span>
            </p>
        </div>
    </div>
    <script>
        insertIdentifierIntoOrderForm();
    </script>
</body>

</html>
