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
                add = null,
                show = null,
                click = null,
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
                        start(1);
                    }, options.delay + options.speed);
                });
                elems.btns.on("click", function() {
                    if (elems.btns.index($(this))) {
                        next();
                    } else {
                        prev();
                    }
                });
                add();
            };


            //开始函数
            start = function() { //参数为方向,因为btns只有两个，index后有0和1两个返回值
                var wid = elems.imgWidth,
                    t = "-=" + wid;
                if (!options.dir) { //点击左边按钮的时候
                    t = '+=' + wid;
                    if (elems.num + 1 == elems._index) {
                        var divLeft = _that.offset().left,
                            imgLeft = elems.innerDiv.children('img').last().offset().left;
                        elems._index = 1;
                        elems.innerDiv.css('left', '-' + (imgLeft - divLeft) + "px");
                    };
                    elems.innerDiv.animate({
                        left: t
                    }, function() {
                        elems._index++;
                    });
                    show();
                } else {
                    if (elems._index <= 1) {
                        elems.innerDiv.css('left', 0);
                        elems._index = elems.num + 1;
                    };
                    elems.innerDiv.animate({
                        left: t
                    }, function() {
                        elems._index--;
                    });
                    show();
                };


            };
            //增加底部按钮
            add = function() {
                // 动态生成底部按钮
                var left = elems.imgWidth * 0.03 * elems.num;
                do {
                    var btms = $('<em></em>');
                    $('.box').append(btms);
                } while (_that.children('em').length < elems.num);
                for (var i = 0; i < _that.children('em').length; i++) {
                    $(_that.children('em')[i]).css({
                        'left': 20 * i + left + 'px'
                    });
                }
                $(_that.children('em')[elems.num - 1]).addClass('show'); //第一个按钮高亮
            };
            //底部按钮点击
            click = function() {
                _that.children('em').each(function() {
                    $(this).on('click', function() {
                        var _thisindex = $(this).index();
                        var mindex = _thisindex - elems._index;
                        if (mindex == 0) {
                            return;
                        } else if (mindex > 0) {
                            elems.innerDiv.animate({
                                left: -(mindex - 1) * elems.imgWidth
                            });
                            show();

                        } else if (mindex < 0) {
                            elems.innerDiv.animate({
                                left: mindex - 1 * elems.imgWidth
                            });
                            show();
                        }
                    });
                });
            };
            //底部按钮高亮
            show = function() {
                _that.children('em').eq(elems._index - 3).addClass('show').siblings().removeClass('show');
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
                click();
                timeout = setInterval(function() {
                    start(); //默认向右轮播参数为0；
                }, options.delay + options.speed);

            }
            main();
        }
    });
})(jQuery);