// tests/ProductList.spec.js
import { mount } from '@vue/test-utils'
import ProductList from '@/components/ProductList.vue'
import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'

const products = [
  { id: 1, category: 'Fruit', description: 'Apple', salePrice: 10 },
  { id: 2, category: 'Vegetable', description: 'Carrot', salePrice: 5 },
]

describe('ProductList.vue', () => {
  it('filters products by category', async () => {
    const wrapper = mount(ProductList, {
      global: {
        stubs: ['ProductCard'],
      },
    })

    // Set initial data
    wrapper.vm.products = products
    wrapper.vm.filteredProducts = products
    wrapper.vm.isLoading = false
    wrapper.vm.filterValue = 'fruit'

    // Trigger the applyFilter method
    await wrapper.vm.applyFilter()

    // Wait for the DOM to update
    await nextTick()

    // Assert that the filteredProducts array has been updated correctly
    expect(wrapper.vm.filteredProducts.length).toBe(1)
    expect(wrapper.vm.filteredProducts[0].category).toBe('Fruit')
  })

  it('opens and closes ProductDetails modal', async () => {
    const wrapper = mount(ProductList, {
      global: {
        stubs: ['ProductCard', 'ProductDetails'],
      },
    })
    expect(wrapper.vm.showDetails).toBe(false)
    wrapper.vm.showProductDetails({ id: 1 })
    expect(wrapper.vm.showDetails).toBe(true)
    wrapper.vm.closeDetails()
    expect(wrapper.vm.showDetails).toBe(false)
  })
})
