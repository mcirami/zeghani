'use strict';

jQuery.noConflict();

var SimonG = SimonG || {};

SimonG.states = {
    footerShown: false,
    footerFixed: false,
    mobileNavShown: false,
    headerSearchVisible: false,
    isHomepage: false,
    isPDP: false,
    windowHeight: 0,
    windowWidth: 0,
    userLocation: {
        lat: (typeof sessionStorage.getItem('lat') === "string") ? sessionStorage.getItem('lat') : '',
        lng: (typeof sessionStorage.getItem('lng') === "string") ? sessionStorage.getItem('lng') : ''
    },
    iOS: /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
    Android: /(Android)/g.test(navigator.userAgent)
};

var currentEnvironment = "frontEnd", //(window.location.href.indexOf("wps/")>-1)? "webSphere" : "frontEnd", //update this for whatever your current environment may be.
    visibleFooterHeight = 52;

SimonG.environment = {
    frontEnd: {
        APIEndpoints: {
            storeInfo: function() {
                return 'http://'+window.location.hostname+'/wp-content/themes/zeghani/js/vendor/store-info.json';
            },
            gMapsKey: ''//'AIzaSyBcj7KjtWqqcZB1t3nGoSwN6rHwCJ4qOMk'
        },
        imagePath: 'http://'+window.location.hostname+'/wp-content/themes/zeghani/images/',
        picturefillPath: '/wp-content/themes/zeghani/js/vendor/picturefill/dist'
    },
};

