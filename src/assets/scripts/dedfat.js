// табы
$("body").on("click", ".tovary-tab__link", function(e) {
    e.preventDefault();
    let clickLink = $(this).data("tab-id");
    let tabs = $(".tovary-tabs");
    tabs.each(function() {
        let tab = $(this).data("tab");
        if (tab == clickLink) {
            $(this).addClass("active-tab");
        } else {
            $(this).removeClass("active-tab");
        }
    });
    return false;
})

// кнопки
$("body").on("click", ".tovary-tab__link", function(e) {
    e.preventDefault();
    let clickLink = $(this).data("tab-id");
    let tabs = $(".tovary-tab__link");
    tabs.each(function() {
        let tab = $(this).data("tab-id");
        if (tab == clickLink) {
            $(this).addClass("active-tab__link");
        } else {
            $(this).removeClass("active-tab__link");
        }
    });
    return false;
})

$(".modal-exit__bg").on("click", function() {
    $(".modal-exit").fadeOut();
    return false;
});

$('.burgerMenu__btn').on('click', function() {
    if (isActive) {
        $(this).removeClass('active');
        $('body').removeClass('menu-open');
    } else {
        $(this).addClass('active');
        $('body').addClass('menu-open');
    }

    isActive = !isActive;
});

$('.owl-carouselPartner').owlCarousel({
    autoplay: true,
    loop: true,
    margin: 60,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      450: { items: 2 },
      768: { items: 3 },
      992: { items: 3 },
      1200: { items: 4 }
    }
})
var owl1 = $('.owl-carouselPartner');
$('.parner-left').click(function() {
    owl1.trigger('prev.owl.carousel');
})
$('.parner-right').click(function() {
    owl1.trigger('next.owl.carousel');
})
const partners = ['mvideo.png', 'mysnov.png', 'nestle.png', 'obi.png',
    'ok.png', 'petrovich.png', 'post.png', 'protek.png', 'stroylandiya.png',
    'tvoydom.png', 'unilever.png', 'vimpel.png', 'vseinstrumenti.png', 'x5.png',
    'ozon.jpg', 'lukoil.jpg', 'mts.png', 'nlmk.jpg', 'nlmk.jpg', 'diksi.png',
    'familia.jpg', 'inmarko.png', 'katren.png', 'lamoda.png', 'lenta.png', 'leroy.png', 'mega.png', 'metro.jpg'];
partners.forEach(item => {
  owl1.trigger('add.owl.carousel', `<img src="/assets/public/partners/new/${item}" alt="">`);
})
owl1.trigger('refresh.owl.carousel');


$('.owl-carouselNews').owlCarousel({
    autoplay: false,
    loop: false,
    margin: 60,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      450: { items: 1 },
      768: { items: 2 },
      992: { items: 2 },
      1200: { items: 3 }
    }
})
var owl2 = $('.owl-carouselNews');
$('.news-left').click(function() {
  owl2.trigger('prev.owl.carousel');
})
$('.news-right').click(function() {
  owl2.trigger('next.owl.carousel');
})
$.ajax('https://api-factoring.metib.ru/api/news/top/10').done(function (response) {
  response.forEach(item => {
    owl2.trigger('add.owl.carousel',
      `<div className="owl-item">
        <a href="/news/${item.ID}" className="news__item">
          <div className="news__img">
            <img src="https://api-factoring.metib.ru/api/news/${item.ID}/image" alt="">
            <div className="news__date">${item.Date}</div>
          </div>
          <div className="news__title">${item.Title}</div>
        </a>
      </div>`
    );
  });
  owl2.trigger('refresh.owl.carousel');
}).fail(function (jqXHR, textStatus, errorThrown) {
  // console.log(textStatus);
  // console.log(errorThrown);
});

function sendEmail(content, emailalsoto, theme) {
    $.ajax({
        url: "/Handler/SendEmailFromDiv.ashx",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: { 'content': content, 'emailalsoto': emailalsoto, 'theme': theme },
        responseType: "json"
    });
}

