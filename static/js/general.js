const BaseApi = '/demo/api/public/v1/';
$(function () {
    console.log("0.2.9");
    /**
     * Format Currency
     *
     * @method formatCurrency
     * @return {String}
     */
    formatCurrency = function (num, isRial, symbol) {
        num = num.toString().replace(/\$|\,/g, "");
        if (isNaN(num)) num = "0";
        var sign = (num == (num = Math.abs(num)));
        num = Math.round(num * 100 + 0.50000000001);
        num = Math.round(num / (isRial ? 1000 : 100)).toString();
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        return (((sign) ? "" : "-") + num + " " + symbol);
    };

    /**
     * convert En number to Fa number
     *
     * @method convertToFaDigit
     * @return {String}
     */
    convertToFaDigit = function (a) {
        var b = '' + a;
        for (var c = 48; c <= 57; c++) {
            var d = String.fromCharCode(c);
            var e = String.fromCharCode(c + 1728);
            b = b.replace(new RegExp(d.toString(), "g"), e.toString())
        }
        return b;
    };

    /**
     * Convert Persion Number to English Number
     *
     * @method convertToEnDigit
     * @return {String}
     */
    convertToEnDigit = function (str) {
        return str
            .replace(/۰/g, '0')
            .replace(/۱/g, '1')
            .replace(/۲/g, '2')
            .replace(/۳/g, '3')
            .replace(/۴/g, '4')
            .replace(/۵/g, '5')
            .replace(/۶/g, '6')
            .replace(/۷/g, '7')
            .replace(/۸/g, '8')
            .replace(/۹/g, '9')
            .replace(/٠/g, '0')
            .replace(/١/g, '1')
            .replace(/٢/g, '2')
            .replace(/٣/g, '3')
            .replace(/٤/g, '4')
            .replace(/٥/g, '5')
            .replace(/٦/g, '6')
            .replace(/٧/g, '7')
            .replace(/٨/g, '8')
            .replace(/٩/g, '9');

    };

     /**
   * Convert Jalali Date to Georgian Date
   *
   * @method jalaliToGregorian
   * @return {Boolean}
   */
  JalaliDate = {
    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
  };

  JalaliDate.jalaliToGregorian = function (j_y, j_m, j_d) {
    j_m = j_m.length == 1 ? "0" + j_m : j_m;
    j_d = j_d.length == 1 ? "0" + j_d : j_d;
    j_y = parseInt(j_y);
    j_m = parseInt(j_m);
    j_d = parseInt(j_d);
    var jy = j_y - 979;
    var jm = j_m - 1;
    var jd = j_d - 1;

    var j_day_no =
      365 * jy + parseInt(jy / 33) * 8 + parseInt(((jy % 33) + 3) / 4);
    for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

    j_day_no += jd;

    var g_day_no = j_day_no + 79;

    var gy = 1600 + 400 * parseInt(g_day_no / 146097);
    g_day_no = g_day_no % 146097;

    var leap = true;
    if (g_day_no >= 36525) {
      g_day_no--;
      gy += 100 * parseInt(g_day_no / 36524);
      g_day_no = g_day_no % 36524;

      if (g_day_no >= 365) g_day_no++;
      else leap = false;
    }

    gy += 4 * parseInt(g_day_no / 1461);
    g_day_no %= 1461;

    if (g_day_no >= 366) {
      leap = false;

      g_day_no--;
      gy += parseInt(g_day_no / 365);
      g_day_no = g_day_no % 365;
    }

    for (
      var i = 0;
      g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
      i++
    )
      g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
    var gm = i + 1;
    var gd = g_day_no + 1;

    gm = gm < 10 ? "0" + gm : gm;
    gd = gd < 10 ? "0" + gd : gd;

    return [gy, gm, gd];
  };

    $.validator.addMethod("digits", function (value) {
        if (!!value && value.length > 0 && value.trim().length > 0)
            return /^[\u06F0-\u06F9\u0660-\u06690-9]+$/i.test(value);

        return true;
    });

    $.validator.addMethod(
        "shortComment",
        function (value) {
            var countWords = value.split(" ").length;
            return countWords > 4 ? true : false;
        },
        'لطفا نظرتان را کامل شرح دهید'
    );

    $.validator.addMethod(
        "lettersOnly", function (value, element) {
            return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value) || /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]/i.test(value);
        },
        "فقط حروف مجاز میباشد"
    );

    $.validator.addMethod(
        "lettersOnlyFa", function (value, element) {
            return this.optional(element) || /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]/i.test(value);
        },
        "فقط حروف مجاز میباشد"
    );
    $.validator.addMethod(
        "email",
        function (value) {
            if ($.trim(value).length === 0) {
                return true;
            }
            return /^(([^<>()\[\]\\\.,;:\s@"]+(\.[^<>()\[\]\\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
                value
            );
        });
    $.validator.addMethod(
        "iranianMobileNumber", function (value, element) {
            return this.optional(element) || /(0|\+98)?([ ]|,|-|[()]){0,2}9[0|1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/i.test(value);
        },
        "شماره موبایل نامعتبر است"
    );
    $.validator.addMethod(
        "mobile_phone",
        function (value) {
            var phone = convertToEnDigit(value);

            var pattern = new RegExp(
                "^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$",
                "i"
            );

            return pattern.test(phone);
        },
        'شماره موبایل نامعتبر است'
    );
    $.validator.addMethod(
        "email_phone",
        function (value, element) {
            if ($.trim(value).length === 0) {
                return true;
            }

            if ($.validator.methods.mobile_phone.call(this, value, element)) {
                return true;
            }

            return $.validator.methods.email.call(this, value, element);
        },
        'ایمیل یا شماره موبایل نامعتبر است'
    );

    Main.init();

    // $(".js-store-desc").text(function() {
    //     let $width = $(document).width();
    //     if ($width < 1360 & $(this).text().length > 330) {
    //         return $(this).text().substring(0, 260) + '...';
    //     }
    // });

    // getBannerAndSliders();
});
const Main = {
    init() {
        const functions = [
            this.initMenu(),
            this.initStickyHeader(),
            // this.initSelect(),
        ]
    },
    initMenu() {
        var $hoverEffect = $('.js-nav-categories-a-hover'),
            $headerLinks = $('li.nav-categories__item'),
            $megaMenuMain = $('.js-mega-sublist');
        var moveHover = function (self) {
            var parent = self
                .parent()
                .parent()
                .parent();

            $hoverEffect
                .css("width", self.width())
                .css(
                    "right",
                    parent.width() -
                    (self.offset().left + self.width()) +
                    parent.offset().left
                );
            $hoverEffect.css("transform", "scaleX(1)");
        };

        var removeHover = function () {
            $hoverEffect.css("transform", "scaleX(0)");
        };

        $headerLinks.hover(function () {
            moveHover.call(this, $(this));
            $(this).addClass('is-hover');
        },
            function () {
                removeHover.call(this, $(this));
                $(this).removeClass('is-hover');
            });

        var $megaMenuMain = $('.js-category-main'),
            $categorySublistOptions = $('.js-mega-sublist'),
            $navOverlay = $('.js-nav-overlay'),
            $megaMenuCat = $('.js-mega-inner-cat');
        var hoverAction;
        $megaMenuMain.hover(
            function () {
                var $this = $(this);
                hoverAction = setTimeout(function () {
                    $this.children('.js-mega-sublist').css('display', 'flex');
                    $navOverlay.addClass('is-active');
                    $('.js-result-search').removeClass('is-active');
                    $('.js-input-search').removeClass('is-focused');
                }, 200)
            },
            function () {
                hoverAction && clearTimeout(hoverAction);
                $categorySublistOptions.hide();
                $navOverlay.removeClass('is-active');
            }
        );

        $megaMenuCat.hover(
            function () {
                $categorySublistOptions.find('.js-mega-options-list').removeClass('is-active');
                $megaMenuCat.removeClass('nav-categories__inner-category--hovered');
                $(this).addClass('nav-categories__inner-category--hovered');
                $categorySublistOptions.find('#categories-' + $(this).data('index')).addClass('is-active');
            },
            function () {

            }
        );
    },
    initSelect() {
        if ($(window).width() > 768) {
            $('.js-select').select2({
                minimumResultsForSearch: -1,
            });
        }

    },
    initStickyHeader() {
        let nav = $(".js-nav")[0];
        if (nav) {
            const headroom = new Headroom(nav);
            headroom.init({
                offset: 100,
            });
        }
    }
}

$(document).ready(function () {
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollPosition > 20) {
            $(".js-jumpup").removeClass("ui-hidden");
        } else {
            $(".js-jumpup").addClass("ui-hidden");
        }
    });

    var $hamburgerMenu = $(".js-hamburger-menu"),
        $hamburgerOverlay = $('.hamburger-menu__overlay'),
        $headerLogo = $(".js-logo"),
        $overlayNav = $('.nav-categories__overlay');

    $('.js-hamburger').on('click', function () {
        $hamburgerMenu.addClass('is-open');
        $('body').addClass('is-overflow-deactivate');
        $headerLogo.fadeOut();
        $hamburgerOverlay.addClass('is-active');
    }); 

    // Init Search
    // var resultSearch = $('.js-result-search'),
    //     inputSearch = $('.js-input-search');
    // inputSearch.on('focus click', function () {
    //     if (inputSearch.val().length > 1) {
    //         $(this).addClass('is-focused');
    //         $overlayNav.addClass('is-active');
    //         resultSearch.addClass('is-active');
    //     }
    // });
    // $overlayNav.on('click', function () {
    //     inputSearch.removeClass('is-focused');
    //     $overlayNav.removeClass('is-active');
    //     resultSearch.removeClass('is-active');
    // });
    // $(document).on('mouseup', function (e) {
    //     if (!$('.main-search').is(e.target) && $('.main-search').has(e.target).length === 0) {
    //         inputSearch.removeClass('is-focused');
    //         resultSearch.removeClass('is-active');
    //         $overlayNav.removeClass('is-active');
    //     }
    // });
    // var idSelectedProduct = "",
    //     typeSelectedProduct = "", _urlSearch = "";

    // function search() {
    //     var brandId = "", categoryId = "", tagId = "";
    //     var valueSearchField = "";
    //     if (typeSelectedProduct === "" || typeof typeSelectedProduct == "undefined") {
    //         valueSearchField = $('.js-input-search').val();
    //     }
    //     switch (typeSelectedProduct) {
    //         case "brand":
    //             brandId = idSelectedProduct;
    //             break;
    //         case "category":
    //             categoryId = idSelectedProduct;
    //             break;
    //         case "tag":
    //             tagId = idSelectedProduct;
    //             break;
    //     }
    //     _urlSearch = "/product/filter?title=" + valueSearchField + "&exists=&has_discount=&" +
    //         "ready_to_send=&cat=" + categoryId + "&brand_id=" + brandId + "&tag_id=" + tagId + "&start_price=&end_price=";
    // }

    // inputSearch.on('keyup', delay(function (e) {
    //     var searchVal = inputSearch.val();
    //     console.log(searchVal);
    //     if (e.keyCode !== 40 && e.keyCode !== 38 && e.keyCode !== 13 && e.keyCode !== 27) {
    //         if (inputSearch.val().length > 1) {
    //             inputSearch.addClass('is-focused');
    //             $overlayNav.addClass('is-active');
    //             resultSearch.addClass('is-active');
    //         } else {
    //             inputSearch.removeClass('is-focused');
    //             $overlayNav.removeClass('is-active');
    //             resultSearch.removeClass('is-active');
    //         }
    //         if (searchVal.length > 1) {
    //             $('.js-result-search ul').html('');
    //             $.ajax({
    //                 type: "GET",
    //                 url: "/api/public/v1/product/suggestion/:" + searchVal,
    //                 success: function (data) {
    //                     var _res = "";
    //                     var productArray = [];
    //                     if (data.categories && data.categories.length > 0 && data.categories[0] !== "") {
    //                         productArray.push.apply(productArray, data.categories);
    //                     }
    //                     if (data.brands && data.brands.length > 0 && data.brands[0] !== "") {
    //                         productArray.push.apply(productArray, data.brands);
    //                     }
    //                     if (data.tags && data.tags.length > 0 && data.tags[0] !== "") {
    //                         productArray.push.apply(productArray, data.tags);
    //                     }
    //                     if (data.products && data.products.length > 0 && data.products[0] !== "") {
    //                         productArray.push.apply(productArray, data.products);
    //                     }
    //                     if (productArray.length > 0) {
    //                         for (var resSearch of productArray) {
    //                             _res += "<li id=" + resSearch.id + " type=" + resSearch.type + ">";
    //                             _res += "<a href='#'>";
    //                             _res += "<span class='label'>" + resSearch.label + "&nbsp;</span>";
    //                             _res += "<span class='name'>" + resSearch.name + "</span>";
    //                             _res += "</a>";
    //                             _res += "</li>";
    //                         }
    //                     } else if (typeof productArray === "undefined" || productArray.length === 0) {
    //                         _res = '<li><a class="js-search-keyword-link" href="#">' +
    //                             '<span class="label">نمایش همه نتایج برای&nbsp;</span>'
    //                             + '<span class="name">' + searchVal + '</span>' + '</a></li>';
    //                     }
    //                     $('.js-result-search ul').append(_res);
    //                     $('.js-result-search li').on('click', function () {
    //                         idSelectedProduct = $(this).attr("id");
    //                         typeSelectedProduct = $(this).attr("type");
    //                         search();
    //                         window.location.href = _urlSearch;
    //                     })
    //                 },
    //                 error: function (error) {
    //                 }
    //             });
    //         } else {
    //         }
    //     }
    // }, 300));

    // $(document).on("keydown", function (evt) {
    //     if (evt.keyCode === 40) {
    //         var cs1 = $(".selected-product");
    //         if (cs1.length === 0) {
    //             cs1 = $(".js-result-search li:first");
    //             cs1.addClass("selected-product");
    //             return;
    //         }
    //         var ns1 = cs1.next("li");
    //         if (ns1.length === 0) {
    //             ns1 = $(".js-result-search li:first");
    //         }
    //         cs1.removeClass("selected-product");
    //         ns1.addClass("selected-product");
    //     }
    //     if (evt.keyCode === 38) {
    //         var cs1 = $(".selected-product");
    //         var ns1 = cs1.prev("li");
    //         if (ns1.length === 0) {
    //             ns1 = $(".js-result-search li:last");
    //         }
    //         cs1.removeClass("selected-product");
    //         ns1.addClass("selected-product");
    //     }
    //     if (inputSearch.is(":focus")) {
    //         if (evt.keyCode === 13) {
    //             idSelectedProduct = $('.js-result-search li.selected-product').attr("id");
    //             typeSelectedProduct = $('.js-result-search li.selected-product').attr("type");
    //             search();
    //             window.location.href = _urlSearch;
    //         }
    //     }

    //     if (inputSearch.is(":focus")) {
    //         if (evt.keyCode === 27) {
    //             inputSearch.removeClass('is-focused');
    //             $overlayNav.removeClass('is-active');
    //             resultSearch.removeClass('is-active');
    //         }
    //     }
    // });

    // $('.js-btn-search').on('click', function () {
    //     search();
    //     window.location.href = _urlSearch;
    // });

    $(document).on('mouseup', function (e) {
        if ($hamburgerOverlay.is(e.target)) {
            $headerLogo.fadeIn();
            $hamburgerMenu.removeClass('is-open');
            $('.hamburger-menu__overlay').removeClass('is-active');
            $('body').removeClass('is-overflow-deactivate');
        }
    });

    $(".js-cat-title").click(function () {
        var $this = $(".subcat-container");
        if ($this.hasClass("subcat-container-open")) {
            $this.removeClass("subcat-container-open")
            $(".cat-arrow").removeClass("is-active")
        }else {
            $this.addClass("subcat-container-open");
            $('.cat-arrow').addClass("is-active");
        }
    })

    $(window).resize(function() {
        let $width = $(document).width()
        if($width < 567) {
            $("#search-input").attr("placeholder", " جستجو");
        }else {
            $("#search-input").attr("placeholder", " جستجوی طلا و جواهرات");
        }
    })

    if($(window).width() < 567) {
        $("#search-input").attr("placeholder", " جستجو");
    }else {
        $("#search-input").attr("placeholder", " جستجوی طلا و جواهرات");
    }

    $('.js-hamburger-menu__item').on('click', function (e) {
        var $this = $(this);
        $this.parent().parent().find('.js-hamburger-menu__item').not($this).removeClass('is-open');
        if ($this.hasClass('is-open')) {
            $this.removeClass('is-open');
            $this.removeClass('sub-is-open')
            $this.find('.item-arrow').removeClass("is-active");
        } else {
            $this.addClass('is-open');
            $this.addClass('sub-is-open')
            $this.find('.item-arrow').addClass("is-active");
        }
        e.preventDefault();
    });

    $(".js-hamburger-sub-menu__item").click(function (e) {
        var $this = $(this);
        $this.parent().parent().find('.js-hamburger-sub-menu__item').not($this).removeClass('is-open');
        if ($this.hasClass('is-open')) {
            $this.removeClass('is-open');
            $this.removeClass('subMenu-is-open')
            $this.find('.item-arrow').removeClass("is-active");
        } else {
            $this.addClass('is-open');
            $this.addClass('subMenu-is-open')
            $this.find('.item-arrow').addClass("is-active");
        }
        e.preventDefault();
    })

    $('.js-jumpup').on('click', function () {
        scrollToUp(0, 1600);
    });


    $(".mobile-menu-icon").click(function () {
       
        
        $('.mobile-footer-modal').css('display', 'block');
    }); 
    
    let footerModal = $(".mobile-footer-modal");
    $(window).on('click', function(event) {
        if ($(event.target).is(footerModal)) {
          $(footerModal).css('display', 'none');
        }
      });

    $("#searchInputNew").focus(function () {
        $('#placeholderText').hide();
    })
    $("#searchInputNew").blur(function() {
    if($("#searchInputNew").val() === '') {
        $('#placeholderText').show();
    } 
    })

    $("#searchInputNew").on("keyup", delay(function (e) {

        if (
            e.keyCode !== 40 &&
            e.keyCode !== 38 &&
            e.keyCode !== 13 &&
            e.keyCode !== 27
        ) {
            if ($(this).val().length > 1) {
                $(".mobile-suggest-list-new").html('');
                $(".mobile-suggest-box-new").css("display", "block");
                $.ajax({
                    type: "GET",
                    url: "/demo/api/public/v1/product/suggestion/" + $(this).val(),
                    success: function (result) {
                        if (result.result.products != null) { 
                            result.result.products.forEach(element => {
                                let suggest = `
                                <li class="my-3">
                                    <a>
                                        <span>${element.label}</span>
                                        <span class="suggest-name" id='${element.name}'>${element.name}</span>
                                    </a>
                                </li>
                                `
                                $(".mobile-suggest-list-new").append(suggest);
                                $(".suggest-name").click(function () {
                                    let catName = $(this).attr('id');
                                    window.location = "/product/filter" + "?title=" + catName;
                                })
                            });
                        } else{
                            $(".mobile-suggest-list-new").html("نتیجه ای برای عبارت جست و جو شده یافت نشد!")
                        }

                    },
                    error: function () { },
                })
            } else if ($(this).val().length == 0) {
                $(".mobile-suggest-box-new").css("display", "none");

            }

        }

    }, 500));

    $("#searchInputNew").on('blur', delay( function() {
        $(this).val('');
        $(".mobile-suggest-box-new").css("display", "none");
    }, 500));





    var formLetterNewsEmail = $('#email-subscribe');
    formLetterNewsEmail.validate({ 
        errorPlacement: function () {
            return true;
        },
        ignore: [],
        rules: {
            "email": {
                required: true,
                email: true,
                maxlength: 255
            }
        },
        messages: {
            "email": {
                required: 'ایمیل وارد نشده است',
                email: 'ایمیل نامعتبر است',
                maxlength: 'ایمیل طولانی است'
            }
        },
    });

    formLetterNewsEmail.on('submit', function (e) {
        e.preventDefault();

        if (!formLetterNewsEmail.valid()) {
            Alert('ایمیل نامعتبر است', 'باشه');
            return;
        }

        $.ajax({
            type: "POST",
            url: "/subscribe/email",
            data: formLetterNewsEmail.serialize(),
            success: function (response) {
                Alert('با موفیقت ثبت شد', 'باشه');
                $('#email-subscribe')[0].reset();
            },
            error: function (response) {
                if (response.status === 500) {
                    Alert('این ایمیل از قبل ثبت شده است', 'باشه');
                } else {
                    Alert('مشکلی رخ داده اشت لطفا دوباره امتحان کنید', 'باشه');
                }
            }
        });
    });
});

