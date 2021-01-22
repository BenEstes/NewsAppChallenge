import React, { Component } from 'react'
import './HeadlineList.scss'
import Moment from 'react-moment'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchHeadlines, fetchNewPageResults, clearOldHeadlines } from '../../redux/newsActions'
import LoadingIndicator from '../../../../shared/components/LoadingIndicator'

class HeadlineList extends Component {

  componentDidMount() {
    const { searchType, searchTerm, currentPage, sortBy } = this.props
    // Fetching data on first render 
    this.props.fetchHeadlines(searchType, searchTerm, 'us', currentPage, sortBy)
    window.addEventListener('scroll', _.debounce(this.handleScroll, 100))
    document.documentElement.scrollTop = 0
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', _.debounce(this.handleScroll, 100))
  }

  // Event listener callback
  handleScroll = () => {
    const {
      currentPage,
      currentTotalResults,
      previousHeadlines,
      searchType,
      searchTerm,
      sortBy,
      fetchHeadlines,
      fetchNewPageResults,
      clearOldHeadlines
    } = this.props
    const element = document.documentElement
    const height = element.scrollHeight - element.clientHeight

    console.log(element.scrollTop / height);
    // When user scrolls 80% of the page GOING DOWN and less than 100 requests have been sent.
    if ((element.scrollTop) / height * 100 >= 80 && searchTerm) {
      if (currentPage >= 5 || currentTotalResults < 20) {
        // Do nothing
      } else if (currentPage > 2 && currentPage < 5) {
        element.scrollTop = 79 * height / 100
        clearOldHeadlines('front')
        if (previousHeadlines[currentPage]) {
          fetchNewPageResults(currentPage-1, 'back')
        } else {
          fetchHeadlines(searchType, searchTerm, 'us', currentPage + 1, sortBy)
        }
      } else {
        fetchHeadlines(searchType, searchTerm, 'us', currentPage + 1, sortBy)
      }
    }


    // When user scrolls 80%  of the page GOING UP
    if (element.scrollTop / height * 100 <= 20 && searchTerm) {
      if (currentPage <= 3 || currentTotalResults < 20) {
        // Do nothing
      } else if (currentPage > 3 && currentPage <= 5) {
        element.scrollTop = 21 * height / 100
        fetchNewPageResults(currentPage, 'front')
        clearOldHeadlines('back')
      }
    }
  }

  // Rendering a new element for each headline that is returned
  renderHeadlines = () => {
    const { currentHeadlines } = this.props
    if (currentHeadlines !== []) {
      return currentHeadlines.map((headline, index) => {
        return (
          <div className='headline' key={headline.title + index}>
            <a className='headline__anchor' href={headline.url} target='_blank' rel='noreferrer'>
              <div className='headline__topContainer'>
                <span className='headline__topContainer__title'>{headline.title}</span>
                <img className='headline__topContainer__img' src={headline.urlToImage} alt={headline.source.name}></img>
              </div>
            </a>
            <div className='headline__bottomContainer'>
              <span className='headline__bottomContainer__source'>{headline.source.name}</span>
              <span className='headline__bottomContainer__time'><Moment fromNow>{headline.publishedAt}</Moment></span>
            </div>
          </div>
        )
      })
    }
    return null
  }

  // Used to display current sortBy term
  showSortTitle = () => {
    const { sortBy } = this.props
    if (sortBy === 'publishedAt') {
      return <span>Time Published</span>
    } else if (sortBy === 'popularity') {
      return <span>Popularity</span>
    } else if (sortBy === 'relevancy') {
      return <span>Relevancy</span>
    }
  }


  render() {
    return (
      <div className='headline__list'>
        <span className='headline__list__title'>Category: {(this.props.searchType === 'everything') ? 'All News' : 'Top-Headlines'}</span>
        <span className='headline__list__title'>Sorted By: {this.showSortTitle()}</span>
        {this.renderHeadlines()}
        {(this.props.currentHeadlinesLoading) ? <LoadingIndicator /> : null}
      </div>
    )
  }
}
const mapStateToProps = ({ newsReducer }) => {
  const { currentHeadlines,
    currentHeadlinesLoading,
    currentTotalResults,
    previousHeadlines,
    currentPage,
    searchTerm,
    searchType,
    sortBy
  } = newsReducer

  return {
    currentHeadlines,
    currentHeadlinesLoading,
    previousHeadlines,
    currentTotalResults,
    currentPage,
    searchTerm,
    searchType,
    sortBy
  }
}

const mapDispatchToProps = { fetchHeadlines, fetchNewPageResults, clearOldHeadlines }

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineList)