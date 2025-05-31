// tests/productService.spec.js
import axios from 'axios'
import { getProductSales } from '@/services/productService.js'
import { describe, it, expect, vi } from 'vitest'

vi.mock('axios')

describe('productService', () => {
  it('fetches product sales', async () => {
    const mockData = [{ saleId: 1, productId: 1 }]
    axios.get.mockResolvedValue({ data: mockData })
    const result = await getProductSales(1)
    expect(result).toEqual(mockData)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5108/api/Product/product/1')
  })
})