function switchCurrency() {
    if (currency === "rial") {
        return "ریال";
    } else if (currency === "toman") {
        return "تومان";
    }
}

function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

function showLoader() {
    if ($('[data-remodal-id="loader"]').length) {
        $('[data-remodal-id="loader"]').remodal().open();
    }
}

function hideLoader() {
    setTimeout(function () {
        if ($('[data-remodal-id="loader"]').length) {
            $('[data-remodal-id="loader"]').remodal().close();
        }
    }, 500)
}

function Alert(message, buttonText) {
    var $remodalInformationAlert = $("[data-remodal-id=remodal-information]").remodal(),
        $textRemodal = $('.js-remodal-information__text'),
        $approveRemodal = $('.js-remodal-information__button');

    $textRemodal.text(message);
    $approveRemodal.text(buttonText);

    $remodalInformationAlert.open();

    $approveRemodal.on('click', function () {
        $remodalInformationAlert.close();
    })
}

function notice(msg, status, delay = 3000) {
    var timer;
    var notice = $("#notice");
    if (!notice.is(":visible")) {
        notice.html(
            '<div class="insideDiv">' +
            '<button class="notice__dismiss-button js-notice-button"></button>' +
            "<p>" +
            msg +
            "</p>" +
            '<div class="notice__progress-bar"></div>' +
            "</div>"
        );

        clearTimeout(timer);
        notice.removeAttr("data-status").attr("data-status", status).fadeIn();
        $(".notice__progress-bar").css('animation-duration', delay + 'ms');
        timer = setTimeout(function () {
            notice.hide().removeAttr("data-status").empty();
        }, delay);
    }

    $(".js-notice-button").on("click", function () {
        $(this).closest(".notice").hide().empty();
        if (timer) {
            clearTimeout(timer);
        }
    });
}

function scrollToUp(space, duration) {
    $('html, body').animate({ scrollTop: space }, duration);
}

function formatterValue(val) {
    val = parseInt(val);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return val;
}

//------ Add LoadSpinner SelectBox ------
function addLoadSpinner(el) {
    if (el.length > 0) {
        if ($("#img_" + el[0].id).length > 0) {
            $("#img_" + el[0].id).css('display', 'block');
        } else {
            var img = $('<img class="loading">');
            img.attr('id', "img_" + el[0].id);
            img.attr('src', 'http://www.lettersmarket.com/uploads/lettersmarket/blog/loaders/common_gray/ajax_loader_gray_512.gif');
            img.css({
                'display': 'block',
                'width': '20px',
                'height': '20px',
                'z-index': '100',
                'position': 'absolute',
                'left': '20px',
                'top': '50%',
                'transform': 'translateY(-50%)'
            });
            img.prependTo(el[0].nextElementSibling);
        }
        el.prop("disabled", true);
    }
}

//------ Hide LoadSpinner SelectBox ------
function hideLoadSpinner(el) {
    if (el.length > 0) {
        if ($("#img_" + el[0].id).length > 0) {
            setTimeout(function () {
                $("#img_" + el[0].id).css('display', 'none');
                el.prop("disabled", false);
            }, 500);
        }
    }
}

