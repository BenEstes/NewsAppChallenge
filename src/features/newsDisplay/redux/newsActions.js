import * as type from './newsTypes'

import axiosInstance, { buildRequestConfig } from '../../../shared/api/newsApi'


export const fetchHeadlinesBegin = () => ({
  type: type.FETCH_HEADLINES_BEGIN
})

export const fetchHeadlinesSuccess = (results) => {
  console.log(results)
  return {
    type: type.FETCH_HEADLINES_SUCCESS,
    payload: {
      headlines: results.data.articles,
      totalResults: results.data.totalResults,
      page: results.config.params.page
    }
  }
}

export const fetchHeadlinesFail = (error) => ({
  type: type.FETCH_HEADLINES_FAIL,
  payload: error
})

export const fetchHeadlines = (page) => async dispatch => {
  dispatch(fetchHeadlinesBegin())
  try {
    const config = buildRequestConfig(page, 'get')
    const response = await axiosInstance.request(config)
    dispatch(fetchHeadlinesSuccess(response))
  }
  catch (error) {
    console.log(error);
    dispatch(fetchHeadlinesFail(error))
  }
}

export const fetchNewPageResults = (page) => (dispatch, getState) => {
    dispatch({
      type: type.FETCH_NEWPAGE_RESULTS,
      payload: {
        page: page,
        headlines: getState().newsReducer.previousHeadlines[page - 1]
      }
    })
  }