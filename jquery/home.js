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
    let currentSlide = [0];
    $(".popup-navigate-right").on("click", function(){
        var popupWidth = parseFloat($(":root").css("--popup-width"));
        if ($(this).parent().next().length) {
            currentSlide[$(this).parent().parent().attr("data-popup")]++;
            $(this).parent().parent().animate({
                "left": (-1 * popupWidth * $(this).parent().attr("data-slide")) + "em"
            });    
        } else {
            currentSlide[$(this).parent().parent().attr("data-popup")] = 0;
            $(this).parent().parent().animate({
                "left": (0) + "em"
            }); 
        }
    });
    $(".popup-navigate-left").on("click", function(){
        var popupWidth = parseFloat($(":root").css("--popup-width"));
        if ($(this).parent().prev().length) {
            currentSlide[$(this).parent().parent().attr("data-popup")]--;
            $(this).parent().parent().animate({
                "left": (-1 * popupWidth * ($(this).parent().attr("data-slide") - 2)) + "em"
            });    
        } else {
            currentSlide[$(this).parent().parent().attr("data-popup")] = 2;
            $(this).parent().parent().animate({
                "left": (-1 * popupWidth * $(this).parent().siblings().length) + "em"
            }); 
        }
    });
    $(window).on("resize", function(){
        var popupWidth = parseFloat($(":root").css("--popup-width"));
        for (let i = 0; i < currentSlide.length; i++) {
            $(`.popup-content[data-popup='${i}']`).css({
                "left": (-1 * currentSlide[i] * popupWidth) + "em"
            });
        }
    });
});