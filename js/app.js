var ua = window.navigator.userAgent;
let md2 = document.documentElement.clientWidth < 991.98;
let md3 = document.documentElement.clientWidth < 767.98;
let md4 = document.documentElement.clientWidth < 479.98;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}




function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}

		}
	}
}
ibg();

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}


//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================




//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//========================================

//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
function form_submit(e) {
	let btn = event.target;
	let form = btn.closest('form');
	let message = form.getAttribute('data-message');
	let error = form_validate(form);
	if (error == 0) {
		//SendForm
		form_clean(form);
		if (message) {
			popup_open('message-' + message);
			e.preventDefault();
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		event.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');
	input.closest('form').classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');
	input.closest('form').classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

let viewPass = document.querySelectorAll('.form__viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}


//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');
	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		if (select_selected_option.hasAttribute('data-scr')) {
			select_type_content = `<div class="select__value icon-select-arrow"><span><span>${select_selected_text}</span><span><img src="${select_selected_option.getAttribute('data-scr')}"></span></span></div>`;
		} else {select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';

		}
		
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');


	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				if (select_option.hasAttribute('data-scr')) {
					select.querySelector('.select__value').innerHTML ='<span>' + select_option_text + '</span><span><img src="' + select_option.getAttribute('data-scr') + '"></span>';
				} else {
					select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				}

				
				original.value = select_option_value;
				select_option.style.display = 'none';
				if (window.location.pathname == '/cart.html') {
					if (select_option.closest('.select').classList.contains('_req')) {
					selectDeliveryValue(select_option_value);
					renderCart();
				}
				}
				
				
			}
			
		});
		
	}
	
}


