<template>
  <div class="client-management-panel">
    <h1 class="management-heading">Управление клиентами</h1>
    <div v-if="isAdmin" class="add-client-area">
      <input type="text" v-model="newClient.firstName" placeholder="Имя" class="client-field">
      <input type="text" v-model="newClient.lastName" placeholder="Фамилия" class="client-field">
      <button @click="addClient" class="add-client-btn">Добавить клиента</button>
    </div>
    <div class="clients-grid">
      <div v-for="client in clients" :key="client.id" class="client-box">
        <h2>{{ client.firstName }} {{ client.lastName }}</h2>
        <div v-if="isAdmin" class="client-edit-actions">
          <button @click="startEditClient(client)" class="edit-client-btn">Редактировать</button>
          <button @click="deleteClient(client.id)" class="delete-client-btn">Удалить</button>
        </div>
        <div v-if="selectedClient === client.id" class="client-edit-section">
          <input type="text" v-model="client.firstName" class="client-field">
          <input type="text" v-model="client.lastName" class="client-field">
          <button @click="confirmEditClient(client.id)" class="save-edit-btn">Сохранить</button>
          <button @click="cancelEditClient(client.id)" class="cancel-edit-btn">Отмена</button>
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
.client-management-panel {
  max-width: 950px;
  margin: auto;
  padding: 50px;
  background: #eceff1;
  border-radius: 30px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.management-heading {
  font-size: 30px;
  color: #3949ab;
  margin-bottom: 40px;
}

.add-client-area {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
}

.client-field {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #b0bec5;
  flex-basis: calc(33.333% - 20px);
}

.add-client-btn, .edit-client-btn, .delete-client-btn, .save-edit-btn, .cancel-edit-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: white;
}

.add-client-btn { background-color: #5c6bc0; }
.edit-client-btn { background-color: #42a5f5; }
.delete-client-btn { background-color: #ef5350; }
.save-edit-btn { background-color: #66bb6a; }
.cancel-edit-btn { background-color: #ffa726; }

.clients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.client-box {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.client-edit-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.client-edit-section {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

