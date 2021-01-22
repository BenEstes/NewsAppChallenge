import insertItem from '../helpers/insertItem'

const INITIAL_STATE = {
  currentHeadlines: [],
  currentHeadlinesLoading: false,
  currentTotalResults: 0,

  previousHeadlines: [],

  currentPage: 1,

  searchTerm: 'Biden',
  searchType: 'everything',
  sortBy: 'publishedAt'
}

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'FETCH_HEADLINES_BEGIN':
      return { ...state, currentHeadlinesLoading: true }

    case 'FETCH_HEADLINES_SUCCESS':
      // if (state.previousHeadlines[parseInt(action.payload.page)])
      return {
        ...state,
        currentHeadlines: state.currentHeadlines.concat(action.payload.headlines),
        currentTotalResults: action.payload.totalResults,
        currentHeadlinesLoading: false,
        // Pagination and caching 
        previousHeadlines: insertItem(state.previousHeadlines, action.payload),
        currentPage: parseInt(action.payload.page)
      }

    case 'FETCH_HEADLINES_FAIL':
      return { ...state, currentHeadlinesLoading: false }

    case 'FETCH_NEWPAGE_RESULTSFRONT':
      return {
        ...state,
        currentHeadlines: action.payload.headlines.concat(state.currentHeadlines),
        currentPage: state.currentPage - 1
      }
 
    case 'FETCH_NEWPAGE_RESULTSBACK':
      return {
        ...state,
        currentHeadlines: state.currentHeadlines.concat(action.payload.headlines),
        currentPage: state.currentPage + 1
      }

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload.searchTerm
      }

    case 'SET_SEARCH_TYPE': 
      return {
        ...state,
        searchType: action.payload.searchType
      }

    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload.sortBy
      }

    case 'CLEAR_CURRENT_HEADLINES':
      return {
        ...state,
        currentHeadlines: [],
        currentPage: 1
      }

    case 'CLEAR_OLD_HEADLINESFRONT':
      return {
        ...state,
        currentHeadlines: state.currentHeadlines.slice(20)
      }

    case 'CLEAR_OLD_HEADLINESBACK':
      return {
        ...state,
        currentHeadlines: state.currentHeadlines.slice(0, 59)
      }


    default:
      return state
  }
}

export default newsReducer