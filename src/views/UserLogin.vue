<template>
  <div class="login-container">
    <h1 class="login-title">Вход в Систему</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="input-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required>
      </div>
      <div class="input-group">
        <label for="password">Пароль</label>
        <input id="password" v-model="form.password" type="password" required>
      </div>
      <button type="submit" class="login-btn">Войти</button>
    </form>
    <button @click="goToRegistration" class="register-btn">Регистрация</button>
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

<style scoped>
.login-container {
  max-width: 350px;
  margin: auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.login-title {
  margin-bottom: 25px;
  color: #333333;
  font-size: 22px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.input-group label {
  margin-bottom: 5px;
  font-size: 14px;
  color: #555555;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-size: 14px;
}

.login-btn {
  padding: 12px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #0056b3;
}

.register-btn {
  margin-top: 15px;
  background: none;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 8px;
  padding: 8px 0;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.register-btn:hover {
  background-color: #007bff;
  color: white;
}
</style>
