<template>
  <div class="registration-container">
    <h1>Register Your Account</h1>
    <form @submit.prevent="registerUser" class="registration-form">
      <div class="form-field">
        <input id="name" v-model="name" type="text" required placeholder="Your Name">
        <label for="name">Name</label>
      </div>
      <div class="form-field">
        <input id="email" v-model="email" type="email" required placeholder="Email Address">
        <label for="email">Email</label>
      </div>
      <div class="form-field">
        <input id="password" v-model="password" type="password" required placeholder="Password">
        <label for="password">Password</label>
      </div>
      <button type="submit" class="submit-btn">Create Account</button>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    registerUser() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.$http.post('/register', userData)
        .then(response => {
          
          localStorage.setItem('authToken', response.data.token); 
          this.$router.push('/category'); 
        })
        .catch(error => {
          console.error(error);
          
        });
    }
  }
};
</script>

<style>
.registration-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 40px;
  background: #f3f4f6; 
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-field {
  position: relative;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 15px;
  border: 2px solid #cccccc; 
  border-radius: 8px;
  background: transparent;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #4CAF50;
}

label {
  position: absolute;
  top: 12px;
  left: 15px;
  transition: all 0.3s;
  color: #666666;
}

input:valid + label,
input:focus + label {
  top: -10px;
  left: 10px;
  font-size: 12px;
  color: #4CAF50;
}

.submit-btn {
  padding: 15px 30px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.submit-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px); 
}

</style>