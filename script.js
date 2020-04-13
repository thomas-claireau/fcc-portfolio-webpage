window.addEventListener('DOMContentLoaded', (event) => {
	// link smooth
	document.querySelectorAll('a').forEach((link) => {
		if (!link.href) return;

		if (link.href.includes('#')) {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const href = link.href.split('#')[1];

				const target = document.getElementById(href);

				if (!target) return;

				target.scrollIntoView({ behavior: 'smooth' });
			});
		}
	});

	// -------------------

	// menu
	const menu = document.querySelector('#navbar');
	const menuAdmin = document.querySelector('.sidebar');
	const barsMenuMobile = document.querySelector('.bars-menu-mobile');

	const menuItems = menu ? menu : menuAdmin;

	if (barsMenuMobile) {
		const events = ['click', 'touch'];

		events.forEach((event) => {
			barsMenuMobile.addEventListener(event, () => {
				document.querySelector('body').classList.toggle('menu-burger-open');

				const clickableItems = menuItems.querySelectorAll('a');

				if (clickableItems) {
					clickableItems.forEach((item) => {
						events.forEach((event) => {
							item.addEventListener(event, () => {
								document.querySelector('body').classList.remove('menu-burger-open');
							});
						});
					});
				}
			});
		});
	}

	if (menu) {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 30) {
				menu.classList.add('has-scrolled');
				barsMenuMobile.classList.add('has-scrolled');
			} else {
				menu.classList.remove('has-scrolled');
				barsMenuMobile.classList.remove('has-scrolled');
			}
		});
	}
	// -------------------

	// formulaire
	const formulaire = document.querySelector('.formulaire');

	if (formulaire) {
		const inputs = formulaire.querySelectorAll('.input:not(textarea)');
		const inputSubmit = document.querySelector('input[type="submit"]');
		const inputFile = document.querySelector('input[type="file"]');

		const regexTel = RegExp(/^((\+)33|0)[1-9](\d{2}){4}$/);
		const regexMail = RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/);
		const regexText = RegExp(/^(\b)(on\S+)(\s*)=|javascript|(<\s*)(\/*)script$/);

		if (inputFile) {
			inputFile.setAttribute('accept', 'image/x-png,image/gif,image/jpeg');
		}

		inputs.forEach((input) => {
			input.addEventListener('input', (e) => {
				const currentInput = e.currentTarget;

				if (e.target.id === 'mail' || e.target.id === 'email') {
					checkInput(currentInput, regexMail, true);
				} else if (e.target.id === 'tel') {
					checkInput(currentInput, regexTel, true);
				} else if (e.target.id === 'password') {
					const inputConfirmPassword = document.querySelector('input#confirm-password');

					if (inputConfirmPassword) {
						inputConfirmPassword.value = '';
						inputConfirmPassword.parentNode.parentNode.classList.remove('ok');
					}
				} else if (e.target.id === 'confirm-password') {
					const inputPassword = document.querySelector('input#password');
					const regexPassword = RegExp('^' + inputPassword.value + '$');

					checkInput(currentInput, regexPassword, true);
				} else {
					checkInput(currentInput, regexText, false);
				}
			});
		});

		inputSubmit.addEventListener('click', (e) => {
			inputs.forEach((input) => {
				const parentInput = input.parentNode.parentNode;

				if (parentInput.classList.contains('error')) {
					e.preventDefault();
					inputSubmit.classList.add('not-send');
				}
			});
		});
	}
	// -------------------
});

function checkInput(input, regex, match) {
	const parentInput = input.parentNode.parentNode;
	const condition = match ? input.value.match(regex) : !input.value.match(regex);

	if (input.value.length > 0) {
		input.classList.add('active');
		if (condition) {
			parentInput.classList.remove('error');
			parentInput.classList.add('ok');
		} else {
			parentInput.classList.remove('ok');
			parentInput.classList.add('error');
		}
	} else {
		input.classList.remove('active');
		parentInput.classList.remove('error');
		parentInput.classList.remove('ok');
	}
}
