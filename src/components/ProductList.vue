<template>
  <div class="box">
    <div class="topnav">
      <div class="form-field">
        <div class="filter-box">
          <span>
            <!-- SVG icon -->
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
            </svg>
          </span>
          <input
            class="filter-input"
            v-model="filterValue"
            @input="applyFilter"
            placeholder="Filter"
          />
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="isLoading">
      <span class="spinner"></span>
    </div>
    <div v-else-if="filteredProducts.length > 0" class="container responsive-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        :onViewSales="showProductDetails"
      />
    </div>
    <div v-else class="no-result-div">"Opps! No Results Found"</div>
    <ProductDetails v-if="showDetails" :product="selectedProduct" @close="closeDetails" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getProducts } from '@/services/productService.js'
import ProductCard from './ProductCard.vue'
import ProductDetails from './ProductDetails.vue'

export default {
  name: 'ProductList',
  components: { ProductCard, ProductDetails },
  setup() {
    const products = ref([])
    const filteredProducts = ref([])
    const isLoading = ref(false)
    const filterValue = ref('')

    const showDetails = ref(false)
    const selectedProduct = ref(null)

    const showProductDetails = (product) => {
      selectedProduct.value = product
      showDetails.value = true
    }

    const closeDetails = () => {
      showDetails.value = false
      selectedProduct.value = null
    }

    const fetchProducts = async () => {
      isLoading.value = true
      products.value = await getProducts()
      filteredProducts.value = products.value
      isLoading.value = false
    }

    const applyFilter = () => {
      const filter = filterValue.value.trim().toLowerCase()
      if (!filter) {
        filteredProducts.value = products.value
        return
      }
      filteredProducts.value = products.value.filter(
        (item) =>
          (item.category && item.category.toLowerCase().includes(filter)) ||
          (item.description && item.description.toLowerCase().includes(filter)) ||
          (item.salePrice && item.salePrice.toString().toLowerCase().includes(filter)),
      )
    }

    onMounted(fetchProducts)

    return {
      products,
      filteredProducts,
      isLoading,
      filterValue,
      applyFilter,
      showDetails,
      selectedProduct,
      showProductDetails,
      closeDetails,
    }
  },
}
</script>

<style scoped>
.container {
  padding: 24px;
}

.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}
.box {
  display: flex;
  flex-direction: column;
}
.form-field {
  width: 100%;
}
.filter-input {
  padding-bottom: 4px;
  flex: 1;
}
.filter-box {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}
.topnav {
  float: right;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  overflow: hidden;
  background-color: #e9e9e9;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
}
.isLoading {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.no-result-div {
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
  color: red;
  font-weight: bold;
  font-size: 20px;
  margin-top: 50px;
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f8d7da;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin-bottom: 20px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-style: italic;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  transition: transform 0.2s ease;
  box-sizing: border-box;
  z-index: 2000;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 50%;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 600px) {
  .topnav a,
  .topnav {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  .topnav {
    border: 1px solid #ccc;
  }
}
</style>
