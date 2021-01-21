import React from 'react'
import './App.scss'
import HeadlineList from './features/newsDisplay/components/HeadlinesList/HeadlineList'
import SearchBar from './features/newsDisplay/components/SearchBar/SearchBar'

function App() {
  return (
    <div className="App">
      <SearchBar />
      <HeadlineList />
    </div>
  )
}

export default App
