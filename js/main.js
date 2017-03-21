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

var vm = new Vue({
	el:"#app",
	data: {
		title: "一个简单的Vue.js demo",
		text: "尾部",
		productList: []
	},
	// 过滤器
	filters: {
		formatMoney: function(value){
			return value.toFixed(2);
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			//以下两种写法均可
			this.listView();
//			vm.listView();
		});
	},
	methods: {
		listView: function () {
			let _this = this;
			this.$http.get("data/list.json", {"id": 123}).then(res => {
				this.productList = res.body.result.list;
			})
		}
	}
});