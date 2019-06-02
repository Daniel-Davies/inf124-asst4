<%-- 
    Document   : index
    Created on : 02-Jun-2019, 15:27:56
    Author     : davie
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import = "java.text.NumberFormat,java.util.*,java.sql.*;"%>
<%@ page import = "java.io.*,javax.servlet.http.*,javax.servlet.*;"%>
<%@ page import = "javax.servlet.annotation.*,Generic.DatabaseConnector;"%>
<%@ page import = "java.io.*,java.util.*,java.sql.*"%>
<%@ page import = "javax.servlet.http.*,javax.servlet.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix = "c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix = "sql"%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
        <title>Clothes Store</title>
        <meta name='description' content='My clothes store main page'>
        <link href='https://fonts.googleapis.com/css?family=Eczar:400,500' rel='stylesheet'>
        <link rel='stylesheet' href='styles.css'>
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
            <li><a href='./about.html' class='visiting'>About</a></li>
            <li><a href='./index.php'>Products</a></li>
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
            <sql:setDataSource var = "snapshot" driver = "com.mysql.jdbc.Driver"
                url = "jdbc:mysql://localhost:3306/inf124?useSSL=false&serverTimezone=UTC"
                user = "root"  password = "Danio123"/>

             <sql:query dataSource = "${snapshot}" var = "result">
                SELECT * from products;
             </sql:query>
            <tr>
                <th>Product Details</th>
                <th>Product Image</th>
            </tr>
            <c:forEach var = "row" items = "${result.rows}">
                <tr>
                    <td>
                       <div class='flex-container'>
                          <h1 class='namebox' style='margin: 0%;'><c:out value = "${row.name}"/></h1>
                       </div>
                       <div class='flex-container' style='margin: 0%'>
                          <h3 class='namebox' style='margin: 0%'><c:out value = "${row.price_in_cents}"/></h3>
                       </div>
                       <div style='display: flex; justify-content: start;'>
                          <p><b><em>Product ID</em></b>:<u class='idbox'><c:out value = "${row.pid}"/></u></p>
                       </div>
                       <div style='display: flex; justify-content: start;'>
                           <p><c:out value = "${row.description}"/></p>
                       </div>
                       <div class='flex-container'>
                          <h2>Select your color:</h2>
                       </div>
                       <div class='flex-container'>
                          <select onclick='event.stopPropagation();'>
                             <option value='Red'>Red</option>
                             <option value='White'>White</option>
                             <option value='Blue'>Blue</option>
                          </select>
                       </div>
                    </td>
                    <td class='cover'><img class='cover' src=<c:out value = "${row.image_url}"/> /></td>
                 </tr>
             </c:forEach>
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




    <script src="scripts.js"></script>
    <script>addRowHandlers()</script>

    </body>
    
</html>
