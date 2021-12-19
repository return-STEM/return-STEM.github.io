$(function() {
    $("#nav-small").on("click", function(){
        setTimeout(function(){
            if ($("#nav-button").is(":checked")) {
                $("html").addClass("overflow-hidden");
            } else {
                $("html").removeClass("overflow-hidden");
            }
        }, 50);
    });
    $(".nav-secondary-link").on("click", function(){
        $("#nav-button").prop("checked", false);
        $("html").removeClass("overflow-hidden");
    });
});