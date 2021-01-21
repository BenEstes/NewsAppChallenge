import React, { Component } from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import { connect } from 'react-redux'
import { fetchHeadlines, setSearchType, clearCurrentHeadlines } from '../../redux/newsActions'


class DropDown extends Component {

  handleClick = (searchType) => {
    this.props.setSearchType(searchType)
    this.props.clearCurrentHeadlines()
    this.props.fetchHeadlines(searchType, this.props.searchTerm, 'us', 1)
  }

  render() {
    const menu = (
      < Menu >
        <Menu.Item onClick={() => this.handleClick('top-headlines')}>
          Top-Headlines
        </Menu.Item>
        <Menu.Item onClick={() => this.handleClick('everything')}>
          Breaking News
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu}>
        <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
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


export default connect(mapStateToProps, mapDispatchToProps)(DropDown)