<h1> Super Food API &nbsp;<img alt="README-3a5f8be5.jpg" src="images/a.jpg" width="60" height="60" ></h1>

<p> This superfood api performs CRUD (Create, Read, Update and Delete) operations. A superfood is a healthy food source that provides health benefits. This api can be used to discover interesting facts about super food products.</p>

<h3> Getting Started </h3>
<p>
The following instructions will get the project up and running on your local machine for development and testing purposes.
</p>

<h3>Prerequisites</h3>

You must have Node.js and MongoDB installed on your machine. You can click the below links, if you don’t have them already installed.

<a href = "https://nodejs.org/en/download/">Install Node.js</a>

<a href = "https://www.mongodb.com/download-center"> Install MongoDB </a>

This app runs off of a MongoDB Database. Whether you have Mongo running locally or in production.

<h2> Installing </h2>

First run the install command to fetch all the dependency packages listed in the project's package.json file.

* npm install

* Then run the application

* npm run start

Please make sure you have MongoDB server running either locally or in production.

<h3> Populating Database </h3>

<p> To add superfood data to the running mongoDB database
run the following command:

>npm run populate

After you have run the above command you will see the superfood data displayed in your terminal/console window.

Once data has been added to the MongoDB database run following command:

>npm run start

to re-run the server.
</p>

<h3> Making API Requests </h3>

<p> You can make the following requests:

(GET) &nbsp; /superfoods

(GET) &nbsp; /superfoods/:id
</p>

<h3> Testing </h3>
<p>
<a href = "https://www.getpostman.com/downloads/">Install Postman</a>

<a href = "https://www.youtube.com/watch?v=FjgYtQK_zLE/">Postman API tutorial for beginners</a>

In postman you can create and test the following routes:

(POST) &nbsp; /superfoods/create

(DELETE) &nbsp; /superfoods/:id

(PATCH) &nbsp; /superfoods/:id
</p>

<h3> Running test script </h3>

<p> To run tests run following command:

>npm run tests

</p>

<h3> Documentation </h3>

<p> All documentation for methods and functions can be found in:

>docs

Please note: open the docs .html files in browser  </p>
