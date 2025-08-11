"use strict";

// show menu, dont scroll body while menu is open, close the menu if click happen outside menu
// not used?
// const menuIcon = document.querySelector(".menu__icon");
// const menuButton = document.querySelector(".catalog-btn");

// Burger-menu: show menu, dont scroll body while menu is open, close the menu if click outside menu
const burgerMenuIcon = document.querySelector(".burger-menu__icon");
const burgerMenuBody = document.querySelector(".header__nav-container");

document.addEventListener("click", function (event) {
  if (event.target.closest(".burger-menu-btn")) {
    document.body.classList.toggle("lock");
    burgerMenuBody.classList.toggle("_active");
    burgerMenuIcon.classList.toggle("_active");
    // document.querySelector(".header__search-block").classList.toggle("hide");
  }
});

// When the user scrolls down 250px from the top of the document, show the button
if (document.querySelector(".back_top-btn") !== null) {
  let topButton = document.querySelector(".back_top-btn");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 250 ||
      document.documentElement.scrollTop > 250
    ) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  }); // For Chrome, Firefox, IE and Opera
}

// dropdown menu START

document.querySelectorAll(".dropdown-link").forEach(dropDownFunc);
let dropdownCloseTimeout;

// Dropdown Open and Close function START
function dropDownFunc(dropDown) {
  if (window.innerWidth > 900) {
    if (dropDown.classList.contains("hover-dropdown") === true) {
      dropDown.onmouseover = dropDown.onmouseout = dropdownHover;

      function dropdownHover(e) {
        if (e.type == "mouseover" && !!this.nextElementSibling) {
          // Close the opend dropdown
          closeDropdown();

          // add the open and active class(Opening the DropDown)
          this.parentElement.classList.add("dropdown-open");
          this.nextElementSibling.classList.add("dropdown-active");
          this.querySelector(".arrow_down").classList.add("rotate");
        }
      }
    }
    // close the dropdown on mouse out from the dropdown list
    document
      .querySelectorAll(".header__submenu__list")
      .forEach(function (dropDownList) {
        // close the dropdown after user leave the list
        dropDownList.onmouseleave = closeDropdown;
      });
    document.querySelectorAll(".header__nav-link").forEach(function (listItem) {
      listItem.onmouseleave = function () {
        dropdownCloseTimeout = setTimeout(function () {
          closeDropdown();
        }, 200);
      };
    });
    document
      .querySelectorAll(".header__submenu__list")
      .forEach(function (dropDownList) {
        dropDownList.onmouseenter = function () {
          clearTimeout(dropdownCloseTimeout);
        };
      });
  } else {
    if (dropDown.classList.contains("dropdown-link") === true) {
      dropDown.addEventListener("click", function (e) {
        if (
          !!this.nextElementSibling &&
          this.nextElementSibling.classList.contains("dropdown-active") === true
        ) {
          // Close the clicked dropdown
          this.parentElement.classList.remove("dropdown-open");
          this.nextElementSibling.classList.remove("dropdown-active");

          closeDropdown();
        } else {
          // Close the opend dropdown
          closeDropdown();

          // add the open and active class(Opening the DropDown)
          this.parentElement.classList.add("dropdown-open");
          if (!!this.querySelector(".arrow_down")) {
            this.querySelector(".arrow_down").classList.add("rotate");
          }
          if (!!this.nextElementSibling) {
            this.nextElementSibling.classList.add("dropdown-active");

            setTimeout(() => {
              this.closest(".header__nav-container").scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }, 300);
          }
        }
      });
    }
  }
}

document.querySelectorAll(".header__nav-link > a").forEach(function (dropDown) {
  if (window.innerWidth > 900) {
    if (dropDown.classList.contains("hover-dropdown") !== true) {
      dropDown.onmouseover = dropDown.onmouseout = dropdownHover;

      function dropdownHover(e) {
        if (e.type == "mouseover") {
          closeDropdown();
        }
      }
    }
  }
});

