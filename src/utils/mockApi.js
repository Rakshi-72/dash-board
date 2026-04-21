import axios from 'axios'
import { orders, products, transactions, users } from '../data/mockData'

const delay = (value) => new Promise((resolve) => setTimeout(() => resolve({ data: value }), 550))
const maybeFail = async (promise) => {
  if (Math.random() < 0.03) {
    throw new Error('Mock API transient error. Please retry.')
  }
  return promise
}

export const http = axios.create({ baseURL: '/mock-api' })

export const api = {
  getUsers: () => maybeFail(delay(users)),
  getProducts: () => maybeFail(delay(products)),
  getOrders: () => maybeFail(delay(orders)),
  getTransactions: () => maybeFail(delay(transactions)),
}
