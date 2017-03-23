let vm = new Vue({
	el: "#app",
	data: {
		totalMoney: 0,
		productList: [],
		checkAllFlag: false,
		delFalg: false,
		curProduct: {}
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
				
				product.productQuentity == 1 ? product.productQuentity : product.productQuentity--
			}
			
			this.calcTotalPrice();
		},
		// 选中与取消选中
		selectedProduct: function(item) {
			if(typeof item.checked == "undefined") {
				this.$set(item, "checked", true);
			} else {
				item.checked = !item.checked
			}
			
			let checkAllFlag = true;
			this.productList.forEach((item, index) => {
				checkAllFlag = checkAllFlag && item.checked;
			});
			
			this.checkAllFlag = checkAllFlag;
			this.calcTotalPrice();
		},
		
		// 全选与取消全选
		checkAll: function(flag) {
//			var _this = this;
			this.checkAllFlag = flag;
			this.productList.forEach((item, index) => {
				if(typeof item.checked == "undefined") {
					this.$set(item, "checked", this.checkAllFlag);
				} else {
					item.checked = this.checkAllFlag;
				}
			});
			
			this.calcTotalPrice();
		},
		
		// 计算商品总价
		calcTotalPrice: function () {
//			var _this = this;
			this.totalMoney = 0;
			this.productList.forEach((item, index) => {
				if(item.checked) {
					this.totalMoney += item.productPrice * item.productQuentity
				}
			});
		},
		
		// 点击删除按钮
		delConfirm: function(index) {
			this.delFalg = true;
			this.curProduct = index;			
		},
		
		// 确认删除商品
		delProduct: function () {
			this.productList.splice(this.curProduct, 1);
			this.delFalg = false;
			this.calcTotalPrice();
		}
	}
});
