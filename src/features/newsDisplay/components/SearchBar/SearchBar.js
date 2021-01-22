import React, { Component } from 'react'
import { Input, Icon } from 'antd'
import { connect } from 'react-redux'
import { fetchHeadlines, setSearchTerm, clearCurrentHeadlines } from '../../redux/newsActions'
import './SearchBar.scss'

class SearchBar extends Component {

  handleChange = (e) => {
    const searchTerm = e.target.value
    this.props.setSearchTerm(searchTerm)
  }

  handleEnterPress = () => {
    const { clearCurrentHeadlines, fetchHeadlines, searchType, searchTerm } = this.props
    clearCurrentHeadlines()
    fetchHeadlines(searchType, searchTerm, 'us', 1)
  }

  render() {
    return (
      <Input
        value={this.props.searchTerm}
        onChange={this.handleChange}
        onPressEnter={this.handleEnterPress}
        placeholder='Search for topics'
        suffix={<Icon type='search' />}
        style={{ width: '60%', height: '50px' }}
      />

    )
  }
}

const mapStateToProps = ({ newsReducer }) => {
  const { currentPage, searchTerm, searchType } = newsReducer
  return {
    currentPage,
    searchTerm,
    searchType
  }
}

const mapDispatchToProps = { fetchHeadlines, setSearchTerm, clearCurrentHeadlines }

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)