SimonG.services = {
    locator: {
        getLocation: function() {
            if (Modernizr.sessionstorage && sessionStorage.getItem('lat') && sessionStorage.getItem('lng')) {
                SimonG.states.userLocation.lat = sessionStorage.getItem('lat');
                SimonG.states.userLocation.lng = sessionStorage.getItem('lng');
            }

            if (Modernizr.geolocation) { //use geolocation to get user's current location
                var get_coords = function(position) {
                    SimonG.states.userLocation.lat = position.coords.latitude;
                    SimonG.states.userLocation.lng = position.coords.longitude;
                    SimonG.services.locator.saveLocation(SimonG.states.userLocation.lat, SimonG.states.userLocation.lng, 10);
                };

                var handle_error = function(err) {
                    //user says NO to geolocation
                    if (err.code === 1) $window.trigger('geolocationDenied');
                    else $window.trigger('geolocationUnknownError');
                };
                navigator.geolocation.getCurrentPosition(get_coords, handle_error);
            }
        },
        getLatLng: function(location) { //from user's current location
            var geocoder = new google.maps.Geocoder(),
                lat,
                lng;

            geocoder.geocode({
                'address': location
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    SimonG.services.locator.saveLocation(results[0].geometry.location.A, results[0].geometry.location.F);
                } else {
                    alert("Sorry. We couldn't find that location. Please try again.");
                }
            });
        },
        saveLocation: function(lat, lng) { //save user's current location
            SimonG.states.userLocation.lat = lat;
            SimonG.states.userLocation.lng = lng;
            if (Modernizr.sessionstorage) {
                sessionStorage.setItem('lat', lat);
                sessionStorage.setItem('lng', lng);
            }
            jQuery('.no-data-msg').hide();
            $window.trigger('locationUpdated');
        },
        getRetailerData: function(lat, lng, zoom) { //get data based on user's lat/lng
            //  var retailers = (sessionStorage.getItem('retailers').length > 0) ? JSON.parse(sessionStorage.getItem('retailers')) : [];//if sessionStorage('retailers') exists and is not null, retailers = sessionStorage('retailers'), else retailers is empty array
            var retailers = [],
                storeName;
				
            var requestStoreInfo = jQuery.getJSON(SimonG.environment[currentEnvironment].APIEndpoints.storeInfo(lat, lng), function(data) {
                if (currentEnvironment === "MVC" || currentEnvironment === "webSphere") {
                    for(storeName in data) {
                        if (data.hasOwnProperty(storeName)) {
                            var thisStore = data[storeName];
                            
                            var distance = getDistanceFromLatLonInKm(thisStore.Latitude, thisStore.Longitue, lat, lng);

                            var retailer = { //storing all this so don't have to make more calls to the server
                                storeName: thisStore.StoreName,
                                partnerType: thisStore.PartnerType,
                                address: thisStore.Address,
                                city: thisStore.City,
                                state: thisStore.State,
                                zip: thisStore.PostCode,
                                lat: thisStore.Latitude,
                                lng: thisStore.Longitude,
                                // phone: thisStore.Phone,
                                distance: distance,
                                email: thisStore.Email,
                                phone: thisStore.PhoneNumber,
                                opening_hours: '',
                                directionsLink: 'https://www.google.com/maps/dir//'+ thisStore.Address + "+" + thisStore.City +"+"+ thisStore.State + "+" +thisStore.PostCode,
                                rating: '',
                                reviewsLink: '',
                                reviewsAmount: '',
                                desc: ''
                            };
                            retailers.push(retailer);
                        }
                    }
                } else {
                    for(storeName in data.simong_stores) {
                        if (data.simong_stores.hasOwnProperty(storeName)) {
                            var thisStore = data.simong_stores[storeName];
                            
                            var distance = getDistanceFromLatLonInKm(thisStore.lat, thisStore.lng, lat, lng);
                            if(distance < 50) {
	                            
	                            var website = thisStore.website;
					            if(website) {
					                if(website.toLowerCase().indexOf('www') == 0 && website.toLowerCase().indexOf('http') == 0) {
						                website = '';
					                } else if(website.toLowerCase().indexOf('http') == 0) {
						                website = 'http://'+website;
					                }
					            } else {
					                website = '';
					            }
					            
					            if(website != '') {
						            website = website.toLowerCase();
					            }

	                            var retailer = { //storing all this shit so don't have to make more calls to the server
	                                storeName: thisStore.storeName,
	                                partnerType: thisStore.partnerType,
	                                address: thisStore.address,
	                                city: thisStore.city,
	                                state: thisStore.state,
	                                zip: thisStore.zip,
	                                lat: thisStore.lat,
	                                lng: thisStore.lng,
	                                phone: thisStore.phone,
	                                distance: distance,
	                                email: thisStore.email,
	                                website: website,
	                                opening_hours: '',
	                                directionsLink: 'https://www.google.com/maps/dir/' + lat + ',' + lng + '/' + thisStore.lat + ',' + thisStore.lng,
	                                rating: '',
	                                reviewsLink: '',
	                                reviewsAmount: '',
	                                desc: ''
	                            }
	                            retailers.push(retailer);
                            }
                        }
                    }
                    
                    retailers.sort(function(a, b){
					    return parseFloat(a.distance) - parseFloat(b.distance);
					});
					
					var firstStore = null;
					if(retailers.length > 0) {
						var firstRetailer = retailers[0];
						if(firstRetailer.distance <= 5) {
							firstStore = firstRetailer;
						}
					}
					
					if(retailers.length > 6) {
						retailers = retailers.slice(0, 6);
					}
					
					retailers.sort(function(a, b){
						if(a == firstStore) {
							return -1;
						} else if(b == firstStore) {
							return 1;
						} else {
					    	return a.partnerType.localeCompare(b.partnerType);
					    }
					});
                }

                //save the data now that we've got it (so we don't have to get it on every page refresh)
                sessionStorage.setItem('retailers', JSON.stringify(retailers));

                $window.trigger('retailersUpdated');
            });
        },

        init: function() {
            if (typeof SimonG.states.userLocation.lat !== "string" || typeof SimonG.states.userLocation.lng !== "string" || !SimonG.states.userLocation.lat.length || !SimonG.states.userLocation.lng) SimonG.services.locator.getLocation();
            
            //SimonG.services.locator.getLocation();

            $window.on('locationUpdated', function() {
                SimonG.services.locator.getRetailerData(SimonG.states.userLocation.lat, SimonG.states.userLocation.lng, 10);
            });

            $window.on('geolocationUnknownError', function() {
                //silently fail, no alert
            });
        }
    },
};

