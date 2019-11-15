

$( document ).ready(function() {

    $(".scrollto").click(function() {
        let a_href = $(this).attr('href');
        $([document.documentElement, document.body]).animate({
            scrollTop: $(a_href).offset().top
        }, 1000);
    });

});