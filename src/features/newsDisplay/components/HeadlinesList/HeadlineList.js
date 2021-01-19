import React, { Component } from 'react'
import './HeadlineList.scss'
import Moment from 'react-moment'
import ButtonNavigation from '../ButtonNavigation/ButtonNavigation'
import { connect } from 'react-redux'
import { fetchGlobalHeadlines } from '../../redux/newsActions'

class HeadlineList extends Component {
  
  componentDidMount() {
    this.props.fetchGlobalHeadlines('us', '1')
  }

  renderHeadlines = () => {
    if (this.props.globalHeadlines !== []) {
      return this.props.globalHeadlines.map(headline => {
        return (
          <div className='headline-container' key={headline.title}>
            <a className='headline-anchor' href={headline.url} target='_blank' rel='noreferrer'>
              <div className='headline-top-container'>
                <span className='headline-title'>{headline.title.slice(0, headline.title.lastIndexOf('-'))}</span>
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
      <div className='headline-list'>
        <ButtonNavigation />
        <h1 className='headline-header'>Top-Headlines</h1>
        {this.renderHeadlines()}
      </div>
    )
  }
}
const mapStateToProps = ({ newsReducer }) => {
  const { globalHeadlines, globalHeadlinesLoading } = newsReducer
  return {
    globalHeadlines,
    globalHeadlinesLoading
  }
}

export default connect(mapStateToProps, { fetchGlobalHeadlines })(HeadlineList)