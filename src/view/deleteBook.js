/**
 * Created by akshaykhot on 2016-02-10.
 */

library.view.deleteBook = {
    setupUI: function () {
        var dltBtn = document.forms['book'].commit;
        var selectE1 = document.forms['book'].selectBook;
        var keys = [], key = "";
        var book = null, optionE1 = null;
        //load all book objects
        Book.loadAll();
        keys = Object.keys(Book.instances);
        //Populate the selection list with books
        for(var i=0; i<keys.length; i++) {
            key = keys[i];
            book = Book.instances[key];
            optionE1 = document.createElement("option");
            optionE1.text = book.title;
            optionE1.value = book.isbn;
            selectE1.add(optionE1, null);
        }
        dltBtn.addEventListener("click", library.view.deleteBook.handleDeleteBtnClickEvent);
        window.addEventListener("beforeunload", function() {
            book.saveAll();
        });
    },
    handleDeleteBtnClickEvent: function() {
        var selectE1 = document.forms['book'].selectBook;
        var isbn = selectE1.value;
        if(isbn) {
            Book.destroy(isbn);
            selectE1.remove(selectE1.selectedIndex);
        }
    }
};