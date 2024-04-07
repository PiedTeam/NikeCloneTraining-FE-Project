import React from 'react'
// providers
import { NextUIProvider } from '@nextui-org/react'

// components
import Search from '@components/Search'

function App() {
  return (
    <NextUIProvider>
      <h1>
        Ahihi
        <Search />
      </h1>
    </NextUIProvider>
  )
}

export default App
