<template>
  <div class="custom-login-container">
    <h1>Hello</h1>
    <form @submit.prevent="login" class="custom-login-form">
      <div class="custom-form-field">
        <label for="email">Email:</label>
        <input id="email" v-model="form.email" type="email" required>
      </div>
      <div class="custom-form-field">
        <label for="password">Password:</label>
        <input id="password" v-model="form.password" type="password" required>
      </div>
      <button type="submit" class="custom-submit-btn">Login</button>
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
.custom-login-container {
  max-width: 400px;
  margin: auto;
  padding: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #ffffff;
}

.custom-login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
}

.custom-form-field {
  display: flex;
  flex-direction: column;
  color: #ffffff;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.custom-submit-btn {
  padding: 14px 24px;
  background-color: #fca311;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
}

.custom-submit-btn:hover {
  background-color: #e0aaff;
}
</style>