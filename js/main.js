;jQuery.expr[':'].icontains = function(a, i, m) {
   return jQuery(a).text().toUpperCase()
       .indexOf(m[3].toUpperCase()) >= 0;
};
const scrollToSearchBar = function(delay = 400) {
    $("html").animate({
        scrollTop: $(".search__input").offset().top - $(".navbar").outerHeight()
    }, delay);
};
;$(".search__input").on("click", scrollToSearchBar);
;$(".search__input").on("keydown", scrollToSearchBar);
;$(".search__input").on("keyup", function() {
    $('mark').contents().unwrap();
    var hasResults = false;
    var valThis = this.value;
    $('#fh5co-pricing > .pricing-section > .container > .experience_cards').find('.col-md-12').each(function() {
        if ($(this).attr('data-search') !== 'false') {
            $(this).find(".fh5co-post > *:icontains("+valThis+")").each(function() {
                var text = $(this).text();
                var textL = text.toLowerCase();
                var position = textL.indexOf(valThis.toLowerCase());

                var regex = new RegExp(valThis, 'ig');
                text = text.replace(regex, (match, $1) => {
                    // Return the replacement
                    return '<mark>' + match + '</mark>';
                });


                if(valThis !== "") $(this).html(text);
            });
        }

        if ($(this).find('mark').length > 0) {
            var currMarkLoc = $(this).find("mark").first().position().top;
            var currScroll = $(this).find("mark").parent().scrollTop();
            var scrollOffset = $(this).find("mark").parent().position().top;
            var desiredScroll = currMarkLoc + currScroll - scrollOffset;
            $(this).find("mark").parent().animate({ scrollTop: desiredScroll}, 200);

            $(this).show();
            hasResults = true;
        } else if ( valThis == "") {
            $(this).show();
            hasResults = true;
        } else {
            $(this).hide();
        }
    });
    $(".no-results-text").prop('hidden', hasResults);
    Waypoint.refreshAll();
});


;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};



	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

		});

	};


	// Page Nav
	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-fh5co-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '350px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 355; }
		});

	};

	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#fh5co-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top fh5co-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top fh5co-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top fh5co-animated slideInDown slideOutUp');
					}, 100 );
				}
			} 
			
		});
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter-section').length > 0 ) {
			$('#fh5co-counter-section').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};

	// Document on load.
	$(function(){

		parallax();
		burgerMenu();
		clickMenu();
		windowScroll();
		navigationSection();
		counterWayPoint();
		contentWayPoint();

	});


}());
/* Disabled for now until I figure out an elegant way to add non-text content
$(document).ready(function() {
    $('.magnific-popup-parent').magnificPopup({
        delegate: 'div.col-md-12',
        type: 'inline',
        callbacks: {
            elementParse: function(item) {
                item.src = $(item.el).clone();
            },
        },
    });
});
*/