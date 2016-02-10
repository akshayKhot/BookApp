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
 * A class-level property representing the collection of all Book instances
 * managed by the application in the form of an entity table.
 */
Book.instances = {};

/**
 * creates a new book and adds it to the book.instances collection
 * @param slots
 */
Book.add = function(slots) {
    var book = new Book(slots);
    Book.instances[slots.isbn] = book;
    console.log("Book " + slots.title + " created!");
};

/**
 * converts a row of books, which represents a record to an object of type Book
 * @param bookRow
 * @returns {Book}
 */
Book.convertRow2Obj = function(bookRow) {
    return new Book(bookRow);
};

/**
 * Loads the book records from local storage. Following operations are involved
 * 1. retrieve the book table from storage as a string
 * 2. convert it to books table
 * 3. convert each row of books to a corresponding object of type Book
 */
Book.loadAll = function() {

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
            Book.instances[key] = Book.convertRow2Obj(books[key]);  //create a book from the table row and add it to our collection
        }
    }
};

/**
 * Updates a Book instance
 * first retrieve the given book from Book.instances, and update the values
 * @param slots
 */
Book.update = function(slots) {
    var book = Book.instances[slots.isbn];
    //convert the user input, which is string to int
    var year = parseInt(slots.year);
    if(book.title !== slots.title) {book.title = slots.title;}
    if(book.year !== slots.year) {book.year = slots.year;}
    console.log("Book " + slots.isbn + " modified!");
};

/**
 * Deletes a book instance from Book.instances collection
 * first checks if the table has a row with the given key
 * @param isbn
 */
Book.destroy = function(isbn) {
    if(Book.instances[isbn]) {
        delete Book.instances[isbn];
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
Book.saveAll = function() {
    var bookString = "", error = false;
    var numberOfBooks = Object.keys(Book.instances).length;
    try {
        bookString = JSON.stringify(Book.instances);
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
Book.createTestData = function() {
    Book.instances["1234"] = new Book({
        isbn:"1234",
        title:"Web Development",
        year:1991
    });
    Book.instances["0465026567"] = new Book({
        isbn:"0465026567",
        title:"Gödel, Escher, Bach",
        year:1999
    });
    Book.instances["0465030793"] = new Book({
        isbn:"0465030793",
        title:"I Am A Strange Loop",
        year:2008
    });
    Book.saveAll();
};

/**
 * Clears the database by storing string representation of an empty object
 */
Book.clearData = function() {
    if(confirm("Do you really want to delete all book data?")) {
        localStorage["books"] = "{}";
    }
};























