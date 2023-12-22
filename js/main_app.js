"use strict";

// Burger-menu: show menu, dont scroll body while menu is open, close the menu if click outside menu
const burgerMenuIcon = document.querySelector(".burger-menu__icon");
const burgerMenuBody = document.querySelector(".header__nav");

document.addEventListener("click", function(event){
  if(event.target.closest('.burger-menu-btn')){
    document.body.classList.toggle("lock");
    burgerMenuBody.classList.toggle("_active");
  } else if(event.target.closest('.header__main__list__item')) {
    document.body.classList.remove("lock");
    burgerMenuBody.classList.remove("_active");
  }

})

// dropdown menu START

document.querySelectorAll(".dropdown-link").forEach(dropDownFunc);


// Dropdown Open and Close function START
function dropDownFunc(dropDown) {

    if (dropDown.classList.contains("dropdown-link") === true) {
      dropDown.addEventListener("click", function (e) {
        if (!!this.nextElementSibling &&
          this.nextElementSibling.classList.contains("dropdown-active") === true
        ) {
          // Close the clicked dropdown
          this.parentElement.classList.remove("dropdown-open");
          this.nextElementSibling.classList.remove("dropdown-active");

          // closeDropdown();
        } else {
          // Close the opend dropdown
          // closeDropdown();

          // add the open and active class(Opening the DropDown)
          this.parentElement.classList.add("dropdown-open");
          if (!!this.nextElementSibling) {
            this.nextElementSibling.classList.add("dropdown-active");
          }
        }
      });
    }
}

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

}
  // dropdown menu END

$(function () {
  // SLIDERS START

  // slider banner
  $(".banner-carousel").owlCarousel({
    dots: false,
    nav:false,
    loop: true,
    margin: 10,
    center: true,
    items: 1.2,
    autoplay: true,
    autoplayTimeout: 5000,
  });
   

 // slider categories
  $(".categories-carousel").owlCarousel({
    dots: false,
    nav: false,
    loop: true,
    margin: 15,
    autoWidth: true,
  });

  
  //slider popular
  $(".popular-carousel").owlCarousel({
    dots: false,
    nav: false,
    loop: true,
    margin: 15,
    autoWidth: true,
   });

  

  //slider new
  $(".new-carousel").owlCarousel({
    dots: false,
    nav: false,
    loop: true,
    margin: 15,
    autoWidth: true,
  });

  // slider advantages
  $(".advantages-carousel").owlCarousel({
    dots: false,
    nav:false,
    loop: true,
    margin: 15,
    autoWidth: true,
    autoplay: true,
    autoplayTimeout: 5000,
  });

  // slider insta
  $(".insta-carousel").owlCarousel({
    dots: false,
    nav:false,
    loop: true,
    autoWidth: true,
    items:4,
  });

  $(".show-more").on("click", function(e) {
    e.preventDefault();
    $(".description-content").toggleClass("showContent");
  });
  // END

  
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

  //  app. show menu title 
  $(".menu-item").on("click", function() {
	
		$(".menu-item").removeClass('active');
    $(this).addClass("active");

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







