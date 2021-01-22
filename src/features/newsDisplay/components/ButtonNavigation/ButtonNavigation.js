import React from 'react'
import { Pagination } from 'antd'
import 'antd/dist/antd.css'

import { connect } from 'react-redux'
import { fetchHeadlines, fetchNewPageResults } from '../../redux/newsActions'



class ButtonNavigation extends React.Component {

  onChange = (page) => {
    console.log(page, this.props.currentPage);
    if (page === this.props.currentPage) {
      return null
    } else if (page > this.props.currentPage) {
      this.props.fetchHeadlines(page)
    } else if (page < this.props.currentPage) {
      this.props.fetchNewPageResults(page)
    }
  }

  render() {
    return (
      <Pagination
        onChange={this.onChange}
        defaultCurrent={1}
        defaultPageSize={20}
        total={(this.props.currentTotalResults > 100) ? 100 : this.props.currentTotalResults}
      />
    )
  }
}

const mapStateToProps = ({ newsReducer }) => {
  const { currentHeadlines, currentTotalResults, previousHeadlines, currentPage } = newsReducer
  return {
    currentHeadlines,
    currentTotalResults,
    previousHeadlines,
    currentPage
  }
}

const mapDispatchToProps = { fetchHeadlines, fetchNewPageResults }

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNavigation)