/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Generic;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
/**
 * REST Web Service
 *
 * @author davie
 */
@Path("generic")
public class GenericResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of GenericResource
     */
    public GenericResource() {
    }

    /**
     * Retrieves representation of an instance of Generic.GenericResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("text/html")
    public String getXml() {
        try{  
                String name = new String();
                String image = new String();
                String desc = new String();
                String cost = new String();
                ArrayList<String> myList = new ArrayList<String>();
                
                Connection connection;
                connection = (new DatabaseConnector()).getConnection();
                Statement stmt=connection.createStatement();    
                //here sonoo is database name, root is username and password  
                ResultSet rs=stmt.executeQuery("select * from products");  
                while(rs.next()) { 
                    name = rs.getString(2);
                    myList.add(name);
                }
                JSONObject obj = new JSONObject();

                JSONArray list = new JSONArray();
                list.addAll(myList);

                obj.put("messages", list);
                connection.close();  
                
                return obj.toString();
            }catch(Exception e){ 
                return "<html><body><h1>Hello World!</body></h1></html>";
            }          
    }

    /**
     * PUT method for updating or creating an instance of HelloWorldResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/xml")
    public void putXml(String content) {
    } 
}
