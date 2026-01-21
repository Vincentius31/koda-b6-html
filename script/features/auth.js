define(['validation', 'storage'], function (validation, storage) {

    function init() {
        const form = document.getElementById('registerForm');
        const alertBox = document.getElementById('formAlert');

        if (!form || !alertBox) return;

        const eyes = form.querySelectorAll('.eye');

        eyes.forEach(function (eye) {
            eye.addEventListener('click', function () {
                const input = eye.closest('.input-box').querySelector('input');

                if (!input) return;

                if (input.type === 'password') {
                    input.type = 'text';
                    eye.src = 'img/icon/eye.png';
                } else {
                    input.type = 'password';
                    eye.src = 'img/icon/EyeSlash.png';
                }
            });
        });


        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const inputs = form.querySelectorAll('input');

            const fullName = inputs[0].value;
            const email = inputs[1].value;
            const password = inputs[2].value;
            const confirmPassword = inputs[3].value;

            if (validation.isEmpty(fullName)) {
                return showError('Full name is required');
            }

            if (!validation.isEmailValid(email)) {
                return showError('Email format is invalid');
            }

            if(storage.isEmailExists(email)){
                return showError('Email already registered')
            }

            if (!validation.isPasswordValid(password)) {
                return showError('Password minimum 6 characters');
            }

            if (!validation.isPasswordMatch(password, confirmPassword)) {
                return showError('Password does not match');
            }

            storage.saveUser({
                fullName,
                email,
                password: storage.encodeBase64(password)
            });

            showSuccess('Register success');
            
            setTimeout(()=> {
                window.location.href = "login.html";
            }, 1200);
        });

        function showError(msg) {
            alertBox.style.display = 'block';
            alertBox.textContent = msg;
        }

        function showSuccess(msg) {
            alertBox.style.display = 'block';
            alertBox.textContent = msg;
        }
    }

    return { init };
});

