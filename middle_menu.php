<?php
function generate_middle_menu() {
    $menu_location = 'header_menu_current_list';
    $locations = get_nav_menu_locations();
    $menu_object = isset($locations[$menu_location]) ? wp_get_nav_menu_object($locations[$menu_location]) : null;
    $menu_items = $menu_object ? wp_get_nav_menu_items($menu_object->term_id) : array();
    $menu_array = array();

    $build_menu_array = function ($menu_items, &$menu_array, $parent_id = 0) use (&$build_menu_array) {
        foreach ($menu_items as $menu_item) {
            if ($menu_item->menu_item_parent == $parent_id) {
                $image_id = get_post_meta($menu_item->ID, '_menu_item_image', true);
                $image_url = wp_get_attachment_image_url($image_id, 'full');

                $menu_item_data = array(
                    'link' => $menu_item->url,
                    'name' => $menu_item->title,
                    'image' => $image_url,
                    'child_cat' => array()
                );

                $build_menu_array($menu_items, $menu_item_data['child_cat'], $menu_item->ID);
                $menu_array[] = $menu_item_data;
            }
        }
    };

    $build_menu_array($menu_items, $menu_array);

    foreach ($menu_array as $h_cat) {
        ?>
        <li class="header__nav-link">
            <a <?php echo empty($h_cat['child_cat']) ? '' : "class='dropdown-link hover-dropdown'"; ?>
               <?php echo empty($h_cat['child_cat']) ? 'href="' .$h_cat['link']. '"' : ''  ?>">
                <span><?= $h_cat['name'] ?></span>
                <?php if (!empty($h_cat['child_cat'])): ?>
                    <span class="icon-arrow_down arrow_down"></span>
                <?php endif; ?>
            </a>
            <?php if (!empty($h_cat['child_cat'])): ?>
                <div class="header__submenu__list">
                    <ul>
                        <li>
                            <a href="<?= $h_cat['link'] ?>"><span><?php _e('Усі засоби', 'beautysystema')?></span>
                                <span class="icon-arrow_down arrow_down submenu__arrow"></span>
                            </a>
                        </li>
                        <?php foreach ($h_cat['child_cat'] as $child_cat): ?>
                            <li class="<?= $child_cat['child_cat'] ? 'has-submenu' : ''; ?>">
                                <a href="<?= $child_cat['link'] ?>"><span><?= $child_cat['name'] ?></span>
                                    <span class="icon-arrow_down arrow_down submenu__arrow"></span>
                                </a>
                                <?php if ($child_cat['child_cat']): ?>
                                    <ul class="header__second-submenu__list">
                                        <?php foreach ($child_cat['child_cat'] as $ch_list): ?>
                                            <li><a href="<?= $ch_list['link'] ?>"><?= $ch_list['name'] ?></a></li>
                                        <?php endforeach; ?>
                                    </ul>
                                <?php endif; ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                    <img src="<?= $h_cat['image'] ?>" alt="<?= $h_cat['name'] ?>">
                </div>
            <?php endif; ?>
        </li>
        <?php
    }
}

generate_middle_menu();
?>
