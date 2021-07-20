$(function() {
    $(".course").on("click", function(){
        $("html").addClass("overflow-hidden");
    });
    $(".popup-x").on("click", function(){
        $("html").removeClass("overflow-hidden");
    });
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

    $(".popup-navigate-right").on("click", function(){
        var popupWidth = parseFloat($(":root").css("--popup-width"));
        if ($(this).parent().next().length) {
            $(this).parent().parent().animate({
                "left": (-1 * popupWidth * $(this).parent().attr("data-slide")) + "em"
            });    
        } else {
            $(this).parent().parent().animate({
                "left": (0) + "em"
            }); 
        }
    });
    $(".popup-navigate-left").on("click", function(){
        var popupWidth = parseFloat($(":root").css("--popup-width"));
        if ($(this).parent().prev().length) {
            $(this).parent().parent().animate({
                "left": (-1 * popupWidth * ($(this).parent().attr("data-slide") - 2)) + "em"
            });    
        } else {
            $(this).parent().parent().animate({
                "left": (-1 * popupWidth * $(this).parent().siblings().length) + "em"
            }); 
        }
    });
});