SimonG.helpers = {
    disabledLinks: function() {
        jQuery('a[disabled]').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    },
    formatCurrency: function(amountToFormat)
    {
        return "$"+amountToFormat.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    scrolling: {
        allow: function(timeoutLength) {
            var time = (typeof timeoutLength !== "undefined") ? timeoutLength : 0;
            setTimeout(function() {
                jQuery('body,html').removeClass('noscroll');
            }, time);
        },
        disallow: function(timeoutLength) {
            var time = (typeof timeoutLength !== "undefined") ? timeoutLength : 200;
            setTimeout(function() {
                jQuery('body,html').addClass('noscroll');
            }, time);
        },
        preventHorizontalAndroidScroll: function() {
            if (Modernizr.touch && !SimonG.states.iOS) {
                $window.on('touchstart touchend', function() {
                    if (window.scrollLeft !== 0) $window.scrollLeft(0);
                });
            }
        }
    },
    checkOrientationChangeSupport: function() {
        if (!Modernizr.hasEvent('orientationchange')) jQuery('html').addClass('no-orientationchange');
    },
    windowWatchers: {
        pageIsAtBottom: function() { //this checks to see if the page is near the bottom, minus the height of the visible sliver of the fixed footer
            return jQuery(document).scrollTop() > (jQuery(document).height() - SimonG.states.windowHeight - ($footer.height() - visibleFooterHeight));
        },
        pageIsScrollable: function() {
            return jQuery(document).height() > SimonG.states.windowHeight;
        },
        pageIsSmallLayout: function() { //checks the visibility of a small-layout-only item
            return (jQuery('header .menu.button').is(':visible'));
        },
        pageIsLargestLayout: function() { //measures the width of the main container tag to see if we've hit our maximum allowed width
            return Modernizr.mq('screen and (min-width: 82.75em)');
        },
        windowScrollTop: function() { //cross-browser check for scroll distance between current window view and top of page
            return (typeof window.scrollY === "undefined" || window.scrollY === 0) ? ((typeof document.documentElement.scrollTop === "undefined") ? document.body.scrollTop : document.documentElement.scrollTop) : window.scrollY;
        },
        updateWindowDimensions: function() {
            SimonG.states.windowHeight = $window.height(),
            SimonG.states.windowWidth = $window.width();
            
            $window.trigger('simonGResize');
        }
    },
    lazyLoadImages: function() {
        jQuery.each(jQuery('[data-srcset]'), function() {
            if (SimonG.helpers.checkIfVisible(jQuery(this)) && !jQuery(this).is('[data-loaded]')) {
                jQuery(this).attr('srcset', jQuery.trim(jQuery(this).attr('data-srcset'))).attr('data-loaded',true);
                jQuery(this).removeAttr('data-srcset');
                
                picturefill({
                    elements: [jQuery(this)[0]],
                    reevaluate: true
                });
            }
        });
    },
    checkIfVisible: function($obj) {

        var vpH = jQuery(window).height(), // Viewport Height
            st = SimonG.helpers.windowWatchers.windowScrollTop(), // Scroll Top
            y = $obj.offset().top, // Element offset from top
            lh = (vpH / 2); //-(vpH / 4); // Look-ahead offset

        return (y < (vpH + st + lh));
    },
    polyfills: {
        placeholders: {
            init: function() {
                if (!Modernizr.input.placeholder) {
                    jQuery('[placeholder]').focus(function() { //Thanks to: http://webdesignerwall.com/tutorials/cross-browser-html5-placeholder-text & http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
                        var input = jQuery(this);
                        if (input.val() === input.attr('placeholder')) {
                            input.val('');
                            input.removeClass('placeholder');
                        }
                    }).blur(function() {
                        var input = jQuery(this);
                        if (input.val() === '' || input.val() === input.attr('placeholder')) {
                            input.addClass('placeholder');
                            input.val(input.attr('placeholder'));
                        }
                    }).blur();

                    jQuery('[placeholder]').parents('form').submit(function() {
                        jQuery(this).find('[placeholder]').each(function() {
                            var input = jQuery(this);
                            if (input.val() === input.attr('placeholder')) input.val('');
                        });
                    });
                }
            }
        }
    },
    formValidate: function(form_name){
        var fields = jQuery("#" + form_name).find("select[required], textarea[required], input[required], input[name=email]").serializeArray();
        var trigger = 0;
        var msg ='';

        jQuery.each(fields, function(i, field) {
            if (!field.value){
                msg += field.name + ' is required\n';
                trigger = 1;
            }
        }); 
        var emailAddy = jQuery("#" + form_name).find("input[name=email]");
        if(emailAddy.length>0)
        {
            var filter= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!filter.test(emailAddy[0].value))
            {
                msg += emailAddy[0].name + ' is invalid\n';
                trigger=1;
            }
        }
        var emailMatches = jQuery("#" + form_name).find("input[name=email2]");
        if(emailMatches.length>0){
            if(emailAddy[0].value != emailMatches[0].value)
            {
                msg += emailAddy[0].name + ' and ' + emailMatches[0].name + ' do not match\n';
                trigger=1;
            }    
        }
        if(trigger){
            alert(msg);
            return false;
        }else{
            return true;
        }
    }
};

