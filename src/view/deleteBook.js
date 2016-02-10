/**
 * Created by akshaykhot on 2016-02-10.
 */

library.view.deleteBook = {
    setupUI: function () {
        var dltBtn = document.forms['book'].commit;
        var selectE1 = document.forms['Book'].selectBook;
        var keys = [], key = "";
        var book = null, optionE1 = null;
        //load all book objects
        book.loadAll();
        keys = Object.keys(book.instances);
        for(var i=0; i<keys.length; i++) {
            key = keys[i];
            book = book.instances[key];
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
            book.destroy(isbn);
            selectE1.remove(selectE1.selectedIndex);
        }
    }
};