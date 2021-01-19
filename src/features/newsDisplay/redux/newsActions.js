import * as type from './newsTypes'

import axiosInstance, { buildRequestConfig } from '../../../shared/api/newsApi'


export const fetchGlobalHeadlinesBegin = () => ({
  type: type.FETCH_GLOBALHEADLINES_BEGIN
})

export const fetchGlobalHeadlinesSucces = (results) => {
  const headlines = results.data.articles
  return {
    type: type.FETCH_GLOBALHEADLINES_SUCCESS,
    payload: headlines
  }
}

export const fetchGlobalHeadlinesFail = (error) => ({
  type: type.FETCH_GLOBALHEADLINES_FAIL,
  payload: error
})

export const fetchGlobalHeadlines = () => async dispatch => {
  dispatch(fetchGlobalHeadlinesBegin())
  try {
    const config = buildRequestConfig('us', 'get')
    const response = await axiosInstance.request(config)
    console.log(response);
    dispatch(fetchGlobalHeadlinesSucces(response))
  }
  catch (error) {
    console.log(error);
    dispatch(fetchGlobalHeadlinesFail(error))
  }
}