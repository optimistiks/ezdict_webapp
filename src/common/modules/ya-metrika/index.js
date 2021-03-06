(function (d, w, c) {
    (w[c] = w[c] || []).push(function () {
        try {
            w.yaCounter32784550 = new Ya.Metrika({
                id: 32784550,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                trackHash: true
            });
        } catch (e) {
        }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () {
            n.parentNode.insertBefore(s, n);
        };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else {
        f();
    }
})(document, window, "yandex_metrika_callbacks");

var pool = [];

var metrika = {

    getCounter: function () {
        return global.yaCounter32784550;
    },

    reachGoal: function () {
        var counter = this.getCounter();
        if (counter) {
            counter.reachGoal.apply(counter, arguments);
        } else {
            pool.push(arguments);
        }
    }
};

var interval = global.setInterval(function () {
    if (metrika.getCounter()) {
        global.clearInterval(interval);
        pool.forEach(function (args) {
            metrika.getCounter().reachGoal.apply(metrika.getCounter(), args)
        });
        pool = [];
    }
}, 500);

module.exports = metrika;
