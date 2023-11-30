<template>
  <div class="auth-container">
    <h1>LOGIN</h1>
    <form @submit.prevent="login" class="auth-form">
      <div class="form-field">
        <input id="email" v-model="form.email" type="email" required placeholder="Enter your email">
        <label for="email">Email</label>
      </div>
      <div class="form-field">
        <input id="password" v-model="form.password" type="password" required placeholder="Enter your password">
        <label for="password">Password</label>
      </div>
      <button type="submit" class="submit-btn">Login</button>
    </form>
    <button @click="goToRegistration" class="switch-btn">New here? Register</button>
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
.auth-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 40px;
  background: #e9ecef;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-field {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 10px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: transparent;
  transition: border-color 0.3s;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
}

label {
  position: absolute;
  top: -6px;
  left: 12px;
  background: white;
  padding: 0 5px;
  font-size: 14px;
  color: #777;
  transition: all 0.3s;
}

input:valid + label,
input:focus + label {
  font-size: 12px;
  color: #007bff;
}

.submit-btn,
.switch-btn {
  padding: 10px 15px;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 16px;
}

.submit-btn {
  background-color: #007bff;
  color: white;
}

.submit-btn:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.switch-btn {
  background-color: transparent;
  color: #007bff;
  text-transform: uppercase;
  font-weight: bold;
}

.switch-btn:hover {
  background-color: #f8f9fa;
  color: #0056b3;
}

</style>