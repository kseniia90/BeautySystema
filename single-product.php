<?php get_header(); 
/**
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 1.6.4
 */

require_once('module/system_core/functions_product.php');

global $product;
$the_id = get_the_ID();

$get_req = $_GET;
$target_product = $product->has_child() ? wc_get_product($product->get_children()[0]) : $product;

$title_product = $target_product->get_name();
$image_url = wp_get_attachment_image_url($target_product->get_image_id(), 'full');

$rounded_rating = round($target_product->get_average_rating());
$price = $target_product->get_price();
$old_price = $target_product->get_regular_price();

$is_new = is_new_product($the_id);
$popular = get_post_meta($the_id, 'total_sales', true) > intval(get_field('total_sale_product_count', 'setting_site'));

$display_price = $price . '₴';
$display_old_price = $price != $old_price ? $old_price . '₴' : '';

$is_stock = $target_product->is_in_stock();
$is_sale = $target_product->is_on_sale();
$stock_display = $target_product->is_in_stock();

if(get_field('gtag_id_ads', 'setting_google')){
    $temp_data_product = get_product_id_by_attribute(get_the_ID());
    ?>
    <script>
        gtag('event','view_item', {
        'send_to': '<?php echo(get_field('gtag_id_ads', 'setting_google'))?>',
        'value': <?php echo($temp_data_product['price'])?>,
        'items': [
            {
            'id': <?php echo($temp_data_product['id'])?>, 
            'google_business_vertical': 'retail'
            }]
        });
    </script>
    <?php
}

