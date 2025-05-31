// tests/ProductCard.spec.js
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
import { describe, it, expect } from 'vitest'

describe('ProductCard.vue', () => {
  it('renders product info', () => {
    const product = { id: 1, category: 'Fruit', description: 'Apple', salePrice: 10 }
    const wrapper = mount(ProductCard, {
      props: {
        product,
        onViewSales: () => {}, // Mock function for onViewSales
      },
    })
    expect(wrapper.text()).toContain('Apple')
    expect(wrapper.text()).toContain('Fruit')
    expect(wrapper.text()).toContain('10')
  })
})
