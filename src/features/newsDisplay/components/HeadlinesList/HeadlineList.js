import React, { Component } from 'react'
import './HeadlineList.scss'
import Moment from 'react-moment'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchHeadlines, fetchNewPageResults } from '../../redux/newsActions'
import LoadingIndicator from '../../../../shared/components/LoadingIndicator'
import newsReducer from '../../redux/newsReducers'

class HeadlineList extends Component {

  componentDidMount() {
    // Fetching data on first render
    this.props.fetchHeadlines(this.props.searchType, this.props.searchTerm, 'us', this.props.currentPage, this.props.sortBy)
    window.addEventListener('scroll', _.throttle(this.handleScroll, 200))
    document.documentElement.scrollTop = 0
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', _.throttle(this.handleScroll, 200))
  }

  handleScroll = () => {
    const { currentPage, currentTotalResults, searchType, searchTerm, sortBy, fetchHeadlines } = this.props
    const element = document.documentElement
    const height = element.scrollHeight - element.clientHeight
    

    // When user scrolls 75% of the page and less than 100 requests have been sent.
    if ((document.documentElement.scrollTop) / height * 100 >= 75) {
      if (currentPage >= 5 || currentTotalResults < 20) {
      } else {
        fetchHeadlines(searchType, searchTerm, 'us', currentPage + 1, sortBy)
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

  showSortTitle = () => {
    const { sortBy } = this.props
    if(sortBy === 'publishedAt'){
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
        {(this.props.currentHeadlinesLoading) ? <LoadingIndicator /> : null }
      </div>
    )
  }
}
const mapStateToProps = ({ newsReducer }) => {
  const { currentHeadlines, 
    currentHeadlinesLoading, 
    currentTotalResults, 
    currentPage, 
    searchTerm, 
    searchType,
    sortBy
  } = newsReducer
  return {
    currentHeadlines,
    currentHeadlinesLoading,
    currentTotalResults,
    currentPage,
    searchTerm,
    searchType,
    sortBy
  }
}

const mapDispatchToProps = { fetchHeadlines, fetchNewPageResults }

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineList)