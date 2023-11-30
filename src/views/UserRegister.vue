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
          this.$router.push('/usercategory'); 
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
  margin: 50px auto;
  padding: 40px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333333;
  text-align: center;
}

.signup-title {
  font-size: 32px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  position: relative;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #f5f5f5;
  font-size: 16px;
  color: #333333;
}

.register-button {
  padding: 15px;
  background-color: #3498db;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.register-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px #3498db;
}
</style>
