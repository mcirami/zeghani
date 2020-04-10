jQuery(document).ready(function($){

	var localDev = true;

	if(localDev == true) {
		loadReload();
	}

    $('.search_icon, .mobile_search').click(function(e) {
        e.preventDefault();
        $('.search_box').fadeToggle();
    });
	
	
	var mySwiper = new Swiper('.swiper-container', {
	    speed: 400,
	    direction: 'horizontal',
	    loop: true,
	    pagination: '.swiper-pagination',
	    paginationClickable: true,
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	});
	
	/* Wish list functions
 
	if ($('.wish-list-product a.remove').length) {
		$('.wish-list-product a.remove').click( function(e) {
			e.preventDefault();
			var productToRemove = $(e.target).data('product-id');
			removeWishListItem(productToRemove);
			$('.product-id-'+productToRemove).remove();
			var newCount = parseInt($('.wish-list-count').text()) - 1;
			$('.wish-list-count').text(newCount);
		});			
	}
	
	if($('.js_add_to_wish_list').length) {
		
		$(".js_add_to_wish_list").click( function(e) {
			e.preventDefault();
		
			if($(this).hasClass('selected')) { // Remove item from list
				if(getCookie("wishlist")) { 
					var productToRemove = $(this).data('product-id');
					removeWishListItem(productToRemove);
					$('a[data-product-id='+productToRemove+']').removeClass('selected');
						
				} else {
					alert("Error: Invalid Cookie Data (no items to remove)")
				}
			} else { // Move on and add to the list..
				var newProductId = $(this).data('product-id');

				// do we have a cookie?	
				if(getCookie("wishlist")) {
					// Read current items
					var currentItems = JSON.parse(getCookie('wishlist'));

					// check if the new ID already exists in the list and it's not a invalid request..
					if (($.inArray(newProductId, currentItems) == -1) && (typeof newProductId !== "undefined")) {
						
						if(currentItems.length < 7){
							// add to the list
							currentItems.push(newProductId);
							setCookie("wishlist", JSON.stringify(currentItems), 365);
							$('a[data-product-id='+newProductId+']').addClass('selected');

							if(!$("#wish-list-header-menu").hasClass('has-wishlist-items')) {
								$("#wish-list-header-menu").addClass('has-wishlist-items');
							}
						} else {
							alert("You can only have up to 7 items in your wishlist. Please remove one before adding this item.");
						}
					}
				} else {
					// initialize cookie and add the first product..
					setCookie("wishlist", JSON.stringify([newProductId]), 365);
					$('a[data-product-id='+newProductId+']').addClass('selected');
					$("#wish-list-header-menu").addClass('has-wishlist-items');
				}
			}
		});	
	}
	
	end wish list functions */ 
	
});


function setCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function removeWishListItem(productToRemove) {
	var currentItems = JSON.parse(getCookie('wishlist'));

	currentItems = removeItem(currentItems, productToRemove);
	setCookie("wishlist", JSON.stringify(currentItems), 365);

	if(currentItems.length == 0){
		jQuery("#wish-list-header-menu").removeClass('has-wishlist-items');
	}
}

function removeItem(arr) {
    var what, a = arguments, L = a.length, ax;;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}