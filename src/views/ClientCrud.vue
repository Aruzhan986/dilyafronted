<template>
  <div class="client-management-area">
    <h1 class="management-header">Клиенты</h1>
    <div v-if="isAdmin" class="add-client-form">
      <input type="text" v-model="newClient.firstName" placeholder="Имя" class="client-input">
      <input type="text" v-model="newClient.lastName" placeholder="Фамилия" class="client-input">
      <button @click="addClient" class="client-add-button">Добавить</button>
    </div>
    <div class="client-list">
      <div v-for="client in clients" :key="client.id" class="client-item">
        <div class="client-info">
          <h3>{{ client.firstName }} {{ client.lastName }}</h3>
          <div v-if="isAdmin" class="client-actions">
            <button @click="startEditClient(client)" class="client-edit-btn">Редактировать</button>
            <button @click="deleteClient(client.id)" class="client-delete-btn">Удалить</button>
          </div>
        </div>
        <div v-if="selectedClient === client.id" class="client-edit-form">
          <input type="text" v-model="client.firstName" class="client-input">
          <input type="text" v-model="client.lastName" class="client-input">
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
<style scoped>
.client-management-area {
  max-width: 900px;
  margin: 40px auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  text-align: center;
}

.management-header {
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
}

.add-client-form, .client-edit-form {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.client-input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 200px;
}

.client-add-button, .client-edit-btn, .client-delete-btn, .client-save-btn, .client-cancel-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
}

.client-add-button { background-color: #4CAF50; }
.client-edit-btn { background-color: #FFC107; }
.client-delete-btn { background-color: #F44336; }
.client-save-btn { background-color: #4CAF50; }
.client-cancel-btn { background-color: #9E9E9E; }

.client-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.client-item {
  background-color: #e3f2fd;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.client-info h3 {
  color: #333;
  margin-bottom: 15px;
}

.client-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>