$.fn.extend({
    animateCss: function (n, i) {
        return this.addClass("animated " + n).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            $(this).removeClass("animated " + n), i && i()
        }), this
    }
});

function logout() {
    $.ajax({
        type: "GET",
        url: '/demo/api/public/v1/auth/logout',

        success: function () {
            localStorage.removeItem('mobile_number');
            localStorage.removeItem('password')
            window.location.href = '/';
        },
        error: function () {

        }
    });
};

function backToTop() {
    document.documentElement.scrollTop = 0;
}

$(document).ready(function () {

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("acc-active");
            var panel = this.nextElementSibling;
            panel.classList.toggle("panel-active")
            // if (panel.style.display === "block") {
            //     panel.style.display = "none";
            // } else {
            //     panel.style.display = "block";
            // }
        });
    }

    let keepFocus = false;
    function hideList(){
        if(!keepFocus){
            $("#search-input").val('')
            $(".suggest-box").hide();
            $('.js-search-remodal').css({'height': '193px'})
            // $("#search-input").animate({
            //     width: '0',
            // });
            // $("#search-input").css({'border': 'none'})
        }
    }

   $(document).click(function(e) {
        if ($(e.target).closest("#search-input, .suggest-box, .input-search-btn").length == 0) {
            keepFocus = false;
            window.setTimeout(hideList, 500);
        } else {
            keepFocus = true;
            window.setTimeout(hideList, 200);
        }
    });

    window.deleteHistoryItem = deleteHistoryItem
    window.deleteAllHistory = deleteAllHistory
    function deleteHistoryItem(title){
        $.ajax({
            type: "DELETE",
            url: `/demo/api/public/v1/customer/delete/my_search?title=${title}`,
            success: function (result) {
                // location.reload()
                $("span[id="+title+"]").parent().parent().remove();
            },
            error: function (){},
        })      
    }

    function deleteAllHistory(title){
        $.ajax({
            type: "DELETE",
            url: `/demo/api/public/v1/customer/delete-all/my_search`,
            success: function (result) {
                location.reload()
            },
            error: function (){},
        })
    }

    $(".js-input-search-btn").click(() => { 
        // $("#search-input").animate({
        //     width: '359px',
        // });
        // $("#search-input").css({'border': '1px solid #e7e7e7'})
        // document.getElementById('search-input').focus(); 
        $('[data-remodal-id=search-remodal]').remodal().open();
        //$(".cat-part").addClass('active')
        $(".site-header").css({'z-index':'99999'})
    });

    $("#search-input").on("focus", function (e) {
        $('.js-search-remodal').css({'height': '480px'})
        let historySuggest = '';
        let historyList = document.querySelector('.js-suggest-list-history');
        let popularSuggest = '';
        let popularList = document.querySelector('.js-suggest-list-popular')
        $(".js-suggest-list").addClass('d-none')
        $(".suggest-list-popular").removeClass('d-none')
        $(".suggest-list-history").removeClass('d-none')

        $.ajax({
            type: "GET",
            url: "/demo/api/public/v1/customer/my_searches",
            success: function (result) {
                $(".suggest-box").css("display", "block");
                
                if (result.my_searches != null ) {
                    result.my_searches.forEach(element => {
                        historySuggest += `
                        <li class="my-3 d-flex align-items-center justify-content-between">
                            <a class="d-flex align-items-center">
                                <img src="/static/img/svg/search-status.svg" alt="search">
                                <span class="suggest-name me-2" id="${element.title}">${element.title}</span>
                            </a>
                            <img class="pointer" src="/static/img/svg/close-circle.svg" alt="close icon" onclick="deleteHistoryItem('${element.title}')">
                        </li>`
                    });
                    historyList.innerHTML = historySuggest;
                    historyList.insertAdjacentHTML('afterbegin', `
                    <li class="suggest-title d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <img src="/static/img/svg/clock.svg" alt="history">
                            <span class="me-2">تاریخچه جستجوی شما</span>
                        </div>
                    </li>` )
                }else{
                    historyList.innerHTML = ''
                    $(".js-suggest-list-popular").css({'border-top': 'none'});
                }

                if(result.top_searches != null){
                    result.top_searches.forEach(element => {
                        popularSuggest += `
                        <li class="my-3 d-flex align-items-center justify-content-between">
                            <a class="d-flex align-items-center">
                                <img src="/static/img/svg/search-status.svg" alt="search">
                                <span class="suggest-name me-2" id="${element.title}">${element.title}</span>
                            </a>
                        </li>`
                    });
                    popularList.innerHTML = popularSuggest;
                    popularList.insertAdjacentHTML('afterbegin', `
                    <li class="suggest-title d-flex align-items-center">
                        <img src="/static/img/svg/flash.svg" alt="history">
                        <span class="me-2">جستجوی پر مخاطب</span>
                    </li>` )
                }else{
                    popularList.innerHTML = '';
                    $(".js-suggest-list-popular").css({'border-top': 'none'});
                }

                $(".suggest-name").click(function () {
                    let catName = $(this).attr('id');
                    window.location = "/product/filter" + "?title=" + catName;
                })

                if(result.my_searches == null  && result.top_searches == null) {
                    $(".suggest-box").css("display", "none");
                }
            },
            error: function () { },
        })
    })

    $("#search-input").on("keyup", delay(function (e) {
       inputSearchValue = $(this).val();
        if (
            e.keyCode !== 40 &&
            e.keyCode !== 38 &&
            e.keyCode !== 13 &&
            e.keyCode !== 27
        ) {
            if (inputSearchValue.length > 1) {
                $(".js-input-search-btn img").attr("src", "/static/img/svg/close-circle.svg")
                $(".js-suggest-list").removeClass('d-none');
                $(".suggest-list-popular").addClass('d-none')
                $(".suggest-list-history").addClass('d-none')
                $(".suggest-box").css("display", "block");
                $(".suggest-box .suggest-box-wrapper").css({'height' : 'auto'})
                let suggest = ''
                let searchList = document.querySelector('.js-suggest-list')

                $.ajax({
                    type: "GET",
                    url: "/demo/api/public/v1/product/suggestion/" + inputSearchValue,
                    success: function (result) {
                        if (result.result.products != null ) {
                            result.result.products.forEach(element => {
                                suggest += `
                                <li class="my-3 d-flex align-items-center justify-content-between">
                                    <a class="d-flex align-items-center">
                                        <span>${element.label}</span>
                                        <span class="suggest-name me-2" id="${element.name}">${element.name}</span>
                                    </a>
                                </li>`
                            });
                            searchList.innerHTML = suggest;
                            $(".suggest-name").click(function () {
                                let catName = $(this).attr('id');
                                window.location = "/product/filter" + "?title=" + catName;
                            })
                        }else{
                            searchList.innerHTML = "نتیجه ای برای عبارت جست و جو شده یافت نشد!"
                        }
                    },
                    error: function () { },
                })
            } else if (inputSearchValue.length == 0) {
                $(".suggest-box").css("display", "none");
            }

        }else if (e.keyCode == 13 && inputSearchValue.length > 1) {
            window.location = "/product/filter" + "?title=" + inputSearchValue;
        }

        $(".js-main-search__btn").click(() => {
            if(inputSearchValue.length > 1){
                window.location = "/product/filter" + "?title=" + inputSearchValue;
            }
        })

    }, 500));

    // $("#search-input").on('blur', delay( function() {
    //     $(this).val('');
    //     $(".suggest-box").css("display", "none");
    // }, 500));

    $("#mobile-search-input").on("keyup", delay(function (e) {

        if (
            e.keyCode !== 40 &&
            e.keyCode !== 38 &&
            e.keyCode !== 13 &&
            e.keyCode !== 27
        ) {
            if ($(this).val().length > 1) {
                $(".mobile-suggest-list").html('');
                $(".mobile-suggest-box").css("display", "block");
                $.ajax({
                    type: "GET",
                    url: "/demo/api/public/v1/product/suggestion/" + $(this).val(),
                    success: function (result) {
                        if (result.result.products != null) { 
                            result.result.products.forEach(element => {
                                let suggest = `
                                <li class="my-3">
                                    <a>
                                        <span>${element.label}</span>
                                        <span class="suggest-name" id='${element.name}'>${element.name}</span>
                                    </a>
                                </li>
                                `
                                $(".mobile-suggest-list").append(suggest);
                                $(".suggest-name").click(function () {
                                    let catName = $(this).attr('id');
                                    window.location = "/product/filter" + "?title=" + catName;
                                })
                            });
                        } else{
                            $(".mobile-suggest-list").html("نتیجه ای برای عبارت جست و جو شده یافت نشد!")
                        }

                    },
                    error: function () { },
                })
            } else if ($(this).val().length == 0) {
                $(".mobile-suggest-box").css("display", "none");

            }

        }

    }, 500));

    $("#mobile-search-input").on('blur', delay( function() {
        $(this).val('');
        $(".mobile-suggest-box").css("display", "none");
    }, 500)),

    $(".js-input-search-btn").click(() => {
        $("#search-input").val('');
        $(".suggest-box").css("display", "none"); 
    })

    $(".cat-part").click(function () {
        let $width = $(document).width();
        if ($width > 1020) {
            $('[data-remodal-id=category-remodal]').remodal().open();
            $(".cat-part").addClass('active')
            $(".cat-part-img").removeClass('icon-purple')
            $(".site-header").css({'z-index':'99999'})
            $(".main-nav").css({'background-color':'rgba(135, 135, 135, -0.5)'})
            $(".main-nav").addClass('disabled')

        }else if ($width <= 1020) {
            var $hamburgerMenu = $(".js-hamburger-menu"),
            $hamburgerOverlay = $('.hamburger-menu__overlay'),
            $headerLogo = $(".js-logo"),
            $overlayNav = $('.nav-categories__overlay');
            $hamburgerMenu.addClass('is-open');
            $('body').addClass('is-overflow-deactivate');
            $headerLogo.fadeOut();
            $hamburgerOverlay.addClass('is-active');
        }
    })

    $(window).resize(function() {
        let $width = $(document).width()
        if($width <= 1020) {
            $('[data-remodal-id=category-remodal]').remodal().close();
            $('[data-remodal-id=search-remodal]').remodal().close();
            $(".cat-part").removeClass('active')
            $(".cat-part-img").addClass('icon-purple')
            $(".site-header").css({'z-index':'250'})
            $(".main-nav").css({'background-color':'#fff'})
            $(".main-nav").removeClass('disabled')
        }
    })

    $(document).on('opened', '.category-remodal', function () {
        $(".cat-part").addClass('active')
        $(".cat-part-img").removeClass('icon-purple')
        $(".site-header").css({'z-index':'99999'})
        $(".main-nav").css({'background-color':'rgba(135, 135, 135, -0.5)'})
        $(".main-nav").addClass('disabled')
    });

    $(document).on('closing', '.category-remodal', function () {
        $(".cat-part").removeClass('active')
        $(".cat-part-img").addClass('icon-purple')
        $(".site-header").css({'z-index':'250'})
        $(".main-nav").css({'background-color':'#fff'})
        $(".main-nav").removeClass('disabled')
    });


    $(".js-parent-menu-list").hover(function(){
        let AllMenuItem = $(".js-parent-menu-list")
        if(AllMenuItem.hasClass('active')){
            AllMenuItem.removeClass('active')
        } 
        $(this).addClass('active')

        let menuItemId = $(this).attr('data-menu');
        let menuListElem = document.querySelectorAll(".js-menu-item")
        menuListElem.forEach((list) => {
            let menuElemId =  list.attributes['data-menu'];

            if (/^data-/.test(menuElemId.nodeName)) {
                let key = menuElemId.nodeName.replace(/^data-/, '')
                let value = menuElemId.nodeValue

                if(value == menuItemId){
                    list.classList.add('active')
                }
                else{   
                    list.classList.remove('active')
                }
            }
        })

    }, function(){
    });

    $(".js-btn-user").click(function () {
        $(".main-header__btn-profile").toggleClass("active");
        if ($(".main-header__btn-profile").hasClass("active")) {
            $(".main-header__profile-dropdown").css("display", "block")
            document.querySelector('.main-header__profile-dropdown').addEventListener('mouseleave' , function(e){
                e.preventDefault()
                $(".main-header__profile-dropdown").css("display", "none")
            })
        } else {
            $(".main-header__profile-dropdown").css("display", "none")
        }
    })
})

