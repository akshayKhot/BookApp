/**
 * Created by akshaykhot on 2016-02-09.
 */

/**
 * Book contructor
 * @param slots record object with properties isbn, title and year
 * @constructor
 */
function Book(slots) {
    this.isbn = slots.isbn;
    this.title = slots.title;
    this.year = slots.year;
}

/**
 * represents the collection of all added books as an entity table
 * @type object
 */
book.instances = {};

/**
 * creates a new book and adds it to the book.instances collection
 * @param slots
 */
book.add = function(slots) {
    var book = new Book(slots);
    //add book to the collection
    book.instances[slots.isbn] = book;
    console.log("Book " + slots.title + " created!");
};

/**
 * converts a row of books, which represents a record to an object of type Book
 * @param bookRow
 * @returns {Book}
 */
book.convertRow2Obj = function(bookRow) {
    var book = new Book(bookRow);
    return book;
};

/**
 * Loads the book records from local storage. Following operations are involved
 * 1. retrieve the book table from storage as a string
 * 2. convert it to books table
 * 3. convert each row of books to a corresponding object of type Book
 */
book.loadAll = function() {

    var bookString = "", keys = [], key = "", books = {};
    try {
        if(localStorage["books"]) {
            bookString = localStorage["books"];
        }
    } catch (e) {
        alert("Error when reading from local storage\n" + e);
    }

    if(bookString) {
        books = JSON.parse(bookString); //books now represents a table
        keys = Object.keys(books);  //get all the keys of this table
        console.log(keys.length + " books loaded!");
        for(var i=0; i<keys.length; i++) {
            key = keys[i];
            book.instances[key] = book.convertRow2Obj(books[key]);  //create a book from the table row and add it to our collection
        }
    }
};

/**
 * Updates a Book instance
 * first retrieve the given book from book.instances, and update the values
 * @param slots
 */
book.update = function(slots) {
    var book = book.instances[slots.isbn];
    //convert the user input, which is string to int
    var year = parseInt(slots.year);
    if(book.title !== slots.title) {book.title = slots.title;}
    if(book.year !== slots.year) {book.year = slots.year;}
};

/**
 * Deletes a book instance from book.instances collection
 * first checks if the table has a row with the given key
 * @param isbn
 */
book.destroy = function(isbn) {
    if(book.instances[isbn]) {
        delete book.instances[isbn];
        console.log("Book " + isbn + " deleted");
    } else {
        console.log("There is no book with the isbn " + isbn + " in the database");
    }
};

/**
 * Saves the book instances in the localstorage
 * 1. convert the table into a string
 * 2. write that string as a value of the entity table key 'books'
 */
book.saveAll = function() {
    var bookString = "", error = false;
    var numberOfBooks = Object.keys(book.instances).length;
    try {
        bookString = JSON.stringify(book.instances);
        localStorage["books"] = bookString;
    } catch (e) {
        alert("error when writing to localstorage");
        error = true;
    }
    if(!error) {
        console.log( numberOfBooks +" books saved!");
    }
};

/**
 * Creates some test data and saves it into our local storage
 */
book.createTestData = function() {
    book.instances["1234"] = new book({
        isbn:"1234",
        title:"Web Development",
        year:1991
    });
    book.instances["0465026567"] = new book({
        isbn:"0465026567",
        title:"Gödel, Escher, Bach",
        year:1999
    });
    book.instances["0465030793"] = new book({
        isbn:"0465030793",
        title:"I Am A Strange Loop",
        year:2008
    });
    book.saveAll();
};

/**
 * Clears the database by storing string representation of an empty object
 */
book.clearData = function() {
    if(confirm("Do you really want to delete all book data?")) {
        localStorage["books"] = "{}";
    }
};























