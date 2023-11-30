<template>
  <div class="login-interface">
    <h1 class="login-heading">Вход</h1>
    <form @submit.prevent="login" class="login-form-style">
      <div class="field-container">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required class="input-style">
      </div>
      <div class="field-container">
        <label for="password">Пароль</label>
        <input id="password" v-model="form.password" type="password" required class="input-style">
      </div>
      <button type="submit" class="submit-button">Войти</button>
    </form>
    <button @click="goToRegistration" class="registration-button">Нет аккаунта? Регистрация</button>
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
.login-interface {
  max-width: 400px;
  margin: 40px auto;
  padding: 40px;
  background-color: #f7f7f7;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-heading {
  color: #424242;
  font-size: 24px;
  margin-bottom: 30px;
}

.login-form-style {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-container {
  display: flex;
  flex-direction: column;
}

.label {
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
}

.input-style {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.submit-button {
  padding: 12px 20px;
  background-color: #00897b;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #00695c;
}

.registration-button {
  margin-top: 20px;
  background-color: transparent;
  color: #00897b;
  border: 2px solid #00897b;
  border-radius: 10px;
  padding: 8px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.registration-button:hover {
  background-color: #00897b;
  color: white;
}
</style>
