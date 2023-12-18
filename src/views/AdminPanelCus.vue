<template>
    <div class="customer-management-interface">
      <h1>Управление клиентами</h1>
  
      <div class="customer-form">
        <input type="text" v-model="currentCustomer.surname" placeholder="Фамилия" class="input-field">
        <input type="text" v-model="currentCustomer.given_name" placeholder="Имя" class="input-field">
        <button @click="currentCustomer.customer_id ? updateCustomer() : addCustomer()" class="submit-btn">
          {{ currentCustomer.customer_id ? 'Обновить' : 'Добавить' }}
        </button>
      </div>
  
      <div class="customer-list">
        <div v-for="customer in customers" :key="customer.customer_id" class="customer-card">
          <div>
            <strong>{{ customer.surname }} {{ customer.given_name }}</strong>
          </div>
          <div class="card-actions">
            <button @click="editCustomer(customer)" class="edit-btn">Редактировать</button>
            <button @click="deleteCustomer(customer.customer_id)" class="delete-btn">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        customers: [],
        currentCustomer: {
          customer_id: null,
          surname: '',
          given_name: ''
        }
      };
    },
    created() {
      this.fetchCustomers();
    },
    methods: {
      async fetchCustomers() {
        try {
          const response = await this.$http.get('/customer');
          this.customers = response.data;
        } catch (error) {
          console.error('Error fetching customers:', error);
        }
      },
      async addCustomer() {
        try {
          await this.$http.post('/customer', this.currentCustomer);
          this.fetchCustomers();
          this.resetCurrentCustomer();
        } catch (error) {
          console.error('Error adding customer:', error);
        }
      },
      async updateCustomer() {
        try {
          await this.$http.put(`/customer/${this.currentCustomer.customer_id}`, this.currentCustomer);
          this.fetchCustomers();
          this.resetCurrentCustomer();
        } catch (error) {
          console.error('Error updating customer:', error);
        }
      },
      async deleteCustomer(id) {
        try {
          await this.$http.delete(`/customer/${id}`);
          this.fetchCustomers();
        } catch (error) {
          console.error('Error deleting customer:', error);
        }
      },
      editCustomer(customer) {
        this.currentCustomer = { ...customer };
      },
      resetCurrentCustomer() {
        this.currentCustomer = { customer_id: null, surname: '', given_name: '' };
      }
    }
  };
  </script>
  <style scoped>
  .customer-management-interface {
    max-width: 600px;
    margin: auto;
    padding: 40px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #333; 
  }
  
  .customer-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .input-field {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f8f8f8;
    color: #333;
  }
  
  .submit-btn, .edit-btn, .delete-btn {
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
    background-color: #007bff; 
    color: #fff;
  }
  
  .submit-btn:hover, .edit-btn:hover, .delete-btn:hover {
    background-color: #0056b3;
  }
  
  .customer-list {
    margin-top: 20px;
  }
  
  .customer-card {
    background-color: #f2f2f2; 
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .card-actions {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
  
  .edit-btn {
    background-color: #ffc107; 
    color: #333;
  }
  
  .delete-btn {
    background-color: #dc3545;
    color: #fff;
  }
  </style>