$(document).ready(function () {
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();

    const email = $('#loginEmail').val().trim();
    const password = $('#loginPassword').val().trim();

    const encodedPassword = btoa(password);

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      u => u.email === email && u.password === encodedPassword
    );

    if (!user) {
      alert('Email atau password salah');
      return;
    }

    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({
        fullName: user.fullName,
        email: user.email
      })
    );

    window.location.href = 'index.html';
  });
});
