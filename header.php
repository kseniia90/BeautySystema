<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package beautysystema
 */
$logo_url = wp_get_attachment_url(get_theme_mod('custom_logo'));
require_once('module/top_menu.php');
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body>
<div class="wrapper">
<header class="header">
    <div class="header-container container">
        <div class="header__main">
            <div class="header__main-left">
                <ul class="header__main__list">
                    <li class="header__main__list__item">
                        <?php
							if(is_user_logged_in()){
								?>
								<a href="<?php the_field('page_user', 'setting_site')?>"><span class="icon-user_icon authorized"></span></a>
								<?php
							}else{
								?>
								<a data-login="false"><span class="icon-user_icon"></span></a>
								<?php
							}
                        ?>
                    </li>
                    <li class="header__main__list__item">
                        <a href="<?php the_field('page_favorit', 'setting_site')?>">
                            <span class="icon-favorite_icon"></span>
                            <div class="header__counter favorite__counter">
                                <span class="header__counter__value favorite__counter__value"><?php echo(YITH_WCWL()->count_products())?></span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="consultation-tg-link">
                <a target="_blank" href="https://t.me/<?php the_field('chat_btn_link_accaunt','setting_site')?>">
                    <span class="icon-contacts_tg" style="font-size: 18px;"></span>
                    <span><?php _e('Консультація телеграм', 'beautysystema')?></span>
                </a>
            </div>
            <div class="header__main__logo">
                <a class="header__main-logo" href="<?= home_url();?>"><img src="<?= $logo_url?>" alt="<?= get_bloginfo('name')?>"></a>
            </div>
            <div class="header__main-right">
                <nav class="header__main__nav">
                    <?php generate_top_menu();?>
                </nav>
                <ul class="header__main__list">
                    <li class="header__main__list__item hide-on-mobile">
                        <a href="<?php the_field('page_favorit', 'setting_site')?>">
                            <span class="icon-favorite_icon"></span>
                            <div class="header__counter favorite__counter">
                                <span class="header__counter__value favorite__counter__value"><?php echo(YITH_WCWL()->count_products())?></span>
                            </div>
                        </a>
                    </li>
                    <li class="header__main__list__item hide-on-mobile">
                        <?php
							if(is_user_logged_in()){
								?>
								<a href="<?php the_field('page_user', 'setting_site')?>"><span class="icon-user_icon authorized"></span></a>
								<?php
							}else{
								?>
								<a data-login="false"><span class="icon-user_icon"></span></a>
								<?php
							}
                        ?>
                    </li>
                    <li class="header__main__list__item">
                        <a href="<?php the_field('page_cart', 'setting_site')?>">
                            <span class="icon-shopping_cart_icon"></span>
                            <div class="header__counter shopping_cart__counter">
                                <span class="header__counter__value shopping_cart__counter__value">
                                    <?php
                                    $cart = WC()->cart;
                                    echo($cart->get_cart_contents_count());
                                    ?>
                                </span>
                            </div>
                        </a>
                    </li>
                    <li class="header__main__list__item burger-menu">
                        <div class="burger-menu-btn">
                            <div class="burger-menu__icon">
                                <span></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="header__search-block">
            <div class="header__main__logo">
            <a class="header__main-logo" href="<?= home_url();?>"><img src="<?= $logo_url?>" alt="<?= get_bloginfo('name')?>"></a>
            </div>
            <form action="#" class="header__main-form search-form">
				<input class="header__main-input" id="search_input" type="text" placeholder="<?php _e('Пошук...', 'beautysystema')?>" />
				<button class="header__main-search"><span class="icon-search_icon"></span></button>
				<div class="search-results">
					<div class="search-results__items">
						<div class="search-result-item">
						</div>
					</div>
					<div class="search-results__button">
						<a href="#" id="go_to_search" style="display: none;" class="product__card__info__button"><?php _e('Перейти до пошуку', 'beautysystema')?></ы>
					</div>
				</div>
			</form>
        </div>
        <nav class="header__nav">
            <ul class="header__nav__list">
                <?php require_once('module/middle_menu.php') ?>
            </ul>
            <?php generate_top_menu(); ?>
            <div class="header-contacts">
                <h4><?php _e('Зв’язатись з нами', 'beautysystema')?></h4>
                <a href="tel:<?php the_field('nomer_telefonu', 'setting_site')?>"><?php the_field('nomer_telefonu', 'setting_site')?></a>
                <a href="mailto:<?php the_field('poshta', 'setting_site')?>"><?php the_field('poshta', 'setting_site')?></a>
                <div class="header-social">
                    <a href="<?php the_field('instagram_link', 'setting_site')?>"><img src="<?php echo get_template_directory_uri()?>/img/Instagram_icon.svg" alt="Instagram Beauty Systema"></a>
                    <a href="tel:<?php the_field('nomer_telefonu', 'setting_site')?>"><img src="<?php echo get_template_directory_uri()?>/img/Phone_icon.svg" alt="Phone number Beauty Systema"></a>
                    <a href="mailto:<?php the_field('poshta', 'setting_site')?>"><img src="<?php echo get_template_directory_uri()?>/img/Letter_icon.svg" alt="Mail Beauty Systema"></a>
                </div>
            </div>
            
        </nav>
    </div>
</header>