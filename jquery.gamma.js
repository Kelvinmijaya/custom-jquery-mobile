var _, h, Operator = {
    el: {},
    setEl: function() {
        var e = this;
        e.el.didResize = null, e.el.windowWidth = $(window).width(), e.el.windowHeight = $(window).height(), e.el.initZIndex = 2, e.el.mobileCarouselWrapper = $("#homepage-mobile-collage"), e.el.desktopCarouselWrapper = $("#homepage-desktop-collage"), e.el.mobileCollageElements = $("#homepage-mobile-collage li"), e.el.desktopCollageElements = $("#homepage-desktop-collage li"), e.el.initialActiveCollageElement = $("#homepage-desktop-collage li[data-index=9]"), e.el.collageAutoInterval = null, e.el.carouselWrapper = $("#home-carousel"), e.el.initialResize = !0, e.el.loadInitialElement = !0, e.el.isMobile = !0, e.el.columns3 = 628, e.el.columns4 = 836, e.el.columns5 = 1044, e.el.columns6 = 1252, e.el.columns7 = 1460, e.el.columns8 = 1668, e.el.numCols = 0, e.el.surrounding = [], e.el.animationDirection = [0, 0]
        console.log($("#homepage-desktop-collage"));
    },
    init: function() {
        var e = this;
        _ = e.el, h = e.helpers, e.events()
    },
    events: function() {
        var e = this;
        $(document).ready(function() {
            e.setEl()
        }), $(window).on("load", function() {
            h.determineIfIsMobile(), $("body").hasClass("home-page") && (e.homeCarousel.init()), $(window).on("resize", function() {
                _.didResize = !0
            }).resize(), setInterval(function() {
                _.didResize && (h.hasResized(), _.didResize = !1)
            }, 500)
        }), $(window).bind("keyup", function(e) {
            27 == e.keyCode && $(".modal").modal("hide")
        })
    },
    helpers: {
        getQueryVariable: function(e) {
            for (var t = window.location.search.substring(1), o = t.split("&"), i = 0; i < o.length; i++) {
                var s = o[i].split("=");
                if (s[0] === e) return s[1]
            }
            return null
        },
        isElementInViewport: function(e, t) {
            "function" == typeof jQuery && e instanceof jQuery && (e = e[0]), t = t || 0;
            var o = e.getBoundingClientRect();
            console.log(e.getBoundingClientRect());
            return o.top <= window.innerHeight - t
        },
        hasResized: function() {
            _.windowWidth = $(window).width(), _.windowHeight = $(window).height(), h.determineIfIsMobile(), Operator.homeCollage.init(), Operator.homeCarousel.positionIndicators()
        },
        determineIfIsMobile: function() {
            _.windowWidth > 768 ? _.isMobile = !1 : _.isMobile = !0
        }
    },
    homeCollage: {
        determineNumCols: function() {
            _.windowWidth < _.columns3 ? _.numCols = 2 : _.windowWidth >= _.columns3 && _.windowWidth < _.columns4 ? _.numCols = 3 : _.windowWidth >= _.columns4 && _.windowWidth < _.columns5 ? _.numCols = 4 : _.windowWidth >= _.columns5 && _.windowWidth < _.columns6 ? _.numCols = 5 : _.windowWidth >= _.columns6 && _.windowWidth < _.columns7 ? _.numCols = 6 : _.windowWidth >= _.columns7 && _.windowWidth < _.columns8 ? _.numCols = 7 : _.windowWidth >= _.columns8 && (_.numCols = 8)
        },
        determineSurrounding: function(e, t) {
            _.surrounding = [], e = Number(e), e === 4 * t - 1 ? (_.surrounding = [e - 1, e - t, e - (t + 1)], _.animationDirection = [100, 100]) : e % t === t - 1 ? (_.surrounding = [e - 1, e + (t - 1), e + t], _.animationDirection = [100, 0]) : e >= 3 * t ? (_.surrounding = [e + 1, e - (t - 1), e - t], _.animationDirection = [0, 100]) : (_.surrounding = [e + 1, e + t, e + (t + 1)], _.animationDirection = [0, 0])
        },
        randomizeInitialCard: function() {
            var e = this,
                t = _.initialActiveCollageElement[0].dataset.index,
                o = -1;
            for (e.determineNumCols(), o = Math.floor(4 * Math.random() * _.numCols); o == t;) o = Math.floor(4 * Math.random() * _.numCols);
            t = o, _.initialActiveCollageElement = $("#homepage-desktop-collage li[data-index=" + t + "]")
        },
        setRandomCollageElement: function() {
            Operator.homeCollage.randomizeInitialCard(), Operator.homeCollage.activateAndFade(_.initialActiveCollageElement, _.initialActiveCollageElement[0].dataset.index, _.numCols)
        },
        activateAndFade: function(e, t, o) {
            var i = this;
            i.determineSurrounding(t, o), _.initZIndex += 1, $(e).css("z-index", _.initZIndex), $(e).hasClass("active") ? ($(".collage-content", e).css({
                left: "0",
                top: "0"
            }), $(e).removeClass("active"), _.desktopCollageElements.removeClass("active fade")) : ($(".collage-content", _.desktopCollageElements).css({
                left: "0",
                top: "0"
            }), _.desktopCollageElements.removeClass("active"), _.desktopCollageElements.removeClass("fade"), _.surrounding.forEach(function(e) {
                $("#homepage-desktop-collage li[data-index='" + e + "']").addClass("fade")
            }), $(".collage-content", e).css({
                left: -1.02 * _.animationDirection[0] + "%",
                top: -1.02 * _.animationDirection[1] + "%"
            }), $(e).addClass("active"))
        },
        setupMobileCollage: function() {
            _.mobileCollageElements.hasClass("active") || $("#homepage-mobile-collage li[data-index=9]").addClass("active"), _.mobileCarouselWrapper.carousel("cycle"), $(".item", _.mobileCarouselWrapper).each(function() {
                var e = $(this).next();
                $(this).children(".collage-content").length > 2 || (e.length || (e = $(this).siblings(":first")), e.children(":first-child").clone().appendTo($(this)), e.next().length > 0 ? e.next().children(":first-child").clone().appendTo($(this)) : $(this).siblings(":first").children(":first-child").clone().appendTo($(this)))
            }), _.mobileCarouselWrapper.swiperight(function() {
                $(this).carousel("prev")
            }), _.mobileCarouselWrapper.swipeleft(function() {
                $(this).carousel("next")
            })
        },
        setupDesktopCollage: function() {
            var e = this;
            e.determineNumCols(), _.loadInitialElement && (e.setRandomCollageElement(), _.collageAutoInterval = window.setInterval(e.setRandomCollageElement, 1e4), _.loadInitialElement = !1), _.desktopCollageElements.click(function() {
                _.isMobile || (_.collageAutoInterval && (clearInterval(_.collageAutoInterval), _.collageAutoInterval = null), e.activateAndFade(this, this.dataset.index, _.numCols))
            })
        },
        resetDesktopCollage: function() {
            var e = this;
            e.determineNumCols(), $(".collage-content", _.desktopCarouselWrapper).removeAttr("style"), _.desktopCollageElements.removeClass("active fade")
        },
        init: function() {
            var e = this;
            $("body").hasClass("home-page") && (_.isMobile ? e.setupMobileCollage() : (_.mobileCarouselWrapper.carousel("pause"), _.initialResize ? e.setupDesktopCollage() : e.resetDesktopCollage(), _.initialResize = !1))
        }
    },
    homeCarousel: {
        hasStarted: !1,
        timers: {
            timer1: null,
            timer2: null,
            timer3: null,
            timer4: null
        },
        events: function() {
            var e = this;
            _.carouselWrapper.swiperight(function() {
                e.cycleBackwards()
            }), _.carouselWrapper.swipeleft(function() {
                e.cycleForwards()
            }), $("#home-carousel-indicators").swiperight(function() {
                e.cycleBackwards()
            }), $("#home-carousel-indicators").swipeleft(function() {
                e.cycleForwards()
            }), $(".carousel-control").on("click", function() {
                _.carouselWrapper.carousel("pause")
            }), $("#home-carousel-indicators li").on("click", function() {
                _.isMobile || $("body").scrollTo(".home-carousel-indicators", {
                    duration: 500,
                    easing: "swing",
                    offset: -88
                }), e.stop(), $("#home-carousel-indicators li.active").removeClass("active"), $(this).addClass("active"), _.carouselWrapper.carousel("pause"), e.start()
            }), _.carouselWrapper.on("slid.bs.carousel", function() {
                e.stop(), $("#home-carousel-indicators li.active").removeClass("active");
                var t = $("div.active").index("div.item");
                $('#home-carousel-indicators li[data-slide-to="' + t + '"]').addClass("active"), e.positionIndicators(), e.start()
            }), $(window).on("DOMContentLoaded load resize scroll", function() {
                e.hasStarted
            })
        },
        start: function() {
            var e = this;
            e.timers.timer1 = setTimeout(function() {
                $(".active", _.carouselWrapper).addClass("state1"), e.timers.timer2 = setTimeout(function() {
                    $(".active", _.carouselWrapper).addClass("state2"), e.timers.timer3 = setTimeout(function() {
                        $(".active", _.carouselWrapper).addClass("state3"), e.timers.timer4 = setTimeout(function() {
                            $(".active", _.carouselWrapper).addClass("state4")
                        }, 3500)
                    }, 2500)
                }, 2500)
            }, 1e3)
        },
        stop: function() {
            var e = this;
            $(".home-carousel .carousel-inner .item").removeClass("state1 state2 state3 state4"), clearTimeout(e.timers.timer1), clearTimeout(e.timers.timer2), clearTimeout(e.timers.timer3), clearTimeout(e.timers.timer4), e.timers.timer1 = null, e.timers.timer2 = null, e.timers.timer3 = null, e.timers.timer4 = null
        },
        cycleBackwards: function() {
            this.stop(), _.carouselWrapper.carousel("prev"), _.carouselWrapper.carousel("pause"), this.start()
        },
        cycleForwards: function() {
            this.stop(), _.carouselWrapper.carousel("next"), _.carouselWrapper.carousel("pause"), this.start()
        },
        positionIndicators: function() {
            if ($("body").hasClass("home-page"))
                if (_.windowWidth < 480) {

                } else $("#home-carousel-indicators").css("left", 0)
        },
        init: function() {
            var e = this;
            e.events()
        }
    }
};
$(document).ready(function() {
    Operator.init()
});