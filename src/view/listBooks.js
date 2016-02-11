/**
 * Created by akshaykhot on 2016-02-10.
 */
library.view.listBooks = {
    setupUI: function() {
        var tableBodyE1  = document.querySelector("table#books>tbody");
        var keys = [], key="", row={};
        //load all book objects
        Book.loadAll();
        keys = Object.keys(Book.instances);

        //for each book, create a table row with cells for the three attributes
        //-1 makes sure the new elements are appended at the end
        for(var i=0; i<keys.length; i++) {
            key = keys[i];
            row = tableBodyE1.insertRow();
            row.insertCell(-1).textContent = Book.instances[key].isbn;
            row.insertCell(-1).textContent = Book.instances[key].title;
            row.insertCell(-1).textContent = Book.instances[key].year;
        }
    }
};