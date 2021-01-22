import * as type from './newsTypes'

import axiosInstance, { buildRequestConfig } from '../../../shared/api/newsApi'


export const fetchHeadlinesBegin = () => ({
  type: type.FETCH_HEADLINES_BEGIN
})

export const fetchHeadlinesSuccess = (results) => {
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

export const fetchHeadlines = (searchType, searchTerm, country, page, sortBy) => async dispatch => {
  dispatch(fetchHeadlinesBegin())
  try {
    let config = buildRequestConfig(searchTerm, country, page, sortBy, 'get')
    // API Can't use country parameter with everything endpoint, 
    // If eveything endpoint is selected then country gets passed as null
    if(searchType === 'everything'){
      config = buildRequestConfig(searchTerm, null, page, sortBy, 'get')
    }
    const response = await axiosInstance.get(searchType, config)
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

export const setSearchTerm = (searchTerm) => {
  return {
    type: type.SET_SEARCH_TERM,
    payload: {
      searchTerm: searchTerm
    }
  }
}

export const setSearchType = (searchType) => {
  return {
    type: type.SET_SEARCH_TYPE,
    payload: {
      searchType: searchType
    }
  }
}

export const setSortBy = (sortBy) => {
  return {
    type: type.SET_SORT_BY,
    payload: {
      sortBy: sortBy
    }
  }
}

export const clearCurrentHeadlines = () => {
  return {
    type: type.CLEAR_CURRENT_HEADLINES,
  }
}