<template>
  <div class="login-container">
    <h1>Вход</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-field">
        <label for="email">Email:</label>
        <input id="email" v-model="form.email" type="email" required>
      </div>
      <div class="form-field">
        <label for="password">Пароль:</label>
        <input id="password" v-model="form.password" type="password" required>
      </div>
      <button type="submit" class="submit-btn">Войти</button>
    </form>
  </div>
</template>

<script>
import authService from '@/services/auth.service';

export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    async login() {
  const response = await authService.login(this.form);
  if (response.success) {
    const userRole = localStorage.getItem('roles');
    if (userRole === 'Admin') { 
        this.$router.push('/adminpage'); 
    } else {
        this.$router.push('/usercategory'); 
    }
  } else {
    console.error("An error occurred during login.", response.errors);
  }
}

  
  }
  
}
</script>

<style scoped>

</style>
<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style>