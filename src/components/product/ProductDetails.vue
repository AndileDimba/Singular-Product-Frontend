<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Product Sales Details</h2>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-field">
          <input
            class="filter-input"
            v-model="filterValue"
            @input="applyFilter"
            placeholder="Filter"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th @click="sortBy('saleId')">Sale Id <span v-if="sortKey==='saleId'">{{ sortDirSymbol }}</span></th>
              <th @click="sortBy('productId')">Product Id <span v-if="sortKey==='productId'">{{ sortDirSymbol }}</span></th>
              <th @click="sortBy('salePrice')">Sale Price <span v-if="sortKey==='salePrice'">{{ sortDirSymbol }}</span></th>
              <th @click="sortBy('saleQty')">Sale Quantity <span v-if="sortKey==='saleQty'">{{ sortDirSymbol }}</span></th>
              <th @click="sortBy('saleDate')">Sale Date <span v-if="sortKey==='saleDate'">{{ sortDirSymbol }}</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in paginatedSales" :key="sale.saleId">
              <td>{{ sale.saleId }}</td>
              <td>{{ sale.productId }}</td>
              <td>{{ sale.salePrice }}</td>
              <td>{{ sale.saleQty }}</td>
              <td>{{ sale.saleDate }}</td>
            </tr>
          </tbody>
        </table>
        <div class="paginator">
          <button @click="prevPage" :disabled="page === 1">Prev</button>
          <span>Page {{ page }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="page === totalPages">Next</button>
          <select v-model.number="pageSize">
            <option v-for="size in [2,5,10,20]" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
        <div v-if="paginatedSales.length === 0" class="no-result-div">No Results Found.</div>
      </div>
      <div class="modal-footer">
        <button class="close-btn" @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { getProductSales } from '@/services/productService.js';

export default {
  name: 'ProductDetails',
  props: {
    product: { type: Object, required: true },
    onClose: { type: Function, required: true }
  },
  setup(props) {
    const sales = ref([]);
    const filterValue = ref('');
    const sortKey = ref('saleId');
    const sortDir = ref('asc');
    const page = ref(1);
    const pageSize = ref(5);

    const fetchSales = async () => {
      sales.value = await getProductSales(props.product.id);
    };

    onMounted(fetchSales);

    const filteredSales = computed(() => {
      if (!filterValue.value) return sales.value;
      const filter = filterValue.value.trim().toLowerCase();
      return sales.value.filter(sale =>
        Object.values(sale).some(val =>
          String(val).toLowerCase().includes(filter)
        )
      );
    });

    const sortedSales = computed(() => {
      return [...filteredSales.value].sort((a, b) => {
        let result = 0;
        if (a[sortKey.value] < b[sortKey.value]) result = -1;
        if (a[sortKey.value] > b[sortKey.value]) result = 1;
        return sortDir.value === 'asc' ? result : -result;
      });
    });

    const totalPages = computed(() =>
      Math.ceil(sortedSales.value.length / pageSize.value) || 1
    );

    const paginatedSales = computed(() => {
      const start = (page.value - 1) * pageSize.value;
      return sortedSales.value.slice(start, start + pageSize.value);
    });

    const sortBy = key => {
      if (sortKey.value === key) {
        sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey.value = key;
        sortDir.value = 'asc';
      }
      page.value = 1;
    };

    const sortDirSymbol = computed(() =>
      sortDir.value === 'asc' ? '▲' : '▼'
    );

    const applyFilter = () => {
      page.value = 1;
    };

    const prevPage = () => {
      if (page.value > 1) page.value--;
    };

    const nextPage = () => {
      if (page.value < totalPages.value) page.value++;
    };

    const close = () => {
      props.onClose();
    };

    return {
      sales,
      filterValue,
      sortKey,
      sortDir,
      page,
      pageSize,
      paginatedSales,
      totalPages,
      sortBy,
      sortDirSymbol,
      applyFilter,
      prevPage,
      nextPage,
      close
    };
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.modal-content {
  background: #fff;
  border-radius: 8px;
  width: 90vw;
  max-width: 800px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
  overflow: hidden;
}
.modal-header, .modal-footer {
  padding: 1rem;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal-body {
  padding: 1rem;
}
.close-btn {
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.close-btn:hover {
  background: #0056b3;
}
.form-field {
  float: right;
  margin-bottom: 1rem;
}
.filter-input {
  padding: 0.5rem;
  width: 200px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}
th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}
th {
  background: #f0f0f0;
  cursor: pointer;
  user-select: none;
}
.paginator {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.no-result-div {
  text-align: center;
  color: #888;
  margin-top: 1rem;
}
</style>
