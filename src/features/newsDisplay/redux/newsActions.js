import * as type from './newsTypes'

import axiosInstance, { buildRequestConfig } from '../../../shared/api/newsApi'


export const fetchGlobalHeadlinesBegin = () => ({
  type: type.FETCH_GLOBALHEADLINES_BEGIN
})

export const fetchGlobalHeadlinesSucces = (results) => {
  return {
    type: type.FETCH_GLOBALHEADLINES_SUCCESS,
    payload: {
      headlines: results.data.articles,
      totalResults: results.data.totalResults
    }
  }
}

export const fetchGlobalHeadlinesFail = (error) => ({
  type: type.FETCH_GLOBALHEADLINES_FAIL,
  payload: error
})

export const fetchGlobalHeadlines = (country, page) => async dispatch => {
  dispatch(fetchGlobalHeadlinesBegin())
  try {
    const config = buildRequestConfig(country, page, 'get')
    const response = await axiosInstance.request(config)
    console.log(response);
    dispatch(fetchGlobalHeadlinesSucces(response))
  }
  catch (error) {
    console.log(error);
    dispatch(fetchGlobalHeadlinesFail(error))
  }
}

export const fetchNewPageResults = (country, newPage) => dispatch => {
  dispatch(fetchGlobalHeadlines(country, newPage))
  return {
    type: type.FETCH_NEWPAGE_RESULTS,
    payload: newPage
  }
}