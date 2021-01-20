// API Key: ee0346de0cf443f2aec9e0f643d88874 //KEY HAS TOO MANY REQUESTS
// Riley's API Key: c6a040b412254cb290aa629b83abcf85
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://newsapi.org/v2/everything?q=trump&apiKey=c6a040b412254cb290aa629b83abcf85',
  headers: {'Content-Type': 'application/json; charset=utf-8'}
})

export const buildRequestConfig = (page, method) => {
  const request = {
    params: {
      pageSize: 20,
      page: page
    },
    method,
  }
  return request
}

export default axiosInstance