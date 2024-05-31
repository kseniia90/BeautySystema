"use strict";

// show menu, dont scroll body while menu is open, close the menu if click happen outside menu
const menuIcon = document.querySelector(".menu__icon");
const menuButton = document.querySelector(".catalog-btn");

// Burger-menu: show menu, dont scroll body while menu is open, close the menu if click outside menu
const burgerMenuIcon = document.querySelector(".burger-menu__icon");
const burgerMenuBody = document.querySelector(".header__nav");

document.addEventListener("click", function(event){
  if(event.target.closest(".burger-menu-btn")){
    document.body.classList.toggle("lock");
    burgerMenuBody.classList.toggle("_active");
    burgerMenuIcon.classList.toggle("_active");
    document.querySelector(".header__search-block").classList.toggle("hide");
  }
})

// dropdown menu START

document.querySelectorAll(".dropdown-link").forEach(dropDownFunc);


// Dropdown Open and Close function START
function dropDownFunc(dropDown) {

  if(window.innerWidth > 900){
    if (dropDown.classList.contains("hover-dropdown") === true) {
      dropDown.onmouseover = dropDown.onmouseout = dropdownHover;
      
      function dropdownHover(e) {
        if (e.type == "mouseover" && !!this.nextElementSibling ) {
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
document.querySelectorAll(".header__submenu__list").forEach(function (dropDownList) {
  // close the dropdown after user leave the list
  dropDownList.onmouseleave = closeDropdown;
});
} else {
    if (dropDown.classList.contains("dropdown-link") === true) {
      dropDown.addEventListener("click", function (e) {
        if (!!this.nextElementSibling &&
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

document.querySelectorAll(".header__nav-link > a").forEach(function(dropDown) {

  if(window.innerWidth > 900){
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
  $(".has-submenu > a").click(function(e){
    e.preventDefault()
    if(!$(this).siblings(".header__second-submenu__list").hasClass("open")){
      $(".header__second-submenu__list").removeClass("open").slideUp();
      $(this).siblings(".header__second-submenu__list").addClass("open").slideDown();

    } else {
      $(this).siblings(".header__second-submenu__list").removeClass("open").slideUp();
    }
  })

$(function () {
  // SLIDERS START

  // slider banner
  $(".banner-carousel").owlCarousel({
    dots: true,
    nav:true,
    loop: true,
    items: 1,
  });
   

 // slider categories
  $(".categories-carousel").owlCarousel({
    dots: true,
    nav:true,
    loop: true,
    margin: 30,
    center: true,
    autoWidth: true,
    onInitialized: function(e) {
      setTimeout(fadeSlides, 100, e)
    },
    onTranslated: fadeSlides,
    onResized: fadeSlides,
  });

  function fadeSlides(e) {
    $(e.target).find(".owl-item").removeClass("opacity");
    $(e.target).find(".owl-item.active").first().prev().addClass("opacity");
    $(e.target).find(".owl-item.active").last().addClass("opacity");
  }
  
  //slider popular
  $(".popular-carousel").owlCarousel({
    dots: true,
    nav:true,
    loop: true,
    onInitialized: function(e) {
      setTimeout(fadeSlides, 100, e)
    },
    onTranslated: fadeSlides,
    onResized: fadeSlides,
    responsive:{
      0:{
        items:1,
        center: true,
        autoWidth: true,
        margin: 15,
    },
      360:{
          items:2,
          center: false,
          autoWidth: false,
          margin: 15,
      },
      500:{
          center: true,
          autoWidth: true,
          margin: 30,
      },
    }
   });

  

  //slider new
  $(".new-carousel").owlCarousel({
    dots: true,
    nav:true,
    loop: true,
    onInitialized: function(e) {
      setTimeout(fadeSlides, 100, e)
    },
    onTranslated: fadeSlides,
    onResized: fadeSlides,
    responsive:{
      0:{
        items:1,
        center: true,
        autoWidth: true,
        margin: 15,
    },
      360:{
          items:2,
          center: false,
          autoWidth: false,
          margin: 15,
      },
      500:{
          center: true,
          autoWidth: true,
          margin: 30,
      },
    }
  });

  // slider advantages
  $(".advantages-carousel").owlCarousel({
    dots: true,
    nav:true,
    loop: true,
    autoWidth: true,
    items:1,
  });

  // slider insta
  $(".insta-carousel").owlCarousel({
    dots: false,
    nav:false,
    loop: true,
    autoWidth: true,
    items:4,
  });
  // END

  //BEGIN footer accordion

	$(".footer-main__side.center .accordion__title").on("click", function(e) {

		e.preventDefault();
		var $this = $(this);

		$this.toggleClass("accordion-active");
		$this.next().slideToggle();
		$('.accordion__arrow',this).toggleClass('accordion__rotate');

	});
	//END

  // hide description content on mobile

  if ($(window).width() < 768) {
    $('.hide_on_mobile').addClass('hideContent');
  }

  //BEGIN filter accordion

  $(".filter__accordion__title").on("click", function(e) {

		e.preventDefault();
		var $this = $(this);

		$this.toggleClass("accordion-active");
    $this.parent().toggleClass("border");
		$this.next().slideToggle();
		$('.accordion__arrow',this).toggleClass('minus');

	});

  //END

  //BEGIN filters accordion

  $(".filters__accordion .accordion__title").on("click", function(e) {

		e.preventDefault();
		var $this = $(this);

		$this.toggleClass("accordion-active");
    $this.parent().toggleClass("border");
		$this.next().slideToggle();
		$('.accordion__arrow',this).toggleClass('minus');

	});
  //END

  //BEGIN filters accordion

  $(".product-page__accordion .accordion__title").on("click", function(e) {

		e.preventDefault();
		var $this = $(this);

    if (!$this.hasClass("accordion-active")) {
			$(".accordion__content").slideUp(400);
			$(".accordion__title").removeClass("accordion-active");
      $(".accordion__item").removeClass("border");
			$('.accordion__arrow').removeClass('minus');
		}

		$this.toggleClass("accordion-active");
    $this.parent().toggleClass("border");
		$this.next().slideToggle();
		$('.accordion__arrow',this).toggleClass('minus');

	});
  //END

  // shopping cart counter on click

  $(document).ready(function () {
    $(".minus").click(function () {
      var $input = $(this).parent().find("input");
      var count = parseInt($input.val()) - 1;
      count = count < 1 ? 1 : count;
      $input.val(count);
      $input.change();
      return false;
    });
    $(".plus").click(function () {
      var $input = $(this).parent().find("input");
      $input.val(parseInt($input.val()) + 1);
      $input.change();
      return false;
    });

    // show all products on mobile
    $(".products-show-more").on("click", function () {
      $(".products__result__item").toggleClass("showContent");
  });
  });

});


// filter check square
const elProperties = document.querySelectorAll('.el_properties');
  
elProperties.forEach((item)=>{
  item.addEventListener('click', (e)=>{
    let square = item.querySelector('.square');
    square.classList.toggle('active-square');

  })
})  

 // price range slider START

 if(!!document.querySelector(".range_container")) {
  function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#4B6D74', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
  }
    
  function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#4B6D74', controlSlider);
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
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#4B6D74', toSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
  }
  
  function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#4B6D74', toSlider);
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
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} 100%)`;
  }
  
  function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#toSlider');
  if (Number(currentTarget.value) <= 0 ) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
  }
  
  const fromSlider = document.querySelector('#fromSlider');
  const toSlider = document.querySelector('#toSlider');
  const fromInput = document.querySelector('#fromInput');
  const toInput = document.querySelector('#toInput');
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#4B6D74', toSlider);
  setToggleAccessible(toSlider);
  
  fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
  toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
  fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
  toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
  
  // value of start filter price
  const
    rangeStart = document.getElementById('fromSlider'),
    rangeStartV = document.getElementById('fromInput'),
    setStartValue = ()=>{
      const
        newValue = Number( (rangeStart.value - rangeStart.min) * 100 / (rangeStart.max - rangeStart.min) ),
        newPosition = 10 - (newValue * 0.2);
      rangeStartV.innerHTML = `<span>₴${rangeStart.value}</span>`;
      rangeStartV.style.left = `calc(${newValue}% - (5px))`;
    };
  document.addEventListener("DOMContentLoaded", setStartValue);
  rangeStart.addEventListener('input', setStartValue);
  
  // value of start filter price
  const
    rangeEnd = document.getElementById('toSlider'),
    rangeEndV = document.getElementById('toInput'),
    setEndValue = ()=>{
      const
        newValue = Number( (rangeEnd.value - rangeEnd.min) * 100 / (rangeEnd.max - rangeEnd.min) ),
        newPosition = 10 - (newValue * 0.2);
      rangeEndV.innerHTML = `<span>₴${rangeEnd.value}</span>`;
      rangeEndV.style.left = `calc(${newValue}% - (10px))`;
    };
  document.addEventListener("DOMContentLoaded", setEndValue);
  rangeEnd.addEventListener('input', setEndValue);
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
}

// tab on product-page END

// order_form popup open/close on click

if(document.querySelector('.order_form_popup') !== null) {

  document.querySelectorAll('.one-click-button').forEach(function(button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.style.overflow = 'hidden';
      document.querySelector('.order_form_popup').classList.add('active');
    });
  })
  document.querySelector('.order_form_popup-content').addEventListener('click', function (e) {
    e.stopPropagation();
  });
  
  document.querySelector('.close_popup').addEventListener('click', function (e) {
    document.body.style.overflow = 'visible';
    document.querySelector('.order_form_popup').classList.remove('active');
  });
}








