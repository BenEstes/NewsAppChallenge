import insertItem from '../helpers/insertItem'

const INITIAL_STATE = {
  currentHeadlines: [],
  currentHeadlinesLoading: false,
  currentTotalResults: 0,

  previousHeadlines: [],

  currentPage: 1
}

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'FETCH_HEADLINES_BEGIN':
      return { ...state, currentHeadlinesLoading: true }

    case 'FETCH_HEADLINES_SUCCESS':
      return {
        ...state,
        currentHeadlines: state.currentHeadlines.concat(action.payload.headlines),
        currentTotalResults: action.payload.totalResults,
        currentHeadlinesLoading: false,
        previousHeadlines: insertItem(state.previousHeadlines, action.payload),
        currentPage: parseInt(action.payload.page)
      }

    case 'FETCH_HEADLINES_FAIL':
      return { ...state, currentHeadlinesLoading: false }

    case 'FETCH_NEWPAGE_RESULTS':
      return {
        ...state,
        currentHeadlines: action.payload.headlines,
        currentPage: action.payload.page
      }


    default:
      return state
  }
}

export default newsReducer