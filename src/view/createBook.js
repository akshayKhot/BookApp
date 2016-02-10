/**
 * Created by akshaykhot on 2016-02-09.
 */

library.view.createBook = {

    /**
     * retrieves the collection of all objects from the database
     * sets up an event handler on the save button
     */
    setupUI: function() {
        var saveButton = document.forms['book'].commit;
        //load all book objects
        book.loadAll();
        //set an event handler for the save/submit button
        saveButton.addEventListener("beforeunload", function() {
            book.saveAll();
        });
    },

    /**
     * save user input data
     */
    handleSaveBtnClickEvent: function() {
        var formE1 = document.forms['book'];
        var slots = {
            isbn: formE1.isbn.value,
            title: formE1.title.value,
            year: formE1.year.value
        };
        book.add(slots);
        formE1.reset();
    }
};