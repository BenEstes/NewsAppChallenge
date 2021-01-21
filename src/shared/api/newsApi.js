// API Key: ee0346de0cf443f2aec9e0f643d88874
// Riley's API Key: c6a040b412254cb290aa629b83abcf85
// Bestes API : 825841330e1e4dd3bb504aeeb5faaadd
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://newsapi.org/v2/',
  headers: {'Content-Type': 'application/json; charset=utf-8'}
})

export const buildRequestConfig = (searchTerm, country, page, method) => {
  const get = {
    params: {
      q: searchTerm,
      country: country,
      pageSize: 20,
      page: page,
      apiKey: '825841330e1e4dd3bb504aeeb5faaadd'
    },
    method,
  }
  return get
}

export default axiosInstance