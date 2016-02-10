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
}

/**
 * converts a row of books, which represents a record to an object of type Book
 * @param bookRow
 * @returns {Book}
 */
book.convertRow2Obj = function(bookRow) {
    var book = new Book(bookRow);
    return book;
}
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
        books = JSON.parse(bookString);
        keys = Object.keys(books);
        console.log(keys.length + " books loaded!");
        for(var i=0; i<keys.length; i++) {
            key = keys[i];
            book.instances[key] = book.convertRow2Obj(books[key]);
        }
    }
}


























