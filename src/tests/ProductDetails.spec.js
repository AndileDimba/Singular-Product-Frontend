import { mount } from '@vue/test-utils'
import ProductDetails from '@/components/ProductDetails.vue'
import { getProductSales } from '@/services/productService.js'
import { describe, it, expect, vi } from 'vitest'

describe('ProductDetails.vue', () => {
  it('renders sales table headers and empty state', () => {
    const product = { id: 1, category: 'Fruit', description: 'Apples', salePrice: 10 }
    const wrapper = mount(ProductDetails, {
      props: {
        product,
        onClose: () => {}
      }
    })

    // Check for table headers
    expect(wrapper.text()).toContain('Sale Id')
    expect(wrapper.text()).toContain('Product Id')
    expect(wrapper.text()).toContain('Sale Price')
    expect(wrapper.text()).toContain('Sale Quantity')
    expect(wrapper.text()).toContain('Sale Date')

    // Check for empty state
    expect(wrapper.text()).toContain('No Results Found.')
  })
})

// 1. Mock the module
vi.mock('@/services/productService.js', () => ({
  getProductSales: vi.fn()
}))

describe('ProductDetails.vue', () => {
  it('renders sales data in the table', async () => {
    // 3. Set the mock implementation
    getProductSales.mockResolvedValue([
      { saleId: 1, productId: 1, salePrice: 10, saleQty: 5, saleDate: '2025-05-08' }
    ])

    const product = { id: 1, category: 'Fruit', description: 'Apple', salePrice: 10 }
    const wrapper = mount(ProductDetails, {
      props: {
        product,
        onClose: () => {}
      }
    })

    // Wait for the component to finish loading sales data
    await new Promise(resolve => setTimeout(resolve, 0))

    // Assert that the sales data appears in the table
    expect(wrapper.text()).toContain('1') // saleId
    expect(wrapper.text()).toContain('10') // salePrice
    expect(wrapper.text()).toContain('5') // saleQty
    expect(wrapper.text()).toContain('2025-05-08') // saleDate
  })
})
