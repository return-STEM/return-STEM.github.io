d$(document).ready(function() {
    $(".course").click(function(){
        $("html").addClass("overflow-hidden");
    });
    $(".popup-x").click(function(){
        $("html").removeClass("overflow-hidden");
    });
    $("#nav-small").click(function(){
        setTimeout(function(){
            if ($("#nav-button").is(":checked")) {
                $("html").addClass("overflow-hidden");
            } else {
                $("html").removeClass("overflow-hidden");
            }
        }, 50);
    });
    $(".nav-secondary-link").click(function(){
        $("#nav-button").prop("checked", false);
        $("html").removeClass("overflow-hidden");
    });
});