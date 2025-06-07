document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessageDiv = document.getElementById('error-message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessageDiv.style.display = 'none';

        const ra = document.getElementById('ra').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('http://localhost:3000/login', { ra, password });
            const { token, role, name } = response.data;

            // Salva as informações no localStorage
            localStorage.setItem('userToken', token);
            localStorage.setItem('userRole', role);
            localStorage.setItem('userName', name);

            // Redireciona com base no cargo
            if (role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'minhas-horas.html';
            }

        } catch (error) {
            const message = error.response?.data?.message || "Erro ao tentar fazer login.";
            errorMessageDiv.textContent = message;
            errorMessageDiv.style.display = 'block';
        }
    });
});