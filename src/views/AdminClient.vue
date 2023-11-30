<template>
  <div class="client-management">
    <h1>Клиенты</h1>
    <div v-if="isAdmin" class="input-container">
      <input type="text" v-model="newClient.firstName" placeholder="Имя" class="input-field">
      <input type="text" v-model="newClient.lastName" placeholder="Фамилия" class="input-field">
      <button @click="addClient" class="add-btn">Добавить Клиента</button>
    </div>
    <ul class="client-list">
      <li v-for="client in clients" :key="client.id" class="client-item">
        {{ client.firstName }} {{ client.lastName }}
        <div v-if="isAdmin" class="button-group">
          <button @click="startEditClient(client)" class="edit-btn">Редактировать</button>
          <button @click="deleteClient(client.id)" class="delete-btn">Удалить</button>
        </div>
      </li>
    </ul>
    <div v-if="selectedClient" class="edit-container">
      <input type="text" v-model="selectedClient.firstName" placeholder="Имя" class="input-field">
      <input type="text" v-model="selectedClient.lastName" placeholder="Фамилия" class="input-field">
      <button @click="confirmEditClient" class="save-btn">Сохранить изменения</button>
      <button @click="cancelEditClient" class="cancel-btn">Отменить</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clients: [],
      newClient: {
        firstName: '',
        lastName: ''
      },
      selectedClient: null,
      isAdmin: false,
    };
  },
  created() {
    this.checkUserRoleAndLoadClients();
  },
  methods: {
    async checkUserRoleAndLoadClients() {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const rolesResponse = await this.$http.get('/roles', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.isAdmin = rolesResponse.data.some(role => role.name === 'Admin');
        this.loadClients();
      } catch (error) {
        console.error('Ошибка при проверке роли пользователя:', error);
      }
    },
    async loadClients() {
      try {
        const response = await this.$http.get('/client/clients');
        this.clients = response.data;
      } catch (error) {
        console.error('Ошибка загрузки клиентов:', error);
      }
    },
    async addClient() {
      const token = localStorage.getItem('authToken');
      try {
        await this.$http.post('/client/clients', this.newClient, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadClients();
        this.newClient = { firstName: '', lastName: '' };
      } catch (error) {
        console.error('Ошибка добавления клиента:', error);
      }
    },
    startEditClient(client) {
      this.selectedClient = { ...client };
    },
    async confirmEditClient() {
      const token = localStorage.getItem('authToken');
      try {
        await this.$http.put(`/client/clients/${this.selectedClient.id}`, this.selectedClient, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadClients();
        this.selectedClient = null;
      } catch (error) {
        console.error('Ошибка редактирования клиента:', error);
      }
    },
    cancelEditClient() {
      this.selectedClient = null;
    },
    async deleteClient(id) {
      const token = localStorage.getItem('authToken');
      try {
        await this.$http.delete(`/client/clients/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadClients();
      } catch (error) {
        console.error('Ошибка удаления клиента:', error);
      }
    },
  },
};
</script>
  <style>
  .category-management {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
  }
  
  .input-container, .edit-container {
    margin-bottom: 20px;
  }
  
  .input-field {
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-btn, .save-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .edit-btn {
    background-color: #ffc107;
    color: black;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
  }
  
  .cancel-btn {
    background-color: #9e9e9e;
    color: black;
  }
  
  .category-list {
    list-style: none;
    padding: 0;
  }
  
  .category-item {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .button-group {
    display: flex;
    gap: 10px;
  }
  </style>