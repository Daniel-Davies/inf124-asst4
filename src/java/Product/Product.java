/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Product;

import Generic.DatabaseConnector;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.Response;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 * REST Web Service
 *
 * @author davie
 */
@Path("product")
public class Product {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of Product
     */
    public Product() {
    }
    
    public Boolean checkExists(String itemid){
        try{
            Connection connection;
            connection = (new DatabaseConnector()).getConnection();
            String query = "SELECT EXISTS(SELECT * FROM product WHERE pid = ? ) as checked";
            PreparedStatement preparedStmt = connection.prepareStatement(query);
            preparedStmt.setInt(1, Integer.parseInt(itemid));
                    //here sonoo is database name, root is username and password  
            ResultSet rs = preparedStmt.executeQuery(); 
            Boolean exists = false;
            while(rs.next()) {
                exists = rs.getBoolean("checked");
            }
            return exists;
        }catch(Exception e){
            return false;
        } 
    }
    /**
     * Retrieves representation of an instance of Product.Product
     * @return an instance of java.lang.String
     */
    @GET
    public Response getXml() {
        //TODO return proper representation object
        try{  
                JSONObject mainobj = new JSONObject();
                
                Connection connection;
                connection = (new DatabaseConnector()).getConnection();
                Statement stmt=connection.createStatement();    
                //here sonoo is database name, root is username and password  
                ResultSet rs=stmt.executeQuery("select * from product");  
                while(rs.next()) { 
                    JSONObject obj = new JSONObject();
                    obj.put("name", rs.getString("name"));
                    obj.put("image", rs.getString("image_url"));
                    obj.put("desc", rs.getString("description"));
                    obj.put("cost", rs.getString("price_in_cents"));
                    mainobj.put(rs.getString("pid"), obj);
                }
                return Response.status(200).entity(mainobj.toString()).type( "application/text").build();
            }catch(Exception e){ 
                return Response.status(500).build();
            } 
    }
    
    /**
     * PUT method for updating or creating an instance of Product
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @POST
    public Response postreq(String data) {
        try{
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(data);
            String name = (String) jsonObject.get("name");
            String img = (String) jsonObject.get("image_url");
            String cost = (String) jsonObject.get("price_in_cents");
            String desc = (String) jsonObject.get("description");
            
            try{
                Connection connection;
                connection = (new DatabaseConnector()).getConnection();
                String query = "insert into products(name, image_url, description, price_in_cents) values (?, ?, ?, ?);";
                PreparedStatement preparedStmt = connection.prepareStatement(query);
                preparedStmt.setString(1, name);
                preparedStmt.setString(2, img);
                preparedStmt.setString(3, desc);
                preparedStmt.setInt(4, Integer.parseInt(cost));

                preparedStmt.executeUpdate();
                return Response.status(200).build();
            } catch(Exception e) {
            return Response.status(500).build();
            }
        } catch(Exception e) {
            return Response.status(500).build();
        }
    } 

    
    @DELETE
    @Path("{itemid}")
    public Response deleteContainer(@PathParam("itemid") String itemid) {
        if(!checkExists(itemid)){
            return Response.status(404).build();
        }
        try{
            Connection connection;
            connection = (new DatabaseConnector()).getConnection();
            String query = "DELETE FROM product WHERE pid = ?";
            PreparedStatement preparedStmt = connection.prepareStatement(query);
            preparedStmt.setString(1, itemid);
            preparedStmt.executeUpdate();
            return Response.status(200).build();
            
        } catch(Exception e) {
            return Response.status(500).build();
        }
    } 
    
    @GET
    @Path("{itemid}")
    public Response getItemResource(@PathParam("itemid") String itemid) {
        if(!checkExists(itemid)){
            return Response.status(404).build();
        }
       try{  
                String name = new String();
                String image = new String();
                String desc = new String();
                String cost = new String();

                Connection connection;
                connection = (new DatabaseConnector()).getConnection();
                Statement stmt=connection.createStatement();    
                //here sonoo is database name, root is username and password  
                ResultSet rs=stmt.executeQuery("select * from product where pid = " + itemid);  
                while(rs.next()) { 
                    name = rs.getString("name");
                    image = rs.getString("image_url");
                    desc = rs.getString("description");
                    cost = rs.getString("price_in_cents");
                }
                JSONObject obj = new JSONObject();

                obj.put("name", name);
                obj.put("image", image);
                obj.put("desc", desc);
                obj.put("cost", cost);

                connection.close();  
                
                return Response.status(200).entity(obj.toString()).type( "application/text").build();

            }catch(Exception e){ 
                return Response.status(500).build();
            }  
    }
    
    @PUT
    @Path("{itemid}")
    public Response putXml(@PathParam("itemid") String itemid, String data) {
        if(!checkExists(itemid)){
            return Response.status(404).build();
        }
        try{
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(data);
            String name = (String) jsonObject.get("name");
            String img = (String) jsonObject.get("image_url");
            String cost = (String) jsonObject.get("price_in_cents");
            String desc = (String) jsonObject.get("description");
            
            try{
                Connection connection;
                connection = (new DatabaseConnector()).getConnection();
                String query = "UPDATE product SET name = ?, image_url = ?, price_in_cents = ?, description = ? WHERE pid = ?;";
                PreparedStatement preparedStmt = connection.prepareStatement(query);
                preparedStmt.setString(1, name);
                preparedStmt.setString(2, img);
                preparedStmt.setInt(3, Integer.parseInt(cost));
                preparedStmt.setString(4, desc);
                preparedStmt.setInt(5, Integer.parseInt(itemid));


                preparedStmt.executeUpdate();
                return Response.status(200).build();
            } catch(Exception e) {
                return Response.status(500).build();
            }
        } catch(Exception e) {
                return Response.status(500).build();
        }
    }
}
