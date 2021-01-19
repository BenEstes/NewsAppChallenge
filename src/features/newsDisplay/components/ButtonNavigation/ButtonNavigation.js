import React from 'react'
import { Pagination } from 'antd'
import 'antd/dist/antd.css'

import { connect } from 'react-redux'
import { fetchNewPageResults } from '../../redux/newsActions'



class ButtonNavigation extends React.Component {

  onChange = page => {
    this.props.fetchNewPageResults('us', page)
  }

  render() {
    return (
      <Pagination
        onChange={this.onChange}
        defaultCurrent={1}
        defaultPageSize={20}
        total={this.props.globalTotalResults}
      />
    )
  }
}

const mapStateToProps = ({ newsReducer }) => {
  const { globalTotalResults } = newsReducer
  return {
    globalTotalResults
  }
}

export default connect(mapStateToProps, { fetchNewPageResults })(ButtonNavigation)