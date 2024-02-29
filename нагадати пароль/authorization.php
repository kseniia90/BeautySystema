 <!-- authorization popup -->
 <div class="authorization-popup">
    <div class="authorization-popup-dialog">
        <div class="authorization-popup-content">
            <div class="authorization-popup-body">
                <!-- Tab links -->
            <div class="tab">
                <button class="tablinks active" onclick="openOption(event, 'sign-in')"><?php _e('Вхід', 'beautysystema')?></button>
                <button class="tablinks" onclick="openOption(event, 'sign-up')"><?php _e('Реєстрація', 'beautysystema')?></button>
            </div>

            <!-- Tab content -->
            <div id="sign-in" class="tabcontent" style="display: block;" >
                <div class="sign-in__content">
                    <form class="contacts__form">
                        <div class="contacts__form__input-block">
                            <p class="contacts__form__lable"><?php _e('E-mail/Login', 'beautysystema')?></p>
                            <input type="email" name="user_email">
                        </div>
                        <div class="contacts__form__input-block">
                            <p class="contacts__form__lable"><?php _e('Пароль', 'beautysystema')?></p>
                            <input type="password" name="user_password">
                        </div>
                        <div class="input-row links">
                            <div class="auth-link forget-password-btn"><?php _e('Забули пароль?', 'beautysystema')?></div>
                        </div>
                        <button id="login_site" class="contacts__form__btn product__card__info__button"><?php _e('Вхід', 'beautysystema')?></button>
                    </form>
                    <a href="<?php echo home_url();?>" class="auth-link">
                        <svg width="23" height="10" viewBox="0 0 23 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23 5H1M1 5L7.06897 9.5M1 5L7.06897 0.5" stroke="#4B6D74" />
                        </svg>
                        <span><?php _e('Повернутись до сайту', 'beautysystema')?></span>
                    </a>
                </div>
            </div>

            <!-- Відновлення паролю -->
            <div class="remind-password__content">
                <h3>Відновлення паролю</h3>
                <form class="contacts__form">
                    <div class="contacts__form__input-block">
                        <p class="contacts__form__lable">E-mail</p>
                        <input type="email" name="user_email">
                    </div>
                    <button class="contacts__form__btn product__card__info__button">Нагадати</button>
                </form>
            </div>
        
            <div id="sign-up" class="tabcontent">
                <form class="contacts__form">
                    <div class="contacts__form__input-block">
                        <p class="contacts__form__lable"><?php _e('Ім’я', 'beautysystema')?></p>
                        <input type="text" name="user_name">
                    </div>
                    <div class="contacts__form__input-block">
                        <p class="contacts__form__lable"><?php _e('Номер телефону', 'beautysystema')?></p>
                        <input type="phone" name="user_phone" maxlength="13" value="+380">
                    </div>
                    <div class="contacts__form__input-block">
                        <p class="contacts__form__lable"><?php _e('E-mail', 'beautysystema')?></p>
                        <input type="email" name="user_email">
                    </div>
                    <div class="contacts__form__input-block">
                        <p class="contacts__form__lable"><?php _e('Пароль', 'beautysystema')?></p>
                        <input type="password" name="user_password">
                    </div>
                    <div class="contacts__form__input-block">
                        <p class="contacts__form__lable"><?php _e('Повторіть пароль', 'beautysystema')?></p>
                        <input type="password" name="user_password_repeat">
                    </div>
                    <label class="contacts__form__checkbox">
                        <input id="polise_checkbox" type="checkbox">
                        <p><?php _e('Натискаючи Ви погоджуєтесь з правилами нашої', 'beautysystema')?> <a href="#" target="_blank"><?php _e('політики конфіденційності', 'beautysystema')?></a></p>
                    </label>
                    <button id="registr_site" class="contacts__form__btn product__card__info__button"><?php _e('Зареєструватися', 'beautysystema')?></button>
                </form>
                <a href="<?php echo home_url();?>" class="auth-link">
                    <svg width="23" height="10" viewBox="0 0 23 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 5H1M1 5L7.06897 9.5M1 5L7.06897 0.5" stroke="#4B6D74" />
                    </svg>
                    <span><?php _e('Повернутись до сайту', 'beautysystema')?></span>
                </a>
            </div>
            </div>
        </div>
    </div>
</div>