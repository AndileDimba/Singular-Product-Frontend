<template>
  <div>
    <div class="product-card">
      <img :src="product.image" alt="Photo of a product" />
      <div class="product-content">
        <br />
        <p class="p-color">Description: {{ product.description }}</p>
        <p class="p-color">Category: {{ product.category }}</p>
        <p class="p1">R {{ product.salePrice }}</p>
      </div>
      <div class="product-actions">
        <button class="view-price-summary-btn mat-action" @click="openDialog">
          View Sales Summary
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, required: true },
    onViewSales: { type: Function, required: true }
  },
  methods: {
    openDialog() {
      this.onViewSales(this.product);
    }
  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid lightgray;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
}

img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.product-content {
  padding: 1rem;
  width: 100%;
}

.p-color {
  color: #4d4d4f;
}

.p1 {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: larger;
}

.product-actions {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 1rem;
}

.view-price-summary-btn {
  background-color: green;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-left: 0.5rem;
  transition: background 0.2s;
}

.view-price-summary-btn:hover {
  background-color: #006400;
}

.mat-action {
  margin-left: 0.5rem;
}
</style>
