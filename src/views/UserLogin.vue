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
.custom-login-interface {
  max-width: 400px;
  margin: auto;
  padding: 30px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.custom-interface-title {
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
}

.custom-login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.custom-input-area {
  position: relative;
}

.custom-input-box {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
}

.custom-input-label {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #f5f5f5;
  padding: 0 5px;
  font-size: 14px;
  color: #666;
}

.custom-login-button {
  padding: 12px 0;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-login-button:hover {
  background-color: #2980b9;
}

.custom-register-button {
  margin-top: 20px;
  background-color: transparent;
  color: #3498db;
  border: 1px solid #3498db;
  border-radius: 6px;
  padding: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.custom-register-button:hover {
  background-color: #3498db;
  color: white;
}
</style>