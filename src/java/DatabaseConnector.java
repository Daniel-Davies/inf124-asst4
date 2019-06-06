/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import java.sql.*;

public class DatabaseConnector {
    public Connection connection;
    String username = "root";
    String password = "DmnstnofE3dctn";

    public DatabaseConnector() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/store?user=root&password=DmnstnofE3dctn&useSSL=false&serverTimezone=UTC");
        // , username, password);
    }

    public Connection getConnection() {
        return connection;
    }
}