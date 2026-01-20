define(['storage'], function (storage) {
    function base64Encode(text) {
        // btoa =  fungsi bawaan yang digunakan untuk membuat string ASCII yang dikodekan Base64
        return btoa(unescape(encodeURIComponent(text)));
    }

    function registerUser(user) {
        const users = storage.getUsers();
        // melakukan pengecekan apakah email sudah terdaftar atau belum?
        if (users.some(u => u.email === user.email)) {
            return { success: false, message: 'Email already registered' };
        }
        // Jika belum terdaftar pasword akan di encode dengan menggunakan function encode
        user.password = base64Encode(user.password);

        users.push(user);
        storage.saveUsers(users);

        return { success: true };
    }

    return {
        registerUser
    };
});
