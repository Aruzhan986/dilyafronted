<template>
  <div class="client-dashboard">
    <h1 class="dashboard-title">Управление Клиентами</h1>
    <div v-if="isAdmin" class="new-client-section">
      <input type="text" v-model="newClient.firstName" placeholder="Имя" class="input-style">
      <input type="text" v-model="newClient.lastName" placeholder="Фамилия" class="input-style">
      <button @click="addClient" class="btn-style add-client-btn">Добавить Клиента</button>
    </div>
    <div class="client-cards-container">
      <div v-for="client in clients" :key="client.id" class="client-card">
        <div class="client-details">
          <h3 class="client-name">{{ client.firstName }} {{ client.lastName }}</h3>
          <div v-if="isAdmin" class="client-card-actions">
            <button @click="startEditClient(client)" class="btn-style edit-client-btn">Редактировать</button>
            <button @click="deleteClient(client.id)" class="btn-style delete-client-btn">Удалить</button>
          </div>
        </div>
        <div v-if="selectedClient === client.id" class="edit-client-section">
          <input type="text" v-model="client.firstName" placeholder="Имя" class="input-style">
          <input type="text" v-model="client.lastName" placeholder="Фамилия" class="input-style">
          <button @click="confirmEditClient(client.id)" class="btn-style save-changes-btn">Сохранить</button>
          <button @click="cancelEditClient(client.id)" class="btn-style cancel-changes-btn">Отменить</button>
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
.client-dashboard {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.dashboard-title {
  text-align: center;
  color: #1a237e;
  font-size: 24px;
  margin-bottom: 20px;
}

.new-client-section, .edit-client-section {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
}

.input-style {
  padding: 10px;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  flex-grow: 1;
}

.btn-style {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: white;
}

.add-client-btn { background-color: #5c6bc0; }
.edit-client-btn { background-color: #42a5f5; }
.delete-client-btn { background-color: #ef5350; }
.save-changes-btn { background-color: #66bb6a; }
.cancel-changes-btn { background-color: #ffa726; }

.client-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.client-card {
  background: #eceff1;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.client-details h3 {
  color: #424242;
  margin-bottom: 10px;
}

.client-card-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
