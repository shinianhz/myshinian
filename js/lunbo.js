(function($) {
    $.fn.extend({
        lunbo: function(options) {
            var _that = this,
                main = null,
                start = null,
                init = null,
                next = null,
                timeout = null,
                prev = null,
                stop = null,
                elems = {
                    imgWidth: this.children('div').children('img').width(), //图片宽度
                    num: this.children('div').children('img').length //记录图片个数
                },
                defaults = {
                    speed: 500,
                    delay: 1000,
                    dir: 1
                };
            options = $.extend(defaults, options);


            //初始化函数
            init = function() {
                elems._index = 1;
                elems.innerDiv = _that.children('div');
                elems.btns = _that.children('span');
                elems.innerDiv.append(elems.innerDiv.children('img').first().clone());
                _that.hover(function() {
                    stop();
                }, function() {
                    timeout = setInterval(function() {
                        start();
                    }, options.delay + options.speed);
                });
                elems.btns.on("click", function() {
                    if (elems.btns.index($(this))) {
                        next();
                    } else {
                        prev();
                    }
                })
            };


            //开始函数
            start = function() { //参数为方向,因为btns只有两个，index后有0和1两个返回值
                var wid = elems.imgWidth,
                    t = "-=" + wid;
                if (options.dir) { //点击左边按钮的时候
                    t = '+=' + wid;
                    if (elems._index <= 1) {
                        var divLeft = _that.offset().left,
                            imgLeft = elems.innerDiv.children('img').last().offset().left;
                        elems._index = elems.num + 1;
                        elems.innerDiv.css('left', '-' + (imgLeft - divLeft) + "px");
                    };
                    elems.innerDiv.animate({
                        left: t
                    }, function() {
                        elems._index--;
                    });
                } else {
                    if (elems._index == elems.num + 1) {
                        elems.innerDiv.css('left', 0);
                        elems._index = 1;
                    };
                    elems.innerDiv.animate({
                        left: t
                    }, function() {
                        elems._index++;
                    });
                }
                console.log(elems.num);
            };
            //点击向前
            next = function() {
                options.dir = 1;
                stop();
                start();
            };
            //点击向后
            prev = function() {
                options.dir = 0;
                stop();
                start();
            };
            //停止函数
            stop = function() {
                elems.innerDiv.stop(true, true);
                clearInterval(timeout);
            };
            main = function() {
                init();
                timeout = setInterval(function() {
                    start(); //默认向右轮播参数为0；
                }, options.delay + options.speed);
            }
            main();
        }
    });
})(jQuery);