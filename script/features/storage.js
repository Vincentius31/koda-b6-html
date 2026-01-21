define(function () {

    const STORAGE_KEY = 'users';

    function encodeBase64(value) {
        return btoa(value);
    }

    function getUsers() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    function saveUser(user) {
        const users = getUsers();
        users.push(user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }

    return {
        encodeBase64,
        saveUser,
        getUsers
    };
});
