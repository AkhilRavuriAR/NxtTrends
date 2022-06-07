import React from 'react'

const SavedproductsContext = React.createContext({
  ItemsinCart: [],
  changeItemsinCart: () => {},
})

export default SavedproductsContext
