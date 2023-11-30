<template>
  <div class="client-management-container">
    <h1 class="management-heading">Clients Dashboard</h1>
    <div v-if="isAdmin" class="add-client-form">
      <input type="text" v-model="newClient.firstName" placeholder="First Name" class="client-input">
      <input type="text" v-model="newClient.lastName" placeholder="Last Name" class="client-input">
      <button @click="addClient" class="action-btn add-btn">Add Client</button>
    </div>
    <div class="client-list">
      <div v-for="client in clients" :key="client.id" class="client-card">
        <div class="client-info">
          <h3>{{ client.firstName }} {{ client.lastName }}</h3>
          <div v-if="isAdmin" class="client-actions">
            <button @click="startEditClient(client)" class="action-btn edit-btn">Edit</button>
            <button @click="deleteClient(client.id)" class="action-btn delete-btn">Delete</button>
          </div>
        </div>
        <div v-if="selectedClient === client.id" class="edit-client-form">
          <input type="text" v-model="client.firstName" placeholder="First Name" class="client-input">
          <input type="text" v-model="client.lastName" placeholder="Last Name" class="client-input">
          <button @click="confirmEditClient(client.id)" class="action-btn save-btn">Save Changes</button>
          <button @click="cancelEditClient(client.id)" class="action-btn cancel-btn">Cancel</button>
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
.client-management-container {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  background: #eef1f5;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.management-heading {
  color: #2c3e50;
  font-size: 26px;
  margin-bottom: 30px;
}

.add-client-form, .edit-client-form {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.client-input {
  padding: 10px;
  border: 2px solid #90a4ae;
  border-radius: 6px;
  flex-grow: 1;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.add-btn { background-color: #5cb85c; color: white; }
.edit-btn { background-color: #5bc0de; color: white; }
.delete-btn { background-color: #d9534f; color: white; }
.save-btn { background-color: #5cb85c; color: white; }
.cancel-btn { background-color: #f0ad4e; color: white; }

.client-list {
  display: grid;
  gap: 20px;
}

.client-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.client-info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.client-actions {
  display: flex;
  gap: 10px;
}
</style>
