<h1>Starting with Node JS</h1>
<br> 
<h2>Creating a Node js web application </h2>  
<br> 
<h2>A Basic Shopping Web Application </h2> 
<br> 
<h2>Following The MVC Pattern </h2> 
<br> 
<h3>Model - representing your data</h3> 
<br> 
- Product Model 
- Cart Model
 <h3>View  - What the User Sees</h3> 
 <br> 
<h3>Controller - Connects Model and View</h3> 
- Admin Controller
- Shop Controller
- Error Controller
<br> 
<h3>Dynamic Routing</h3> 
- Passing Dynamic Paths
- Optional Query Parameters can also be passed

<h3>Using MongoDB for storing the Data</h3> 
<br> 
<h3>Collections </h3> 
- Users
- Products
- Orders
- Sessions
<br> 
<h3>Cookies and Session </h3>
<br>
<ol>
Cookies
<ul>
<li>Great for storing data on the client</li>
<li>Not Sensitive Data must be stored here</li>
</ul>

<li>Session 
<ul>
<li>Stored on the Server, Not on the Client, you can store anythinh in the session.</li>
<li>Often used for storing user data/ authentication status</li>
<li>Identified via Cookie</li>
</ul>
</ol>

         
``Product.find()``
``.select('title price _id image_url')
          .populate('user_id','name').then(``
