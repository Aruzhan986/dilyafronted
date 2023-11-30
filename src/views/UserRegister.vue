<template>
  <div class="registration-section">
    <h1 class="section-title">Регистрация</h1>
    <form @submit.prevent="registerUser" class="registration-form">
      <div class="form-field">
        <label for="name">Имя:</label>
        <input id="name" v-model="name" type="text" required class="form-input">
      </div>
      <div class="form-field">
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required class="form-input">
      </div>
      <div class="form-field">
        <label for="password">Пароль:</label>
        <input id="password" v-model="password" type="password" required class="form-input">
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
.registration-section {
  max-width: 450px;
  margin: 50px auto;
  padding: 30px;
  background: linear-gradient(to right, #6dd5ed, #2196f3);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: #fff;
}

.section-title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
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

.label {
  margin-bottom: 5px;
}

.form-input {
  padding: 12px;
  border: 2px solid #fff;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.7);
  color: #333;
}

.form-input:focus {
  background-color: #fff;
  color: #333;
}

.submit-btn {
  padding: 15px;
  background-color: #fff;
  color: #2196f3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.submit-btn:hover {
  background-color: #f8f9fa;
  color: #0d47a1;
}
</style>