SimonG.widgets = {
    whereToBuy: {
        map: null,
        infoWindows: [],
        markers: [],
        retailers: {},
        
        createInfoWindows: function(marker, retailer) {
            var markerContent;
            if(retailer.website != '') { 
            	markerContent = '<div class="marker-content">\n' +
	                '<h2>' + retailer.storeName + '</h2>\n' +
	                '<p itemprop="address">\n' +
	                '<span itemprop="street-address">' + retailer.address + '</span>\n' +
	                '<span itemprop="locality">' + retailer.city + '</span>, <span itemprop="region">' + retailer.state + '</span> <span itemprop="postal-code">' + retailer.zip + '</span>\n' +
	                '</p>\n' +
	                '<a href="tel:+' + retailer.phone + '" itemprop="tel">' + retailer.phone + '</a>\n' +
	                '<p class="location"><span>' + retailer.distance + ' mi</span> | <a href="' + retailer.directionsLink + '">Get Directions</a></p>\n' +
	                '<a class="website" href="http://' + retailer.website + '" target="_blank">' + retailer.website + '</a>\n' +
	                '</div>';
            } else {
	            markerContent = '<div class="marker-content">\n' +
	                '<h2>' + retailer.storeName + '</h2>\n' +
	                '<p itemprop="address">\n' +
	                '<span itemprop="street-address">' + retailer.address + '</span>\n' +
	                '<span itemprop="locality">' + retailer.city + '</span>, <span itemprop="region">' + retailer.state + '</span> <span itemprop="postal-code">' + retailer.zip + '</span>\n' +
	                '</p>\n' +
	                '<a href="tel:+' + retailer.phone + '" itemprop="tel">' + retailer.phone + '</a>\n' +
	                '<p class="location"><span>' + retailer.distance + ' mi</span> | <a href="' + retailer.directionsLink + '">Get Directions</a></p>\n' +
	                '</div>';
            }
            
            var infowindow = new google.maps.InfoWindow({
                    content: markerContent
                });

            //when click icon, open info window
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(SimonG.widgets.whereToBuy.map, marker);
            });

            SimonG.widgets.whereToBuy.infoWindows.push(infowindow);
        },
        setStoreInfo: function() {
            //first, clear what's already there (in case user changes location)
            jQuery('#store-info').empty(); //Where to Buy page left sidebar

            //for each marker, append this code block w/populated JSON
            jQuery.each(SimonG.widgets.whereToBuy.retailers, function(i) {
                var partnerTypeHTML,
                    description;

                if (this.partnerType === "A") partnerTypeHTML = "<p>Diamond Jeweler Partner</p>";
                else if (this.partnerType === "B") partnerTypeHTML = "<p>Sapphire Jeweler Partner</p>";
                else if (this.partnerType === "C") partnerTypeHTML = "<p>Emerald Jeweler Partner</p>";
                else if (this.partnerType === "D") partnerTypeHTML = "<p>Authorized Jeweler Partner</p>";
                else partnerTypeHTML = "";

                if (this.desc === "") description = '';
                else description = '<p class="desc">' + this.desc + '</p>';
                var phone= (this.phone==null)? '':'<a href="tel:+' + this.phone.replace('/', ' ') + '" itemprop="tel">' + this.phone.replace('/', ' ') + '</a>\n';
                
                var website = this.website;
                //add info to left sidebar
                /*if(website != '') {
	                jQuery('#store-info').append('<div class="store_result_wrap">\n' + '<div class="store" data-store="' + i + '" data-partner="' + this.partnerType + '">\n' +
	                    '<hgroup>\n' + partnerTypeHTML +
	                    '<h2>' + this.storeName + '</h2>\n' +
	                    '</hgroup>\n' +
	                    '<p itemprop="address">\n' +
	                    '<span itemprop="street-address">' + this.address + '</span>\n' +
	                    '<span itemprop="locality">' + this.city + '</span>, <span itemprop="region">' + this.state + '</span> <span itemprop="postal-code">' + this.zip + '</span>\n' +
	                    '</p>\n' +
	                    phone +
	                    '<p class="location"><span>' + this.distance + ' mi</span> | <a href="' + this.directionsLink + '">Get Directions</a></p>\n' +
	                    '<a class="website" href="http://' + website + '" target="_blank">' + website + '</a>\n' +
	                    description +
	                    '</div>\n' + '</div>');
                } else {
	                jQuery('#store-info').append('<div class="store_result_wrap">\n' + '<div class="store" data-store="' + i + '" data-partner="' + this.partnerType + '">\n' +
	                    '<hgroup>\n' + partnerTypeHTML +
	                    '<h2>' + this.storeName + '</h2>\n' +
	                    '</hgroup>\n' +
	                    '<p itemprop="address">\n' +
	                    '<span itemprop="street-address">' + this.address + '</span>\n' +
	                    '<span itemprop="locality">' + this.city + '</span>, <span itemprop="region">' + this.state + '</span> <span itemprop="postal-code">' + this.zip + '</span>\n' +
	                    '</p>\n' +
	                    phone +
	                    '<p class="location"><span>' + this.distance + ' mi</span> | <a href="' + this.directionsLink + '">Get Directions</a></p>\n' +
	                    description +
	                    '</div>\n' + '</div>');
                }*/
                
                jQuery('#store-info').append('<div class="store_result_wrap">\n' + '<div class="store" data-store="' + i + '">\n' +
	                    '<hgroup>\n' +
	                    '<h2>' + this.storeName + '</h2>\n' +
	                    '</hgroup>\n' +
	                    '<p itemprop="address">\n' +
	                    '<span itemprop="street-address">' + this.address + '</span>\n' +
	                    '<span itemprop="locality">' + this.city + '</span>, <span itemprop="region">' + this.state + '</span> <span itemprop="postal-code">' + this.zip + '</span>\n' +
	                    '</p>\n' +
	                    '</div>\n' + '</div>');
            });

            var store = jQuery('.store');

            store.click(function() {
                jQuery.each(SimonG.widgets.whereToBuy.infoWindows, function(i) {
                    SimonG.widgets.whereToBuy.infoWindows[i].close();
                });

                var thisStoreNumber = jQuery(this).attr('data-store');

                SimonG.widgets.whereToBuy.infoWindows[thisStoreNumber].open(SimonG.widgets.whereToBuy.map, SimonG.widgets.whereToBuy.markers[thisStoreNumber]);
            });
        },
        createMap: function(lat, lng, zoom) {
            var mapOptions = {
                center: new google.maps.LatLng(lat, lng),
                zoom: zoom
            };
            SimonG.widgets.whereToBuy.map = new google.maps.Map($map[0], mapOptions);

            google.maps.event.addListenerOnce(SimonG.widgets.whereToBuy.map, 'idle', function(){
                $window.trigger('mapCreated');
            });
        },
        createMarkers: function() {
            SimonG.widgets.whereToBuy.markers = [];
            var markerBounds = new google.maps.LatLngBounds();

            //add each marker to map
            jQuery.each(SimonG.widgets.whereToBuy.retailers, function() {
                var image;

                if (this.partnerType === "A") {
                    image = SimonG.environment[currentEnvironment].imagePath + "map/diamond.png";
                } else if (this.partnerType === "B") {
                    image = SimonG.environment[currentEnvironment].imagePath + "map/sapphire.png";
                } else if (this.partnerType === "C") {
                    image = SimonG.environment[currentEnvironment].imagePath + "map/emerald.png";
                } else if (this.partnerType === "D") {
                    image = SimonG.environment[currentEnvironment].imagePath + "map/authorized.png";
                } else {
                    image = SimonG.environment[currentEnvironment].imagePath + "map/store.png";
                }

                var _params = {
                    radius: 100000,
                    name: this.storeName,
                    location: {
                        "lat": this.lat,
                        "lng": this.lng
                    },
                    key: SimonG.environment[currentEnvironment].APIEndpoints.gMapsKey
                };

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(this.lat, this.lng),
                    map: SimonG.widgets.whereToBuy.map,
                    icon: image,
                    title: this.storeName
                });

                var point = new google.maps.LatLng(this.lat, this.lng);
                markerBounds.extend(point);

                SimonG.widgets.whereToBuy.markers.push(marker);
                SimonG.widgets.whereToBuy.createInfoWindows(marker, this);
            });
            SimonG.widgets.whereToBuy.map.fitBounds(markerBounds);
        },
        populate: function(){
           SimonG.widgets.whereToBuy.retailers = JSON.parse(sessionStorage.getItem('retailers'));
           if (SimonG.widgets.whereToBuy.retailers !== null && SimonG.widgets.whereToBuy.retailers.length) { //if have retailers
                SimonG.widgets.whereToBuy.createMarkers();
                SimonG.widgets.whereToBuy.setStoreInfo();
           }      
        },
        clearMarkers: function() {
            jQuery.each(SimonG.widgets.whereToBuy.markers, function() {
                this.setMap(null);
            });
            SimonG.widgets.whereToBuy.infoWindows = SimonG.widgets.whereToBuy.markers = [];
        },
        createPlaceholderMap: function() {
            SimonG.widgets.whereToBuy.createMap(39.50, -98.35, 4, null); //load map w/default position (centered on USA)
        },
        init: function() {
            $map = jQuery('#map');
            if ($map.length) {
                if (typeof SimonG.states.userLocation.lat !== "string" || typeof SimonG.states.userLocation.lat !== "string") SimonG.widgets.whereToBuy.createPlaceholderMap();
                else SimonG.widgets.whereToBuy.createMap(SimonG.states.userLocation.lat, SimonG.states.userLocation.lng, 10);

                $window.on('retailersUpdated', function() {
                    SimonG.widgets.whereToBuy.clearMarkers();
                });

                $window.on('geolocationDenied retailersUpdated mapCreated', function() {
                   SimonG.widgets.whereToBuy.populate();
                });
            }
        }
    },
    locatorBanner: {
        init: function() {
            var $locatorBanner = jQuery('.banner-locator');
            if ($locatorBanner.length) {
                $locatorBanner.find('form').on('submit', function(e) { //bind to all locator banners
                    e.preventDefault();
                    //pass to Geocoding API to get lat/long from val
                    SimonG.services.locator.getLatLng(jQuery(this).find('input[type=text]').val());
                });
            }
        }
    },
};

