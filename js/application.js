jQuery(function($) {

    $('form').validate({
        errorPlacement: function(error,element) {
            return true;
        }
    });

    var gost_form = $('.gostevaya form:eq(0)'),
        gost_row = gost_form.find('.row:eq(0)'),
        gost_open = gost_form.find('.open-form:eq(0)');

    gost_row.slideUp(0);
    gost_open.click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        gost_row.slideToggle(400);
        return false;
    });

    (function() {
        var container = $('.container'),
            leftcol = container.find('>.row>.leftcolumn'),
            leftcolH = leftcol.height(),
            centercol = container.find('>.row>.centercolumn')
            centercolH = centercol.height();
        
        if(leftcolH < centercolH) {
            leftcol.css({
                'min-height': centercolH
            })
        }
        
        $('form.action-form').validate();

        $('.authorize-form').submit(function(e) {
            e.preventDefault();

            var that = $(this),
                error = that.find('.error');

            error.hide();

            $.ajax({
                url: '/udata/' + that.attr('action'),
                type: 'POST',
                dataType: 'xml',
                data: $(this).serialize(),
                success: function(answer) {
                    if (!$(answer).find('user').length)
                       error.show();
                    else
                        self.location.href = '/dashboard/';
                }
            });
        });
    }());

});