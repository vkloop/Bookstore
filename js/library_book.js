/*eslint-env browser*/
/*eslint "no-console": "off"*/
/*global $*/

var arrayvacio = [];
$(document).ready(function () {

    $.getJSON("https://api.myjson.com/bins/udbm5", onSuccess).fail(function () {
        console.log("FAILLLL, NOOO!");

    });

  

});

function onSuccess(data) {
    var infoprueba = data.books;
    console.log(data);
    bookName(infoprueba);



    showAllBooks(data);
    
  


    $("select").on("change", function () {

        filter(infoprueba, $(this).val());

    });

}



function bookName(array) {
    var dropdowns = $("#dropdown-filter");
    var i = 0;
    for (i; i < array.length; i++) {
        if (!arrayvacio.includes(array[i].titulo)) {
            arrayvacio.push(array[i].titulo);
            dropdowns.append($("<option/>").val(array[i].titulo).text(array[i].titulo));
        }
    }
    console.log(arrayvacio);
}




function showAllBooks(data) {

    var show = $("#show_books_id_2");

    for (var i = 0; i < data.books.length; ++i) {

        var myCardContainer = document.createElement("div");
        myCardContainer.setAttribute("class", "flip-container");

        var bookDiv = document.createElement("div");
        bookDiv.setAttribute("class", "flipper");

        var imgdiv = document.createElement("div");
        imgdiv.setAttribute("class", "front");

        var img = document.createElement("img");
        img.setAttribute("src", data.books[i].portada);
        imgdiv.append(img);

        var infodiv = document.createElement("div");
        infodiv.setAttribute("class", "back");
        
        
        var button2 = document.createElement("a");
        var detalle = data.books[i].detalle;
        button2.setAttribute("type", "button");
        button2.setAttribute("text", "More Info");
        button2.setAttribute("class", "btn btn-danger");
        button2.setAttribute("href", detalle);
      /*  var button2 = $('<a/>',{
            
            href: detalle,
            type: 'button',
            class:'btn btn-danger',
            role: 'button',
            text:'More info'
        });*/
       
        button2.innerHTML = "More Info";
        infodiv.innerHTML = "<h3>" + data.books[i].titulo + "</h3>" + "<p>" + data.books[i].descripcion + "</p>" + "<p>" + "Idioma:" + " " + data.books[i].idioma + "</p>";

        bookDiv.append(imgdiv);
        bookDiv.append(infodiv);
        infodiv.append(button2);
        myCardContainer.append(bookDiv);
        show.append(myCardContainer);




    }
    console.log(show);
}



function filter(data, filterValue) {

    var allDivs = document.getElementsByClassName("flip-container");

    for (var i = 0; i < data.length; i++)
        if (filterValue == data[i].titulo || filterValue == "--Book search..--") {

            $(allDivs[i]).show();
        } else {
            $(allDivs[i]).hide();
        }

}
