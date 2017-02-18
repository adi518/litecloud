/* jslint jquery: true */

'use strict';

$.fn.extend({
    toggle2classes: function(class1, class2) {
        if (!class1 || !class2)
            return this;
        return this.each(function() {
            var $el = $(this);
            if ($el.hasClass(class1) || $el.hasClass(class2))
                $el.toggleClass(class1 + ' ' + class2);
            else
                $el.addClass(class1);
        });
    },
});
