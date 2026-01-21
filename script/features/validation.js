define(function () {

    function isEmpty(value) {
        return value.trim().length === 0;
    }

    function isEmailValid(email) {
        if (!email.includes('@')) return false;

        const parts = email.split('@');
        if (parts.length !== 2) return false;

        const local = parts[0];
        const domain = parts[1];

        if (local.length === 0 || domain.length === 0) return false;
        if (!domain.includes('.')) return false;

        const domainParts = domain.split('.');
        if (domainParts.some(p => p.length === 0)) return false;

        return true;
    }

    function isPasswordValid(password) {
        return password.length >= 4;
    }

    function isPasswordMatch(password, confirmPassword) {
        return password === confirmPassword;
    }

    return {
        isEmpty,
        isEmailValid,
        isPasswordValid,
        isPasswordMatch
    };
});
