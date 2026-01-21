define(function () {

    function encodeBase64(value) {
        return btoa(value);
    }

    function saveUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    function getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    return {
        encodeBase64,
        saveUser,
        getUser
    };
});