SimonG.init = function() {
    var lazyLoadTimeout = {};
    $window = jQuery(window);
    //SimonG.states.isAppleOrAndroid = (SimonG.states.iOS || SimonG.states.Android);
    //SimonG.helpers.scrolling.preventHorizontalAndroidScroll();
    //SimonG.helpers.checkOrientationChangeSupport();
    //SimonG.helpers.windowWatchers.updateWindowDimensions();

    jQuery.each(SimonG.services, function() {
        this.init();
    });
    jQuery.each(SimonG.widgets, function() {
        this.init();
    });
    jQuery.each(SimonG.helpers.polyfills, function() {
        //this.init();
    });

    $window.on('scroll resize', function() {
        //SimonG.helpers.lazyLoadImages();
    });
    $window.on('resize orientationchange', function() {
        //SimonG.helpers.windowWatchers.updateWindowDimensions();
        //picturefill();
        //SimonG.widgets.footer.check();
    });
   /*jQuery(see3Nm).on('load',function(){ //see3Nm is the provideSupport-generated JS object representing the dynamic script loaded to the page by their service. by watching its load event, we can adjust the footer height for changes made by the appeareance of 'online concierge' text.
        SimonG.widgets.footer.check();
   });*/
    $window.unload(function() {
        window.scrollTo(0, 0);
    });
    //jQuery('body.edit-mode').addClass('lotusui30dojo');
    //SimonG.helpers.lazyLoadImages();
};

