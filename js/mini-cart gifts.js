// mini-cart gift  
  $(".mini-cart-gift").owlCarousel({
    loop: true,
    responsive: {
      0: {
        items: 1,
        center: true,
      },
      340: {
        dots: true,
        nav: false,
        autoWidth: true,
        margin: 10,
      },
      767: {
        dots: false,
        items: 4,
        nav: true,
        autoWidth: false,
        margin: 15,
      },
    },
  });

  // Range Input
function SliderFun(ele) {
  for (let i = 0; i < ele.length; i++) {
    const element = ele[i];

    const values = element.value;
    const dataValue = element.getAttribute("max");
    const fullValue = Math.round((values * 100) / dataValue);
    element.nextSibling.parentNode.querySelector(".active-line").style.width =
      fullValue + "%";
    if (element.nextSibling.parentNode.querySelector(".active-dot")) {
      element.nextSibling.parentNode.querySelector(".active-dot").style.left =
        fullValue + "%";
    }

    // if (values % 3 === 0) {
    console.log("The value is an integer.");
    console.log("values", values / 3);
    const vals = values / 3;
    const ulList = element.parentNode.parentElement.querySelectorAll("ul li");
    for (let ids = 0; ids < ulList.length; ids++) {
      if (ids < vals || ids == vals) {
        ulList[ids].classList.add("active");
      } else {
        ulList[ids].classList.remove("active");
      }
    }
    // }
  }
}
SliderFun($(".range-input input"));

$(".range-input input").on("input", function () {
  SliderFun($(this));
});
