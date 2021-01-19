const INITIAL_STATE = {
  globalHeadlines: [],
  globalHeadlinesLoading: false
}

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'FETCH_GLOBALHEADLINES_BEGIN':
      return { ...state, globalHeadlinesLoading: true }
    
    case 'FETCH_GLOBALHEADLINES_SUCCESS':
      return { ...state, globalHeadlines: action.payload, gloablHeadlinesLoading: false }
    
    case 'FETCH_GLOBALHEADLINES_FAIL':
      return { ...state, globalHeadlinesLoading: false }

    default:
      return state
  }
}

export default newsReducer