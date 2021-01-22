import React, { Component } from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import { connect } from 'react-redux'
import { fetchHeadlines, setSearchType, clearCurrentHeadlines } from '../../redux/newsActions'
import './DropDown.scss'


class DropDownCategory extends Component {

  handleClick = (searchType) => {
    const { searchTerm, setSearchType, clearCurrentHeadlines, fetchHeadlines } = this.props
    // Sets Search type (TopHeadlines or All News)
    setSearchType(searchType)
    // Clears all current headlines leaving user with a fresh page
    clearCurrentHeadlines()
    // Fetches new data with selected searchType and current searchTerm
    fetchHeadlines(searchType, searchTerm, 'us', 1)
  }

  render() {
    const menu = (
      <Menu >
        <Menu.Item tabIndex='0' onClick={() => this.handleClick('top-headlines')}>
          Top-Headlines
        </Menu.Item>
        <Menu.Item tabIndex='0' onClick={() => this.handleClick('everything')}>
          All News
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu}>
        <span tabIndex='0' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Categories <Icon type="down" />
        </span>
      </Dropdown>
    )
  }
}

const mapStateToProps = ({ newsReducer }) => {
  const { searchTerm } = newsReducer
  return {
    searchTerm
  }
}

const mapDispatchToProps = { fetchHeadlines, setSearchType, clearCurrentHeadlines }


export default connect(mapStateToProps, mapDispatchToProps)(DropDownCategory)