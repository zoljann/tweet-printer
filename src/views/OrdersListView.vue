<script setup lang="ts">
import { ref, onMounted } from 'vue';
import moment from 'moment';
import OrderViewModal from '../components/OrderViewModal.vue';
import { getAllOrders, updateStatusByOrderId } from '../api';

const orders = ref<any[]>([]);
const selectedOrder = ref<any>(null);
const statuses = [
  { value: 'payinCreated', label: 'Započeto plaćanje' },
  { value: 'ordered', label: 'Naručeno' },
  { value: 'paid', label: 'Plaćeno' },
  { value: 'done', label: 'Završeno' },
];

const updateOrderStatus = async (orderId: string, status: string) => {
  const { success, error } = await updateStatusByOrderId(orderId, status);

  if (success) {
    orders.value = await getAllOrders();
    alert(success);
  } else if (error) {
    alert(error);
  }
};

const formatCreatedDate = (date: string) => {
  return moment(date).format('DD.MM.YYYY, HH:mm');
};

onMounted(async () => {
  orders.value = await getAllOrders();
});
</script>

<template>
  <div class="wrapper" v-if="orders.length">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ime i prezime</th>
          <th>Email</th>
          <th>Adresa</th>
          <th>Mobitel</th>
          <th>Ukupno</th>
          <th>Dostava</th>
          <th>Datum</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in orders"
          :key="index"
          :class="{ disabled: item.status === 'done' }"
          @click="selectedOrder = item"
        >
          <td>{{ item._id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.state }}, {{ item.city }}, {{ item.address }}</td>
          <td>{{ item.mobileNumber }}</td>
          <td>{{ item.total }}KM / {{ (item.total * 0.52).toFixed(2) }}€</td>
          <td>
            {{ item.shipping === 'pickup' ? 'Pouzećem' : 'Kartica' }}
          </td>
          <td>{{ formatCreatedDate(item.createdAt) }}</td>
          <td class="select">
            <select
              :disabled="item.status === 'done'"
              v-model="item.status"
              @change="updateOrderStatus(item._id, item.status)"
              @click.stop
            >
              <option v-for="status in statuses" :value="status.value">
                {{ status.label }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>Nema narudžba</div>

  <OrderViewModal
    v-if="selectedOrder"
    :order="selectedOrder"
    @modal-closed="selectedOrder = null"
  />
</template>

<style scoped lang="scss">
.wrapper {
  margin: 1rem;
  display: flex;
  justify-content: center;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  color: tomato;
}

th {
  padding: 12px 15px;
  border: 1px solid white;
}

td {
  padding: 10px;
  border: 1px solid white;
}

tr {
  cursor: pointer;

  &.disabled {
    text-decoration: line-through;
    background-color: rgba(255, 255, 255, 0.164);
  }
}

.select {
  padding: 0;

  select {
    width: 100%;
    height: 2rem;
    border: none;
    background-color: #222222;
    color: tomato;
  }
}

@media screen and (max-width: 768px) {
  tr {
    display: block;
    border-bottom: 10px solid black;
  }

  td,
  th {
    display: block;
    text-align: center;
  }
}
</style>
