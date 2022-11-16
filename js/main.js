;(function () {
	var redvid = false;

	$(window).scroll(function(){

		var $win = $(window);

		var bgopacity = 1- $(window).scrollTop() / 700;
		if ( bgopacity < 0.4) bgopacity = 0.4;
		$('#background').css("opacity", bgopacity);
		//if ($win.scrollTop() > 700){
			//$('#background').css("visibility", 'hidden')
		//} else {
			//$('#background').css("visibility", 'visible')
		//}

		var $v = $('video');
		// Do seeking
		
		if ($win.scrollTop() > 3500){
			var scrollRatio = ($(document).scrollTop() - 3500) / 400;
			if(isNaN(scrollRatio)) scrollRatio = 0;
			$v[0].currentTime = scrollRatio;
		}
		if ($win.scrollTop() > 4500){
			var scrollRatio2 = ($(document).scrollTop() - 4500) / 400;
			if(isNaN(scrollRatio2)) scrollRatio2 = 0;
			$v[1].currentTime = scrollRatio2;
		}


	});
	


	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
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
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		
		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%'} );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


}());

const video = document.querySelector('#page').querySelector('video');
const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
	duration:1000,
	triggerElement: video,
	triggerHook: 0
}).addIndicators().setPin(video).addTo(controller);

let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on ("update", e => {
scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
delay += (scrollpos - delay) * accelamount;
console. log(scrollpos, delay);
video.currentTime = delay;
}, 33.3);
