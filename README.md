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
