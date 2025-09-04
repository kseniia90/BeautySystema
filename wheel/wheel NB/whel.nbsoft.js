function sendTelegram(){
    let gift = $('.text_gift').text();
    let name = $('[name="whell_name"]').val();
    let phone = $('[name="whell_phone"]').val();
    let mail = $('[name="whell_mail"]').val();
    let link_user = location.href;
    let lang = $('html').attr('lang');

    if(!phone){
        alert(lang == 'uk' ? 'Введіть номер телефону' : 'Введите номер телефона');
        return false;
    }

    if(phone.length < 10){
        alert(lang == 'uk' ? 'Введіть номер телефону' : 'Введите номер телефона');
        return false;
    }

    if(!name){
        alert(lang == 'uk' ? 'Введіть ім\'я' : 'Введите имя');
        return false;
    }

    if(mail.length >= 1){
        if(!mail.includes('@')){
            alert(lang == 'uk' ? 'Введіть коректно пошту' : 'Введите корректно почту');
            return false;
        }
    }

    let message = `Приз: ${gift}\nІм'я клієнта: ${name}\nНомер телефону: ${phone}\nПошта: ${mail}\nPage: ${link_user}`;

    const TOKEN = 'NzU5ODI4MTQxNzpBQUhHTWhOWjhNdko3dlRkUGZrbWJHOURQSFQ0SFVzZEVxdw==';
    const CHAT_ID = 'LTEwMDIzMzc0OTkzNjM=';
    const url = `https://api.telegram.org/bot${atob(TOKEN)}/sendMessage`;

    $.ajax({
        type: 'POST',
        url: url,
        data: {
            chat_id: atob(CHAT_ID),
            text: message
        },
        success: function(response) {
            $('.three_block_whell').css('display', 'flex');
            $('.two_block_whell').css('display', 'none');
            sessionStorage.setItem('whell', 'true');
        },
        error: function(error) {
            console.error('Ошибка при отправке сообщения:', error);
        }
    });
}

class RENDER_WHELL{
    constructor(setting){
        this.lang = $('html').attr('lang');
        this.prizes = setting.prizes;
        this.title = (this.lang == 'uk') ? setting.text.title_ua : setting.text.title_ru;
        this.description = (this.lang == 'uk') ? setting.text.description_ua : setting.text.description_ru;
        this._render_style();
        this._render_whell(this.prizes);
       
    }


    _render_style(){
        let style = $('<style></style>',{
           html: `
            .body-wheel {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 1000;
    transform: translate(-50%, -50%);
    width: 1200px;
    background: #ffff;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: 320px 20px 20px 320px;
    border: solid 5px #f8b520;
    box-sizing: border-box;
}
.deal-wheel {
    --size: clamp(250px, 500px, 700px);
    --lg-hs: 0 3%;
    --lg-stop: 50%;
    --lg: linear-gradient(hsl(var(--lg-hs) 0%) 0 var(--lg-stop),
            hsl(var(--lg-hs) 20%) var(--lg-stop) 100%);

    position: relative;
    display: grid;
    align-items: center;
    grid-template-areas: "spinner" "trigger";
    font-size: calc(var(--size) / 21);
    line-height: 1;
    width: max-content;

}

.deal-wheel>* {
    grid-area: spinner;
}

.deal-wheel .btn-spin {
    grid-area: trigger;
    justify-self: center;
}

.spinner {
    position: relative;
    display: grid;
    align-items: center;
    grid-template-areas: "spinner";
    width: var(--size);
    height: var(--size);
    transform: rotate(calc(var(--rotate, 25) * 1deg));
    border-radius: 50%;
    box-shadow: inset 0 0 0 calc(var(--size) / 40) hsl(0deg 0% 0% / 0.06);
    border: solid 10px #f8b520;
}

.spinner * {
    grid-area: spinner;
}

.prize {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0px;
    padding-top: 14px;
    width: 50%;
    height: 50%;
    transform-origin: center right;
    transform: rotate(var(--rotate));
    user-select: none;
}

.cap {
    position: relative;
    justify-self: center;
}

.cap select {
    display: none;
}

.cap svg {
    width: 100%;
}

.ticker {
    position: relative;
    left: calc(var(--size) / -15);
    width: calc(var(--size) / 10);
    height: calc(var(--size) / 20);
    background: var(--lg);
    z-index: 1;
    clip-path: polygon(20% 0, 100% 50%, 20% 100%, 0% 50%);
    transform-origin: center left;
}

.btn-spin {
    font-weight: 700;
    text-transform: uppercase;
    color: #fff;
    background: #000;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px solid #f8b520;
    cursor: pointer;
    transition: opacity 200ms ease-out;
    font-size: 15px;
}

.btn-spin:focus {
    outline-offset: 2px;
}

.btn-spin:active {
    transform: translateY(1px);
}

.btn-spin:disabled {
    cursor: progress;
    opacity: 0.55;
}

/* Spinning animation */
.is-spinning .spinner {
    transition: transform 8s cubic-bezier(0.1, -0.01, 0, 1);
}

.is-spinning .ticker {
    animation: tick 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes tick {
    40% {
        transform: rotate(-12deg);
    }
}

/* Selected prize animation */
.prize.selected .text {
    color: white;
    animation: selected 800ms ease;
}

@keyframes selected {
    25% {
        transform: scale(1.25);
        text-shadow: 1vmin 1vmin 0 hsla(0 0% 0% / 0.1);
    }

    40% {
        transform: scale(0.92);
        text-shadow: 0 0 0 hsla(0 0% 0% / 0.2);
    }

    60% {
        transform: scale(1.02);
        text-shadow: 0.5vmin 0.5vmin 0 hsla(0 0% 0% / 0.1);
    }

    75% {
        transform: scale(0.98);
    }

    85% {
        transform: scale(1);
    }
}

/*popup start */

.popup-thanks {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 150;
    background-color: rgba(0, 0, 0, .6);
    transition: opacity 200ms ease-in;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.popup-thanks.active {
    display: block;
}

.popup-dialog {
    position: relative;
    width: 475px;
    min-height: 100vh;
    padding: 10px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-content {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 100%;
    padding: 25px 45px 95px;
    outline: 0;
    border-radius: 12px;
}

.popup-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    position: relative;
    flex: 1 1 auto;
}

.popup__title {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
}

.popup__close-thanks .close-icon {
    display: block;
    width: 30px;
    height: 30px;
    font-size: 30px;
    color: #b2b2b2;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.popup__close-thanks .close-icon:hover {
    color: #1c80c5;
}

.popup__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 40px;
    color: #000;
    font-size: 36px;
    font-weight: 500;
    line-height: 43.88px;
}

.popup__text img {
    width: 100px;
    height: 100px;
}
    
.noto--wrapped-gift {
    display: inline-block;
    width: 1em;
    height: 1em;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23f5b03e' d='M16.4 31.73s-6.45.51-7.31 1.96c-.87 1.45-.92 3.68-.92 6.13c0 2.46-.1 8.1-.1 8.1l1.54 3.31s.29 42.19.29 43.5c0 1.3 0 2.89 1.88 3.9s49.66 24.09 51.15 24.71c2.25.93 3.32.58 3.32.58l53.09-88.79s-.17-2.43-2.38-3.01c-1.27-.32-100.56-.39-100.56-.39'/%3E%3Cpath fill='%23e07f14' d='M65.68 60.92c-.81 2.23-.44 25.29-.3 42.06c.14 16.76-.43 20.23 0 20.81s1.6.02 4.91-1.45c6.15-2.72 35.69-17.34 37.86-18.64s7.47-3.99 8.34-5.44s1.34-14.94 1.63-25.77c.29-10.84.58-19.51.58-19.51l1.3-3.9s-.28-10.54-.33-11.7c-.09-1.92-.3-2.91-.79-2.67c-.7.33-6.54 5.12-22 12.64c-9.71 4.71-30.64 12.03-31.2 13.57'/%3E%3Cpath fill='%23fdd717' d='M65.82 11.21c-4.33-.2-16.18 6.65-27.6 10.4S9.56 32.9 9.41 33.34c-.14.43 6.94 3.6 11.46 5.77c5.37 2.57 25.87 12.28 29.62 13.87c3.76 1.59 12.72 5.31 14.16 5.2c2.02-.14 21.1-7.66 30.78-12.28s21.78-11.78 21.94-13.52c.07-.78-17.8-7.45-26.71-11.48c-17.2-7.79-21.67-9.54-24.84-9.69'/%3E%3Cpath fill='%23e37d14' d='M8.12 49.77c.15 1.88 1.18 2.55 3.8 3.69s52.15 26.87 53.29 26.87s1.48-4.08.23-3.97c-.68.06-16.95-7.67-32.15-15.39C20.39 54.43 8.04 47.9 8.04 47.9z'/%3E%3Cpath fill='%23ba5e0d' d='M120.01 48.99S67.12 75.89 66.6 76.15s-1.35.17-1.35.17l-.04 4.01s.49.11 1.04-.06c.32-.1 52.23-26.97 52.46-27.05s1.23-.68 1.44-1.95c.18-1.02-.14-2.28-.14-2.28'/%3E%3Cpath fill='%23af0f1b' d='m28.86 97.42l10.35 15.4l4.53 1.55s.37-16.8.52-29.25c.21-18.19.13-34.78.39-35.72c.43-1.59 20.56-8.12 20.56-8.12S87.95 48.41 88.67 50c.32.7.07 12.48 0 26.21c-.09 17.34-.06 37.36-.06 37.36s2.35-.01 2.63-.88c.29-.87 1.45-7.58 1.45-7.58l8.82-58.79l4.48-5.78l-6.22-11.84l-25.52-12.56l-8.77 1.97l-9.49-1.45l-30.1 21.63l3.51 7.12l8.61 4.39z'/%3E%3Cpath fill='%23dc0d28' d='M91.28 49.39c-.55 1.21-.23 63.56-.23 63.56s2.75-1.52 6.29-3.22c3.52-1.69 6.05-2.74 6.27-3.62s.61-62.54.61-62.54z'/%3E%3Cpath fill='%23ff2a23' d='M41.35 48.1c.33.36-.21 65.06-.88 65.21c-.53.13-12.58-5.25-12.58-5.8s.97-62.38.97-62.38S40.37 47 41.35 48.1m23.88-33.85c-3.33 0-7.01.95-8.08 3.74s-1.31 6.94-1.31 10.04c0 2.97-.48 10.57 8.67 10.45s9.42-3.51 9.56-10.99c.12-6.24-.71-9.27-1.54-10.57c-.74-1.17-3.2-2.67-7.3-2.67'/%3E%3Cpath fill='%23fcc9d2' d='M59.94 29.69c2.08.12 2.97-4.45 4.57-6.95c1.6-2.49 3.27-4.16 2.67-5.46c-.49-1.08-4.84-1.43-7.19 1.84c-1.65 2.31-1.94 10.46-.05 10.57'/%3E%3Cpath fill='%23ff2a23' d='M73.33 16.42s2.95 3 3.72 8.88s-.12 10.45-.12 10.45s14.66-.44 19.72.53c4.99.97 6.73 3.17 6.73 4.77s-3.28 2.89-6.61 2.65s-5.58-.42-6 .42s.18 2.14 4.81 2.49c4.63.36 9.98-.3 11.64-6.06s1.72-15.74 1.13-22.93s-1.89-11.3-5.11-12.86c-3.39-1.63-11.88-1.9-19.9 2.61s-10.01 9.05-10.01 9.05'/%3E%3Cpath fill='%23fcc9d2' d='M89.94 9.58c-1.04-1.34-4.39-1.3-6.18.77c-1.9 2.2-2.32 10.57.12 11.05c2.76.54 2.26-3.98 4.28-6.77c1.98-2.73 2.79-3.74 1.78-5.05'/%3E%3Cpath fill='%23ff2a23' d='M56.38 16.71S45.15 3.62 32.32 3.82c-7.72.12-9.68 4.57-10.1 6.41s-3.62 20.14.65 30.05S36 47.62 37.39 47.3c1.78-.42 5.57-1.72 5.21-3.09s-12.95 3.56-13.07-2.08s8.91-6.24 13.07-6.36s11.29.83 11.29.83s-1.25-6.83-.42-11.7s2.91-8.19 2.91-8.19'/%3E%3Cpath fill='%23fcc9d2' d='M28.88 8.57c-1.6 1.66-2.26 11.23-1.25 15.98s1.9 6.77 3.98 6.36c1.74-.35 2.79-9.67 3.62-12.95c.89-3.5 3.09-7.22 2.2-8.85c-1.36-2.5-6.88-2.27-8.55-.54'/%3E%3C/svg%3E");
}

.ooui--success {
    display: inline-block;
    width: 1em;
    height: 1em;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23000' d='M10 20a10 10 0 0 1 0-20a10 10 0 1 1 0 20m-2-5l9-8.5L15.5 5L8 12L4.5 8.5L3 10z'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
}

.gg--close {
    display: inline-block;
    width: 1em;
    height: 1em;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586z'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
}

.whell_gift {
    transform: rotate(-95deg);
    font-size: 45px;
    padding-top: 45px;
}

span.whell_text:not(.whell_gift) {
    padding-left: 19px;
}

.whell-right {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.one_block_whell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.two_block_whell {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.info_gift{
    opacity: 0;
    visibility: hidden;
    padding: 10px;
    box-sizing: border-box;
    border: dashed orange 2px;
    border-radius: 10px;
    font-size: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 15px 0;
    transition: opacity .2s linear, visibility .2s linear;
}

.gift_button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background: #000000;
    border: none;
    padding: 10px;
    text-transform: uppercase;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    font-size: 21px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: opacity .2s linear, visibility .2s linear, background .2s linear;
}

.gift_button:hover{
    background: #f8b520;
    transition: background .2s linear;
}



.active_gift{
    opacity: 1;
    visibility: visible;
    transition: opacity .2s linear, visibility .2s linear;
}



.nb_form_gift{
    opacity: 0;
    visibility: hidden;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: opacity .2s linear, visibility .2s linear;
}

.nb_form_gift-active{
    opacity: 1;
    visibility: visible;
    transition: opacity .2s linear, visibility .2s linear;
}

h2.title_whell {
    text-align: center;
    font-size: 30px;
    text-transform: uppercase;
}

p.description_whell {
    font-size: 18px;
    text-align: center;
}

input.intput_whell {
    border: solid 2px #f8b520;
    margin-bottom: 10px;
    padding: 5px 8px;
    width: 500px;
    border-radius: 10px;
    font-size: 18px;
}

.three_block_whell {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
    font-size: 25px;
}

.whell_success {
    font-size: 70px;
    color: #f8b520;
}

span.close_whell {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;
    color: #f8b520;
    cursor: pointer;
    background: #000;
    border: 2px #f8b520 solid;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 100%;
}

@media screen and (max-width: 900px) {
    .body-wheel {
        transform: translate(-50%, -50%);
        width: 90%;
        grid-template-columns: 1fr;
        border-radius: 320px 320px 20px 20px;
    }

    .whell-left {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .deal-wheel {
        font-size: 14px;
        line-height: 1;
        width: 300px;
        transform: rotateZ(90deg);
    }

    .spinner {
        width: 300px;
        height: 300px;
    }

    .btn-spin{
        transform: rotate(-90deg);
    }

    .whell_gift {
        font-size: 30px;
        padding-left: 7px;
    }

    h2.title_whell {
        text-align: center;
        font-size: 22px;
        text-transform: uppercase;
        margin-top: 10px;
    }

    p.description_whell {
        font-size: 16px;
        text-align: center;
        padding: 5px;
    }
    .whell-right{
        padding-bottom: 10px;
    }

    .gift_button{
        font-size: 18px;
    }

    .spinner{
        border: solid #f8b520 5px;
    }

    input.intput_whell{
        width: 90%;
    }

    .three_block_whell{
        margin-top: 25px;
    }
}
           `,
        })


        $('head').append(style);
    }

    _script_whell(prizes){
        // const prizes = [
        //     {
        //         text: "1%",
        //         type: 'text',
        //         description: 'Знижка 1%',
        //     },
        //     {
        //         text: `<span class="noto--wrapped-gift"></span>`,
        //         type: 'gift',
        //         description: '-30% на комплект димаря',
        //     },
        //     {
        //         text: "3%",
        //         type: 'text',
        //         description: 'Знижка 3%'
        //     },
        //     {
        //         text: `<span class="noto--wrapped-gift"></span>`,
        //         type: 'gift',
        //         description: 'Безкоштовна доставка',
        //     },
        //     {
        //         text: "5%",
        //         type: 'text',
        //         description: 'Знижка 5%'
        //     },
        //     {
        //         text: `<span class="noto--wrapped-gift"></span>`,
        //         type: 'gift',
        //         description: '-50% на монтаж',
        //     },
        //     {
        //         text: `7%`,
        //         type: 'text',
        //         description: 'Знижка 7%'
        //     },
        //     {
        //         text: `<span class="noto--wrapped-gift"></span>`,
        //         type: 'gift',
        //         description: 'Безкоштовний виїзд інженера',
        //     },
        //     {
        //         text: "10%",
        //         type: "text",
        //         description: 'Знижка 10%',
        //         select: true,
        //     },
        //     {
        //         text: `20%`,
        //         type: 'text',
        //         description: 'Знижка 20%',
        //     }
        // ];

        const wheel = document.querySelector(".deal-wheel");
        const spinner = wheel.querySelector(".spinner");
        const trigger = wheel.querySelector(".btn-spin");
        const ticker = wheel.querySelector(".ticker");
        const reaper = wheel.querySelector(".grim-reaper");
        const prizeSlice = 360 / prizes.length;
        const prizeOffset = Math.floor(180 / prizes.length);
        const spinClass = "is-spinning";
        const selectedClass = "selected";
        const spinnerStyles = window.getComputedStyle(spinner);
        let tickerAnim;
        let rotation = 0;
        let currentSlice = 0;
        let prizeNodes;

        const createPrizeNodes = () => {
            prizes.forEach(({ text, type, description }, i) => {
                const rotation = ((prizeSlice * i) * -1) - prizeOffset;
                spinner.insertAdjacentHTML(
                    "beforeend",
                    `<li class="prize" style="--rotate: ${rotation}deg"><span data-info="${description}" class="whell_text ${type == 'gift' ? 'whell_gift' : ''}">${text}</span></li>`
                );
            });
        };

        const createConicGradient = () => {
            spinner.setAttribute(
                "style", `background: conic-gradient(from -90deg, ${
                    prizes.map((_, i) => `${i % 2 === 0 ? '#fff' : '#4256bd'} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
                        .reverse()
                });`
            );
        };

        const setupWheel = () => {
            createConicGradient();
            createPrizeNodes();
            prizeNodes = wheel.querySelectorAll(".prize");
        };

        const spinertia = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const runTickerAnimation = () => {
            const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
            const a = values[0];
            const b = values[1];
            let rad = Math.atan2(b, a);

            if (rad < 0) rad += (2 * Math.PI);

            const angle = Math.round(rad * (180 / Math.PI));
            const slice = Math.floor(angle / prizeSlice);

            if (currentSlice !== slice) {
                ticker.style.animation = "none";
                setTimeout(() => ticker.style.animation = null, 10);
                currentSlice = slice;
            }

            tickerAnim = requestAnimationFrame(runTickerAnimation);
        };

        const selectPrize = () => {
            const selected = Math.floor(rotation / prizeSlice);
            prizeNodes[selected].classList.add(selectedClass);
            let gift = prizeNodes[selected].querySelector('.whell_text').getAttribute('data-info');
            console.log(prizeNodes[selected].querySelector('.whell_text').getAttribute('data-info'));
            $('.info_gift').addClass('active_gift');
            $('.gift_button').addClass('active_gift');
            $('.text_gift').text(gift);

            // отключаем кнопку вращения
            // $('.cap').css('display', 'none');
            
        };

        // Определяем индекс приза с select: true или используем стандартное значение
        const getFixedRotation = () => {
            // Ищем приз с select: true
            const selectedPrizeIndex = prizes.findIndex(prize => prize.select === true);
            
            if (selectedPrizeIndex !== -1) {
                // Добавляем несколько оборотов (например, 3) к углу для остановки на нужном призе
                return 360 * 3 + selectedPrizeIndex * prizeSlice + prizeOffset;
            } else {
                // Если нет приза с select: true, генерируем случайное значение с несколькими оборотами
                return Math.floor(Math.random() * 360 + spinertia(2000, 5000) + 360 * 3);
            }
        };

        // Обработчик клика для вращения
        trigger.addEventListener("click", () => {
            if (!wheel.classList.contains(spinClass)) { // Проверяем, что колесо не вращается
                trigger.disabled = true;

                // Устанавливаем rotation на фиксированный угол или случайное значение
                rotation = getFixedRotation();

                prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
                wheel.classList.add(spinClass);
                spinner.style.setProperty("--rotate", rotation);
                ticker.style.animation = "none";
                runTickerAnimation();

                $('.info_gift').removeClass('active_gift');
                $('.cap').hide();
            }
        });

        // Сброс анимации и включение кнопки после завершения вращения
        spinner.addEventListener("transitionend", () => {
            cancelAnimationFrame(tickerAnim);
            trigger.disabled = false;
            trigger.focus();
            rotation %= 360;  // Ограничиваем значение угла до 360 градусов для удобства
            selectPrize();
            wheel.classList.remove(spinClass); // Сбрасываем класс вращения
            spinner.style.setProperty("--rotate", rotation); // Устанавливаем конечный угол
        });


        setupWheel();
    }

    _render_whell(){
        let body_whell = $('<div></div>',{
            class: 'body-wheel',
            html: `
            <div class="whell-left">
                <div class="deal-wheel">
                    <ul class="spinner"></ul>
                    <figure class="cap">
                        <button class="btn-spin">click</button>
                    </figure>
                    <div class="ticker"></div>
                </div>
            </div>
            <div class="whell-right">
            <span class="close_whell">
                <span class="gg--close"></span>
            </span>
                <div class="one_block_whell">
                        <div class="block_text_whell">
                        <h2 class="title_whell">${this.title}</h2>
                        <p class="description_whell">${this.description}</p>
                    </div>
                    <span class="info_gift">
                        <span class="noto--wrapped-gift"></span>
                        <span id="text_gift" class="text_gift"></span>
                    </span>
                    <button id="get_gift" class="gift_button">${(this.lang == 'uk') ? `Отримати подарунок` : `Забрать подарок`}</button>
                </div>
                <div class="two_block_whell">
                    <h2 class="title_whell">${this.lang == 'uk' ? 'Заповни форму для отримання подарунка': 'Заполни форму для получения подарка'}</h2>
                    <input class="intput_whell" name="whell_name" type="text" placeholder="${this.lang == 'uk' ? 'Ваше ім\'я' : 'Ваше имя'}">
                    <input class="intput_whell" maxlength="10" name="whell_phone" type="tel" placeholder="${this.lang == 'uk' ? 'Ваш номер телефону' : 'Ваш номер телефона'}">
                    <input class="intput_whell" name="whell_mail" type="text" placeholder="${this.lang == 'uk' ? 'Ваша пошта' : 'Ваша почта'}">
                    <button id="send_gift_telegram" class="gift_button">${(this.lang == 'uk') ? `Отримати подарунок` : `Забрать подарок`}</button>
                </div>
                <div class="three_block_whell">
                    <span class="ooui--success whell_success"></span>
                    <p class="success_whlell_text">${this.lang == 'uk' ? 'Вітаємо! <br>Cкоро наш менеджер зв\'яжеться з Вами!' : `Поздарвляем!<br>Скоро наш менеджер свяжется с Вами!` }</p>
                    <button id="closed_whell" class="gift_button">${this.lang == 'uk' ? 'Перейти до сайту' : 'Перейти на сайт'}</button>
                </div>
            </div>
            `
        });

        $('body').append(body_whell);

        this._script_whell(this.prizes);

        $('input[name="whell_phone"]').on('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });

        $('#get_gift').on('click', function(){
            $('.one_block_whell').css('display', 'none');
            $('.two_block_whell').css('display', 'flex');
        })

        $('#send_gift_telegram').on('click', sendTelegram);

        $('#closed_whell').on('click', function(){
            $('.body-wheel').remove();
            sessionStorage.setItem('whell', true);
        })

        $('.close_whell').on('click', function(){
            $('.body-wheel').remove();
        })
    }
}

// const config_wheel = {
//     text: {
//         title_ru: 'Пора испытать удачу!',
//         title_ua: 'Час випробувати удачу!',
//         description_ru: 'Крути барабан и стань обладателем выгодной скидки или приятного подарка. Нажми "Click" и получи свой приз',
//         description_ua: 'Крути барабан і стань володарем вигідної знижки або приємного подарунка. Натисни «Click» та отримай свій приз'
//     },
//     time_whell: 5000,
//     pages_whell: ['pechi-ta-kaminy', 'opaliuvalni-pechi', 'chavunni-pechi', 'stalevi-pechi', 'kukhnia-pich', 'kaminni-topky', 'topky-z-vodianym-konturom', 'povitriani-topky', 'modulni-kaminy'],
//     prizes: [
//         {
//             text: "1%",
//             type: 'text',
//             description: 'Знижка 1%',
//         },
//         {
//             text: `<span class="noto--wrapped-gift"></span>`,
//             type: 'gift',
//             description: '-30% на комплект димаря',
//         },
//         {
//             text: "3%",
//             type: 'text',
//             description: 'Знижка 3%'
//         },
//         {
//             text: `<span class="noto--wrapped-gift"></span>`,
//             type: 'gift',
//             description: 'Безкоштовна доставка',
//         },
//         {
//             text: "5%",
//             type: 'text',
//             description: 'Знижка 5%'
//         },
//         {
//             text: `<span class="noto--wrapped-gift"></span>`,
//             type: 'gift',
//             description: '-50% на монтаж',
//         },
//         {
//             text: "7%",
//             type: 'text',
//             description: 'Знижка 7%'
//         },
//         {
//             text: `<span class="noto--wrapped-gift"></span>`,
//             type: 'gift',
//             description: 'Безкоштовний виїзд інженера',
//         },
//         {
//             text: "10%",
//             type: "text",
//             description: 'Знижка 10%',
//             select: true,
//         },
//         {
//             text: `20%`,
//             type: 'text',
//             description: 'Знижка 20%',
//         }
//     ]
// };
// console.log(config_wheel.prizes);

let current_link = location.href;

// Проверяем, что константа config_wheel определена
if (typeof config_wheel !== 'undefined') {
    let current_link = location.href;


    config_wheel.pages_whell.forEach((item) => {
        if (current_link.includes(item)) {
            if(sessionStorage.getItem('whell') != "true"){
                setTimeout(()=>{
                    let init_whell = new RENDER_WHELL(config_wheel);
                }, config_wheel.time_whell);
            }
            
        }
    });
}