function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				if (select_option.hasAttribute('data-scr')) {
					select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option" data-src="' + select_option.getAttribute('data-scr') + '"><div class="select__content"><span>' + select_option_text + '</span><span><img src="' + select_option.getAttribute('data-scr') + '"></span></div></div>';
				} else {
					select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
				}
				
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				if (input.getAttribute('data-type') === "pass") {
					input.setAttribute('type', 'password');
				}
				if (input.classList.contains('_date')) {
					
				}
				if (input.classList.contains('_phone')) {
					input.classList.add('_mask');
					Inputmask("+7(999)999-99-99", {
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			if (input.classList.contains('_date')) {
				datepicker(input, {
					customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
			}
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}


let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}
function searchOpened() {
	let hamburger = document.querySelector('.search__icon');
	let menu = document.querySelector('.search');
	let form__search = document.querySelector('.search__form');
	let basketBody = document.querySelector('.basket-body');
	let headerBasket = document.querySelector('.header__basket');

	if (!md2) {
		const removeBasket = () => {
			basketBody.classList.remove('_active');
			headerBasket.classList.remove('_active');

		}
		const toggleMenu = () => {
			menu.classList.toggle('_active');
		}

		hamburger.addEventListener('click', e => {
			e.stopPropagation();

			toggleMenu();
			if (basketBody.classList.contains('_active')) {
				removeBasket();
			}

		});

		document.addEventListener('click', e => {
			let target = e.target;
			let its_menu = target == menu || menu.contains(target);
			let its_hamburger = target == hamburger;
			let menu_is_active = menu.classList.contains('_active');

			if (!its_menu && !its_hamburger && menu_is_active) {
				toggleMenu();
				form_clean(form__search);
			}
		})
	} else {
		return;
	}
}

searchOpened();



document.querySelectorAll('.link-block__title').forEach( el => {
	el.addEventListener('click', toggleMenuHeader);
});




function toggleMenuHeader() {
	
	this.nextElementSibling.classList.toggle('_active');
	this.classList.toggle('_active');
	
}






let filter = document.querySelectorAll('.select-filter__placeholder'),
filterItem =document.querySelectorAll('.select-filter__item');

filter.forEach( el => {
	el.addEventListener('click', toggleFilter);


});


filterItem.forEach( el => {
	el.addEventListener('click', filterActions);
	
});



function toggleFilter() {
	this.parentElement.classList.toggle('_active');
	this.nextElementSibling.classList.toggle('_active');
}

function filterActions() {
	let textItem = this.textContent;
	this.parentElement.previousElementSibling.textContent = textItem;
	this.parentElement.classList.toggle('_active');
	this.parentElement.parentElement.classList.toggle('_active');
	callbackFilterValue(this.getAttribute('data-value'))

}



















//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let pageSlider = document.querySelector('.page__slider');
if (pageSlider) {

	let slider = new Swiper('.slider__body', {
		watchSlidesVisibility: true,
		lazy: true,
		preloadImages: true,
		navigation: {
			nextEl: '.slider__nav--next',
			prevEl: '.slider__nav--prev',
		},
		pagination: {
			el: '.slider__pagination',
			type: 'bullets',
		},
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: true,
		},
		breakpoints: {
			992: {
				slidesPerView: 6,
			},
		},
		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
	});

if(window.location.pathname !== '/index.html' && md2) {
	pageSlider.classList.add('_show');
} else {
	if(pageSlider.classList.contains('_show')) {
		pageSlider.classList.remove('_show');
	}
}
}



let imageSlider = document.querySelector('.image-goods');

if (imageSlider) {

	let sliderImg = new Swiper('.image-goods__slider', {
		pagination: {
			el: '.image-goods__pag',
			type: 'bullets',
			clickable: true,
		}
	});


	let sliderImages = document.querySelectorAll('.image-goods__slide');
	let sliderImageDotts = document.querySelectorAll('.image-goods__pag .swiper-pagination-bullet');

	for (var i = 0; i < sliderImages.length; i++) {
		let sliderImage = sliderImages[i].querySelector('img').getAttribute('data-src');
		sliderImageDotts[i].style.backgroundImage = `url('../${sliderImage}')`;
	}

}




















// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());
let cart = {
	"1" : {
		"name": "nike airmax",
		"count" : 1,
		"vendorCode" : '2514/302',
		"url" : "goods.html",
		"categories" : "lifestyle",
		"image" : "../img/goods/01.jpg",
		"color" : "black",
		"size" : "L",
		"price" : 94.99,
	},
	"2" : {
		"name": "nike mercurial vapor 13",
		"count" : 1,
		"vendorCode" : '8246/044',
		"url" : "goods.html",
		"categories" : "footbal",
		"image" : "../img/goods/02.jpg",
		"color" : "rainbow",
		"size" : "M",
		"price" : 40.99
	},
	"3" : {
		"name": "nike mercurial superfly",
		"count" : 1,
		"vendorCode" : '2401/657',
		"url" : "goods.html",
		"categories" : "footbal",
		"image" : "../img/goods/03.jpg",
		"color" : "black",
		"size" : "S",
		"price" : 90.99
	},
};



function basketOpen() {
	let basket = document.querySelector('.basket__title'),
	basketBody = document.querySelector('.basket-body'),
	headerBasket = document.querySelector('.header__basket');

	const basketCloses = document.querySelectorAll('.basket__close'),
	basketItemsPrice = document.querySelectorAll('.item-price'),
	basketValue = document.querySelector('.quanity-of-goods'),
	basketCurrentPrice = document.querySelector('.calc-price');

	const toggleBasket = () => {
		basketBody.classList.toggle('_active');
		headerBasket.classList.toggle('_active');
	}

	basket.addEventListener('click', e => {
		e.stopPropagation();
		menu_close();
		toggleBasket();
	});

	document.addEventListener('click', e => {
		let target = e.target;
		let its_basketBody = target == basketBody || basketBody.contains(target);
		let its_basket = target == basket;
		let menu_is_active = basketBody.classList.contains('_active');
		if (!its_basketBody && !its_basket && menu_is_active) {
			toggleBasket();
		}
	})




}

basketOpen();




document.onclick = event => {
	if (event.target.classList.contains('goods-plus')) {
		goodsPlusFunction(event.target.dataset.id);

	}
	if (event.target.classList.contains('goods-minus')) {
		goodsMinusFunction(event.target.dataset.id);

	}
	if (event.target.classList.contains('goods-delete')) {
		goodsDeleteFunction(event.target.dataset.id);
	}
}

const goodsPlusFunction = id => {
	cart[id]['count']++;
	renderCart();
}

const goodsMinusFunction = id => {
	if (cart[id]['count'] - 1 == 0) {
		goodsDeleteFunction(id);
		return true;
	}
	cart[id]['count']--;
	renderCart();
}

const goodsDeleteFunction = id => {
	delete cart[id];
	renderCart();
}
if (window.location.pathname == '/cart.html') {
		let selectDelivery = document.querySelector('.select_item-form-cart__select');
		let selectedDelivery = selectDelivery.querySelector('.select__option');
		let selectedDeliveryValue = selectedDelivery.getAttribute('data-value');
		let valueCartNumb;
		selectDeliveryValue(selectedDeliveryValue);
	}
	function selectDeliveryValue(value) {
		valueCartNumb = +value;
		return valueCartNumb;
	}

const renderCart = () => {
	let cartItem = document.querySelector('.page__cart');
	
	let cartItemHeader = document.querySelector('.basket-body');
	let cartHeaderCount = document.querySelector('.quanity-of-goods');
	let totalCartLong = document.querySelector('.payment-cart__text');
	let out = '';
	let outHeader = '';
	let outTotalCartLong = '';
	let totalCurrent = 0;
	let cartLenght = Object.keys(cart).length;
	let cartTitle = document.querySelector('.page__label-cart');




	if (cartLenght === 0) {
		
		outputEmptyCart();

	} else {

		if (cartTitle) {cartTitle.style.display = '';}

		for ( let key in cart) {
			let totalNumb = `${(cart[key]['count'] * cart[key]['price']).toFixed(2)}`;
			outHeader += `
			<div class="basket__item">
			<a href="${cart[key]['url']}" class="basket__image">
			<img src="${cart[key]['image']}" alt="">
			</a>
			<a href="${cart[key]['url']}" class="basket__name">${cart[key]['name']}</a>
			<div class="basket__price">$<span class="item-price">${+totalNumb}</span></div>
			<div class="basket__close"><img src="img/icons/close-button.svg" alt="" class="goods-delete" data-id="${key}"></div>
			</div>
			`;
			totalCurrent += +totalNumb;
		}

		outHeader += `
		<div class="basket__footer">
		<div class="basket__total-price">Subtotal: <span>$</span><span>${totalCurrent.toFixed(2)}</span></div>
		<a href="cart.html" class="basket__btn">checkout</a>
		</div>
		`;

		

		if (md2) {

			out = `<div class="_container">
			<div class="cart-mobile">
			<div class="cart-mobile__items">`;

			for ( let key in cart) {
				let totalNumb = `${(cart[key]['count'] * cart[key]['price']).toFixed(2)}`;
				out += `<div class="cart-mobile__item item-cart-mobile">`;
				out += `<a href="href="${cart[key]['url']}" class="item-cart-mobile__image _ibg"><img src="${cart[key]['image']}" alt=""></a>`;
				out += `<div class="item-cart-mobile__body">`;
				out += `<a href="href="${cart[key]['url']}" class="item-cart-mobile__name">${cart[key]['name']}</a>`;
				out += `<div class="item-cart-mobile__art">Ref. ${cart[key]['vendorCode']}</div>`;
				out += `<div class="item-cart-mobile__color">Color: <span>${cart[key]['color']}</span></div>`;
				out += `<div class="item-cart-mobile__count">`;
				out += `<button class="item-cart-mobile__button"><i class="web-minus goods-minus" data-id="${key}"></i></button>`;
				out += `<div class="item-cart-mobile__numb">${cart[key]['count']}</div>`;
				out += `<button class="item-cart-mobile__button"><i class="web-plus goods-plus" data-id="${key}"></i></button>`;
				out += `</div>`;
				out += `<div class="item-cart-mobile__footer">`;
				out += `<div class="item-cart-mobile__size">Size: <span>${cart[key]['size']}</span></div>`;
				out += `<div class="item-cart-mobile__price">$ <span>${+totalNumb}</span></div>`;
				out += `</div>`;
				out += `</div>`;
				out += `</div>`;
				totalCurrent += +totalNumb;
			}
			if (window.location.pathname == '/cart-cut.html') {
				out += `</div>
				<div class="cart-mobile__total">
				Subtotal: <span>$${totalCurrent.toFixed(2)}</span>
				</div>
				<div class="cart-mobile__add add-cart">
				<a href="index.html" class="add-cart__link">Continue Shopping</a>
				<a href="cart.html" class="add-cart__button button-orange">add to cart</a>
				</div>
				</div>
				</div>`;
			} else {
				out += `</div>
				<div class="cart-mobile__total">
				Subtotal: <span>$${totalCurrent.toFixed(2)}</span>
				</div>
				</div>
				</div>`;
			}
			
		} else {
			out = `<div class="_container"><table class="cart"><thead class="cart__names names-cart"><tr><th>product</th><th>description</th><th>color</th><th>size</th><th>qty</th><th>amount</th><th>delete</th></tr></thead><tbody class="cart__items">`;
			for ( let key in cart) {
				let totalNumb = `${(cart[key]['count'] * cart[key]['price']).toFixed(2)}`;
				out += `<tr class="cart__item item-cart">`;
				out += `<td class="item-cart__image"><a href="${cart[key]['url']}" class="item-cart__img"><img src="${cart[key]['image']}" alt=""></a></td>`;
				out += `<td class="item-cart__names">`;
				out += `<a href="href="${cart[key]['url']}" class="item-cart__name">${cart[key]['name']}</a>`;
				out += `<div class="item-cart__art">Ref. ${cart[key]['vendorCode']}</div>`;
				out += `</td>`;
				out += `<td class="item-cart__color">${cart[key]['color']}</td>`;
				out += `<td class="item-cart__size">${cart[key]['size']}</td>`;
				out += `<td class="item-cart__count count-cart">`;
				out += `<div class="count-cart__body">`;
				out += `<div class="count-cart__numb">${cart[key]['count']}</div>`;
				out += `<div class="count-cart__buttons">`;
				out += `<div class="count-cart__plus"><i class="web-plus goods-plus" data-id="${key}"></i></div>`;
				out += `<div class="count-cart__minus"><i class="web-minus goods-minus" data-id="${key}"></i></div>`;
				out += `</div>`;
				out += `</div>`;
				out += `</td>`;
				out += `<td class="item-cart__amount"> $${+totalNumb}</td>`;
				out += `<td class="item-cart__delete"><img src="img/icons/close-button.svg" alt="" class="goods-delete" data-id="${key}"></td>`;
				out += `</tr>`;
				totalCurrent += +totalNumb;
			}
			out += `</tbody><tfoot class="cart__total total-cart">`;
			out += `<th class="total-cart__label" scope="row" colspan="5">Subtotal:</th>`;
			out += `<td class="total-cart__numb" scope="row" colspan="6">$${totalCurrent.toFixed(2)}</td>`;
			if (window.location.pathname == '/cart-cut.html') {
				out += `</tfoot></table>
				<div class="cart-mobile__add add-cart">
				<a href="index.html" class="add-cart__link">Continue Shopping</a>
				<a href="cart.html" class="add-cart__button button-orange">order now</a>
				</div>
				</div>`;
			} else {
				out += `</tfoot></table></div>`;
			}	
		}
		if (window.location.pathname == '/cart.html') {
			outTotalCartLong += `
			<div class="payment-cart__item">
			<span>Subtotal:</span>
			<span>$${totalCurrent.toFixed(2)}</span>
			</div>
			<div class="payment-cart__item">
			<span>Shipping:</span>
			<span>$${valueCartNumb}</span>
			</div>
			<div class="payment-cart__item payment-cart__item--orange">
			<span>Total:</span>
			<span>$${(Number(totalCurrent.toFixed(2)) + valueCartNumb).toFixed(2)}</span>
			</div>
			`;
		}
		
	}
	

	if (cartItem) {
		cartItemHeader.parentElement.style.display = 'none';
		cartItem.innerHTML = out;
	} else {
		cartItemHeader.parentElement.style.display = '';
	}


	if (window.location.pathname == '/cart.html') {
		totalCartLong.innerHTML = outTotalCartLong;
	}


	cartItemHeader.innerHTML = outHeader;
	cartHeaderCount.innerHTML = cartLenght;

	function outputEmptyCart() {
		if (cartTitle) {cartTitle.style.display = 'none';}
		out = `
		<div class="_container">
		<div class="empty-cart">
		<h1 class="empty-cart__title title-h1">your basket is empty</h1>
		<a href="index.html" class="empty-cart__link button-orange">continue Shopping</a>
		</div>
		</div>
		`;
		outHeader = `
		<div class="_container">
		<div class="empty-cart-header">
		<h4 class="empty-cart-header__title subtitle-h2">your basket is empty</h4>
		</div>
		</div>
		`;
	};
	
}
renderCart();














