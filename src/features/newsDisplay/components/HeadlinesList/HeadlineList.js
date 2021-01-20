import React, { Component } from 'react'
import './HeadlineList.scss'
import Moment from 'react-moment'
import ButtonNavigation from '../ButtonNavigation/ButtonNavigation'
import { connect } from 'react-redux'
import { fetchHeadlines, fetchNewPageResults } from '../../redux/newsActions'

class HeadlineList extends Component {

  componentDidMount() {
    this.props.fetchHeadlines('1')
  }

  handleScroll = e => {
    console.log('hit')
    let element = e.target
    console.log(element.scrollHeight, element.scrollTop);

    if (element.scrollHeight - (element.scrollTop + 200) === element.clientHeight)
    console.log('api would fire here')
      // this.props.fetchNewPageResults()
  }

  renderHeadlines = () => {
    if (this.props.currentHeadlines !== []) {
      return this.props.currentHeadlines.map(headline => {
        return (
          <div className='headline-container' key={headline.title}>
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
      <div className='headline-list' onScroll={this.handleScroll}>
        <ButtonNavigation />
        <h1 className='headline-header'>Top-Headlines</h1>
        {this.renderHeadlines()}
      </div>
    )
  }
}
const mapStateToProps = ({ newsReducer }) => {
  const { currentHeadlines, currentHeadlinesLoading, currentPage } = newsReducer
  return {
    currentHeadlines,
    currentHeadlinesLoading,
    currentPage
  }
}

export default connect(mapStateToProps, { fetchHeadlines, fetchNewPageResults })(HeadlineList)