const INITIAL_STATE = {
  globalHeadlines: [],
  globalHeadlinesLoading: false,
  globalTotalResults: 0,

  currentPage: 1
}

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'FETCH_GLOBALHEADLINES_BEGIN':
      return { ...state, globalHeadlinesLoading: true }

    case 'FETCH_GLOBALHEADLINES_SUCCESS':
      return {
        ...state,
        globalHeadlines: action.payload.headlines,
        globalTotalResults: action.payload.totalResults,
        globalHeadlinesLoading: false
      }

    case 'FETCH_GLOBALHEADLINES_FAIL':
      return { ...state, globalHeadlinesLoading: false }

    case 'FETCH_NEWPAGE_RESULTS':
      return { ...state, currentPage: action.payload }

    default:
      return state
  }
}

export default newsReducer