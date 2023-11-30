<template>
  <div class="custom-client-management">
    <h1 class="custom-heading">Clients</h1>
    <div v-if="isAdmin" class="custom-input-container">
      <input type="text" v-model="newClient.firstName" placeholder="First Name" class="custom-input-field">
      <input type="text" v-model="newClient.lastName" placeholder="Last Name" class="custom-input-field">
      <button @click="addClient" class="custom-add-btn">Add Client</button>
    </div>
    <ul class="custom-client-list">
      <li v-for="client in clients" :key="client.id" class="custom-client-item">
        <div class="custom-client-info">
          <span class="custom-client-name">{{ client.firstName }} {{ client.lastName }}</span>
          <div v-if="isAdmin" class="custom-button-group">
            <button @click="startEditClient(client)" class="custom-edit-btn">Edit</button>
            <button @click="deleteClient(client.id)" class="custom-delete-btn">Delete</button>
          </div>
        </div>
        <div v-if="selectedClient === client.id" class="custom-edit-container">
          <input type="text" v-model="client.firstName" placeholder="First Name" class="custom-edit-input">
          <input type="text" v-model="client.lastName" placeholder="Last Name" class="custom-edit-input">
          <div class="custom-edit-btn-group">
            <button @click="confirmEditClient(client.id)" class="custom-save-btn">Save Changes</button>
            <button @click="cancelEditClient(client.id)" class="custom-cancel-btn">Cancel</button>
          </div>
        </div>
      </li>
    </ul>
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
.custom-client-management {
  max-width: 600px;
  margin: auto;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.custom-heading {
  margin-bottom: 20px;
  color: #333333;
  font-size: 24px;
}

.custom-input-container, .custom-edit-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-input-field, .custom-edit-input {
  padding: 12px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-out;
}

.custom-add-btn, .custom-save-btn {
  background-color: #4CAF50;
  color: white;
}

.custom-edit-btn {
  background-color: #ffc107;
  color: black;
}

.custom-delete-btn {
  background-color: #f44336;
  color: white;
}

.custom-cancel-btn {
  background-color: #9e9e9e;
  color: black;
}

.custom-client-list {
  list-style: none;
  padding: 0;
}

.custom-client-item {
  background: #ffffff;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-client-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-client-name {
  font-weight: bold;
  font-size: 16px;
}

.custom-button-group {
  display: flex;
  gap: 10px;
}

.custom-edit-container {
  margin-top: 10px;
}

.custom-edit-btn-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>