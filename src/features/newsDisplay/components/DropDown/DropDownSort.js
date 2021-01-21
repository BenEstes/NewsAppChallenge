import React, { Component } from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import { connect } from 'react-redux'
import { fetchHeadlines, clearCurrentHeadlines, setSortBy } from '../../redux/newsActions'
import './DropDown.scss'


class DropDownSort extends Component {

  handleClick = (sortBy) => {
    const { searchTerm, searchType, clearCurrentHeadlines, fetchHeadlines, setSortBy } = this.props
    // Sets Search type (TopHeadlines or All News) 
    setSortBy(sortBy)
    // Clears all current headlines leaving user with a fresh page
    clearCurrentHeadlines()
    // Fetches new data with selected searchType and current searchTerm
    fetchHeadlines(searchType, searchTerm, 'us', 1, sortBy)
  }

  render() {
    const menu = (
      < Menu > 
        <Menu.Item onClick={() => this.handleClick('publishedAt')}>
          Time Published
        </Menu.Item>
        <Menu.Item onClick={() => this.handleClick('relevancy')}>
          Relevancy
        </Menu.Item>
        <Menu.Item onClick={() => this.handleClick('popularity')}>
          Popularity
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu}>
        <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Sort By <Icon type="down" />
        </span>
      </Dropdown>
    )
  }
}

const mapStateToProps = ({ newsReducer }) => {
  const { searchTerm, searchType } = newsReducer
  return {
    searchTerm,
    searchType
  }
}

const mapDispatchToProps = { fetchHeadlines, clearCurrentHeadlines, setSortBy }


export default connect(mapStateToProps, mapDispatchToProps)(DropDownSort)