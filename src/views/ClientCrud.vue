<template>
  <div class="client-management-area">
    <h1 class="management-header">Управление клиентами</h1>
    <div v-if="isAdmin" class="add-client-section">
      <input type="text" v-model="newClient.firstName" placeholder="Имя" class="input-style">
      <input type="text" v-model="newClient.lastName" placeholder="Фамилия" class="input-style">
      <button @click="addClient" class="client-add-btn">Добавить клиента</button>
    </div>
    <div class="client-cards-layout">
      <div v-for="client in clients" :key="client.id" class="client-card">
        <div class="card-header">
          <h3>{{ client.firstName }} {{ client.lastName }}</h3>
          <div v-if="isAdmin" class="card-buttons">
            <button @click="startEditClient(client)" class="edit-client-btn">Редактировать</button>
            <button @click="deleteClient(client.id)" class="delete-client-btn">Удалить</button>
          </div>
        </div>
        <div v-if="selectedClient === client.id" class="edit-client-area">
          <input type="text" v-model="client.firstName" class="input-style">
          <input type="text" v-model="client.lastName" class="input-style">
          <button @click="confirmEditClient(client.id)" class="client-save-btn">Сохранить</button>
          <button @click="cancelEditClient(client.id)" class="client-cancel-btn">Отменить</button>
        </div>
      </div>
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
        console.error('Error checking user role:', error);
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
.client-management-area {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #e0e0e0;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.management-header {
  color: #424242;
  font-size: 24px;
  margin-bottom: 25px;
}

.add-client-section {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 15px;
  margin-bottom: 20px;
}

.input-style {
  padding: 10px;
  border: 1px solid #bdbdbd;
  border-radius: 6px;
}

.client-add-btn,
.edit-client-btn,
.delete-client-btn,
.client-save-btn,
.client-cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s;
}

.client-add-btn {
  background-color: #1976d2;
}

.edit-client-btn {
  background-color: #d32f2f;
}

.delete-client-btn {
  background-color: #388e3c;
}

.client-save-btn {
  background-color: #00796b;
}

.client-cancel-btn {
  background-color: #f57c00;
}
</style>