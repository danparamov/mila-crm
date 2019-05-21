! function (e) {
	"use strict";
	e(".header_area").length && e(window).scroll(function () {
		e(window).scrollTop() ? e(".header_area").addClass("navbar_fixed") : e(".header_area").removeClass("navbar_fixed")
	}), new WOW({
		offset: 100,
		mobile: !0
	}).init();
	var a, i, t, o, s, l, r, n, m, p, d = e(".scroll_animation"),
		c = e(window);
	if (e(window).width() > 576 && (c.on("scroll resize", function () {
			var a = c.height(),
				i = c.scrollTop(),
				t = i + a;
			e.each(d, function () {
				var a = e(this),
					o = a.outerHeight(),
					s = a.offset().top;
				s + o >= i && s <= t ? a.addClass("in-view") : a.removeClass("in-view")
			})
		}), c.trigger("scroll")), (a = e(".service_carousel")).length && a.owlCarousel({
			loop: !0,
			margin: 15,
			items: 4,
			autoplay: !0,
			smartSpeed: 2e3,
			responsiveClass: !0,
			nav: !0,
			dots: !1,
			stagePadding: 100,
			navText: [, '<i class="ti-arrow-left"></i>'],
			responsive: {
				0: {
					items: 1,
					stagePadding: 0
				},
				578: {
					items: 2,
					stagePadding: 0
				},
				992: {
					items: 3,
					stagePadding: 0
				},
				1200: {
					items: 3
				}
			}
		}), (i = e(".about_img_slider")).length && i.owlCarousel({
			loop: !0,
			margin: 0,
			items: 1,
			nav: !1,
			autoplay: !1,
			smartSpeed: 2e3,
			responsiveClass: !0
		}), (t = e(".feedback_slider")).length && t.owlCarousel({
			loop: !0,
			margin: 20,
			items: 3,
			nav: !1,
			center: !0,
			autoplay: !1,
			smartSpeed: 2e3,
			stagePadding: 0,
			responsiveClass: !0,
			responsive: {
				0: {
					items: 1
				},
				776: {
					items: 2
				},
				1199: {
					items: 3
				}
			}
		}), (o = e(".testimonial_slider")).length && o.owlCarousel({
			loop: !0,
			margin: 10,
			items: 1,
			autoplay: !0,
			smartSpeed: 2500,
			autoplaySpeed: !1,
			responsiveClass: !0,
			nav: !0,
			dot: !0,
			stagePadding: 0,
			navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
			navContainer: ".agency_testimonial_info"
		}), (s = e(".app_testimonial_slider")).length && s.owlCarousel({
			loop: !0,
			margin: 10,
			items: 1,
			autoplay: !0,
			smartSpeed: 2e3,
			autoplaySpeed: !0,
			responsiveClass: !0,
			nav: !0,
			dot: !0,
			navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
			navContainer: ".nav_container"
		}), (l = e(".app_screenshot_slider")).length && l.owlCarousel({
			loop: !0,
			margin: 10,
			items: 5,
			autoplay: !1,
			smartSpeed: 2e3,
			responsiveClass: !0,
			nav: !0,
			dots: !1,
			navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
			navContainer: ".app_screenshot_slider",
			responsiveClass: !0,
			responsive: {
				0: {
					items: 1
				},
				650: {
					items: 2
				},
				776: {
					items: 4
				},
				1199: {
					items: 5
				}
			}
		}), (r = e(".pr_slider")).length && r.owlCarousel({
			loop: !0,
			margin: 10,
			items: 1,
			autoplay: !0,
			smartSpeed: 1e3,
			responsiveClass: !0,
			nav: !0,
			dots: !1,
			navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
			navContainer: ".pr_slider"
		}), e("#mapBox").length) {
		var u = e("#mapBox").data("lat"),
			g = e("#mapBox").data("lon"),
			v = e("#mapBox").data("zoom"),
			h = e("#mapBox").data("marker"),
			f = e("#mapBox").data("info"),
			_ = e("#mapBox").data("mlat"),
			w = e("#mapBox").data("mlon");
		new GMaps({
			el: "#mapBox",
			lat: u,
			lng: g,
			scrollwheel: !1,
			scaleControl: !0,
			streetViewControl: !1,
			panControl: !0,
			disableDoubleClickZoom: !0,
			mapTypeControl: !1,
			zoom: v
		})
	}
}(jQuery);

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('../sw.js').then(function() {
			console.log('Service Worker Registered')
		})
	})
}
