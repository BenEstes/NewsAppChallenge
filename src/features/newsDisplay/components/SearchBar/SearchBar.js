import React from 'react'
import { Input, Icon } from 'antd'
import 'antd/dist/antd.css'

const SearchBar = () => {
  return (
    <Input
      placeholder='Search for topics'
      suffix={<Icon type='search'/>}
      style={{ width: '80%', height: '50px'}}
    />

  )
}

export default SearchBar