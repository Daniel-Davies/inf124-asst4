<%-- 
    Document   : index
    Created on : 02-Jun-2019, 15:27:56
    Author     : davie
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
        <title>Clothes Store</title>
        <meta name='description' content='My clothes store main page'>
        <link href='https://fonts.googleapis.com/css?family=Eczar:400,500' rel='stylesheet'>
        <link rel='stylesheet' href='styles.css'>
        <script src='js/scripts.js'></script>
        <script src='js/get_all_products.js'></script>
        <style>
            select {
                height: 4vh;
                width: 10vw;
            }

            tr {
                cursor: pointer;
            }
        </style>

    </head>
    <body>
        <header class='header'>
        <h3 class='title' style='width: 40vh; line-height: 1em;'>Stryeet Wear</br>
        <span style='font-size: 15px;'>by Daniel Davies and William Khaine</span></h3>
        <ul>
            <li><a href='./' class='visiting'>Products</a></li>
            <li><a href='./Order'>Basket</a></li>
        </ul>
    </header>
    <div class="flex-container">
        <h1>Products</h1>
    </div>
    <div class="flex-container">
        <em>
            <h4>Choose from our clothing collection below. Once you have made your choice, click on a table row for purchase
                information.
            </h4>
        </em>

    </div>

    <div class="flex-container">
        <table id="customers">
            <tr>
                <th>Product Details</th>
                <th>Product Image</th>
            </tr>
            <script>getAllProducts();</script>
        </table>
    </div>
    <div class="flex-container footer">
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
    </body>
    
</html>
