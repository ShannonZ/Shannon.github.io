/* jquery.galllery3d.js - 2012©yamoo9.com */

;(function($) {
	$.fn.gallery3d = function(options) {

		// 初始值
		options = $.extend({
			current		: 0,	// 当前索引
			autoPlay	: false,// 自动播放
			sec			: 5	  	// 自动切换秒数
		}, options);
		
		return this.each(function() {
		
			/* 初始化 */
			
			// html { overflow-x: hidden; } 设置
			$('html').css('overflow-x', 'hidden');
			
		
			var $this = $(this),
				$container = $('<div class="a-container"/>').prependTo($this),
				$links = $this.find('> a'),
				links_length = $links.length,
				$nav, $navPrev, $navNext,
				current = options.current,
				clear_autoplay;

			// 添加gallery3d类
			$this.addClass('gallery3d');
			
			// 使用生成的容器包裹超链
			$container.append($links);
			
		
			$links.find('img+*').addClass('desc');
			
			// 当超链多于3个时生成nav
			if(links_length > 2) {
				$nav = $('<nav/>').appendTo($this);
				// prev, next按钮
				createBtn($nav, '&lt', 'prev');
				createBtn($nav, '&gt', 'next');
				// prev, next按钮引用
				$navPrev = $nav.find('.prev'); 
				$navNext = $nav.find('.next');
				
				// 调用设置函数
				setLinks();	
				navigate();
				setTimeout(autoPlay, options.sec*1000);
				
			} else {
				// 当超链少于2个时不生成nav
				delete $nav; delete $navPrev; delete $navNext;
				// 向应用插件的元素设置lack类
				$this.addClass('lack clearfix');
				$container.css('margin-left', -$container.width()/2);
			};

			

		
		
		
			
			// 生成按钮
			function createBtn(parent, text, className) {
				$('<button/>', {
					'type'	: 'button',
					'class' : className,
					'text'	: text
				}).appendTo(parent);
			};
			
		
			function navigate() {
				$navPrev.on('click', prevSlide);
				$navNext.on('click', nextSlide);
				if(options.autoPlay) {
					$navPrev.add($navNext).on('click', function() {
						options.autoPlay = false;	
					});
				};
			};
			
			// 前一张幻灯片函数
			function prevSlide() {
				current--;				
				setLinks('prev');
			};			
			
			// 后一张幻灯片函数
			function nextSlide() {
				current++;				
				setLinks('next');
			};
			
			// 自运行函数
			function autoPlay() {
				if(options.autoPlay) {
					nextSlide();
					clear_autoplay = setTimeout(autoPlay, options.sec * 1000);
				} else {
					clearTimeout(clear_autoplay);
					delete clear_autoplay;
				};
			};
			
			// 设置函数
			function setLinks(direction) {
				
				var $current, $prev, $next, $others, $desc;
				
				if(current < 0) current = links_length-1;
				if(current > links_length-1) current = 0;

				$current = $links.eq(current);
				$prev	 = (current === 0) ? $links.eq(links_length-1) : $links.eq(current-1);
				$next	 = (current === links_length-1) ? $links.eq(0) : $links.eq(current+1);

				if(!direction) {
					$current.addClass('g-center');
					$prev.addClass('g-prev');
					$next.addClass('g-next');
				} else if(direction === 'prev') {
					$prev.addClass('g-prev').fadeTo(200, 1);
					$current.removeClass('g-prev').addClass('g-center');
					$next.removeClass('g-center').addClass('g-next');
				} else {
					$prev.removeClass('g-center').addClass('g-prev');
					$current.removeClass('g-next').addClass('g-center');
					$next.addClass('g-next').fadeTo(200, 1);
				};
				
				$others	= $links.not($prev).not($current).not($next);
				$others.removeClass().fadeTo(1, 0);
				
			
			}; // e:setLinks
			
		}); // e:this.each
	}; // e:plugin
})(window.jQuery);