// Listen to the doc click
window.addEventListener("click", function (e) {
  if (window.innerWidth > 900) {
    // Close the menu if click happen outside menu
    if (!e.target.closest(".header__nav__list")) {
      // Close the opend dropdown
      closeDropdown();
    }
  } else {
    // close burger menu
    if (
      !e.target.closest(".header__nav-container") &&
      !e.target.classList.contains("burger-menu__icon")
    ) {
      document.body.classList.remove("lock");
      burgerMenuBody.classList.remove("_active");
      burgerMenuIcon.classList.remove("_active");

      this.setTimeout(function () {
        $(".header__second-submenu__list.open").removeClass("open");
        $(".header__nav-link.dropdown-open .dropdown-active").removeClass(
          "dropdown-active"
        );
        $(".header__nav-link.dropdown-open .arrow_down").removeClass(
          "arrow_down"
        );
        $(".header__nav-link.dropdown-open").removeClass("dropdown-open");
      }, 400);
    }

    if (e.target.closest(".header__nav__back")) {
      if ($(".header__second-submenu__list.open").length) {
        $(".header__second-submenu__list.open").removeClass("open");
      } else if ($(".header__nav-link.dropdown-open").length) {
        $(".header__nav-link.dropdown-open .dropdown-active").removeClass(
          "dropdown-active"
        );
        $(".header__nav-link.dropdown-open .arrow_down").removeClass(
          "arrow_down"
        );
        $(".header__nav-link.dropdown-open").removeClass("dropdown-open");
      } else {
        document.body.classList.remove("lock");
        burgerMenuBody.classList.remove("_active");
        burgerMenuIcon.classList.remove("_active");
      }
    }
  }
});

// Close the openend Dropdowns
function closeDropdown() {
  clearTimeout(dropdownCloseTimeout);
  document.querySelectorAll(".header__nav-link").forEach(function (container) {
    container.classList.remove("dropdown-open");
  });

  document.querySelectorAll(".header__submenu__list").forEach(function (menu) {
    menu.classList.remove("dropdown-active");
  });

  document.querySelectorAll(".arrow_down").forEach(function (container) {
    container.classList.remove("rotate");
  });
}
// dropdown menu END

// dropdown submenu
$(".has-submenu > a").click(function (e) {
  e.preventDefault();
  if (!$(this).siblings(".header__second-submenu__list").hasClass("open")) {
    $(".header__second-submenu__list").removeClass("open");
    if (window.innerWidth > 900) {
      $(".header__second-submenu__list").slideUp();
    }
    $(this).siblings(".header__second-submenu__list").addClass("open");
    if (window.innerWidth > 900) {
      $(this).siblings(".header__second-submenu__list").slideDown();
    }
  } else {
    $(this).siblings(".header__second-submenu__list").removeClass("open");
    if (window.innerWidth > 900) {
      $(this).siblings(".header__second-submenu__list").slideUp();
    }
  }
});

$(function () {
  // SLIDERS START

  // slider banner //autoplaySpeed: 500,
  $(".banner-carousel").owlCarousel({
    dots: true,
    nav: true,
    loop: true,
    items: 1,
    margin: 20,
    autoplay: true,
    slideTransition: "linear",
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
  });

  function fadeSlides(e) {
    $(e.target).find(".owl-item").removeClass("opacity");
    $(e.target).find(".owl-item:not(.active)").addClass("opacity");
  }

  //sliders new & popular & user  preference
  $(".new-carousel, .popular-carousel, .preference-carousel").owlCarousel({
    dots: true,
    nav: true,
    loop: true,
    mouseDrag: false,
    onInitialized: function (e) {
      setTimeout(fadeSlides, 100, e);
    },
    onTranslated: fadeSlides,
    onResized: fadeSlides,
    onRefresh: fadeSlides,
    responsive: {
      0: {
        items: 1,
        center: true,
        autoWidth: true,
      },
      // 360: {
      //   items: 2,
      //   center: false,
      //   autoWidth: false,
      //   margin: 10,
      // },
      300: {
        center: false,
        autoWidth: true,
        margin: 20,
      },
      1200: {
        items: 4,
        center: false,
        autoWidth: false,
        margin: 30,
      },
    },
  });

  // slider insta
  $(".insta-carousel").owlCarousel({
    dots: false,
    nav: true,
    loop: true,
    autoWidth: true,
    items: 4,
  });
  // slider posts
  $(".posts-carousel").owlCarousel({
    dots: true,
    nav: true,
    loop: false,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
        autoWidth: true,
        margin: 5,
      },
      800: {
        margin: 30,
        autoWidth: true,
      },
      1200: {
        items: 3,
        autoWidth: false,
      },
    },
  });

  // review caorusel
  $(".review-carousel").owlCarousel({
    dots: true,
    nav: true,
    loop: true,
    onInitialized: function (e) {
      setTimeout(fadeSlides, 100, e);
    },
    onTranslated: fadeSlides,
    onResized: fadeSlides,
    onRefresh: fadeSlides,
    responsive: {
      0: {
        items: 1,
        center: true,
        autoWidth: false,
      },
      500: {
        center: false,
        autoWidth: true,
        margin: 10,
      },
      1200: {
        items: 3,
        center: false,
        autoWidth: false,
        margin: 30,
      },
    },
  });

  // post-page review caorusel
  $(".post-page__review-carousel").owlCarousel({
    dots: true,
    nav: true,
    loop: true,
    center: true,
    autoWidth: true,
    margin: 10,
    responsive: {
      0: {
        center: false,
        margin: 10,
      },
     
      768: {
        center: true,
        margin: 16,
      },
    },
  });

  $(".viewed-product-carousel").owlCarousel({
    dots: true,
    nav: true,
    loop: false,
    mouseDrag: false,
    onInitialized: function (e) {
      setTimeout(fadeSlides, 100, e);
    },
    onTranslated: fadeSlides,
    onResized: fadeSlides,
    onRefresh: fadeSlides,
    responsive: {
      0: {
        items: 1,
        center: true,
        autoWidth: true,
      },
      360: {
        items: 2,
        center: false,
        autoWidth: false,
        margin: 10,
      },
      500: {
        center: false,
        autoWidth: true,
        margin: 20,
      },
      1200: {
        items: 4,
        center: false,
        autoWidth: false,
        margin: 30,
      },
    },
  });

  // slider buy together
  $(".carousel_set").owlCarousel({
    dots: false,
    nav: true,
    loop: false,
    items: 1,
  });

  // about us caorusel
  $(".about-us-carousel").owlCarousel({
    dots: true,
    nav: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
        center: false,
        autoWidth: false,
      },
      768: {
        center: false,
        autoWidth: true,
        margin: 15,
      },
      // 500: {
      //   center: false,
      //   autoWidth: true,
      //   margin: 10,
      // },
      1200: {
        items: 3,
        center: false,
        autoWidth: false,
        margin: 30,
      },
    },
  });

  // loyalty caorusel
  $(".loyalty-carousel").owlCarousel({
    dots: true,
    nav: true,
    loop: true,
    items: 4,
    responsive: {
      0: {
        items: 1,
        center: false,
        autoWidth: false,
        margin: 10,
      },
      768: {
        center: false,
        autoWidth: true,
        margin: 10,
      },
      992: {
        // items: 4,
        center: false,
        autoWidth: true,
        margin: 30,
      },
    },
  });

   // slider related_products
   $(".related_products-carousel").owlCarousel({
    dots: false,
    nav: false,
    loop: false,
    autoWidth: true,
    center: false,
    margin: 10,
  });

  // mini-cart-gift-wrapper 
  $(".mini-cart-gift-wrapper").owlCarousel({
    loop: false,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
        center: true,
      },
      340: {
        dots: true,
        nav: false,
        margin: 10,
      },
      767: {
        dots: false,
        nav: true,
        margin: 15,
      },
    },
  });

    // mini-cart gift  
  $(".mini-cart-gift").owlCarousel({
     loop: true,
      autoWidth: true,
      dots: false,
      nav: false,
      responsive: {
        0:  {
          margin: 8,
        },
        767: {
          margin: 15,
        },
    },
  });

  if (window.innerWidth <= 768) {
    $(".gift-accordion .mini-cart-gift").trigger('destroy.owl.carousel')
  }

   // compare-carousel 
   $(".compare-carousel").owlCarousel({
    loop: false,
    autoWidth: true,
    dots: false,
    nav: false,
    responsive: {
      0:  {
        margin: 8,
      },
      767: {
        margin: 17,
      },
    },
  });

   // account-info-slider
  $(".account-info-slider").owlCarousel({
    loop: false,
    dots: true,
    center: false,
      autoWidth: true,
    margin: 10,
  });

  // slider course 
  $(".course-carousel").owlCarousel({
    dots: false,
    nav: false,
    loop: false,
    items: 1,
    margin: 20,
  });

   // loyalty_new caorusel
  $(".loyalty_new-carousel").owlCarousel({
    dots: false,
    nav: false,
    center: false,
    responsive: {
      0: {
        autoWidth: true,
        margin: 24,
      },
      768: {
        items: 3,
        autoWidth: false,
        margin: 40,
      },
      
    },
  });

  // END

  //BEGIN footer accordion

  $(".footer-main__side.center .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("accordion__rotate");
  });

  //END

  // hide description content on mobile

  if ($(window).width() < 768) {
    $(".hide_on_mobile").addClass("hideContent");
  }

  //BEGIN filter accordion

  $(".filter__accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    $this.toggleClass("accordion-active");
    $this.parent().toggleClass("border");
    // $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("minus");
    $('body').addClass("_lock");
  });

  $(".categories__content__left .filters-heder .close").on("click", function (e) {
    $(".categories__content__left .accordion__title").removeClass("accordion-active");
    $(".categories__content__left .accordion__item").removeClass("border");
    $(".categories__content__left .accordion__arrow").removeClass("minus");
    $('body').removeClass("_lock");
});

  //END

  //BEGIN filters accordion

  $(".filters__accordion .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    $this.toggleClass("accordion-active");
    $this.parent().toggleClass("border");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("minus");
  });
  //END

  //BEGIN product-page accordion

  $(".product-page__accordion .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    if (!$this.hasClass("accordion-active")) {
      $(".product-page__accordion .accordion__content").slideUp(400);
      $(".product-page__accordion .accordion__title").removeClass("accordion-active");
      $(".product-page__accordion .accordion__item").removeClass("border");
      $(".product-page__accordion .accordion__arrow").removeClass("minus");
    }

    $this.toggleClass("accordion-active");
    $this.parent().toggleClass("border");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("minus");
  });

  //END

  //BEGIN FAQ accordion

  $(".questions__block.collapsed .faq-title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    $this.parent().toggleClass('bg');

    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $(".faq-title-icon", this).toggleClass("minus");
  });
  //END

  //BEGIN order accordion

  $(".order__accordion .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    if (!$this.hasClass("accordion-active")) {
      $(".order__accordion .accordion__content").slideUp(400);
      $(".order__accordion .accordion__title").removeClass("accordion-active");
      $(".order__accordion .accordion__arrow").removeClass("active");
    }

    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("active");
  });
  //END

    //BEGIN mini-cart accordion

  $(".gift-accordion-title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $(".gift-accordion-title__arrow", this).toggleClass("rotate");
    $(".mini-cart-gift").trigger("refresh.owl.carousel");
  });
  //END

  //BEGIN bonus-history accordion

  $(".bonus-history__accordion .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("rotate");
  });
  //END

    //BEGIN info-accordion

  $(".info-accordion-title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $(".info-accordion-title__arrow", this).toggleClass("rotate");
  });
  //END

     //account-info-delivery 
  $(".account-info-delivery__item__btn").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass("accordion-active");
    $('#np-form').slideToggle('slow', function() {
        if ($(this).is(':visible'))
            $(this).css('display','grid');
    });
  });
  //END

    //BEGIN course-accordion

  $(".course-accordion .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    if (!$this.hasClass("accordion-active")) {
      $(".course-accordion .accordion__content").slideUp(400);
      $(".course-accordion .accordion__title").removeClass("accordion-active");
      $(".course-accordion .accordion__arrow").removeClass("active");
    }

    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("active");
  });
  //END


  // remove label corporate-form
  $(".corporate-form-block input").on("change", function (e) {
    if ($('.corporate-form-block input').val()) {
      $(this).parents('.input').addClass('change');
    } else {
      $(this).parents('.input').removeClass('change');
    }
  });
 
});

// add to favorite
$(".icon-favorite-new").on("click", function (e) {
  $(this).toggleClass("icon-favorite-col-new");
})

// filter check square
const elProperties = document.querySelectorAll(".el_properties");

elProperties.forEach((item) => {
  item.addEventListener("click", (e) => {
    let square = item.querySelector(".square");
    square.classList.toggle("active-square");
  });
});

// tab on product-page START

function openOption(evt, optionName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(optionName).style.display = "block";
  evt.currentTarget.className += " active";

  //
  $("#" + optionName + " .owl-carousel").trigger("refresh.owl.carousel");
}

// tab on product-page END

//tab 2 on product page start

function openOption2(evt, optionName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent2");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks2");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(optionName).style.display = "block";
  evt.currentTarget.className += " active";
}

//tab 2 on product page end

if (document.querySelector(".single-product") !== null) {
  new Carousel(
    document.getElementById("productCarousel"),
    {
      transition: "slide",
      preload: 3,
      Dots: false,
      Thumbs: {
        type: "classic",
        Carousel: {
          dragFree: false,
          slidesPerPage: "auto",
          Navigation: true,
          axis: "x",
        },
      },
    },
    { Thumbs }
  );

  Fancybox.bind('[data-fancybox="gallery"]', {
    compact: false,
    idle: false,
    dragToClose: false,
    contentClick: () =>
      window.matchMedia("(max-width: 578px), (max-height: 578px)").matches
        ? "toggleMax"
        : "toggleCover",

    animated: false,
    showClass: false,
    hideClass: false,

    Hash: false,
    Thumbs: false,

    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },

    Carousel: {
      transition: "fadeFast",
      preload: 3,
    },

    Images: {
      zoom: false,
      Panzoom: {
        panMode: "mousemove",
        mouseMoveFactor: 1.1,
      },
    },
  });
}

