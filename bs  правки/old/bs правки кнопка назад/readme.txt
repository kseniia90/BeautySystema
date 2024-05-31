в .header__main-left .header__main__list додати  li.header__main__list__item:

 <li class="header__main__list__item">
    <a href="#" class="back_pg-btn"><span class="icon-right-arrow"></span></a>
</li>

Результат має бути таким:

<div class="header__main-left">
    <ul class="header__main__list">
        <li class="header__main__list__item">
            <a href="#" class="back_pg-btn"><span class="icon-right-arrow"></span></a>
        </li>
        <li class="header__main__list__item">
            <a href="#"><span class="icon-user_icon"></span></a>
        </li>
        <li class="header__main__list__item">
            <a href="#">
                <span class="icon-favorite_icon"></span>
                <div class="header__counter favorite__counter">
                    <span class="header__counter__value favorite__counter__value">3</span>
                </div>
            </a>
        </li>
    </ul>
</div>

