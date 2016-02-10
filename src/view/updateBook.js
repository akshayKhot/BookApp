/**
 * Created by akshaykhot on 2016-02-10.
 */

/**
 * populate the select element's option list by loading the collection of all
 * book objects from the database and create an option element for each book object
 */
library.view.updateBook = {
    setupUI: function() {

        var formE1 = document.forms['book'];
        var selectBookE1 = formE1.selectBook;
        var saveBtn = formE1.commit;
        var keys=[], key="";
        //load all the book objects
        book.loadAll();
        //populate the selection list with books
        keys = Object.keys(book.instances);
        for(var i= 0; i<keys.length; i++) {
            key = keys[i];
            book = book.instances[key];
            optionE1 = document.createElement("option");
            optionE1.text = book.title;
            optionE1.value = book.isbn;
            selectBookE1.add(optionE1, null);
        }
        //when a book is selected, populate the form with the book data
        selectBookE1.addEventListener("change", function() {
            var book = null, key = selectBookE1.value;
            if(key) {
                book = book.instances[key];
                formE1.isbn.value = book.isbn;
                formE1.title.value = book.title;
                formE1.year.value = book.year;
            } else {
                formE1.reset();
            }
        });
        saveBtn.addEventListener("click", library.view.updateBook.handleUpdateBtnClickEvent);
        window.addEventListener("beforeunload", function() {
            book.saveAll();
        });
    },
    handleUpdateBtnClickEvent: function() {
        var formE1 = document.forms['book'];
        var slots = {
            isbn: formE1.isbn.value,
            title: formE1.title.value,
            year: formE1.year.value
        };
        book.update(slots);
        formE1.reset();
    }
};