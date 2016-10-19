var View = (function ($) {

    var self = {
        /**
         * Returns a tile info element with given data.
         *
         * @param {string} date
         * @param {string} time
         * @param {string} email
         * @param {boolean} wrapToContent
         * @returns {jQuery}
         */
        tileInfo: function (date, time, email, wrapToContent) {
            var $info = $('<div class="info">'), $content;
            if (wrapToContent) {
                $content = $('<div class="content">');
                $info.append($content);
            } else {
                $content = $info;
            }
            $content.append(
                $('<div class="date-time">').append(
                    $('<div class="date">')
                        .html(date)
                        .prepend(self.sprite('calendar'))
                ).append(
                    $('<div class="time">')
                        .html(time)
                        .prepend(self.sprite('clock'))
                )
            ).append(
                $('<div class="email">')
                    .attr('title', email)
                    .html(email)
                    .prepend(self.sprite('at'))
            );
            return $info;
        },

        /**
         * Returns a sprite element with given type.
         *
         * @param {string} type
         * @returns {jQuery}
         */
        sprite: function (type) {
            return $('<span class="sprite">').addClass(type);
        }
    };

    return self;
})(jQuery);