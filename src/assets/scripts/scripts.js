// табы
$("body").on("click", ".tovary-tab__link", function (e) {
  e.preventDefault();
  let clickLink = $(this).data("tab-id");
  let tabs = $(".tovary-tabs");
  tabs.each(function () {
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
$("body").on("click", ".tovary-tab__link", function (e) {
  e.preventDefault();
  let clickLink = $(this).data("tab-id");
  let tabs = $(".tovary-tab__link");
  tabs.each(function () {
    let tab = $(this).data("tab-id");
    if (tab == clickLink) {
      $(this).addClass("active-tab__link");
    } else {
      $(this).removeClass("active-tab__link");
    }
  });
  return false;
})

$(".modal-exit__bg").on("click", function () {
  $(".modal-exit").fadeOut();
  return false;
});

$('.burgerMenu__btn').on('click', function () {
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
});

(() => {
  const owl1 = $('.owl-carouselPartner');
  $('.parner-left').click(function () {
    owl1.trigger('prev.owl.carousel');
  });

  $('.parner-right').click(function () {
    owl1.trigger('next.owl.carousel');
  });

  ['mvideo.png', 'mysnov.png', 'nestle.png', 'obi.png',
    'ok.png', 'petrovich.png', 'post.png', 'protek.png', 'stroylandiya.png',
    'tvoydom.png', 'unilever.png', 'vimpel.png', 'vseinstrumenti.png', 'x5.png',
    'ozon.png', 'lukoil.png', 'mts.png', 'nlmk.png', 'diksi.png',
    'familia.png', 'inmarko.png', 'katren.png', 'lamoda.png', 'lenta.png', 'leroy.png', 'mega.png', 'metro.png'
  ].forEach(item => owl1.trigger('add.owl.carousel', `<img src="/assets/public/partners/${item}" alt="">`));

  owl1.trigger('refresh.owl.carousel');

  var owl2 = $('.owl-carouselNews');
  $('.news-left').click(function () {
    owl2.trigger('prev.owl.carousel');
  });

  $('.news-right').click(function () {
    owl2.trigger('next.owl.carousel');
  });

  const formatDate = (dateObj) => {
    var date = new Date(dateObj);

    const day = date.getDay();
    const month = date.getMonth() + 1;

    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${date.getFullYear()}`;
  };

  $.ajax('https://api-factoring.metib.ru/api/news/top/10').done(function (response) {
    response.forEach(item => {
      owl2.trigger('add.owl.carousel',
        `<div class="owl-item">
        <a href="/news/${item.ID}" class="news__item">
          <div class="news__img">
            <img src="https://api-factoring.metib.ru/api/news/${item.ID}/image" alt="">
            <div class="news__date">${formatDate(item.Date)}</div>
          </div>
          <div class="news__title">${item.Title}</div>
        </a>
      </div>`
      );
    });
    owl2.trigger('refresh.owl.carousel');
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // console.log(textStatus);
    // console.log(errorThrown);
  });
}).call(this);


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
});

$('#formSubmit').click(event => {
  event.preventDefault();
  $('.text-danger').remove();

  if ($('#formPartner').val() === '') {
    $('#formPartner').after('<div class="text-danger">* Заполните поле</div>');
  } else if ($('#formName').val() === '') {
    $('#formName').after('<div class="text-danger">* Заполните поле</div>');
  } else if (new RegExp(/\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}/).test($('#formPhone').val()) === false) {
    $('#formPhone').after('<div class="text-danger">* Заполните поле в указанном формате</div>');
  } else if (new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/).test($('#formEMail').val()) === false) {
    $('#formEMail').after('<div class="text-danger">* Укажите корректную почту</div>');
  } else if (new RegExp(/\d{10,12}/).test($('#formINN').val()) === false) {
    $('#formINN').after('<div class="text-danger">* Укажите ИНН</div>');
  } else if ($('#formIsAgreeLicense').is(':checked') === false) {
    $('#formIsAgreeLicense').after('<div class="text-danger">* Подтвердите согласен на обработку данных</div>');
  } else {
    event.target.setAttribute('disabled', true);
    $.post('https://api-factoring.metib.ru/api/public/anket/factoring',
      {
        Organization: $('#formPartner').val(),
        Person: $('#formName').val(),
        Phone: $('#formPhone').val(),
        Email: $('#formEMail').val(),
        Inn: $('#formINN').val(),
        Comment: $('#formComment').val(),
        IsAccept: $('#formIsAgreeLicense').is(':checked')
      }).done(() => $('#labelInfo').text('Заявка подана. Спасибо!'))
      .error(() => $('#labelInfo').text('Произошла непредвиденная ошибка. Извините!'))
      .complete(() => {
        $('#financeForm').fadeOut();
        $('#infoBox').fadeIn();
        $('.formInput').val('');
        event.target.removeAttribute('disabled');
      });
  }
});

$("body").on("click", "#yesrightModal", function () {
  if ($(this).is(':checked')) {
    $("#formSubmit").show();
  } else {
    $("#formSubmit").hide();
  }
});

$('.callBackVoid').on('click', function () {
  $('#ModalCallback').fadeIn();
});

$('.modalMain__bg').on('click', function () {
  $('.modalMain').fadeOut();
  $('#infoBox').fadeOut();
  setTimeout(() => {
    $('#financeForm').fadeIn();
  }, 300);
});

$(function () {
  $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/inputmask/inputmask.min.js")
    .done(function () {
      $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/jquery.inputmask.bundle.min.js");
      $("head").append("<link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/css/inputmask.min.css' />");
      Inputmask({ "mask": "+7 (999) 999-99-99" }).mask('#formPhone');
    })
    .fail(function () {

    });
});


$(function () {
  var url = window.location.href;
  $("#TopMenu a").each(function () {
    if (url == (this.href)) {
      $(this).closest("a").addClass("TopMenu__active");
      i
    }
  });
});

$(function () {
  var url = window.location.href;
  $(".shapka-nav__item a").each(function () {
    if (url == (this.href)) {
      $(this).closest("a").addClass("active");
    }
  });
});

$(document).ready(function () {
  $('.topMenu__item').hover(
    function () {
      var mainWidth = $(this).outerWidth();
      $('ul:first', this).fadeIn();
      $('ul:first', this).width(mainWidth * 1.8);
    },
    function () {
      $('ul:first', this).fadeOut();
    }
  );
});


$(document).ready(function () {
  $(".shapka").sticky({ topSpacing: 0, zindex: 1003 });
});

$(".send-form__bg").on("click", function () {
  $(".send-form").fadeOut();
});

$("body").on("click", ".line-top__icon", function (e) {
  e.preventDefault()
  $(".mobile-menu").fadeIn();
  return false;
});

$("body").on("click", ".mobile-menu__closed", function (e) {
  e.preventDefault();
  $(".mobile-menu").fadeOut();
  return false;
});


$(window).scroll(function () {
  var sticky = $('.line-top'),
    scroll = $(window).scrollTop();

  if (scroll >= 100) sticky.addClass('sticky');
  else sticky.removeClass('sticky');
});
