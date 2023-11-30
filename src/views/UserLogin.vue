<template>
  <div class="custom-login-interface">
    <h1 class="custom-interface-title">Welcome</h1>
    <form @submit.prevent="login" class="custom-login-form">
      <div class="custom-input-area">
        <label for="email" class="custom-input-label">Email</label>
        <input id="email" v-model="form.email" type="email" required class="custom-input-box">
      </div>
      <div class="custom-input-area">
        <label for="password" class="custom-input-label">Password</label>
        <input id="password" v-model="form.password" type="password" required class="custom-input-box">
      </div>
      <button type="submit" class="custom-login-button">Log In</button>
    </form>
    <button @click="goToRegistration" class="custom-register-button">Sign Up</button>
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
            this.$router.push('/adminproduct'); 
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
.custom-login-interface {
  max-width: 400px;
  margin: auto;
  padding: 50px;
  background: #2c3e50;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #fff;
}

.custom-interface-title {
  color: #fff;
  font-size: 36px;
  margin-bottom: 30px;
}

.custom-login-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.custom-input-area {
  position: relative;
}

.custom-input-box {
  width: 100%;
  padding: 20px;
  border: 2px solid #fff;
  border-radius: 8px;
  background-color: transparent;
  color: #fff;
  transition: border-color 0.3s;
}

.custom-input-box:focus {
  border-color: #3498db;
  outline: none;
}

.custom-input-label {
  position: absolute;
  top: -15px;
  left: 10px;
  background-color: #2c3e50;
  padding: 0 5px;
  font-size: 16px;
  color: #fff;
}

.custom-login-button {
  padding: 20px 0;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-login-button:hover {
  background-color: #2980b9;
}

.custom-register-button {
  margin-top: 30px;
  background-color: transparent;
  color: #3498db;
  border: 2px solid #3498db;
  border-radius: 8px;
  padding: 15px 0;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.custom-register-button:hover {
  background-color: #3498db;
  color: #fff;
}
</style>
