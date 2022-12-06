!(function (e) {
	var t = {
		trigger: 'atendpage',
		animation: 'fade',
		delay: 0,
		showOnce: true,
		autoClose: false,
		scrollableModal: false,
	};
	e.fn.subscribeBetter = function (n) {
		var r = e.extend({}, t, n),
			i = e(this),
			s = false,
			o = false;
		i.addClass('sb');
		e.fn.openWindow = function () {
			var t = e(this);
			if (t.is(':hidden') && s == false && o == false) {
				o = true;
				setTimeout(function () {
					if (r.scrollableModal == true) {
						if (e('.sb-overlay').length < 1) {
							e('body').append(
								"<div class='sb-overlay'><div class='sb-close-backdrop'></div><div class='sb sb-withoverlay'>" +
									e('.sb').html() +
									'</div></div>'
							);
							e('.sb-close-backdrop, .sb-close-btn').one('click', function () {
								e('.sb.sb-withoverlay').closeWindow();
								return false;
							});
							e('.sb.sb-withoverlay')
								.removeClass('sb-animation-' + r.animation.replace('In', 'Out'))
								.addClass('sb-animation-' + r.animation);
							setTimeout(function () {
								e('.sb.sb-withoverlay').show();
								e('body').addClass('sb-open sb-open-with-overlay');
							}, 300);
						}
					} else {
						if (e('.sb-overlay').length < 1) {
							e('body').append(
								"<div class='sb-overlay'><div class='sb-close-backdrop'></div></div>"
							);
							e('.sb')
								.removeClass('sb-animation-' + r.animation.replace('In', 'Out'))
								.addClass('sb-animation-' + r.animation);
							e('.sb-close-backdrop, .sb-close-btn').one('click', function () {
								e('.sb').closeWindow();
								return false;
							});
							setTimeout(function () {
								e('.sb').show();
								e('body').addClass('sb-open');
							}, 300);
						}
					}
					if (r.showOnce == true) s = true;
					o = false;
				}, r.delay);
			}
		};
		e.fn.closeWindow = function () {
			var t = e(this);
			if (t.is(':visible') && o == false) {
				o = true;
				if (r.scrollableModal == true) {
					e('.sb.sb-withoverlay')
						.removeClass('sb-animation-' + r.animation)
						.addClass('sb-animation-' + r.animation.replace('In', 'Out'));
					setTimeout(function () {
						e('.sb.sb-withoverlay').hide();
						e('body').removeClass('sb-open sb-open-with-overlay');
						setTimeout(function () {
							e('.sb-overlay').remove();
						}, 300);
					}, 300);
				} else {
					e('.sb')
						.removeClass('sb-animation-' + r.animation)
						.addClass('sb-animation-' + r.animation.replace('In', 'Out'));
					setTimeout(function () {
						e('.sb').hide();
						e('body').removeClass('sb-open');
						setTimeout(function () {
							e('.sb-overlay').remove();
						}, 300);
					}, 300);
				}
				o = false;
			}
		};
		e.fn.scrollDetection = function (t, n) {
			var r,
				i = new Date().getTime();
			e(window).scroll(function () {
				var t = new Date().getTime();
				if (t - i > 400) {
					e(this).trigger('scrollStart');
					i = t;
				}
				clearTimeout(r);
				r = setTimeout(function () {
					e(window).trigger('scrollEnd');
				}, 300);
			});
			if (t == 'scrollStart') {
				e(window).bind('scrollStart', function () {
					e(window).unbind('scrollEnd');
					n();
				});
			}
			if (t == 'scrollEnd') {
				e(window).bind('scrollEnd', function () {
					e(window).unbind('scrollStart');
					n();
				});
			}
		};
		switch (r.trigger) {
			case 'atendpage':
				e(window).scroll(function () {
					var t = e(window).scrollTop();
					if (t >= e(document).height() - e(window).height()) {
						i.openWindow();
					} else {
						if (t + 300 < e(document).height() - e(window).height()) {
							if (r.autoClose == true) {
								i.closeWindow();
							}
						}
					}
				});
				break;
			case 'onload':
				e(window).load(function () {
					i.openWindow();
					if (r.autoClose == true) {
						i.scrollDetection('scrollStart', function () {
							i.closeWindow();
						});
					}
				});
				break;
			case 'onidle':
				e(window).load(function () {
					i.scrollDetection('scrollEnd', function () {
						i.openWindow();
					});
					if (r.autoClose == true) {
						i.scrollDetection('scrollStart', function () {
							i.closeWindow();
						});
					}
				});
				break;
		}
	};
})(window.jQuery);