// =========new theme js =====================

function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}



$(document).ready(function () {
    function Xscroll() {
        const sliders = document.querySelectorAll('.x-drag-scroll');
        if (sliders) {
            sliders.forEach(slider => {
                let imgs = slider.querySelectorAll('img');
                let aTag = slider.querySelectorAll('a');
                imgs.forEach(img => {
                    img.ondragstart = function () { return false; };
                })
                aTag.forEach(atag => {
                    atag.ondragstart = function () { return false; };
                })

                let isDown = false;
                let isMoved = false;
                let startX;
                let scrollLeft;
                slider.addEventListener('mousedown', (e) => {
                    isDown = true;
                    slider.classList.add('x-active');
                    startX = e.pageX - slider.offsetLeft;
                    scrollLeft = slider.scrollLeft;
                });
                slider.addEventListener('mouseleave', () => {
                    isDown = false;
                    slider.classList.remove('x-active');
                });
                slider.addEventListener('mouseup', () => {
                    isDown = false;
                    slider.classList.remove('x-active');
                });
                slider.addEventListener('mousemove', (e) => {
                    if (isDown == true) {
                        e.preventDefault();
                        const x = e.pageX - slider.offsetLeft;
                        const walk = (x - startX) * 1; //scroll-speed
                        slider.scrollLeft = scrollLeft - walk;
                        aTag.forEach(atag => {
                            atag.classList.add('pointer-none')
                        })
                    } else {
                        aTag.forEach(atag => {
                            atag.classList.remove('pointer-none')
                        })
                    }
                });
            })
        }
        // horizontal drag scroll end
    }

    Xscroll()
    setTimeout(() => {
        Xscroll()
    }, 500);


    VerticalProductLeftBtn(document.querySelectorAll('.prolist-one'))
    VerticalProductLeftBtn(document.querySelectorAll('.prolist-two'))
    function VerticalProductLeftBtn(list){
        if(list){
            list.forEach(item => {
                let itemsWidth = item.querySelector('.prolistbox-box')
                let itemsBody = item.querySelector('.prolistbox-body')
                let mainBox = item.querySelector('.prolist-two__box')
    
                if(itemsWidth.offsetWidth > itemsBody.offsetWidth){
                    if(mainBox){
                        mainBox.insertAdjacentHTML("beforeend" , `
                            <div class="prolistbox-scroll-btn">
                                <button class="js-prolistbox-scroll-btn">
                                    <i class="icon icon-arrow-left"></i>
                                </button>
                            </div>
                        `)
                    }

                }    
                let verProBtn = item.querySelector('.js-prolistbox-scroll-btn')
                if(verProBtn){
                    let scrollInterval = 0
                    verProBtn.addEventListener('click' , function(e){
                        let stableScrollCount = itemsBody.scrollLeft
                        let scrollCount = itemsBody.scrollLeft
                        scrollCount -= 320
                        var verProInterval = setInterval(() => {
                            stableScrollCount -= 20
                            itemsBody.scrollLeft = stableScrollCount
                            if(stableScrollCount <= scrollCount){
                                stopInt();
                            }
                        }, 2);

                        var stopInt = function () {
                            clearInterval(verProInterval);
                        };
                    })
                }
            })
        }
    }

    $.ajax({
        type: 'GET',
        url: '/demo/api/public/v1/banner_and_slider/list',
        success: function (result) {
            if (!result) {
                return;
            }
            getBanerAndSliderIndex(result)
    
            if (typeof getBanerAndSlider === 'function') {
                getBanerAndSlider(result)
            }
    
        }
    });
});

function getBanerAndSliderIndex(result) {  
    let headerBanner = document.querySelector('.header-banner-box')
    if (headerBanner) { 
        let headerOutput = ''
        result.result.forEach(res => {
            if (res.type == 'banner') {
                if (res.published == true) {
                    if (res.reference_id == 'header_banner') {
                        headerOutput = `
                            <div class="header-banner">
                                <img src="/media/${res.image.image_name}" alt="${res.image.additional_info.alt}">
                            </div>
                        `
                        headerBanner.innerHTML = headerOutput
                    }
                }
            }
        })
        if(headerOutput){
            // $("#category-modal").css("padding-top", "170px");
            
            if(window.innerWidth > 576){
                $("#content").css('padding-top', '55px')
            } else {
                $("#content").css('padding-top', '46px')
            }
            let clientWidth = window.matchMedia("(max-width: 576px)")
            clientWidth.addEventListener('change' , function(){
                if(this.matches == false){
                    $("#content").css('padding-top', '55px')
                } else {
                    $("#content").css('padding-top', '46px')
                }
            })
        }
    }
}
