<template>
  <div class="signup-page">
    <h1 class="signup-title">Данные</h1>
    <form @submit.prevent="registerUser" class="signup-form">
      <div class="input-group">
        <input id="name" v-model="name" type="text" required placeholder="Имя" class="input-field">
      </div>
      <div class="input-group">
        <input id="email" v-model="email" type="email" required placeholder="Email" class="input-field">
      </div>
      <div class="input-group">
        <input id="password" v-model="password" type="password" required placeholder="Пароль" class="input-field">
      </div>
      <button type="submit" class="register-button">Зарегистрироваться</button>
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
          this.$router.push('/login'); 
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.signup-page {
  max-width: 400px;
  margin: auto;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #333; 
}

.signup-title {
  color: #333;
  font-size: 32px;
  margin-bottom: 25px;
  font-family: 'Roboto', sans-serif;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  position: relative;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd; 
  border-radius: 5px;
  background-color: #f8f8f8; 
  color: #333;
}

.register-button {
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  background-color: #007bff; 
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #0056b3; 
}
</style>