?>
<main class="main">
    <?php require_once('module/breadcrumb.php');?>
    <div class="product-page product_element" data-idproduct="<?php echo($target_product->get_id())?>" data-stock="<?php echo $is_stock ? 'true' : 'false'?>">
        <div class="product-page__content container">
            <div class="product-page__content__left ">
                <!-- product gallery start -->
                <div class="product-page__content__carousel">
                    <div class="product__card__lables-block">
                        <div class="product__card__lable sale">Розпродаж</div>
                        <div class="product__card__lable new">
                            <span class="icon-new_label icon"></span>
                            <span>Новинка</span>
                        </div>
                        <div class="product__card__lable popular">
                            <span class="icon-popular_label icon"></span>
                            <span>Популярний засіб</span>
                        </div>
                        <div class="product__card__lable favorite">
                            <span class="icon-favorite_label icon"></span>
                            <span>Вибір Яни</span>
                        </div>
                        <div class="product__card__lable waiting">
                            <span class="icon-waiting_label icon"></span>
                            <span>Очікуємо</span>
                        </div>
                        <div class="product__card__lable discount">
                            <span class="icon-discount_label icon"></span>
                            <span>Акція</span>
                        </div>
                    </div>
                    <span class="icon-favorite_icon active"></span>

                    <div id="productCarousel" class="f-carousel">
                        <div
                        class="f-carousel__slide"
                        data-thumb-src="./img/l3h5l49r8wxp.jpg.webp"
                        data-fancybox="gallery"
                        data-src="./img/l3h5l49r8wxp.jpg.webp"
                        >
                        <img
                            alt=""
                            data-lazy-src="./img/l3h5l49r8wxp.jpg.webp"
                        />
                        </div>
                        <div
                        class="f-carousel__slide"
                        data-thumb-src="https://fancyapps.com/img/dress_1_s.jpg"
                        data-fancybox="gallery"
                        data-src="https://fancyapps.com/img/dress_1_b.jpg"
                        >
                        <img
                            alt=""
                            data-lazy-src="https://fancyapps.com/img/dress_1_m.jpg"
                        />
                        </div>
                        <div
                        class="f-carousel__slide"
                        data-thumb-src="https://fancyapps.com/img/dress_2_s.jpg"
                        data-fancybox="gallery"
                        data-src="https://fancyapps.com/img/dress_2_b.jpg"
                        >
                        <img
                            alt=""
                            data-lazy-src="https://fancyapps.com/img/dress_2_m.jpg"
                        />
                        </div>
                        <div
                        class="f-carousel__slide"
                        data-thumb-src="https://fancyapps.com/img/dress_3_s.jpg"
                        data-fancybox="gallery"
                        data-src="https://fancyapps.com/img/dress_3_b.jpg"
                        >
                        <img
                            alt=""
                            data-lazy-src="https://fancyapps.com/img/dress_3_m.jpg"
                        />
                        </div>
                        <div
                        class="f-carousel__slide"
                        data-thumb-src="https://fancyapps.com/img/dress_4_s.jpg"
                        data-fancybox="gallery"
                        data-src="https://fancyapps.com/img/dress_4_b.jpg"
                        >
                        <img
                            alt=""
                            data-lazy-src="https://fancyapps.com/img/dress_4_m.jpg"
                        />
                        </div>
                        <div
                        class="f-carousel__slide"
                        data-thumb-src="https://fancyapps.com/img/dress_5_s.jpg"
                        data-fancybox="gallery"
                        data-src="https://fancyapps.com/img/dress_5_b.jpg"
                        >
                        <img
                            alt=""
                            data-lazy-src="https://fancyapps.com/img/dress_5_m.jpg"
                        />
                        </div>
                        <div
                        class="f-carousel__slide"
                        data-thumb-src="https://fancyapps.com/img/dress_6_s.jpg"
                        data-fancybox="gallery"
                        data-src="https://fancyapps.com/img/dress_6_b.jpg"
                        >
                        <img
                            alt=""
                            data-lazy-src="https://fancyapps.com/img/dress_6_m.jpg"
                        />
                        </div>
                    </div>
                </div>
                <!-- product gallery end -->



                <div class="product-page__content__img <?php echo $is_stock ? '' : 'out-of-stock'?>">
                    <img src="<?php echo($image_url)?>" title="<?php echo esc_html($title_product)?>" alt="<?php echo esc_html($title_product)?>">
                    <div class="product__card__lables-block">                                        
                        <?php
                        if($is_new){
                            ?>
                            <div class="product__card__lable new">
                                <span class="icon-new_label icon"></span>
                                <span><?php _e('Новинка', 'beautysystema')?></span>
                            </div>
                            <?php
                        }
                        ?>
                        <div class="product__card__lable popular" style="display:<?php echo(($popular ? 'flex' : 'none'))?>">
                            <span class="icon-popular_label icon"></span>  
                            <span><?php _e('Хіт', 'beautysystema')?></span>
                        </div> 
                        <?php
                        if(get_field('stiker_vybir_yany', $product->get_id())){
                            ?>
                            <div class="product__card__lable favorite">
                                <span class="icon-favorite_label icon"></span>
                                <span><?php _e('Вибір Яни', 'beautysystema')?></span>
                            </div>
                            <?php
                        }
                        ?>
                        <div class="product__card__lable waiting" style="display:<?php echo(($is_stock ? 'none' : 'flex'))?>">
                            <span class="icon-waiting_label icon"></span>
                            <span><?php _e('Очікуємо', 'beautysystema')?></span>
                        </div>
                        <div class="product__card__lable discount" style="display:<?php echo(($price != $old_price ? 'flex' : 'none'))?>">
                            <span class="icon-discount_label icon"></span>
                            <span><?php _e('Акція', 'beautysystema')?></span>
                        </div>
                    </div>
                    <?php
                    if(check_if_product_in_wishlist($target_product->get_id()) === 'true'){
                        echo '<span class="favorit icon-favorite_icon active"></span>';
                    }else{
                        echo '<span class="favorit icon-favorite_icon"></span>';
                    }
                    ?>
                </div>

                <!-- new tab start -->
                <div class="product-page__content__tab tab2 desktop">    
                    <div class="tab">
                        <button class="tablinks2 active" id="defaultOpen" onclick="openOption2(event, 'delivery')">Доставка</button>
                        <button class="tablinks2" onclick="openOption2(event, 'payment')">Оплата</button>
                        <button class="tablinks2" onclick="openOption2(event, 'certificates')">Сертифікати</button>
                    </div>
                    <div id="delivery" class="tabcontent2 delivery" style="display: block;">
                        <p>
                            Ми довіряємо доставку нашої продукції тільки компанії «Нова пошта». Ми надішлемо номер декларації на зазначену
                            вами
                            електронну адресу в день відправки. З актуальним переліком міст, вартістю послуг і термінами доставки ви завжди
                            можете ознайомитися на сайті компанії: www.novaposhta.ua. Вартість пересилки сплачує отримувач за тарифами
                            «Нової
                            пошти» від 30 грн. При замовленні від 4000 грн і 100% передоплати ми раді будемо доставити посилку за свій
                            рахунок!*
                        </p>
                        <p class="notification">* Зверніть увагу, дана акція не дійсна при використанні накопичувальної знижки, наявності у
                            замовленні товару зі знижкою або купона на знижку!</p>
                    </div>
                    <div id="payment" class="tabcontent2">
                        <p>
                            Ми довіряємо доставку нашої продукції тільки компанії «Нова пошта». Ми надішлемо номер декларації на зазначену
                            вами
                            
                        </p>
                        <p class="notification">* Зверніть увагу, дана акція не дійсна при використанні накопичувальної знижки, наявності у
                            замовленні товару зі знижкою або купона на знижку!</p>
                    </div>
                    <div id="certificates" class="tabcontent2 reviews">
                        <p>
                            Ми довіряємо доставку нашої продукції тільки компанії «Нова пошта». Ми надішлемо номер декларації на зазначену
                            вами
                            електронну адресу в день відправки. З актуальним переліком міст, вартістю послуг і термінами доставки ви завжди
                            можете ознайомитися на сайті компанії: www.novaposhta.ua. Вартість пересилки сплачує отримувач за тарифами
                            «Нової
                            електронну адресу в день відправки. З актуальним переліком міст, вартістю послуг і термінами доставки ви завжди
                            можете ознайомитися на сайті компанії: www.novaposhta.ua. Вартість пересилки сплачує отримувач за тарифами
                            «Нової
                            пошти» від 30 грн. При замовленні від 4000 грн і 100% передоплати ми раді будемо доставити посилку за свій
                            рахунок!*
                        </p>
                        <p class="notification">* Зверніть увагу, дана акція не дійсна при використанні накопичувальної знижки, наявності у
                            замовленні товару зі знижкою або купона на знижку!</p>
                    </div>
                </div>
                <!-- new tab end -->

            </div>
            <div class="product-page__content__right">
                <div class="product-page__content__title">
                    <?php
                    $attributes = $product->get_attributes();
                    $this_terms;
                    $id_brand;
                    $name_brand;
                    if (isset($attributes[get_field('klyuch_brenda', 'setting_site')])) {
                        $brand_attribute = $attributes[get_field('klyuch_brenda', 'setting_site')];
                    
                        if ($brand_attribute->is_taxonomy()) {
                            $this_terms = wp_get_post_terms($product->get_id(), get_field('klyuch_brenda', 'setting_site'));
                            $id_brand = $this_terms[0]->term_id;
                            $name_brand = $this_terms[0]->name;
                        }
                    }
                    ?>
                    <span><a href="<?php echo esc_url(get_tag_link($id_brand, 'id'))?>"><?php echo esc_html($name_brand);?></a></span>
                    <span class="product-status">
                        <?php
                        if($is_stock){
                            _e('В наявності', 'beautysystema');
                        }else{
                            _e('Немає в наявності', 'beautysystema');
                        }
                        ?>
                    </span>
                </div>
                <h1 class="product__card__info__name"><?php echo esc_html($title_product);?></h1>
                <div class="product__card__info__reviews">
                    <?php
                        for ($i = 1; $i <= 5; $i++) {
                            if ($i <= $rounded_rating) {
                                echo '<div class="product__card__info__reviews-satr"></div>';
                            } else {
                                echo '<div class="product__card__info__reviews-satr light-star"></div>';
                            }
                        }
                    ?>
                </div>
                <?php
                if($product->has_child()){
                    echo('<select class="product__card__info__variants option_product">');
                    $variations = $product->get_available_variations();
                    
                    foreach ($variations as $variation) {
                        $v_prod = wc_get_product($variation['variation_id']);
                        $attributes = $v_prod->get_variation_attributes();
                        $image_id = get_post_thumbnail_id($variation['variation_id']);
                        $image_url_var = wp_get_attachment_url($image_id);
                        $is_stock = $v_prod->is_in_stock();
                        $is_sale = $v_prod->is_on_sale();
                        $price = $v_prod->get_price();
                        $old_price = $v_prod->get_regular_price();
                        $title_v_prod = explode(' - ', $v_prod->get_name());
                        $display_v_price = ($price != $old_price) ? $price . '₴' : $old_price . '₴';
                        $display_v_old_price = ($price != $old_price) ? $old_price . '₴' : '';

                        $attr_value = '';

                        foreach($attributes as $key=>$value){
                            $attr_value = $value;
                        }

                        ?>
                        <option data-permalink="<?php echo get_permalink($variation['variation_id'])?>" value="<?php echo $attr_value?>" class="product__card__info__variants-option" data-favorit="<?php echo check_if_product_in_wishlist($variation['variation_id'])?>" data-stock="<?php echo ($is_stock ? "true" : "false")?>" data-sale="<?php echo($is_sale)?>" data-img="<?php echo($image_url_var)?>" data-price="<?php echo($display_v_price)?>" data-oldPrice="<?php echo($display_v_old_price)?>" data-nameProd="<?php echo esc_html($v_prod->get_name())?>" data-idProd="<?php echo($v_prod->get_id())?>">
                            <?php echo esc_html($title_v_prod[1]) ?>
                        </option>
                        <?php
                    }
                    echo('</select>');
                }
                
                
                ?>
                <div class="product-page__content__price-block">
                    <div class="product__card__info__price">
                        <p class="old-price"><?php echo($display_old_price)?></p>
                        <p class="price"><?php echo($display_price)?></p>
                    </div>
                    <div class="product-page__content__buttons-block">
                        <div class="block_instock <?php echo ($stock_display ? "active_stock" : "") ?>">
                                <div class="product__card__info__buy-button">
                                    <span><?php _e('Додати до кошика', 'beautysystema')?></span>
                                    <span class="icon-right-arrow"></span>
                                </div>
                            <div class="product__card__info__button one-click-button">
                                <span><?php _e('Купити в один клік', 'beautysystema')?></span>
                                <span class="icon-arrow-pointer-solid"></span>
                            </div>
                            <?php
                                if(get_field('chat_btn_link_accaunt', 'setting_site')){
                                    ?>
                                    <a href="https://t.me/<?php the_field('chat_btn_link_accaunt','setting_site')?>" rel="nofollow" target="_blank" class="product__card__info__button">
                                        <span data-v-20155618="" class="ui-button-item__prepend">
                                            <svg data-v-0d53d8a4="" data-v-69b0227f="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16.35" width="22" height="16.35" fill="#4B6D74" class="ui-button-icon ui-icon dark" data-v-20155618="">
                                                <path d="M4.81 9.79l-2.1 2.1-.07.11v-.11-2.05c0-.08 0-.1-.1-.1h-.79a.89.89 0 01-.9-.9v-7a.92.92 0 010-.22.89.89 0 01.9-.77H13.2a.89.89 0 01.9.9v.92h.85v-1a1.29 1.29 0 000-.23A1.77 1.77 0 0013.18 0H1.76a1.86 1.86 0 00-.66.12A1.75 1.75 0 000 1.7v7.14A1.57 1.57 0 000 9a1.74 1.74 0 001.64 1.5c.08 0 .1 0 .1.1v1.32a.84.84 0 00.36.7.86.86 0 001.13-.1l1.93-1.93a.29.29 0 01.13-.08v-.82h-.24a.3.3 0 00-.24.1z">
                                                </path>
                                                <path d="M22 5.22A1.41 1.41 0 0022 5a1.74 1.74 0 00-1.71-1.49H8a2.11 2.11 0 00-.35 0 1.75 1.75 0 00-1.44 1.7V12.32a1.49 1.49 0 00.15.68 1.7 1.7 0 001.61 1h8.69a.24.24 0 01.18.08L18 15.36l.77.77a.81.81 0 00.57.23.87.87 0 00.88-.87v-1.32c0-.06 0-.09.08-.1a1.68 1.68 0 001-.36 1.65 1.65 0 00.7-1.34V5.22zm-.85 7.13a.87.87 0 01-.79.86h-.87c-.08 0-.1 0-.1.11v2.11l-.09-.08-2.13-2.05a.24.24 0 00-.18-.08H8a.92.92 0 01-.84-.45.83.83 0 01-.16-.43V5.26a.88.88 0 01.83-.88h12.3a1 1 0 01.77.3.84.84 0 01.23.57q.02 3.55.02 7.1z">
                                                </path>
                                                <path d="M16.34 7.07a1.92 1.92 0 00-2.24-.21 1.93 1.93 0 00-2.24.21 1.62 1.62 0 00-.54 1.18 1.66 1.66 0 00.54 1.23l1.81 1.65a.63.63 0 00.86 0l1.86-1.69a1.6 1.6 0 000-2.37zM16 8.27a.79.79 0 01-.26.59l-1.64 1.51-1.68-1.54a.77.77 0 01-.24-.57.78.78 0 01.27-.56 1 1 0 011.38 0l.27.3.29-.26a1 1 0 011.38 0 .78.78 0 01.23.53z">
                                                </path>
                                            </svg>
                                        </span>
                                        <span data-v-20155618="" data-v-69b0227f=""><?php _e('Отримати консультацію', 'beautysystema')?></span> 
                                    </a>
                                <?php
                                }
                                 ?>
                        </div>
                        <div class="block_outstock <?php echo ($stock_display ? "" : "active_stock") ?>">
                            <a rel="nofollow" href="https://t.me/<?php the_field('chat_btn_link_accaunt','setting_site')?>" target="_blank" class="product__card__info__button">
                                <span data-v-20155618="" class="ui-button-item__prepend">
                                    <svg data-v-0d53d8a4="" data-v-69b0227f="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16.35" width="22" height="16.35" fill="#4B6D74" class="ui-button-icon ui-icon dark" data-v-20155618="">
                                        <path d="M4.81 9.79l-2.1 2.1-.07.11v-.11-2.05c0-.08 0-.1-.1-.1h-.79a.89.89 0 01-.9-.9v-7a.92.92 0 010-.22.89.89 0 01.9-.77H13.2a.89.89 0 01.9.9v.92h.85v-1a1.29 1.29 0 000-.23A1.77 1.77 0 0013.18 0H1.76a1.86 1.86 0 00-.66.12A1.75 1.75 0 000 1.7v7.14A1.57 1.57 0 000 9a1.74 1.74 0 001.64 1.5c.08 0 .1 0 .1.1v1.32a.84.84 0 00.36.7.86.86 0 001.13-.1l1.93-1.93a.29.29 0 01.13-.08v-.82h-.24a.3.3 0 00-.24.1z">
                                        </path>
                                        <path d="M22 5.22A1.41 1.41 0 0022 5a1.74 1.74 0 00-1.71-1.49H8a2.11 2.11 0 00-.35 0 1.75 1.75 0 00-1.44 1.7V12.32a1.49 1.49 0 00.15.68 1.7 1.7 0 001.61 1h8.69a.24.24 0 01.18.08L18 15.36l.77.77a.81.81 0 00.57.23.87.87 0 00.88-.87v-1.32c0-.06 0-.09.08-.1a1.68 1.68 0 001-.36 1.65 1.65 0 00.7-1.34V5.22zm-.85 7.13a.87.87 0 01-.79.86h-.87c-.08 0-.1 0-.1.11v2.11l-.09-.08-2.13-2.05a.24.24 0 00-.18-.08H8a.92.92 0 01-.84-.45.83.83 0 01-.16-.43V5.26a.88.88 0 01.83-.88h12.3a1 1 0 01.77.3.84.84 0 01.23.57q.02 3.55.02 7.1z">
                                        </path>
                                        <path d="M16.34 7.07a1.92 1.92 0 00-2.24-.21 1.93 1.93 0 00-2.24.21 1.62 1.62 0 00-.54 1.18 1.66 1.66 0 00.54 1.23l1.81 1.65a.63.63 0 00.86 0l1.86-1.69a1.6 1.6 0 000-2.37zM16 8.27a.79.79 0 01-.26.59l-1.64 1.51-1.68-1.54a.77.77 0 01-.24-.57.78.78 0 01.27-.56 1 1 0 011.38 0l.27.3.29-.26a1 1 0 011.38 0 .78.78 0 01.23.53z">
                                        </path>
                                    </svg>
                                </span>
                                <span data-v-20155618="" data-v-69b0227f=""><?php _e('Отримати консультацію', 'beautysystema')?></span> 
                            </a>
                            <form action="" method="post" class="form_alert_stock">
                                <?php
                                if ( is_user_logged_in() ) {
                                    $current_user = wp_get_current_user(); 
                                    $user_email = $current_user->user_email; 
                                    
                                    ?>
                                    <input type="email" name="alert_email" id="alert_email" placeholder="Email address" value="<?php echo($user_email)?>"/>
                                    <?php
                                } else {
                                    ?>
                                    <input type="email" name="alert_email" id="alert_email" placeholder="Email address"/>
                                    <?php
                                }
                                ?>
                                
                                <input type="hidden" name="alert_id" id="alert_id" value="<?php echo(get_the_ID())?>"/>
                                <input type="submit" value="<?php echo(get_option('instock_email_option_submit'))?>" class="submit_alert_stock" />
                            </form>
                        </div>
                    </div>
                </div>
                <div class="product-page__content__tab">
                    <div class="tab">
                        <button class="tablinks active" id="defaultOpen" onclick="openOption(event, 'description')"><?php _e('Опис', 'beautysystema')?></button>
                        <button class="tablinks" onclick="openOption(event, 'characteristics')"><?php _e('Характеристики', 'beautysystema')?></button>
                        <button class="tablinks" onclick="openOption(event, 'reviews')"><?php _e('Відгуки', 'beautysystema')?> <span class="reviews-count">(<?php echo(get_comments_number())?>)</span></button>
                        <button class="tablinks" onclick="openOption(event, 'composition')"><?php _e('Склад', 'beautysystema')?></button>
                    </div>
                    <div id="description" class="tabcontent description" style="display: block;" >
                    <?php the_content()?>
                    </div>
                
                    <div id="characteristics" class="tabcontent">
                        <div class="characteristics__container">
                                <?php
                                $attrs = $product->get_attributes();

                                
                                foreach ($attrs as $attr_name => $attr) {
                                    $attributes_array = [];
                                    $term_names = array();
                                
                                    if ($terms = wc_get_product_terms($product->get_id(), $attr_name)) {
                                        foreach ($terms as $term) {
                                            $term_names[] = $term->name;
                                            $attributes_array[] = [str_replace('pa_', '', $attr_name), $term->slug, $term->name, $term->term_id];
                                        }
                                    }
                                
                                    $term_list = implode(', ', $term_names);

                                    
                                
                                    echo "<div class='characteristics__item'>";
                                    echo "<span class='characteristics__name'>" . wc_attribute_label($attr_name) . "</span>";
                                    echo "<span class='characteristics__value'>";
                                    $last_index = count($attributes_array) - 1;


                                    foreach ($attributes_array as $index => $item_attr) {
                                        if ($index < $last_index) {
                                            echo "<a href=". get_tag_link( $item_attr[3]) .">" . $item_attr[2] . "</a>,";
                                        } else {
                                            echo "<a href=". get_tag_link( $item_attr[3]) .">" . $item_attr[2] . "</a>";
                                        }
                                    }

                                    echo "</span>";
                                    echo "</div>";
                                }                                                       
                                ?>
                        </div>
                    </div>
                
                    <div id="reviews" class="tabcontent reviews">
                    <?php
                        echo(do_shortcode("[cusrev_all_reviews sort='DESC' sort_by='date' per_page='10' number='-1' show_summary_bar='false'  products='{$product->get_ID()}' show_more='5' min_chars='0' users='all' add_review='true']"));
                    ?>
                    </div>
                    <div id="composition" class="tabcontent composition">
                        <p><?php echo esc_html(get_field('sklad_tovaru'))?></p>
                        <?php
                        if(get_field('text_notification_condition', 'setting_site')){
                           ?>
                           <p class="notification"><?php echo(get_field('text_notification_condition', 'setting_site'))?></p>
                           <?php 
                        }
                        ?>
                    </div>
                </div>
                <div class="product-page__accordion">
                    <div class="accordion__item border">
                        <div class="accordion__title accordion-active">
                            <span class="accordion__title-text"><?php _e('Опис', 'beautysystema')?></span>
                            <div class="accordion__arrow minus"></div>
                        </div>
                        <div class="accordion__content description" style= "display:block">
                            <div class="description-hide-text">
                                <div><?php the_content();?></div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion__item">
                        <div class="accordion__title">
                            <span class="accordion__title-text"><?php _e('Характеристики', 'beautysystema')?></span>
                            <div class="accordion__arrow"></div>
                        </div>
                        <div class="accordion__content">
                            <div class="characteristics__container">
                            <?php
                                $attrs = $product->get_attributes();
                                
                                
                                foreach ($attrs as $attr_name => $attr) {
                                    $attributes_array = [];
                                    $term_names = array();
                                
                                    if ($terms = wc_get_product_terms($product->get_id(), $attr_name)) {
                                        foreach ($terms as $term) {
                                            $term_names[] = $term->name;
                                            $attributes_array[] = [str_replace('pa_', '', $attr_name), $term->slug, $term->name, $term->term_id];
                                        }
                                    }
                                
                                    $term_list = implode(', ', $term_names);

                                    
                                
                                    echo "<div class='characteristics__item'>";
                                    echo "<span class='characteristics__name'>" . wc_attribute_label($attr_name) . "</span>";
                                    echo "<span class='characteristics__value'>";
                                    $last_index = count($attributes_array) - 1;


                                    foreach ($attributes_array as $index => $item_attr) {
                                        if ($index < $last_index) {
                                            echo "<a href=". get_tag_link( $item_attr[3]) .">" . $item_attr[2] . "</a>,";
                                        } else {
                                            echo "<a href=". get_tag_link( $item_attr[3]) .">" . $item_attr[2] . "</a>";
                                        }
                                    }

                                    echo "</span>";
                                    echo "</div>";
                                }                                                                                           
                                ?>
                            </div>
                        </div>
                    </div>
                    <div class="accordion__item">
                        <div class="accordion__title">
                            <span class="accordion__title-text"><?php _e('Відгуки', 'beautysystema')?> <span class="reviews-count">(<?php echo(get_comments_number())?>)</span></span>
                            <div class="accordion__arrow"></div>
                        </div>
                        <div class="accordion__content reviews">
                        <?php
                            echo(do_shortcode("[cusrev_all_reviews sort='DESC' sort_by='date' per_page='10' number='-1' show_summary_bar='false'  products='{$product->get_ID()}' show_more='5' min_chars='0' users='all' add_review='true']"));
                            ?>
                        </div>
                    </div>
                    <div class="accordion__item">
                        <div class="accordion__title">
                            <span class="accordion__title-text"><?php _e('Склад', 'beautysystema')?></span>
                            <div class="accordion__arrow"></div>
                        </div>
                        <div class="accordion__content composition">
                            <p><?php echo esc_html(get_field('sklad_tovaru'))?></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- new tab for tablet start -->
        <div class="product-page__content__tab tab2 tablet container">
            <div class="tab">
                <button class="tablinks2 active" id="defaultOpen" onclick="openOption2(event, 'delivery')">Доставка</button>
                <button class="tablinks2" onclick="openOption2(event, 'payment')">Оплата</button>
                <button class="tablinks2" onclick="openOption2(event, 'certificates')">Сертифікати</button>
            </div>

            <div id="delivery" class="tabcontent2 delivery" style="display: block;">
                <p>
                    Ми довіряємо доставку нашої продукції тільки компанії «Нова пошта». Ми надішлемо номер декларації на зазначену
                    вами
                    електронну адресу в день відправки. З актуальним переліком міст, вартістю послуг і термінами доставки ви завжди
                    можете ознайомитися на сайті компанії: www.novaposhta.ua. Вартість пересилки сплачує отримувач за тарифами
                    «Нової
                    пошти» від 30 грн. При замовленні від 4000 грн і 100% передоплати ми раді будемо доставити посилку за свій
                    рахунок!*
                </p>
                <p class="notification">* Зверніть увагу, дана акція не дійсна при використанні накопичувальної знижки, наявності у
                    замовленні товару зі знижкою або купона на знижку!</p>
            </div>

            <div id="payment" class="tabcontent2">
                <p>
                    Ми довіряємо доставку нашої продукції тільки компанії «Нова пошта». Ми надішлемо номер декларації на зазначену
                    вами
                    
                </p>
                <p class="notification">* Зверніть увагу, дана акція не дійсна при використанні накопичувальної знижки, наявності у
                    замовленні товару зі знижкою або купона на знижку!</p>
            </div>
        
            <div id="certificates" class="tabcontent2 reviews">
                <p>
                    Ми довіряємо доставку нашої продукції тільки компанії «Нова пошта». Ми надішлемо номер декларації на зазначену
                    вами
                    електронну адресу в день відправки. З актуальним переліком міст, вартістю послуг і термінами доставки ви завжди
                    можете ознайомитися на сайті компанії: www.novaposhta.ua. Вартість пересилки сплачує отримувач за тарифами
                    «Нової
                    електронну адресу в день відправки. З актуальним переліком міст, вартістю послуг і термінами доставки ви завжди
                    можете ознайомитися на сайті компанії: www.novaposhta.ua. Вартість пересилки сплачує отримувач за тарифами
                    «Нової
                    пошти» від 30 грн. При замовленні від 4000 грн і 100% передоплати ми раді будемо доставити посилку за свій
                    рахунок!*
                </p>
                <p class="notification">* Зверніть увагу, дана акція не дійсна при використанні накопичувальної знижки, наявності у
                    замовленні товару зі знижкою або купона на знижку!</p>
            </div>
        </div>
        <!-- new tab for tablet end -->

        <!-- new tab for mobile start -->
        <div class="product-page__accordion tab2-mobile container">
            <div class="accordion__item">
                <div class="accordion__title">
                    <span class="accordion__title-text">Доставка</span>
                    <div class="accordion__arrow"></div>
                </div>
                <div class="accordion__content">
                    <p>
                        Ми довіряємо доставку нашої продукції тільки компанії «Нова пошта». Ми надішлемо номер декларації на зазначену
                        вами
                        електронну адресу в день відправки. З актуальним переліком міст, вартістю послуг і термінами доставки ви завжди
                        можете ознайомитися на сайті компанії: www.novaposhta.ua. Вартість пересилки сплачує отримувач за тарифами
                        «Нової
                        пошти» від 30 грн. При замовленні від 4000 грн і 100% передоплати ми раді будемо доставити посилку за свій
                        рахунок!*
                    </p>
                    <p class="notification">* Зверніть увагу, дана акція не дійсна при використанні накопичувальної знижки, наявності у
                        замовленні товару зі знижкою або купона на знижку!</p>
                </div>
            </div>
            <div class="accordion__item">
                <div class="accordion__title">
                    <span class="accordion__title-text">Оплата</span>
                    <div class="accordion__arrow"></div>
                </div>
                <div class="accordion__content">
                    <p>
                        Ми довіряємо доставку нашої продукції тільки компанії «Нова пошта». Ми надішлемо номер декларації на зазначену
                        вами
                        електронну адресу в день відправки. З актуальним переліком міст, вартістю послуг і термінами доставки ви завжди
                        можете ознайомитися на сайті компанії: www.novaposhta.ua. Вартість пересилки сплачує отримувач за тарифами
                        «Нової
                        пошти» від 30 грн. При замовленні від 4000 грн і 100% передоплати ми раді будемо доставити посилку за свій
                        рахунок!*
                    </p>
                    <p class="notification">* Зверніть увагу, дана акція не дійсна при використанні накопичувальної знижки, наявності у
                        замовленні товару зі знижкою або купона на знижку!</p>
                </div>
            </div>
            <div class="accordion__item">
                <div class="accordion__title">
                    <span class="accordion__title-text">Сертифікати</span>
                    <div class="accordion__arrow"></div>
                </div>
                <div class="accordion__content">
                    <p>
                        Ми довіряємо доставку нашої продукції тільки компанії «Нова пошта». Ми надішлемо номер декларації на зазначену
                        вами
                        електронну адресу в день відправки. З актуальним переліком міст, вартістю послуг і термінами доставки ви завжди
                        можете ознайомитися на сайті компанії: www.novaposhta.ua. Вартість пересилки сплачує отримувач за тарифами
                        «Нової
                        пошти» від 30 грн. При замовленні від 4000 грн і 100% передоплати ми раді будемо доставити посилку за свій
                        рахунок!*
                    </p>
                    <p class="notification">* Зверніть увагу, дана акція не дійсна при використанні накопичувальної знижки, наявності у
                        замовленні товару зі знижкою або купона на знижку!</p>
                </div>
            </div>
        </div>
        <!-- new tab for mobile end -->


        
        <div class="block block_popular margin-bottom container">
            <div class="block_new__title container">
                <?php
                $get_category_product = wp_get_post_terms(get_the_ID(), 'product_cat');
                $product_categories = end($get_category_product);
                $category_link = get_term_link($product_categories->term_id, 'product_cat');
                ?>
                <h2 class="title"><?php _e('З цим товаром купують', 'beautysystema')?></h2>
                <a class="custom-button" href="<?php echo($category_link)?>">
                    <span><?php _e('Всі засоби категорії', 'beautysystema')?></span>
                    <div class="custom-button__arrow">
                        <img src="<?php echo(get_template_directory_uri())?>/img/button_ellipse.svg" alt="img" width="58" height="58">
                    </div>
                </a>
            </div>
            <div class="slider-popular">
                <div class="popular-carousel owl-carousel owl-theme">
                <?php 
                function is_product_in_stock($array){
                    $temp = array();
                    foreach($array as $id){
                        $product = wc_get_product($id);

                        if($product->is_in_stock()){
                            array_push($temp, $id);
                        }
                    }
                    return $temp;
                }

                $listing_product = wc_get_related_products($the_id, 20);

                $fin_list = is_product_in_stock($listing_product);
                

                foreach($fin_list as $product_index){
                    set_query_var( 'id_index_product', $product_index);
                    get_template_part('template-parts/product', 'index');
                }
                ?>  
                </div>
            </div>
        </div> 
        <?php
        if(!empty(get_recently_viewed_products())){
            require_once('module/viewed_products.php');
        }
        
        require_once('module/module_advantages.php');
        ?>
        
        <!-- добавить отображение instagram -->

        <!-- <div class="block margin-bottom container">
            <h2 class="title">Слідкуйте за нами в Instagram</h2>
            <div class="slider-insta">
                <div class="insta-carousel owl-carousel owl-theme">
                    <div class="item">
                        <a href="#"><img src="./img/insta_1.png" alt=""></a>
                    </div>
                    <div class="item">
                        <a href="#"><img src="./img/insta_2.png" alt=""></a>
                        </div>
                        <div class="item">
                        <a href="#"><img src="./img/insta_3.png" alt=""></a>
                        </div>
                        <div class="item">
                        <a href="#"><img src="./img/insta_4.png" alt=""></a>
                        </div>
                </div>
            </div>
            <a class="custom-button" href="#">
                <span>Підписатись</span>
                <div class="custom-button__arrow">
                    <img src="./img/button_ellipse.svg" alt="img" width="58" height="58">
                </div>
            </a>
        </div> -->
    </div>
</main>
<div class="order_form_popup">
    <div class="order_form_popup-dialog">
        <div class="order_form_popup-content">
            <div class="order_form_popup-header">
                <img class="close_popup" src="<?php echo(get_template_directory_uri())?>/img/close_popup.svg" alt="x">
                <h2 class="title"><?php _e('Оформити замовлення', 'beautysystema')?></h2>
            </div>
            <div class="order_form_popup-body">
                <form class="order__form">
                    <input type="text" name="user_last_name" placeholder="<?php _e('Прізвище', 'beautysystema')?>">
                    <input type="text" name="user_name" placeholder="<?php _e('Ім\'я', 'beautysystema')?>">
                    <input type="phone" name="user_phone" placeholder="+ 38 (_ _ _) _ _ _ - _ _ - _ _" maxlength="13">
                    <select name="user_select_messenger" class="">
                        <option value="null" disabled selected><?php _e('Зв\'язок через ?', 'beautysystema')?></option>
                        <option value="telegram">Telegram</option>
                        <option value="viber">Viber</option>
                    </select>
                    <button id="send_order_bot" class="custom-button"><?php _e('Відправити', 'beautysystema')?></button>
                </form>
            </div>
        </div>
    </div>
</div>
<?php get_footer(); ?>