var $footer, $footerToggle, $searchBox, $searchToggle, $map, $marqueeSlides, $slideshowLength, $slideHeight, $pagination, $marqueeNextButton, $marqueePrevButton, $checkBoxLabels, $radioButtonLabels, $mobileNav, $mobileNavToggle, $window, $footerLocationForm, $productDetails, $contestFrame, wishlist, $addWishlist, $removeWishlist, viewedProducts, $marquee, $filter, $filterForm, $filterToggle, $filterFeatureToggle, $filterFieldsets, $filterFieldsetContents, $filterReset, $retailerContact, $retailerContactList, $retailerContactSubmit, lastScrollPosition = SimonG.helpers.windowWatchers.windowScrollTop();

jQuery(function($) {
	/*if(typeof define === 'function' && define.amd){
		var reqConfig={
			packages: [
			  { name: "picturefill", location:SimonG.environment[currentEnvironment].picturefillPath, main:"picturefill" }
	        ]
		};
		require(reqConfig,['picturefill'],function(picturefill){
			if(!window.picturefill&&picturefill){window.picturefill=picturefill;}
			SimonG.init();
		});
	}else{
		jQuery('<script>').attr('type', 'text/javascript').attr('src',SimonG.environment[currentEnvironment].picturefillPath + '/picturefill.js').appendTo('head');
		SimonG.init();
	}*/
	SimonG.init();
});

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return (d*0.621371).toFixed(2);
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}