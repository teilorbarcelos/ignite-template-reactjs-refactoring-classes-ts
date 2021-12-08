import React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { FoodsProvider } from './contexts/FoodsContext'

render(
  <FoodsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FoodsProvider>,
  document.getElementById('root')
)
