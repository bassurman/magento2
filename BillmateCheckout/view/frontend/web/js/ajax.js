define([
	'jquery'
], function ($, billmateajax) {
	return {
		call:function(ajaxUrl){

            $(document).on('change', 'input.billmate-checkout-product-qty', function() {
                console.log('input.billmate-checkout-product-qty change val: ' + $(this).val());

                var thisId = (this.id).split("_")[1];

                var del     = 'del_'    + thisId;
                var price   = 'price_'  + thisId;
                var sum     = 'sum_'    + thisId;
                var qty     = 'qty_'    + thisId;

                update = $(document).find("#" + qty).val();
                if (update.length < 1 || update != parseInt(update)) {
                    return false;
                }
                update = parseInt(update);

                if (update < 1) {
                    $(document).find(".del[data-id='"+thisId+"']").trigger("click");
                }

                var exists1     = document.getElementById("button-step1");
                var exists2     = document.getElementById("button-step2");
                var incexists   = document.getElementById("bm-inc-btn");
                var subexists   = document.getElementById("bm-sub-btn");
                var delexists   = document.getElementById("bm-del-btn");
                if (exists1 != null){
                    document.getElementById('button-step1').disabled = true;
                }
                if (exists2 != null){
                    document.getElementById('button-step2').disabled = true;
                }
                if (incexists != null){
                    document.getElementById("bm-inc-btn").disabled = true;
                }
                if (subexists != null){
                    document.getElementById("bm-sub-btn").disabled = true;
                }
                if (delexists != null){
                    document.getElementById("bm-del-btn").disabled = true;
                }

                var param = {
                    field1 : "ajax",
                    field2 : "set_item_quantity",
                    field3 : this.id,
                    field4 : $(this).val()
                };
                
                $.ajax({
                    showLoader: true,
                    url: ajaxUrl,
                    data: param,
                    type: "POST",
                    dataType: 'json'
                }).done(function (data) {
                    document.getElementById(sum).innerHTML = (parseFloat(document.getElementById(price).innerHTML)*update);
                    document.getElementById('checkout').src = data.iframe;
                    document.getElementById('billmate-cart').innerHTML = data.cart;
                    var exists1 = document.getElementById("button-step1");
                    var exists2 = document.getElementById("button-step2");
                    var incexists = document.getElementById("bm-inc-btn");
                    var subexists = document.getElementById("bm-sub-btn");
                    var delexists = document.getElementById("bm-del-btn");
                    if (exists1 != null){
                        document.getElementById('button-step1').disabled = false;
                    }
                    if (exists2 != null){
                        document.getElementById('button-step2').disabled = false;
                    }
                    if (incexists != null){
                        document.getElementById("bm-inc-btn").disabled = false;
                    }
                    if (subexists != null){
                        document.getElementById("bm-sub-btn").disabled = false;
                    }
                    if (delexists != null){
                        document.getElementById("bm-del-btn").disabled = false;
                    }
                    require([
                        'Magento_Customer/js/customer-data'
                    ], function (customerData) {
                        var sections = ['cart'];
                        customerData.invalidate(sections);
                        customerData.reload(sections, true);
                    });
                });


            });


			$(document).on('click', '.inc', function() {
                var qty = 'qty_' + (this.id).split("_")[1];
                update = $(document).find("#" + qty).val();
                if (update.length < 1 || update != parseInt(update)) {
                    return false;
                }
                update = parseInt(update);
                update += 1;
                $(document).find("#" + qty).val(update);
                $(document).find("#" + qty).trigger('change');
			});

			$(document).on('click', '.sub', function() {
                var qty = 'qty_' + (this.id).split("_")[1];
                update = $(document).find("#" + qty).val();
                if (update.length < 1 || update != parseInt(update)) {
                    return false;
                }
                update = parseInt(update);
                update -= 1;
                $(document).find("#" + qty).val(update);
                $(document).find("#" + qty).trigger('change');
			});

			$(document).on('click', '.del', function() {
				var exists1 = document.getElementById("button-step1");
				var exists2 = document.getElementById("button-step2");
				var incexists = document.getElementById("bm-inc-btn");
				var subexists = document.getElementById("bm-sub-btn");
				var delexists = document.getElementById("bm-del-btn");
				if (exists1 != null){
					document.getElementById('button-step1').disabled = true;
				}
				if (exists2 != null){
					document.getElementById('button-step2').disabled = true;
				}
				if (incexists != null){
					document.getElementById("bm-inc-btn").disabled = true;
				}
				if (subexists != null){
					document.getElementById("bm-sub-btn").disabled = true;
				}
				if (delexists != null){
					document.getElementById("bm-del-btn").disabled = true;
				}
				var param = {
					field1 : "ajax", 
					field2 : "del",
					field3 : this.id
				};
				$.ajax({
					showLoader: true,
					url: ajaxUrl,
					data: param,
					type: "POST",
					dataType: 'json'
				}).done(function (data) {
					if (data == "redirect"){
						window.location.replace(window.location.protocol + "//" + window.location.host);
					}
					document.getElementById('checkout').src = data.iframe;
					document.getElementById('billmate-cart').innerHTML = data.cart;
					var exists1 = document.getElementById("button-step1");
					var exists2 = document.getElementById("button-step2");
					var incexists = document.getElementById("bm-inc-btn");
					var subexists = document.getElementById("bm-sub-btn");
					var delexists = document.getElementById("bm-del-btn");
					if (exists1 != null){
						document.getElementById('button-step1').disabled = false;
					}
					if (exists2 != null){
						document.getElementById('button-step2').disabled = false;
					}
					if (incexists != null){
						document.getElementById("bm-inc-btn").disabled = false;
					}
					if (subexists != null){
						document.getElementById("bm-sub-btn").disabled = false;
					}
					if (delexists != null){
						document.getElementById("bm-del-btn").disabled = false;
					}
					require([
						'Magento_Customer/js/customer-data'
					], function (customerData) {
						var sections = ['cart'];
						customerData.invalidate(sections);
						customerData.reload(sections, true);
					});
				});
			});
			$(document).on('click', '.radio', function() {
				var exists1 = document.getElementById("button-step1");
				var exists2 = document.getElementById("button-step2");
				var incexists = document.getElementById("bm-inc-btn");
				var subexists = document.getElementById("bm-sub-btn");
				var delexists = document.getElementById("bm-del-btn");
				if (exists1 != null){
					document.getElementById('button-step1').disabled = true;
				}
				if (exists2 != null){
					document.getElementById('button-step2').disabled = true;
				}
				if (incexists != null){
					document.getElementById("bm-inc-btn").disabled = true;
				}
				if (subexists != null){
					document.getElementById("bm-sub-btn").disabled = true;
				}
				if (delexists != null){
					document.getElementById("bm-del-btn").disabled = true;
				}
				var param = {
					field1 : "ajax", 
					field2 : "radio",
					field3 : this.id
				};
				$.ajax({
					showLoader: true,
					url: ajaxUrl,
					data: param,
					type: "POST",
					dataType: 'json'
				}).done(function (data) {
					document.getElementById('checkout').src = data.iframe;
					document.getElementById('billmate-cart').innerHTML = data.cart;
				});
			});
			$(document).on('click', '.codeButton', function(){
				var param = {
					field1 : "ajax",
					field2 : "submit",
					field3 : document.getElementById("code").value
				};
				$.ajax({
					showLoader: true,
					url: ajaxUrl,
					data: param,
					type: "POST",
					dataType: 'json'
				}).done(function (data) {
					document.getElementById('checkout').src = data.iframe;
					document.getElementById('billmate-cart').innerHTML = data.cart;
					var exists1 = document.getElementById("button-step1");
					var exists2 = document.getElementById("button-step2");
					var incexists = document.getElementById("bm-inc-btn");
					var subexists = document.getElementById("bm-sub-btn");
					var delexists = document.getElementById("bm-del-btn");
					if (exists1 != null){
						document.getElementById('button-step1').disabled = false;
					}
					if (exists2 != null){
						document.getElementById('button-step2').disabled = false;
					}
					if (incexists != null){
						document.getElementById("bm-inc-btn").disabled = false;
					}
					if (subexists != null){
						document.getElementById("bm-sub-btn").disabled = false;
					}
					if (delexists != null){
						document.getElementById("bm-del-btn").disabled = false;
					}
				});
			});
		}
	}
});