import React from 'react'
import 'antd/dist/antd.css'
import './App.scss'
import HeadlineList from './features/newsDisplay/components/HeadlinesList/HeadlineList'
import SearchBar from './features/newsDisplay/components/SearchBar/SearchBar'
import DropDownCategory from './features/newsDisplay/components/DropDown/DropDownCategory'
import DropDownSort from './features/newsDisplay/components/DropDown/DropDownSort'

function App() {
  return (
    <div className="app">
      <div className='topBar'>
        <span className='topBar__title'><a className='topBar__title__link' href="https://duckduckgo.com/?va=b&t=hc">Not Google News</a></span>
        <SearchBar />
        <div className='topBar__dropdowns'>
          <DropDownCategory />
          <DropDownSort />
        </div>
      </div>
      <HeadlineList />
    </div>
  )
}

export default App
