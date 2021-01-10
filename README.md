<h1>Starting with Node JS</h1>
<br> 
<h2>Creating a Node js web application </h2>  

<h2>A Basic Shopping Web Application </h2> 

<h2>Following The MVC Pattern </h2> 

### Model - representing your data
- Product Model 
- Cart Model
### View  - What the User Sees
### Controller - Connects Model and View
- Admin Controller
- Shop Controller
- Error Controller

### Dynamic Routing

- Passing Dynamic Paths
- Optional Query Paramters can also be passed

### Using MongoDB for storing the Database

#### Collections -
- Users
- Products
- Orders

``Product.find()``
``.select('title price _id image_url')
          .populate('user_id','name').then(``
