define(['validation', 'storage'], function (validation, storage) {

    function init() {
        const form = document.getElementById('registerForm');
        const alertBox = document.getElementById('formAlert');

        if (!form) return;

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

            if (!validation.isPasswordValid(password)) {
                return showError('Password must be at least 6 characters');
            }

            if (!validation.isPasswordMatch(password, confirmPassword)) {
                return showError('Password confirmation does not match');
            }

            const encodedPassword = storage.encodeBase64(password);

            storage.saveUser({
                fullName,
                email,
                password: encodedPassword
            });

            showSuccess('Register success!');
            form.reset();
        });

        function showError(message) {
            alertBox.style.display = 'block';
            alertBox.textContent = message;
            alertBox.className =
                'form-alert bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-lg text-sm mb-4';
        }

        function showSuccess(message) {
            alertBox.style.display = 'block';
            alertBox.textContent = message;
            alertBox.className =
                'form-alert bg-green-100 text-green-700 border border-green-300 px-4 py-3 rounded-lg text-sm mb-4';
        }
    }

    return {
        init
    };
});
