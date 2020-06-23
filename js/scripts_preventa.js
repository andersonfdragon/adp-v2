// Colapsar menu - despues de click en menu hamburguesa
$(document).ready(function(){
    $(".cerrarMenu").click(function () {
        $('.navbar-toggle').click();
    });
});

//ENVIAR DESDE FORMULARIO PAGINA PREVENTA
$("#contactForm_preventa").validator().on("submit", function (event) {
    if (event.isDefaultPrevented("Complete este campo")) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Complete los campos que faltan");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm_preventa();
    }
});

function submitForm_preventa(){
    // Initiate Variables With Form Content
    var first_name = $("#first_name").val();
    var telephone = $("#telephone").val();
    var email = $("#email").val();

    $.ajax({
        type: "POST",
        url: "php/process_2.php",
        data: "first_name=" + first_name + "&telephone=" + telephone + "&email=" + email,
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $("#contactForm_preventa")[0].reset();
    submitMSG(true, "Gracias por dejar sus datos, pronto estaremos en contacto.")
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h4 text-center text-warning";
    } else {
        var msgClasses = "h4 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}

function submitMSG_condiciones(valid, msg){
    if(valid){
        var msgClasses = "h4 text-center text-warning";
    } else {
        var msgClasses = "h4 text-center text-danger";
    }
    $("#msgSubmit_condiciones").removeClass().addClass(msgClasses).text(msg);
}

//Checkbox validator
$('form').on('submit', function(){
    if($("input[type='checkbox']").is(':checked') === true){
    //console.log('Soy valido')
    submitMSG_condiciones(true, "");
    } else{
    //console.log('Soy invalido')
    formError();
    submitMSG_condiciones(false, "Aún no acepta terminos y condiciones.");
    } 
})