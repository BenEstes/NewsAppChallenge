import React from 'react'
import 'antd/dist/antd.css'
import './App.scss'
import HeadlineList from './features/newsDisplay/components/HeadlinesList/HeadlineList'
import SearchBar from './features/newsDisplay/components/SearchBar/SearchBar'
import DropDown from './features/newsDisplay/components/DropDown/DropDown'

function App() {
  return (
    <div className="App">
      <SearchBar />
      <DropDown />
      <HeadlineList />
    </div>
  )
}

export default App
