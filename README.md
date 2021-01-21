# EAPSCO-Web-Application (In Development)

A web application created with **Spring Boot** for backend, **MsSql** database for storing information and **ReactJS** for frontend . The main idea of the 
project is to handle CRUD operations on a website for an imaginary company called Energy And Power Systems Corporate Office.

# How To Use
Backend needs to be started at 8080 port and the front end needs to be started at 3000 port with seperate configuration and run operations. After activating both,
visit 3000 port the interact with the web ui. For all entities, CRUD operations are available to use by going related tab. Relative informations can be seen on 
tables that are printed below CRUD operations.

There are products and some special products (generator, motor, UPS) which made by this company. There are two types of customers, an individual customer and an enterprise.
Products are created and stored inside offices (assume each office has a warehouse). There are multiple offices and multiple employees can work for a office. Also an employee can
work for more than one office. Offices are giving services like fix or maintenance to customer's products. Also the products are created with materials that are supplied by suppliers.

# Features to Add
* There are views and store procedures inside our database. They are going to be placed in UI to interact with.
* Security is handling by Firebase currently. It is possible to change it to Spring Security.
* Necessary error checks needs to be done.
