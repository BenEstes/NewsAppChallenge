import React, { Component } from 'react'
import './HeadlineList.scss'
import Moment from 'react-moment'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchHeadlines, fetchNewPageResults } from '../../redux/newsActions'


class HeadlineList extends Component {


  componentDidMount() {
    
    this.props.fetchHeadlines(this.props.searchTerm, this.props.currentPage)
  }

  screen = React.createRef()

  // calling api request twice when it hits the conditional
  handleScroll = () => {
    console.log(this.screen);
    let element = this.screen.current
    const page = this.props.currentPage
    console.log(((element.scrollTop + element.clientHeight) / element.scrollHeight) * 100)

    // When user hits the bottom of the page
    if (((element.scrollTop + element.clientHeight) / element.scrollHeight) * 100 >= 80) {
      console.log(page + 1)
      console.log('hit');

      this.props.fetchHeadlines(this.props.searchTerm, page + 1)
    }
  }


  renderHeadlines = () => {
    const { currentHeadlines } = this.props
    if (currentHeadlines !== []) {
      return currentHeadlines.map((headline, index) => {
        return (
          <div className='headline-container' key={headline.title + index}>
            <a className='headline-anchor' href={headline.url} target='_blank' rel='noreferrer'>
              <div className='headline-top-container'>
                <span className='headline-title'>
                  {(headline.title.lastIndexOf('-') === -1) ?
                    headline.title :
                    headline.title.slice(0, headline.title.lastIndexOf('-'))}
                </span>
                <img className='headline-img' src={headline.urlToImage} alt={headline.title}></img>
              </div>
            </a>
            <div className='headline-bottom-container'>
              <span className='headline-source'>{headline.source.name}</span>
              <span className='headline-time'><Moment fromNow>{headline.publishedAt}</Moment></span>
            </div>
          </div>
        )
      })
    }
    return null
  }


  render() {
    return (
      <div ref={this.screen} className='headline-list' onScroll={_.debounce(this.handleScroll, 250)}>
        <h1 className='headline-header'>Top-Headlines</h1>
        {this.renderHeadlines()}
      </div>
    )
  }
}
const mapStateToProps = ({ newsReducer }) => {
  const { currentHeadlines, currentHeadlinesLoading, currentPage, searchTerm } = newsReducer
  return {
    currentHeadlines,
    currentHeadlinesLoading,
    currentPage,
    searchTerm
  }
}

const mapDispatchToProps = { fetchHeadlines, fetchNewPageResults }

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineList)