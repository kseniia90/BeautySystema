"use strict";

// show menu, dont scroll body while menu is open, close the menu if click happen outside menu
const menuIcon = document.querySelector(".menu__icon");
const menuButton = document.querySelector(".catalog-btn");

// Burger-menu: show menu, dont scroll body while menu is open, close the menu if click outside menu
const burgerMenuIcon = document.querySelector(".burger-menu__icon");
const burgerMenuBody = document.querySelector(".header__nav");

document.addEventListener("click", function (event) {
  if (event.target.closest(".burger-menu-btn")) {
    document.body.classList.toggle("lock");
    burgerMenuBody.classList.toggle("_active");
    burgerMenuIcon.classList.toggle("_active");
    document.querySelector(".header__search-block").classList.toggle("hide");
  }
});


// When the user scrolls down 250px from the top of the document, show the button
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

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth"
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
    document.querySelectorAll(".header__submenu__list")
      .forEach(function (dropDownList) {
        // close the dropdown after user leave the list
        dropDownList.onmouseleave = closeDropdown;
      });
    document.querySelectorAll(".header__nav-link").forEach(function (listItem) {
      listItem.onmouseleave = function() {
        dropdownCloseTimeout = setTimeout(function() {
          closeDropdown();
        }, 200);
      }
    });
    document
      .querySelectorAll(".header__submenu__list")
      .forEach(function (dropDownList) {
        dropDownList.onmouseenter = function() {
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
          this.querySelector(".arrow_down").classList.add("rotate");
          if (!!this.nextElementSibling) {
            this.nextElementSibling.classList.add("dropdown-active");
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
  // Close the menu if click happen outside menu
  if (!e.target.closest(".header__nav__list")) {
    // Close the opend dropdown
    closeDropdown();
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
    $(".header__second-submenu__list").removeClass("open").slideUp();
    $(this)
      .siblings(".header__second-submenu__list")
      .addClass("open")
      .slideDown();
  } else {
    $(this)
      .siblings(".header__second-submenu__list")
      .removeClass("open")
      .slideUp();
  }
});

$(function () {
  // SLIDERS START

  // slider banner
  $(".banner-carousel").owlCarousel({
    dots: true,
    nav: true,
    loop: true,
    items: 1,
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
    mouseDrag:false,
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

  // slider insta
  $(".insta-carousel").owlCarousel({
    dots: false,
    nav: false,
    loop: true,
    autoWidth: true,
    items: 4,
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
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("minus");
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

  //BEGIN filters accordion

  $(".product-page__accordion .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    if (!$this.hasClass("accordion-active")) {
      $(".accordion__content").slideUp(400);
      $(".accordion__title").removeClass("accordion-active");
      $(".accordion__item").removeClass("border");
      $(".accordion__arrow").removeClass("minus");
    }

    $this.toggleClass("accordion-active");
    $this.parent().toggleClass("border");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("minus");
  });
  //END

});

// filter check square
const elProperties = document.querySelectorAll(".el_properties");

elProperties.forEach((item) => {
  item.addEventListener("click", (e) => {
    let square = item.querySelector(".square");
    square.classList.toggle("active-square");
  });
});

// price range slider START

if (!!document.querySelector(".range_container")) {
  function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, "#C6C6C6", "#4B6D74", controlSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromSlider.value = from;
    }
  }

  function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, "#C6C6C6", "#4B6D74", controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
    }
  }

  function controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, "#C6C6C6", "#4B6D74", toSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromInput.value = from;
    }
  }

  function controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, "#C6C6C6", "#4B6D74", toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
      toSlider.value = from;
    }
  }

  function getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max - to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
  }

  function setToggleAccessible(currentTarget) {
    const toSlider = document.querySelector("#toSlider");
    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = 2;
    } else {
      toSlider.style.zIndex = 0;
    }
  }

  const fromSlider = document.querySelector("#fromSlider");
  const toSlider = document.querySelector("#toSlider");
  const fromInput = document.querySelector("#fromInput");
  const toInput = document.querySelector("#toInput");
  fillSlider(fromSlider, toSlider, "#C6C6C6", "#4B6D74", toSlider);
  setToggleAccessible(toSlider);

  fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
  toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
  fromInput.oninput = () =>
    controlFromInput(fromSlider, fromInput, toInput, toSlider);
  toInput.oninput = () =>
    controlToInput(toSlider, fromInput, toInput, toSlider);

  // value of start filter price
  const rangeStart = document.getElementById("fromSlider"),
    rangeStartV = document.getElementById("fromInput"),
    setStartValue = () => {
      const newValue = Number(
          ((rangeStart.value - rangeStart.min) * 100) /
            (rangeStart.max - rangeStart.min)
        ),
        newPosition = 10 - newValue * 0.2;
      rangeStartV.innerHTML = `<span>₴${rangeStart.value}</span>`;
      rangeStartV.style.left = `calc(${newValue}% - (5px))`;
    };
  document.addEventListener("DOMContentLoaded", setStartValue);
  rangeStart.addEventListener("input", setStartValue);

  // value of start filter price
  const rangeEnd = document.getElementById("toSlider"),
    rangeEndV = document.getElementById("toInput"),
    setEndValue = () => {
      const newValue = Number(
          ((rangeEnd.value - rangeEnd.min) * 100) /
            (rangeEnd.max - rangeEnd.min)
        ),
        newPosition = 10 - newValue * 0.2;
      rangeEndV.innerHTML = `<span>₴${rangeEnd.value}</span>`;
      rangeEndV.style.left = `calc(${newValue}% - (10px))`;
    };
  document.addEventListener("DOMContentLoaded", setEndValue);
  rangeEnd.addEventListener("input", setEndValue);
}

// price range slider END

// tab on product-page START

function openOption(evt, optionName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(optionName).style.display = "block";
  evt.currentTarget.className += " active";

  //
  $("#" + optionName + " .owl-carousel").trigger("refresh.owl.carousel");
}

// tab on product-page END

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
      document.querySelector(".remind-password__content").classList.add("active");
    });
  });
 
}

//show more-less start

$.fn.showMore = function (options) {
        
  "use strict";
  
  var currentelem = 1;
  
  this.each(function(){
      
      var currentid = '';
      var element = $(this);
      var auto = parseInt(element.innerHeight())/2;
      var fullheight = element.innerHeight();
      var maxWidth = element.css('width');
      var settings = $.extend({
          minheight: auto,
          buttontxtmore: "show more",
          buttontxtless: "show less",
          buttoncss: "showmore-button",
          animationspeed: auto       
      }, options );        
      
      element.attr('id') != undefined ? currentid = element.attr('id') : currentid = currentelem;
      element.wrap( "<div id='showmore-"+currentid+"'></div>" );
      
      if (element.parent().not('[data-showmore]')) {
      
          if (fullheight > settings.minheight) {
              
              element.css('min-height', settings.minheight).css('max-height', settings.minheight).css('overflow', 'hidden');
              var showMoreButton = $("<div />", {
                  id: "showmore-button-"+currentid,
                  "class": settings.buttoncss,
                  click: function() {

                      if (element.css('max-height') != 'none') {
                          element.css('height', settings.minheight).css('max-height', '').animate({height:fullheight}, settings.animationspeed, function () { showMoreButton.html(settings.buttontxtless); });
                      } else {
                          element.animate({height:settings.minheight}, settings.animationspeed, function () { showMoreButton.html(settings.buttontxtmore); element.css('max-height', settings.minheight); });
                      }
                  },
                  html: settings.buttontxtmore
              });

              element.after(showMoreButton);

          }
          
          currentelem++;
          
      }
      
  });
  
  return this;
  
};

$('.page_content_text-hide-text').showMore({
  minheight: 205,
  buttontxtmore: "Читати повністю",
  buttontxtless: "Приховати",
});

//show more-less end

// mini-cart dropDown

if (document.querySelector(".header__main__list__item-cart") !== null) {
  let dropdownMiniCartTimeout;

  document.querySelector('.header__main__list__item-cart').addEventListener("mouseover", function () {
    if (window.innerWidth > 900) {
      this.classList.add("dropdown-open");
      this.querySelector(".mini-cart-body").classList.add("dropdown-active");
      clearTimeout(dropdownMiniCartTimeout);
    }
  });
  
  document.querySelector('.header__main__list__item-cart').addEventListener("mouseout", function () {
    if (window.innerWidth > 900) {
      dropdownMiniCartTimeout = setTimeout(function () {
        closeDropdownMiniCart();
      }, 400);
    }
  });
  
  document.querySelector('.mini-cart-dropdown-link').addEventListener("click", function () {
    if (window.innerWidth <= 900) {
      document.querySelector('.header__main__list__item-cart').classList.toggle("dropdown-open");
      document.querySelector('.mini-cart-body').classList.toggle("dropdown-active");
    }
  });
  
  window.onclick = function(e) {
    if (window.innerWidth <= 900) {
      if (!e.target.closest('.mini-cart-body') && !e.target.closest('.mini-cart-dropdown-link')) {
        closeDropdownMiniCart();
      }
    }
  }
  
  function closeDropdownMiniCart() {
    document.querySelector('.header__main__list__item-cart').classList.remove("dropdown-open");
    document.querySelector('.mini-cart-body').classList.remove("dropdown-active");
    clearTimeout(dropdownMiniCartTimeout);
  }
}












