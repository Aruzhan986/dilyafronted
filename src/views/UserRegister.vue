<template>
  <div class="registration-container">
    <h1>Регистрация</h1>
    <form @submit.prevent="registerUser" class="registration-form">
      <div class="form-field">
        <label for="name">Имя:</label>
        <input id="name" v-model="name" type="text" required>
      </div>
      <div class="form-field">
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required>
      </div>
      <div class="form-field">
        <label for="password">Пароль:</label>
        <input id="password" v-model="password" type="password" required>
      </div>
      <button type="submit" class="submit-btn">Зарегистрироваться</button>
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
  margin: auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style>