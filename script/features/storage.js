define([], function () {
    return {
        getUsers() {
            return JSON.parse(localStorage.getItem('users')) || [];
        },
        saveUsers(users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    };
});