// order_form popup open/close on click

if (document.querySelector(".order_form_popup") !== null) {
  document.querySelectorAll(".one-click-button").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.style.overflow = "hidden";
      document.querySelector(".order_form_popup").classList.add("active");
    });
  });
  document
    .querySelector(".order_form_popup-content")
    .addEventListener("click", function (e) {
      e.stopPropagation();
    });

  document
    .querySelector(".close_popup")
    .addEventListener("click", function (e) {
      document.body.style.overflow = "visible";
      document.querySelector(".order_form_popup").classList.remove("active");
    });
}

// forget-password popup

if (document.querySelector(".authorization-popup") !== null) {
  document.querySelectorAll(".forget-password-btn").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".sign-in__content").classList.add("hide");
      document
        .querySelector(".remind-password__content")
        .classList.add("active");
    });
  });
}

if (document.querySelector(".authorization-popup .auth-link") !== null) {
  document
    .querySelector(".authorization-popup .auth-link")
    .addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".authorization-popup").classList.remove("active");
      document.body.style.overflow = "visible";
    });
}

if (document.querySelector(".mini-cart-popup .auth-link") !== null) {
  document
    .querySelector(".mini-cart-popup .auth-link")
    .addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".mini-cart-popup").classList.remove("active");
      document.body.style.overflow = "visible";
    });
}

//post-page-popup

if (document.querySelector(".post-page-popup") !== null) {
  document.querySelectorAll(".post-page-popup-close").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.style.overflow = "visible";
      document.querySelectorAll(".post-page-popup").forEach(el => el.classList.remove("active"));
    });
  });
  document.addEventListener('click', function(event) {
  document.querySelectorAll('.post-page-popup.active').forEach(function(popup) {
    if (!popup.querySelector('.post-page-popup-content').contains(event.target)) {
      popup.classList.remove('active');
    }
  });
});
}

//show more-less start

$.fn.showMore = function (options) {
  "use strict";

  var currentelem = 1;

  this.each(function () {
    var currentid = "";
    var element = $(this);
    var auto = parseInt(element.innerHeight()) / 2;
    var fullheight = element.innerHeight() + 20;
    var maxWidth = element.css("width");
    var settings = $.extend(
      {
        minheight: auto,
        buttontxtmore: "show more",
        buttontxtless: "show less",
        buttoncss: "showmore-button",
        animationspeed: auto,
      },
      options
    );

    element.attr("id") != undefined
      ? (currentid = element.attr("id"))
      : (currentid = currentelem);
    element.wrap("<div id='showmore-" + currentid + "'></div>");

    if (element.parent().not("[data-showmore]")) {
      if (fullheight > settings.minheight) {
        element
          .css("min-height", settings.minheight)
          .css("max-height", settings.minheight)
          .css("overflow", "hidden");
        var showMoreButton = $("<div />", {
          id: "showmore-button-" + currentid,
          class: settings.buttoncss,
          click: function () {
            if (element.css("max-height") != "none") {
              element
                .css("height", settings.minheight)
                .css("max-height", "")
                .animate(
                  { height: fullheight },
                  settings.animationspeed,
                  function () {
                    showMoreButton.html(settings.buttontxtless);
                  }
                );
            } else {
              element.animate(
                { height: settings.minheight },
                settings.animationspeed,
                function () {
                  showMoreButton.html(settings.buttontxtmore);
                  element.css("max-height", settings.minheight);
                }
              );
            }
          },
          html: settings.buttontxtmore,
        });
        element.after(showMoreButton);
      }
      currentelem++;
    }
  });

  return this;
};

$(document).ready(function () {
  $(".page_content_text-hide-text").showMore({
    minheight: 205,
    buttontxtmore: "Читати повністю",
    buttontxtless: "Приховати",
  });

  $(".description-hide-text").showMore({
    minheight: 160,
    buttontxtmore: "Читати повністю",
    buttontxtless: "Приховати",
  });

  $(".sale-hide-text").showMore({
    minheight: 50,
    buttontxtmore: "Читати повністю",
    buttontxtless: "Приховати",
  });

  if ($(".categories-title .title").text().length != $(".categories-title .title span").text().length && $(".categories-title .auth-link").length == 0){

  if ($(window).width() < 768) {
    $(".categories-title:not(span)").showMore({
      minheight: 80,
      buttontxtmore: "Показати весь текст",
      buttontxtless: "Приховати",
    });
  } else {
    $(".categories-title:not(span)").showMore({
      minheight: 40,
      buttontxtmore: "Показати весь текст",
      buttontxtless: "Приховати",
    });
  }
};
  
});

//show more-less end

// mini-cart start

if (document.querySelector(".mini-cart-popup") !== null) {
  document
    .querySelector(".mini-cart-dropdown-link")
    .addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".mini-cart-popup").classList.add("active");
      document.body.classList.add("_lock");
    });

  window.addEventListener("click", function (e) {
    if (
      e.target.closest(".mini-cart-popup__close") ||
      e.target.closest(".mini-cart-popup .btn-continue")
    ) {
      e.preventDefault();
      document.querySelector(".mini-cart-popup").classList.remove("active");
      document.body.classList.remove("_lock");
    }

    if (
      document.querySelector(".mini-cart-popup.active") &&
      !e.target.closest(".mini-cart-popup-content") &&
      !e.target.closest(".mini-cart-dropdown-link")
    ) {
      document.querySelector(".mini-cart-popup").classList.remove("active");
      document.body.classList.remove("_lock");
    }
  });

  if (document.querySelector(".add-coupon") !== null) {
    document
      .querySelector(".add-coupon")
      .addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(".coupon-add-form").classList.add("active");
        document.querySelector(".add-coupon").classList.add("hide");
      });

    document
      .querySelector(".coupon-remove")
      .addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(".coupon-add-form").classList.remove("active");
        document.querySelector(".add-coupon").classList.remove("hide");
      });
  }
}

// mini-cart end

if (document.querySelector(".back_pg-btn") !== null) {
  document
    .querySelector(".back_pg-btn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      window.history.back();
    });
}

function OpenSocial() {
  let social = document.querySelector(".listSocial-sft");
  if (social.classList.contains("listSocial--active")) {
    document.querySelector(".openSocial-sft").innerHTML =
      '<i class="icon-chat_icon"></i>';
    social.classList.remove("listSocial--active");
  } else {
    social.classList.add("listSocial--active");
    document.querySelector(".openSocial-sft").innerHTML =
      '<i class="icon-Close" style="font-size: 25px;"></i>';
  }
}

/*Account tab start*/

 $(function () {
    if (location.hash) {
      $('.account-section[data-id="' + location.hash + '"]').addClass("active");
      $('.account-nav a[href="' + location.hash + '"').parent().addClass("active");
    } else {
      if($(window).width() > 768){
        $(".account-section").first().addClass("active");
        $(".account-nav li").first().addClass("active");
      }
    }

    $('.account-nav a[href*="#"]').click(function (e) {
      e.preventDefault();
      $(".account-section, .account-nav li").removeClass("active");
      $('.account-section[data-id="' + this.hash + '"]').addClass("active");
      $('.account-nav a[href="' + this.hash + '"').parent().addClass("active");
      location.hash = this.hash;
       if($(window).width() < 768){
        $("body").addClass("_lock");
      }
    });

    $('.account-item-title').click(function (e) {
      e.preventDefault();
      $(".account-section, .account-nav li").removeClass("active");
      $("body").removeClass("_lock");
    });
  });

/*Account tab end*/

