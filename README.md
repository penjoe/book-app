# Server-side templating with EJS

## Description / Overview  
This week, you and your partner(s) will implement a basic full-stack application for a book list which will include the ability to search the Google Books API, add books to a database, and then render those books from a PostgreSQL database. You will also add the ability to update the details of a book or remove it from the collection.

Today's portion of the application involves requesting books from the API. The client can submit a form to search for a book by title or author, and the search results will then be rendered as a list in the browser.

Your entire application will be deployed on Heroku [HERE](https://jp-jz-booklist.herokuapp.com/).

Project database info - see attached `book.sql` file.
------------------------------------------------------
### User Stories  

[Project Trello Board](https://trello.com/b/LRWfINI9/joe-book-app)  

#### Lab 011
* Feature 1
    - Load Time: As a user, I want my application to load quickly so that I have an enjoyable experience.  
        - Given: that a user opens the application in the browser  
        - When: the user navigates to the home page  
        - Then: the index should load without a flash of unstyled content (FOUC)  
* Feature 2  
    - Search API: As a user, I want to search the Google Books API so that I can view the results of my search.    
        - Given: that the user enters a search query  
        - When: the user submits the search form  
        - Then: the search query should be included in a request to the Google Books API  
* Feature 3  
    - Browse Results: As a user, I want to be able to browse the search results.  
        - Given: that the user enters a search query  
        - When: the user submits the search form  
        - Then: the first ten books should be displayed to the user  
* Feature 4  
    - Error Messages: As a user, I want to view any error messages that occur during the usage of my book list application so that I know if something has gone wrong.  
        - Given: that the application is not functioning properly  
        - When: an error occurs  
        - Then: the user should receive feedback that something has gone wrong  
* Feature 5  
    - Deliver CSS: As a user, I want a simple, clean looking UI so that my application is easy to navigate  
        - Given: that the user access the application on multiple platforms  
        - When: the user views the application  
        - Then: the interface should deliver CSS to the browser  
* Feature 6  
    - Home Page: As a user, I want the application to have a home page, so that I can see relevant information  
        - Soon, you will display a collection of books on the home page, For now, set up a welcome page, based on the app design.  

#### Lab 012  
* Feature 1  
    - Saved Books: As a user, I want all of my saved books to be displayed on the home page so that I can view all of the books from my collection in a single view.  
        - Given: that a user opens the application in the browser  
        - When: the user navigates to the home page  
        - Then: all of the books saved in the collection should be rendered on the page  
* Feature 2  
    - Single Book: As a user, I want to request information about a single book so that I can view its additional details and share it by URL.  
        - Given: that a user views the book collection  
        - When: the user clicks on a "Views details" button for an individual book  
        - Then: the application should take the user to a book detail page where the book's details -- including description, ISBN, and bookshelf---will be displayed.  

        - Given: that a user is viewing the details of a single book  
        - When: the user clicks on a menu button  
        - Then: the user will be returned to the main page where all of the books from the collection are rendered.  
* Feature 3  
    - Add New Books: As a user, I want the ability to add new books to my application so that I can save search results.  
        - Given: that a user would like to expand their collection and is viewing search results  
        - When: the user clicks on a button to add a book to the database  
        - Then: the user should submit the form to add a new book  
* Feature 4 / 5
    - Consistent Design: As a user, I want the application to be designed in a consistent way so that I do not experience any down time or slow load times.  
        - Given: that a user views the application  
        - When: the user interacts with the application  
        - Then: the application should load quickly and perform efficiently  

#### Lab 013  
* Feature 1  
    - Update Details: As a user, I want to update the details of a book so that it displays the way I want it to, according to my personalized preferences  
        - Given: that the user on a book detail page would like to update the information stored for the book  
        - When: the user clicks on the "Update Details" button  
        - Then: the form containing the details should be revealed  

        - Given: that the user updates book details in the edit form  
        - When: the user clicks on the "Update book" button  
        - Then: the user-provided details for that book should be saved in the database  
* Feature 2  
    - Remove Books: As a user, I want to remove books from my collection so that it accurately represents my favorite books.  
        - Given: that a user on the book detail page would like to remove a book from the collection  
        - When: the user clicks on the "Delete Book" button  
        - Then: the book should be removed from the collection  

#### Lab 014  
* Feature 1  
    - DB Normalization: As a developer, I want to normalize the database to support browsing of bookshelves  

### Dependencies
* Express  
* dotenv  
* superagent  
* ejs  
* cors


### Installing
* File can be cloned from the below github repository
    - [Book_App Repo](https://github.com/joseph-zabaleta/book_app)  

### Executing program
* After cloning this file do the following:  
    - npm init -y  
    - install list of dependencies
    - utilize your server to run the program  
    - node.js  / nodemon

## Help
* n/a

## Authors
- Software Developer: Joe Pennock  
    - [Official Github](https://github.com/penjoe)  

## Collaborations
- Software Developer: Joseph Zabaleta
    - [Official Github](https://github.com/joseph-zabaleta)  

## Version History

* 1.0.0 20200421
    - Initial Repo created.
    - Initial tree/files added.
    - Installed dependencies. 
    - Feature 01 Complete: Initial server.js file setup serving public files.  
* 1.1.0 20200421  
    - lab-11-server-setup branch created. 
    - added a test route to ensure index and css are working
* 1.2.0 20200421
    - lab-11-api-search branch created
    - added form for user to search books by author or title
    - add function to handle Google Books API requests
    - separated pages into home and search, added nav with links
* 1.2.1 20200421
    - created constructor function for book objects from search
    - added superagent call in search handler function
    - created new partials for results to render on page
    - updated constructor to render to searches page, displaying a list of books based off of user input
* 1.3.0 20200421
    - lab-11-error-page branch created 
    - added an error page that display a 404 error and location specific text whenever an error is encountered
* 1.4.0 20200421
    - created lab-11-deliver-css branch
    - updated css, added a responsive design that changes for various viewport widths
* 2.0.0 20200422
    - created lab-12-create-database branch
    - refactored homepage route to display books saved in database
    - added a total book count to display number of books in database
    - redirect home page to search if database is empty
* 2.1.0 20200422
    - created lab-12-single-book branch
    - added feature to allow user to view details of each book in a new view
    - refactored index to only show minimal info and a button for details
    - grabbed books by book id from sql database to render details
* 2.2.0 20200422
    - created lab-12-save-books branch
    - added ability for user to save a book from the API search into their collection
    - once user selects book to save, they are they are redirected to a single view of book details
    - separate partials for each primary view page
    - all routes are handled with callbacks
    - utilized modular, mobile-first css
    
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments / Resources  
[EJS for server-side templating](https://ejs.co/)  
[ExpressJS docs - app.set](https://expressjs.com/en/4x/api.html#app.set)  
[HTML5 Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)  
[HTML5 Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#Using_built-in_form_validation)  
[Google Books API Documentation](https://developers.google.com/books/docs/v1/getting_started)  
[Superagent](https://visionmedia.github.io/superagent/)  

- Book App Wireframes  
[11-results.png]()  
[11-search.png]()  

- Suggestion for a favicon:  
    [https://www.freeiconspng.com/uploads/book-icon--icon-search-engine-6.png](https://www.freeiconspng.com/uploads/book-icon--icon-search-engine-6.png)  
    
### Time Hacks per Features

#### Lab 011

* Feature #1 Load Time: 
    Estimate of time needed to complete: 60 mins  
    Start time: 0800 04/21/2020
    Finish time: 0900 04/21/2020       
    Actual time needed to complete: 60 mins  

* Feature #2 Search API Form: 
    Estimate of time needed to complete: 90 mins
    Start time: 0900 04/21/2020 
    Finish time: 1045 04/21/2020
    Actual time needed to complete: 105 mins

* Feature #3 Browse Results: 
    Estimate of time needed to complete: 120 mins
    Start time: 10:45 04/21/2020
    Finish time: 2037 04/21/2020  
    Actual time needed to complete: 270 mins

* Feature #4 Error Messages: 
    Estimate of time needed to complete: 60 mins
    Start time: 2100 04/21/2020
    Finish time: 2130 04/21/2020
    Actual time needed to complete: 30mins

* Feature #5 Deliver CSS: 
    Estimate of time needed to complete: 150 mins
    Start time: 2230 04/21/2020
    Finish time: 0200
    Actual time needed to complete: 210 mins
    
* Feature #6 Home Page: 
    Estimate of time needed to complete: Completed during feature #3 addition
    Start time: N/A  
    Finish time: N/A    
    Actual time needed to complete: N/A   

#### Lab 012
* Feature #1 Save Books: 
    Estimate of time needed to complete: 150 mins
    Start time: 0900 04/22/2020
    Finish time: 1300 04/22/2020
    Actual time needed to complete: 240 mins 
* Feature #2 Single Book: 
    Estimate of time needed to complete: 180 mins
    Start time: 1830 04/22/2020
    Finish time: 2245 04/22/2020 
    Actual time needed to complete: 255 mins 
* Feature #3 Add New Book:
    Estimate of time needed to complete: 120 mins
    Start time: 2300 04/22/2020
    Finish time: 0115 04/23/2020
    Actual time needed to complete: 135 mins
* Feature #4/5 Consist Design: 
    Estimate of time needed to complete: already completed prior
    Start time: N/A
    Finish time: N/A 
    Actual time needed to complete: N/A

#### Lab 013  
* Feature #1 Update Details: 
    Estimate of time needed to complete:  
    Start time:  
    Finish time:    
    Actual time needed to complete:  
* Feature #2 Remove Books: 
    Estimate of time needed to complete:  
    Start time:  
    Finish time:    
    Actual time needed to complete:  

#### Lab 014
* Feature #1 DB Normalization: 
    Estimate of time needed to complete:  
    Start time:  
    Finish time:    
    Actual time needed to complete:  