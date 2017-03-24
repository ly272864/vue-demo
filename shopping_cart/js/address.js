var vm = new Vue({
	el: ".container",
	data: {
		limitNum: 3,
		addressList: [],
		currentIndex: 0,
		shippingMethod: 1,
		delFalg: false
	},
	mounted: function(){
		this.$nextTick(function(){
			this.getAddressList();
		});
	},
	computed: {
		filterAddress: function() {
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods: {
		getAddressList: function () {
			var _this = this;
			this.$http.get("data/address.json").then( function(response) {
				var res = response.data;
				if(res.status == "1") {
					
					_this.addressList = res.result;
				}
			})
		},
		loadMore: function(){
			this.limitNum = this.addressList.length;
		},
		setDefault: function(addressId) {
			this.addressList.forEach((item, index) => {
				if(item.addressId == addressId) {
					item.isDefault = true;
				} else {
					item.isDefault = false;
				}
			})
		},		
		delConfirm: function(num){
			this.delFalg = true;
			this.$set(this,'delIndex', num); 
		},
		delAddress: function() {
			this.addressList.splice(this.delIndex, 1);
			this.delFalg = false;
		}
	}
});