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
.registration-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f8f9fa;
  transition: border 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0,123,255,.25);
}

.submit-btn {
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}

</style>