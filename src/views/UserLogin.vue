<template>
  <div class="login-area">
    <h1 class="login-title">Вход в Систему</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="input-field">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required class="text-input">
      </div>
      <div class="input-field">
        <label for="password">Пароль</label>
        <input id="password" v-model="form.password" type="password" required class="text-input">
      </div>
      <button type="submit" class="login-btn">Войти</button>
    </form>
    <button @click="goToRegistration" class="register-link">Новый пользователь? Регистрация</button>
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
  
},
     goToRegistration() {
      this.$router.push('/register'); 
    }
  }
  
}
</script>

<style>
.login-area {
  max-width: 450px;
  margin: 50px auto;
  padding: 30px;
  background: linear-gradient(to right top, #6dd5ed, #2196f3);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: #fff;
}

.login-title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 25px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-field {
  display: flex;
  flex-direction: column;
}

.label {
  margin-bottom: 5px;
}

.text-input {
  padding: 12px;
  border: 2px solid #fff;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.7);
  color: #333;
}

.text-input:focus {
  background-color: #fff;
  color: #333;
}

.login-btn {
  padding: 15px;
  background-color: #fff;
  color: #2196f3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.login-btn:hover {
  background-color: #f8f9fa;
  color: #0d47a1;
}

.register-link {
  margin-top: 15px;
  background: none;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 8px;
  padding: 8px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.register-link:hover {
  background-color: #fff;
  color: #2196f3;
}
</style>
