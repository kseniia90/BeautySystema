// mini-cart gift  
  // $(".mini-cart-gift").owlCarousel({
  //   loop: true,
  //   responsive: {
  //     0: {
  //       items: 1,
  //       center: true,
  //     },
  //     340: {
  //       dots: true,
  //       nav: false,
  //       autoWidth: true,
  //       margin: 10,
  //     },
  //     767: {
  //       dots: false,
  //       items: 4,
  //       nav: true,
  //       autoWidth: false,
  //       margin: 15,
  //     },
  //   },
  // });

  

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

 