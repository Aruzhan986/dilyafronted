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

        switch (userRole) {
            case 'Admin':
                this.$router.push('/admincon');
                break;
            case 'Moderator':
                this.$router.push('/moderator');
                break;
            default:
                this.$router.push('/item');
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
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333; 
}

.custom-interface-title {
  color: #333;
  font-size: 32px;
  margin-bottom: 25px;
  font-family: 'Roboto', sans-serif;
}

.custom-login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.custom-input-area {
  position: relative;
}

.custom-input-box {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd; 
  border-radius: 5px;
  background-color: #f8f8f8;
  color: #333; 
}

.custom-input-label {
  position: absolute;
  top: -12px;
  left: 10px;
  background-color: #fff;
  padding: 0 5px;
  font-size: 14px;
  color: #333;
}

.custom-login-button, .custom-register-button {
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px 0;
}

.custom-login-button {
  background-color: #007bff;
  color: #fff;
}

.custom-login-button:hover {
  background-color: #0056b3;
}

.custom-register-button {
  background-color: #f8f8f8;
  color: #007bff;
  border: 1px solid #007bff;
}

.custom-register-button:hover {
  background-color: #007bff;
  color: #fff;
}
</style>
