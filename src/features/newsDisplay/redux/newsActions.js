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
// Fetches new headline data from News API
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
// Was being used for pagination and cached data
export const fetchNewPageResults = (page, fob) => (dispatch, getState) => {
  // const secondLastPageResults = getState().newsReducer.previousHeadlines[page-5]
  const lastPageResults = getState().newsReducer.previousHeadlines[page-4]
  const nextPageResults = getState().newsReducer.previousHeadlines[page]
  const secondNextPageResults = getState().newsReducer.previousHeadlines[page+1]
  if (fob === 'front') {
    let headlines
      headlines = lastPageResults
    dispatch({
      type: type.FETCH_NEWPAGE_RESULTSFRONT,
      payload: {
        headlines: headlines,
      }
    })
  } else if (fob === 'back') {
    dispatch({
      type: type.FETCH_NEWPAGE_RESULTSBACK,
      payload: {
        headlines: nextPageResults.concat(secondNextPageResults),
      }
    })
  }
}
// Updates value of search bar
export const setSearchTerm = (searchTerm) => {
  return {
    type: type.SET_SEARCH_TERM,
    payload: {
      searchTerm: searchTerm
    }
  }
}

// Updates endpoint 
export const setSearchType = (searchType) => {
  return {
    type: type.SET_SEARCH_TYPE,
    payload: {
      searchType: searchType
    }
  }
}

// Updates parameter that determines the order data comes in by.
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

export const clearOldHeadlines = (fob) => {
  if(fob === 'front') {
    return {
      type: type.CLEAR_OLD_HEADLINESFRONT
    }
  } else if (fob === 'back') {
    return {
      type: type.CLEAR_OLD_HEADLINESBACK
    }
  }
}