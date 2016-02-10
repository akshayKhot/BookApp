/**
 * Created by akshaykhot on 2016-02-10.
 */
library.view.listBooks = {
    setupUI: function() {
        var tableBodyE1  = document.querySelector("table#books>tbody");
        var keys = [], key="";
        //load all book objects
        book.loadAll();
        keys = Object.keys(book.instances);

        //for each book, create a table row with cells for the three attributes
        //-1 makes sure the new elements are appended at the end
        for(var i=0; i<keys.length; i++) {
            key = keys[i];
            row = tableBodyE1.insertRow();
            row.insertCell(-1).textContent = book.instances[key].isbn;
            row.insertCell(-1).textContent = book.instances[key].title;
            row.insertCell(-1).textContent = book.instances[key].year;
        }

    }
}