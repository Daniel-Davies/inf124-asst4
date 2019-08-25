# inf124 Assignment 4 - RESTful Service Integration 
Daniel Davies - daviesdg - 32285633 <br/> William Khaine - wkhaine - 34989009

## URL
Please visit the following URL to look at the site:

http://centaurus-13.ics.uci.edu:1025/Store/

## DB
User: root<br>
Password: inf124

## Repos

1. Web services can be found at: https://github.com/Daniel-Davies/Java-web-services
2. The Web Application can be found at: https://github.com/Daniel-Davies/inf124-asst4

## Meeting Requirements
1. The index page is implemented as a JSP (in Store.war, `web/index.jsp`).
2. A REST service has been created (i.e. webservices.war). The Contracts section exemplify how it meets the needs as required.
3. All interactions with the database are replaced with REST API calls. The JavasScript files use AJAX calls to make and respond to REST calls (in Store.war, the files in `web/js/`).

## File Structure
### Store
+ src/java: The source files. The essential classes are:
    - Basket.java: Servlet to manage the addition of an item to the basket.
    - Confirmation.java: Servlet to manage the Confirmation page.
    - Details.java: Servlet to manage the view of a specific product (i.e. its detail page).
    - Order.java: Servlet to manage the checkout of a series of products in the basket.
    - Purchase.java: Redirects the browser to Confirmation.java.  
+ web: 
    - styles.css: The sole stylesheet.
    - js: Javascript files.
        - get_all_products.js: Invokes AJAX request to view all products, and supplant them into the webpage.
        - get_bakset.js: Invokes AJAX request to view the user's basket, and supplants it into the webpage.
        - get_confirmation_details.js: Invokes AJAX request to view the user's purchase, and supplants it into the webpage.
        - get_details.js: Invokes AJAX request to view a specific product, and supplants it into the webpage.
        - post_order.js: Invoked AJAX request to send orders to the database, and follow through with the ordering process.
        - scripts.js: General scripts not invovled with an AJAX call.
    - index.jsp: The JSP page for listing products.
        
### Webservices
+ src/main/java/com/uci/todorestservice: The REST Service's root location.
    - db/DatabaseConnector.java: Connector to the database.
    - Order.java: Implements the REST API for those endpoints which include orders.
    - Product.java: Implements the REST API for those endpoints which include products.

## RESTful Contracts

Each of the products and the orders have had 5 endpoints written for them:

- GET
- GET/{id}
- PUT
- POST
- DELETE

The ones we actually use in Store.war are explained below.

### Endpoint: http://centaurus-13.ics.uci.edu:1025/webservices/v1/api/product/<br>
+ Method Type: GET
+ Sample Response: ```{"1008":{"image":".\/assets\/hoodie.jpg","cost":"3000","name":"Hoodie","desc":"A hoodie (also spelled hoody) is a sweatshirt or a jacket with a hood. Hoodies include a muff sewn onto the lower front, and (usually) a drawstring to adjust the hood opening."},"1":{"image":".\/assets\/shirt.jpg","cost":"2000","name":"Shirt","desc":"A T-shirt (or t shirt, or tee) is a style of unisex fabric shirt named after the T shape of its body and sleeves. Traditionally it has short sleeves and a round neckline, known as a crew neck, which lacks a collar. T-shirts are generally made of a stretchy, light and inexpensive fabric and are easy to clean. Made from 100% cotton only in our store."},"1007":{"image":".\/assets\/gloves.jpg","cost":"1000","name":"Gloves","desc":"Warm gloves.Gloves are pieces of clothing which cover your hands and wrists and have individual sections for each finger. You wear gloves to keep your hands warm or dry or to protect them."},"1006":{"image":".\/assets\/socks.jpg","cost":"500","name":"Socks","desc":"Black and white socks. A sock is an item of clothing worn on the feet and often covering the ankle or some part of the calf. Some type of shoe or boot is typically worn over socks. In ancient times, socks were made from leather or matted animal hair."},"1005":{"image":".\/assets\/shorts.jpg","cost":"1500","name":"Shorts","desc":"Shorts are a garment worn over the pelvic area, circling the waist and splitting to cover the upper part of the legs, sometimes extending down to the knees but not covering the entire length of the leg."}}```

### Endpoint: http://centaurus-13.ics.uci.edu:1025/webservices/v1/api/product/{PRODUCT_ID} <br>
+ Method Type: GET
+ Sample Response (Information about Product ID# 1): ```{"image":".\/assets\/shirt.jpg","cost":"2000","name":"Shirt","desc":"A T-shirt (or t shirt, or tee) is a style of unisex fabric shirt named after the T shape of its body and sleeves. Traditionally it has short sleeves and a round neckline, known as a crew neck, which lacks a collar. T-shirts are generally made of a stretchy, light and inexpensive fabric and are easy to clean. Made from 100% cotton only in our store."}```

### Endpoint: http://centaurus-13.ics.uci.edu:1025/webservices/v1/api/order/<br> 
+ Method Type: GET
+ Sample Response: ```{"22":{"cost_in_cents":"1500","firstname":"m","quantity":"1","credit_card_number":"5654565456545654","pid":"1005","billing_address":"jdtyjftjfrj","suffix":"","lastname":"m","price_in_cents":"1500","time_ordered":"2019-06-07 18:38:16","delivery_method":"Standard","phone_number":"","shipping_address":"asdf","card_verification_value":"354","cid":"1"},"23":{"cost_in_cents":"1500","firstname":"q","quantity":"1","credit_card_number":"6666666666666666","pid":"1005","billing_address":"q","suffix":"","lastname":"q","price_in_cents":"1500","time_ordered":"2019-06-07 18:39:58","delivery_method":"Standard","phone_number":"","shipping_address":"q","card_verification_value":"674","cid":"1"},..."cid":"1"}}```

### Endpoint: http://centaurus-13.ics.uci.edu:1025/webservices/v1/api/order/<br> 
+ Method Type: POST
+ Sample Request: ```"{\"firstname\":\"bobby\",\"lastname\":\"jindal\",\"suffix\":\"\",\"phone_number\":\"\",\"shipping_address\":\"1234 Main Louisiana St\",\"credit_card_number\":\"1111111111111111\",\"card_verification_value\":\"546\",\"billing_address\":\"w\",\"delivery_method\":\"Standard\",\"cost_in_cents\":\"3000\",\"price_in_cents\":\"3000\",\"cid\":\"1\",\"quantity\":\"1\",\"pid\":\"1002\"}" = $1```
+ Sample Response:
