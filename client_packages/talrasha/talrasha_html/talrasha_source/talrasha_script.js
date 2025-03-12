'use strict';

window.addEventListener('DOMContentLoaded', function() {

const titleMenu = document.querySelectorAll('.title'),
      title = document.querySelectorAll('.title__text'),
      menu = document.querySelector('.menu'),
      success = document.querySelector('.icon_success'),
      btn = document.querySelector('.btn-create'),
      pasIcon = document.querySelector('.password_icon'),
      input = document.getElementById('password-input');
    
function hideActive() {
        title.forEach(item => {
        item.classList.remove('title_active');
    });
}    
    
title.forEach((item) => {
    item.addEventListener('click',(e)=>{
        const target = e.currentTarget;

        if(target && target.classList.contains("title_reg")){
        hideActive();
        target.classList.add('title_active');
        menu.innerHTML = `<div class="form-menu">
        <div class="form-menu" id="registration">
            <div class="icon icon_input icon_logout" data-login>
            <input type="login" placeholder="Login" maxlength="28">
            </div>
            <div class="icon icon_input icon_password" data-password>
            <input type="password"  placeholder="Password" maxlength="30">
            <div class="password_icon"></div>
            </div>
            <div class="icon icon_input" data-mail>
            <input type="mail" placeholder="Example@mail.com" maxlength="28">
            </div>
            <div class="icon icon_input" data-promo>
            <input type="text" placeholder="Promocode" maxlength="10">
            </div>
        </div>
        </div>`;
        btn.value = 'Создать аккаунт';
        } else if (target && target.classList.contains("title_auth")) {
            hideActive();
            target.classList.add('title_active');
            menu.innerHTML = `<div class="form-menu">
                <div class="icon icon_input icon_logout" data-login>
                <input type="login" placeholder="Login" maxlength="28">
                </div>
                <div class="icon icon_input icon_password" data-password>
                <input type="password"  placeholder="Password" maxlength="30">
                <div class="password_icon"></div>
                </div>
                </div>`;
                success.classList.add('hide');
                btn.value = 'Войти';
        } else if (target && target.classList.contains("title_repass")) {
            hideActive();
            target.classList.add('title_active');
            menu.innerHTML = `<div class="form-menu">
                <div class="form-menu" id="registration">
                    <div class="icon icon_input" data-mail>
                    <input type="mail" placeholder="Example@mail.com" maxlength="28">
                    </div>
                </div>`;
            success.classList.add('hide');
            btn.value = 'Восстановить пароль';
        }
    }) 
    }) 
    
});
