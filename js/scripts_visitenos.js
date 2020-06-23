// Colapsar menu - despues de click en menu hamburguesa
$(document).ready(function(){
    $(".cerrarMenu").click(function () {
        $('.navbar-toggle').click();
    });
});

//ENVIAR DESDE FORMULARIO PAGINA PREVENTA
$("#contactForm_visitenos").validator().on("submit", function (event) {
    var valido_form = 0;
    var valido_date = 0;
    var valido_check = 0;

    if (event.isDefaultPrevented("Complete este campo")) {
        // handle the invalid form...
        submitMSG(false, "Complete los campos que faltan");
        //console.log('Soy invalido form')
    }

    else {
        // everything looks good!
        event.preventDefault();
        //console.log('Soy valido form')
        valido_form = 1;
        //console.log(valido_form)
    }   


    if ($('#datepicker').val() === 'mm/dd/aaaa'){
        submitMSG_calendario(false, "Seleccione una fecha de visita.");
        //console.log('Soy invalido date')
    }

    else {
        // everything looks good!
        event.preventDefault();
        submitMSG_calendario(true, "");
        //console.log('Soy valido date')
        valido_date = 1;
        //console.log(valido_date)
    }

    if ($("input[type='checkbox']").is(':checked') === false){
        submitMSG_condiciones(false, "Aún no acepta terminos y condiciones.");
        //console.log('Soy invalido checkbox')
    }
 
    else {
        // everything looks good!
        event.preventDefault();
        submitMSG_condiciones(true, "");
        //console.log('Soy valido checkbox')
        valido_check = 1;
        //console.log(valido_check)
    }

    if ((valido_form)&&(valido_date)&&(valido_check) === 1) {
        submitForm_visitenos();
        submitMSG(true, "");
    }

    else {
        // everything looks good!
        event.preventDefault();
        submitMSG(false, "Complete los campos que faltan");
    }
});


function submitForm_visitenos(){
    // Initiate Variables With Form Content
    var first_name = $("#first_name").val();
    var telephone = $("#telephone").val();
    var email = $("#email").val();
    var fecha_final = $("#datepicker").val();

    $.ajax({
        type: "POST",
        url: "php/process_3.php",
        data: "first_name=" + first_name + "&telephone=" + telephone + "&email=" + email + "&fecha_final=" + fecha_final,
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
    $("#contactForm_visitenos")[0].reset();
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

function submitMSG_calendario(valid, msg){
    if(valid){
        var msgClasses = "h4 text-center text-success";
    } else {
        var msgClasses = "h4 text-center text-danger";
    }
    $("#msgSubmit_calendario").removeClass().addClass(msgClasses).text(msg);
}

//Date validator
$(document).ready(function($) {
    $( "#datepicker" ).datepicker();
});