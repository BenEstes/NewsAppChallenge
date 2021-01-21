import React, { Component } from 'react'
import './HeadlineList.scss'
import Moment from 'react-moment'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchHeadlines, fetchNewPageResults } from '../../redux/newsActions'
import LoadingIndicator from '../../../../shared/components/LoadingIndicator'

class HeadlineList extends Component {

  componentDidMount() {
    this.props.fetchHeadlines(this.props.searchType, this.props.searchTerm, 'us', this.props.currentPage)
    window.addEventListener('scroll', _.debounce(this.handleScroll, 200))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', _.debounce(this.handleScroll, 200))
  }

  handleScroll = () => {
    const { page, currentTotalResults, searchType, searchTerm, fetchHeadlines } = this.props
    const element = document.documentElement
    const height = element.scrollHeight - element.clientHeight
    console.log('hit')

    // When user scrolls 75% of the page and less than 100 requests have been sent.
    if ((document.documentElement.scrollTop) / height * 100 >= 75) {
      if (page >= 5 || currentTotalResults < 20) {
      } else {
        fetchHeadlines(searchType, searchTerm, 'us', page + 1)
      }
    }
  }


  renderHeadlines = () => {
    const { currentHeadlines } = this.props
    if (currentHeadlines !== []) {
      return currentHeadlines.map((headline, index) => {
        return (
          <div className='headline' key={headline.title + index}>
            <a className='headline__anchor' href={headline.url} target='_blank' rel='noreferrer'>
              <div className='headline__topContainer'>
                <span className='headline__topContainer__title'>{headline.title}</span>
                <img className='headline__topContainer__img' src={headline.urlToImage} alt={headline.title}></img>
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


  render() {
    return (
      <div className='headline__list'>
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
    currentPage, searchTerm, 
    searchType 
  } = newsReducer
  return {
    currentHeadlines,
    currentHeadlinesLoading,
    currentTotalResults,
    currentPage,
    searchTerm,
    searchType
  }
}

const mapDispatchToProps = { fetchHeadlines, fetchNewPageResults }

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineList)