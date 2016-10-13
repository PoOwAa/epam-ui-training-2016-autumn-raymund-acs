var View = { };

/**
 * Returns a tile info element with given data.
 *
 * @param {string} date
 * @param {string} time
 * @param {string} email
 * @returns {jQuery}
 */
View.tileInfo = function (date, time, email) {
    var $info = $('<div class="info">');

    $info.append(
        $('<div class="date-time">').append(
            $('<div class="date">')
                .html(date)
                .prepend(View.sprite('calendar'))
        ).append(
            $('<div class="time">')
                .html(time)
                .prepend(View.sprite('clock'))
        )
    ).append(
        $('<div class="email">')
            .attr('title', email)
            .html(email)
            .prepend(View.sprite('at'))
    );
    return $info;
},

/**
 * Returns a sprite element with given type.
 *
 * @param {string} type
 * @returns {jQuery}
 */
View.sprite = function (type) {
    return $('<span class="sprite">').addClass(type);
}