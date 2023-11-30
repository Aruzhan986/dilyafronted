<template>
  <div class="registration-page">
    <h1 class="registration-title">Регистрация</h1>
    <form @submit.prevent="registerUser" class="registration-form">
      <div class="input-group">
        <label for="name">Имя:</label>
        <input id="name" v-model="name" type="text" required class="input-field">
      </div>
      <div class="input-group">
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required class="input-field">
      </div>
      <div class="input-group">
        <label for="password">Пароль:</label>
        <input id="password" v-model="password" type="password" required class="input-field">
      </div>
      <button type="submit" class="register-btn">Зарегистрироваться</button>
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

<style>
.registration-page {
  max-width: 500px;
  margin: auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.registration-title {
  text-align: center;
  color: #333;
  font-size: 26px;
  margin-bottom: 30px;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.label {
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

.input-field {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.register-btn {
  padding: 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-btn:hover {
  background-color: #388e3c;
}
</style>
