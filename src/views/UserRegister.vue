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
  max-width: 450px;
  margin: 50px auto;
  padding: 50px;
  background: linear-gradient(145deg, #81c784, #66bb6a); 
  border-radius: 15px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); 
  color: #fff; 
}

.signup-title {
  text-align: center;
  font-size: 26px; 
  margin-bottom: 30px;
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
  border: 2px solid #fff; 
  border-radius: 8px; 
  background-color: rgba(255, 255, 255, 0.8); 
  font-size: 16px;
  color: #333; 
}

.input-label {
  position: absolute;
  top: -12px; 
  left: 15px; 
  background: none; 
  font-size: 14px; 
  color: #fff; 
}

.register-button {
  padding: 15px; 
  background-color: #2e7d32; 
  transition: transform 0.2s ease, box-shadow 0.2s ease; 
}

.register-button:hover {
  transform: scale(1.05); 
  box-shadow: 0 0 10px #1b5e20; 
}
</style>

