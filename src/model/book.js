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