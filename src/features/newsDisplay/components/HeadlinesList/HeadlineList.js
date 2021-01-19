import React, { Component } from 'react'
import './HeadlineList.scss'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { fetchGlobalHeadlines } from '../../redux/newsActions'

class HeadlineList extends Component {
  
  componentDidMount() {
    this.props.fetchGlobalHeadlines('us')
  }

  renderHeadlines = () => {
    if (this.props.globalHeadlines !== []) {
      console.log(this.props.globalHeadlines)
      return this.props.globalHeadlines.map(headline => {
        return (
          <div className='headline-container'>
            <a className='headline-anchor' href={headline.url}>
              <div className='headline-top-container'>
                <span className='headline-title'>{headline.title.split('-').shift()}</span>
                <img className='headline-img' src={headline.urlToImage} alt={headline.title}></img>
              </div>
            </a>
            <div className='headline-bottom-container'>
              <span className='headline-source'>{headline.source.name}</span>
              <span className='headline-time'><Moment fromNow>{headline.publishedAt}</Moment></span>
              {/* <span className='headline-time'>{DayJS(headline.publishedAt).fromNow()}</span> */}
              
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