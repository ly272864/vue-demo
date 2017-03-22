let vm = new Vue({
	el: "#app",
	data: {
		totalMoney: 0,
		productList: [],
		checkAllFlag: false
	},
	filters: {
		formatMoney: function(value) {
			return value.toFixed(2);	
		}		
	},
	mounted: function () {
		this.$nextTick(function(){
			this.cartView();
//			vm.cartView();
		})
	},
	methods: {
		// 请求数据并返回到data中
		cartView: function () {
			let _this = this;
			this.$http.get("data/cart.json", {"id": 123}).then(res => {
				let obj = res.body.result				
				// es6箭头函数的写法不存在作用域改变了this的指向
				this.productList = obj.productList;
				_this.totalMoney = obj.totalMoney;
			})
		},
		// 修改商品数量
		changeMoney: function(product, way) {
			if(way > 0) {
				product.productQuentity++
			} else {
				
				return product.productQuentity==1 ? product.productQuentity: product.productQuentity-- 
			}
		},
		// 选中与取消选中
		selectedProduct: function(item) {
			if(typeof item.checked == "undefined") {
				this.$set(item, "checked", true);
			} else {
				item.checked = !item.checked
			}
			
//			var _this = this;
			
			var checkAllFlag = true;



this.productList.forEach(function(item,index){



    checkAllFlag = checkAllFlag && item.checked;



});



this.checkAllFlag = checkAllFlag
		},
		
		// 全选与取消全选
		checkAll: function(flag) {
			var _this = this;
			this.checkAllFlag = flag;
			this.productList.forEach(function(item, index) {
				if(typeof item.checked == "undefined") {
					_this.$set(item, "checked", _this.checkAllFlag);
				} else {
					item.checked = _this.checkAllFlag;
				}
			})
		}
	}
});
