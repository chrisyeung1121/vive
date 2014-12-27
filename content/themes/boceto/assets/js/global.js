/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";
	
	$(window).load(function(){
		/* Home Masonry */		
		var $container = $('div.home div.articles');
		$container.isotope({
			layoutMode: 'masonry',
			columnWidth: 180,
			itemSelector: 'article.item'
		});
		$container.removeClass('loading');
		$container.find('article.item').removeClass('opacity0');

	});

    $(document).ready(function(){
		var bigint = 5000;

		$("div.home div.articles article").each(function(i){
			$(this).css('z-index', bigint-i);
			if($(this).find('div.main-image img').length == 0)
				$(this).addClass('no-thumb');
		});
		$("div.home div.articles, .post-content").fitVids();
		
		/* Mobile Menu */
		
		$('nav.mobile-nav h3').click(function(){
			$(this).next().stop().slideToggle();
			var text = $(this).text()
			 $(this).text(text == "Open Menu" ? "Close Menu" : "Open Menu");
		});
		
		

		
		/* Sticky Menu */
		
		//$('#sidebar').sticky({ topSpacing: 80, bottomSpacing: 20 });
		
		/* Featured Image Single Post */
		
		var mainImage = null;
		mainImage = $('div.single img[alt=main-image]');

		if ( mainImage.length > 0){
			var mainImageSource = mainImage.attr('src');
			$('div.single article header div.main-image').html('<img src="'+mainImageSource+'">');
			mainImage.parents('p').remove();
			mainImage.remove();
		}
		
		/* Remove Thumb */
		
		var thumbImage = null;
		thumbImage = $('div.single img[alt=thumb-image]');

		if ( thumbImage.length > 0){
			thumbImage.parents('p').remove();
			thumbImage.remove();
		}
		
		/* Gallery */
		
		$('div#gallery img').wrap(function() {
			return '<a href="'+$(this).attr('src')+'" class="ep-one-third full-image" rel="gallery"><i class="fa fa-search-plus"></i><img src="'+$(this).attr('src')+'"></a>';
		});
		$('div#gallery a:nth-child(3n)').addClass('ep-last');
		$('div#gallery').append('<div class="clear"></div');
		$('div#gallery').magnificPopup({
			type: 'image',
			delegate: 'a',
			mainClass: 'my-mfp-zoom-in',
			removalDelay: 300,
			gallery: {
				enabled: true,
				arrowMarkup: '<i class="mfp-arrow mfp-arrow-%dir% fa fa-chevron-%dir%"></i>'
			},
			closeMarkup: '<i title="%title%" class="mfp-close fa fa-times"></i>'
		});
		$('div#gallery').fadeIn();
		
		/* Code Prettify */
		
		prettyPrint();
		
		/* Back to top button */
	
		$(window).scroll(function() {
			if($(this).scrollTop() > 220) $('#back-to-top').addClass('visible');
			else $('#back-to-top').removeClass('visible');
		});
		
		$('#back-to-top').click(function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, 500);
			return false;
		})
		
		/* Google Map Integration */
		
		if($('#map_canvas').length > 0){
			var map_canvas = $('#map_canvas');
			var lat = map_canvas.attr('latitude');
			var lng = map_canvas.attr('longitude');
			var zoom = map_canvas.attr('zoom');
			var location = map_canvas.attr('location');
			if(!zoom) zoom = 16;
			if(lat && lng && zoom){
				map_canvas.wrap('<div class="map"></div>');
				if(location) $('article header div.meta').append('<i class="fa fa-map-marker"></i>'+location);
				initialize(lat, lng, zoom);
			}
		}
		
		
    }); // end: document.ready
	
	function initialize(lat, lng, zoom) {
		var latlng = new google.maps.LatLng(lat, lng);
		var myOptions = {
		  zoom: parseInt(zoom),
		  center: latlng,
		  scrollwheel: false
		};
		var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
		//map.setMapTypeId('roadmap');
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			animation: google.maps.Animation.DROP
		});
		google.maps.event.addDomListener(window, 'resize', function(){
			map.setCenter(latlng);
		});	
	}

}(jQuery));