// countDown on banner
if (document.querySelector(".sale-coutndown") !== null) {
  let days = document.getElementById("days"),
    hours = document.getElementById("hours"),
    minutes = document.getElementById("minutes"),
    seconds = document.getElementById("seconds");
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let timeleft = JSON.parse(document.querySelector(".sale-timer-right").getAttribute("data-timeleft")),
    distance = timeleft.days * day + timeleft.hours * hour + timeleft.minutes * minute + timeleft.seconds * second,
    x = setInterval(function () {
        
      days = Math.floor(distance / day);
      days = days < 10 ? "0" + days : days;
      (document.getElementById("days").innerText = days),
        (hours = Math.floor((distance % day) / hour));
      hours = hours < 10 ? "0" + hours : hours;
      (document.getElementById("hours").innerText = hours),
        (minutes = Math.floor((distance % hour) / minute)),
        (minutes = minutes < 10 ? "0" + minutes : minutes);
      (document.getElementById("minutes").innerText = minutes),
        (seconds = Math.floor((distance % minute) / second)),
        (seconds = seconds < 10 ? "0" + seconds : seconds);
      document.getElementById("seconds").innerText = seconds;
      var sec = Math.floor((distance % minute) / second);
      distance = distance - second;
    }, second);
};

// When the user scrolls down 250px from the top of the document, show the button
if (document.querySelector(".add-fixed-btn") !== null) {
  let addBtnFixed = document.querySelector(".add-fixed-btn");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 250 ||
      document.documentElement.scrollTop > 250
    ) {
      addBtnFixed.style.display = "flex";
    } else {
      addBtnFixed.style.display = "none";
    }
  }
}

// sing in email/phone
$(".sign-in-btn").on("click", function (e) {
  e.preventDefault();
  $(".email-block, .phone-block").toggleClass("open");
});

// show sms verify 
function showSmsVerify(){
       
  if (document.querySelector(".sign-in__phone-code") !== null) {
    
    document.querySelector(".sign-in__content>form").style.display = "none";
    document.querySelector(".sign-in__phone-code").style.display = "flex";

    window.addEventListener("click", function (e) {
  
      if (!e.target.closest(".sign-in__phone-code")) {
        document.querySelector(".sign-in__content>form").style.display = "block";
        document.querySelector(".sign-in__phone-code").style.display = "none";
      }
    });
  }
  countdownSmsVerify();
}

let timeoutSmsVerify;

function countdownSmsVerify() {
  document.getElementById("timer-counter").style.display= "block"
  document.querySelector(".timer-block .repeat-code-btn").style.display= "none"
  var seconds = 59;
  function tick() {
    var counter = document.getElementById("timer-counter");
    seconds--;
    counter.innerHTML =
      "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    if (seconds > 0) {
      timeoutSmsVerify = setTimeout(tick, 1000);
    } else {
      document.querySelector(".timer-block .repeat-code-btn").style.display= "block"
      document.getElementById("timer-counter").style.display= "none"
    }
  }
  tick();
}

// show email verify 
function showEmailVerify(){
       
  if (document.querySelector(".contacts-input-block.email-block") !== null) {
    
    document.querySelector(".email-block-row.email").style.display = "none";
    document.querySelector(".email-block-row.pass").style.display = "flex";

    window.addEventListener("click", function (e) {
  
      if (!e.target.closest(".email-block-row.pass")) {
        document.querySelector(".email-block-row.email").style.display = "flex";
    document.querySelector(".email-block-row.pass").style.display = "none";
      }
    });
  }
}

if (document.querySelector(".sign-in__choice") !== null) {
  document.querySelector(".sign-in__choice-email").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".sign-in__choice").classList.remove("open");
    document.querySelector(".sign-in__content>form").style.display = "block";
    document.querySelector(".sign-in__phone-code").style.display = "none";
    document.querySelector(".contacts-input-block.phone-block").classList.remove("open");
    document.querySelector(".contacts-input-block.email-block").classList.add("open");
  });
}

if (document.querySelector(".sign-in__choice") !== null) {
  document.querySelector(".sign-in__choice-phone").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".sign-in__choice").classList.remove("open");
    document.querySelector(".sign-in__content>form").style.display = "block";
    document.querySelector(".sign-in__phone-code").style.display = "none";
  });

  // document.querySelector(".sign-in__choice-repeat").addEventListener("click", function (e) {
  //   e.preventDefault();
  //   document.querySelector(".sign-in__choice").classList.remove("open");
  //   showSmsVerify();
  // });

  document.querySelector(".sign-in__choice-cancel").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".sign-in__content>form").style.display = "flex";
    document.querySelector(".sign-in__phone-code").style.display = "none";
    clearTimeout(timeoutSmsVerify);
  });

}