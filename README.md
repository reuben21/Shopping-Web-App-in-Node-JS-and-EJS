<h1>A Basic Shopping Web Application </h1> 
<br> 
<ol>
<li>The Home Page with Pagination <br/> <img width="70%" src="https://firebasestorage.googleapis.com/v0/b/projects-in-node-js.appspot.com/o/Shopping-App-In-EJS-Node-JS%2FHomepage_after_login.png?alt=media&token=4d027bd6-8373-4ed5-8746-def08be59837" alt=""></li>
<li>The Cart Page  <br/> <img width="70%" src="https://firebasestorage.googleapis.com/v0/b/projects-in-node-js.appspot.com/o/Shopping-App-In-EJS-Node-JS%2Fcurrent_items_in_cart.png?alt=media&token=722c8843-2392-43a5-8bc2-3df388cc7a07" alt=""></li>
<li>The Order's Page  <br/> <img width="70%" src="https://firebasestorage.googleapis.com/v0/b/projects-in-node-js.appspot.com/o/Shopping-App-In-EJS-Node-JS%2Fprevious_orders.png?alt=media&token=d4a05374-563d-4d99-9dea-113c9b8f9602" alt=""></li>
<li>The Payment Gateway Integration Page  <br/> <img width="70%" src="https://firebasestorage.googleapis.com/v0/b/projects-in-node-js.appspot.com/o/Shopping-App-In-EJS-Node-JS%2FPayment_integration_page.png?alt=media&token=4e507697-3dba-43f4-b55e-b33d923ae77c" alt=""></li>
<li>The PDF Invoice, Created Dynamically with PDF kit <br/>  <img width="70%" src="https://firebasestorage.googleapis.com/v0/b/projects-in-node-js.appspot.com/o/Shopping-App-In-EJS-Node-JS%2Fpdf_invoice.png?alt=media&token=829fd682-4c0f-49db-8729-ad491d67d0e5" alt=""></li>
</ol>

<ol> The Admin Controlled Side 
<li>The Add Products Page <br/>  <img width="70%" src="https://firebasestorage.googleapis.com/v0/b/projects-in-node-js.appspot.com/o/Shopping-App-In-EJS-Node-JS%2Fadd_product_page.png?alt=media&token=848d8723-8167-4201-b43c-0cca9f5695cd" alt=""></li>
<li>The Products added By Admin <br/>  <img width="70%" src="https://firebasestorage.googleapis.com/v0/b/projects-in-node-js.appspot.com/o/Shopping-App-In-EJS-Node-JS%2Fproducts_added_by_admin.png?alt=media&token=1d4ecd4d-16a5-4216-bfcf-4a2c5dc72b48" alt=""></li>
</ol>
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
<br> 
<h3>Authentication </h3>
<ol>
<li>Not Every User can visit the Page</li>
</ol>     
<h3>Security & UX</h3>
<ol>
<li>Passwords to Be Stored in Hashed Form</li>
<li>CSRF Attacks are a real issue and you should include CSRF protection in ANY Application you Build</li>
</ol>
<br> 
<h3>Advanced Authentication and Authorization </h3>
<br>
<li>
Password resetting has to be implemented in a way that prevent users form resetting random user accounts
</li>
<li>
Allow Editing Based on Authorization, So A User who has added the product will be able to edit the product added by him and not by any other user.
</li>
<br> 
<h3>Express Validator </h3>
<li>Adding Validation by wrapping the controller js</li>
<li>Adding A Custom Validation is also possible</li>
<li>Custom Validation</li>
<li>Using Sanitizers for Triming and Validation</li>
<br> 
<h3>Error Handling in Node Js </h3>

<li>2xx -> Success </li>
<li>3xx -> Redirect </li>
<li>4xx -> Client Side Error Code </li>
<li>5xx -> Server-Side Error Code </li>

<br> 
<h3>File Upload and Download </h3>

<li>Using Multer to Store Files Locally</li>
<li>Streaming Files For implementing Invoice Feature</li>
<li>Generating Dynamic PDFs using The Order Data</li>

<br> 
<h3>Implementing Pagination </h3>

<br> 
<h3>REST API's Decoupling Frontend and Backend </h3>
<li>Most Suitable Data Format is JSON data Format, Machine Readable and concise and can easily be converted to Javascript</li>
<li>Uniform Interface - Clearly Defined API endpoints with clearly defined request + response data structure
</li>
<li>Stateless Interactions - Server and Client don't store any connection history, every request is handled separately</li>

<li>METHODS</li>
<ul>
<li>GET </li>
<li>POST</li>
<li>PUT</li>
<li>PATCH</li>
<li>DELETE</li>
<li>OPTIONS</li></li>

</ul>
