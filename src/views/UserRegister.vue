<template>
  <div class="signup-page">
    <h1 class="signup-title">Регистрация Нового Пользователя</h1>
    <form @submit.prevent="registerUser" class="signup-form">
      <div class="input-group">
        <input id="name" v-model="name" type="text" required placeholder="Введите ваше имя" class="input-field">
        <label for="name" class="input-label">Имя</label>
      </div>
      <div class="input-group">
        <input id="email" v-model="email" type="email" required placeholder="Введите ваш email" class="input-field">
        <label for="email" class="input-label">Email</label>
      </div>
      <div class="input-group">
        <input id="password" v-model="password" type="password" required placeholder="Введите пароль" class="input-field">
        <label for="password" class="input-label">Пароль</label>
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

<style>
.signup-page {
  max-width: 400px;
  margin: auto;
  padding: 40px;
  background: #f3f4f6;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.signup-title {
  text-align: center;
  font-size: 22px;
  color: #333;
  margin-bottom: 25px;
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
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.input-label {
  position: absolute;
  top: -10px;
  left: 10px;
  background: #f3f4f6;
  padding: 0 5px;
  font-size: 12px;
  color: #333;
}

.register-button {
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #388e3c;
}
</style>

