<template>
  <div class="login-interface">
    <h1 class="interface-title">Вход</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="input-area">
        <input id="email" v-model="form.email" type="email" required placeholder="Электронная почта" class="input-box">
        <label for="email" class="input-label">Email</label>
      </div>
      <div class="input-area">
        <input id="password" v-model="form.password" type="password" required placeholder="Пароль" class="input-box">
        <label for="password" class="input-label">Пароль</label>
      </div>
      <button type="submit" class="login-button">Вход</button>
    </form>
    <button @click="goToRegistration" class="register-button">Регистрация</button>
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
  max-width: 350px;
  margin: auto;
  padding: 40px;
  background: #eceff1;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.interface-title {
  color: #455a64;
  font-size: 26px;
  margin-bottom: 25px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-area {
  position: relative;
}

.input-box {
  width: 100%;
  padding: 12px;
  border: 1px solid #cfd8dc;
  border-radius: 8px;
  background-color: #fff;
}

.input-label {
  position: absolute;
  top: -8px;
  left: 10px;
  background-color: #eceff1;
  padding: 0 4px;
  font-size: 14px;
  color: #455a64;
}

.login-button {
  padding: 12px 0;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #1565c0;
}

.register-button {
  margin-top: 15px;
  background-color: transparent;
  color: #1e88e5;
  border: 1px solid #1e88e5;
  border-radius: 8px;
  padding: 8px 0;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.register-button:hover {
  background-color: #1e88e5;
  color: white;
}
</style>