$('#formCallbackSend').click(function(e) {
    e.preventDefault();
    if ($('#formCallbackName').val() == '' && $('#formCallbackPhone').val() == '') {
        $('.help-text').text('');
        $('#formCallbackName').parent().append('<div class="help-text">*Заполните поле</div>');
        $('#formCallbackPhone').parent().append('<div class="help-text">*Заполните поле</div>');
    } else if ($('#formCallbackName').val() == '') {
        $('.help-text').text('');
        $('#formCallbackName').parent().append('<div class="help-text">*Заполните поле</div>');
    } else if ($('#formCallbackPhone').val() == '') {
        $('.help-text').text('');
        $('#formCallbackPhone').parent().append('<div class="help-text">*Заполните поле</div>');
    } else {
        $('.help-text').text('');
        $('#formCallbackSend').text('Отправлено');
        setTimeout(function() {
            $('.formMain__button').fadeOut();
        }, 500);
        url = window.location.href;
        var content = "<p><strong>Имя: </strong>" + $('#formCallbackName').val();
        content += "<p><strong>Телефон: </strong>" + $('#formCallbackPhone').val();
        content += "<p><strong>откуда: </strong>" + url;
        var emailalsoto = "alamar.jf@gmail.com, dedfat@gmail.com";
        var theme = "Сообщение с сайта";
        sendEmail(content, emailalsoto, theme);
    }
    return false;
});

$('#ModalCallbackSend').click(function(e) {
    e.preventDefault();
    if ($('#ModalCallbackName').val() == '' && $('#ModalCallbackPhone').val() == '') {
        $('.help-text').text('');
        $('#ModalCallbackName').parent().append('<div class="help-text">*Заполните поле</div>');
        $('#ModalCallbackPhone').parent().append('<div class="help-text">*Заполните поле</div>');
    } else if ($('#ModalCallbackName').val() == '') {
        $('.help-text').text('');
        $('#ModalCallbackName').parent().append('<div class="help-text">*Заполните поле</div>');
    } else if ($('#ModalCallbackPhone').val() == '') {
        $('.help-text').text('');
        $('#ModalCallbackPhone').parent().append('<div class="help-text">*Заполните поле</div>');
    } else {
        $('.help-text').text('');
        $('#ModalCallbackSend').text('Отправлено');
        url = window.location.href;
        var content = "<p><strong>Имя: </strong>" + $('#ModalCallbackName').val();
        content += "<p><strong>Телефон: </strong>" + $('#ModalCallbackPhone').val();
        content += "<p><strong>E-mail: </strong>" + $('#ModalCallbackMail').val();
        content += "<p><strong>Сообщение: </strong>" + $('#ModalCallbackMessage').val();
        content += "<p><strong>откуда: </strong>" + url;
        var emailalsoto = "alamar.jf@gmail.com, dedfat@gmail.com";
        var theme = "Обратный звонок с сайта ...";
        sendEmail(content, emailalsoto, theme);
    }
    setTimeout(function() {
        $('.modalMain').fadeOut();
    }, 2500);
    return false;
});

$("body").on("click", "#yesrightModal", function() {
  console.log($(this).is("checked"));
  if ($(this).is(':checked')) {
    $("#ModalCallbackSend").show();
  } else {
    $("#ModalCallbackSend").hide();
  }
});

$('.callBackVoid').on('click', function() {
    $('#ModalCallback').fadeIn();
});

$('.modalMain__bg').on('click', function() {
    $('.modalMain').fadeOut();
});

$(function() {
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/inputmask/inputmask.min.js")
        .done(function() {
            $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/jquery.inputmask.bundle.min.js");
            $("head").append("<link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/css/inputmask.min.css' />");
            Inputmask({ "mask": "+7 (999) 999-99-99" }).mask('#ModalCallbackPhone, #formCallbackPhone1 , #formCallbackPhone');
        })
        .fail(function() {

        });
});


$(function() {
    var url = window.location.href;
    $("#TopMenu a").each(function() {
        if (url == (this.href)) {
            $(this).closest("a").addClass("TopMenu__active");
            i
        }
    });
});

$(function() {
    var url = window.location.href;
    $(".shapka-nav__item a").each(function() {
        if (url == (this.href)) {
            $(this).closest("a").addClass("active");
        }
    });
});

$(document).ready(function() {
    $('.topMenu__item').hover(
        function() {
            var mainWidth = $(this).outerWidth();
            $('ul:first', this).fadeIn();
            $('ul:first', this).width(mainWidth * 1.8);
        },
        function() {
            $('ul:first', this).fadeOut();
        }
    );
});


$(document).ready(function() {
    $(".shapka").sticky({ topSpacing: 0, zindex: 1003 });
});

$(".send-form__bg").on("click", function() {
    $(".send-form").fadeOut();
});

$("body").on("click", ".line-top__icon", function(e) {
    e.preventDefault()
    $(".mobile-menu").fadeIn();
    return false;
});

$("body").on("click", ".mobile-menu__closed", function(e) {
    e.preventDefault();
    $(".mobile-menu").fadeOut();
    return false;
});


$(window).scroll(function() {
    var sticky = $('.line-top'),
        scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('sticky');
    else sticky.removeClass('sticky');
});
