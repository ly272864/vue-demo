//为页面html动态设置font-size值
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = clientWidth / 37.5 * 2 + 'px';
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);//resize
    doc.addEventListener('DOMContentLoaded', recalc, false);//reload
})(document, window);