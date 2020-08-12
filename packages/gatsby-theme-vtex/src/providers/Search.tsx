import React, { createContext, FC } from 'react'

import { useLocationSearch } from '../hooks/useLocationSearch'
import { Maybe } from '../typings'

export interface SearchOptions {
  query: Maybe<string>
  map: Maybe<string>
}

export const SearchFilterContext = createContext<SearchOptions>(
  undefined as any
)

SearchFilterContext.displayName = 'SearchFilterContext'

interface Props {
  filters?: SearchOptions
}

// Creates a string with as many `c,c` as pathname has
// segments.
// For instance: cozinha/faqueiro-e-talheres would
// generate the string c,c
// TODO: this function may have to change in the future
const createMap = (pathname: string) =>
  new Array(pathname.split('/').length).fill('c').join(',')

const SearchProvider: FC<Props> = ({ children, filters }) => {
  const { params, pathname } = useLocationSearch()
  const value = {
    query: filters?.query ?? pathname.slice(1, pathname.length),
    map: filters?.map ?? params.get('map') ?? createMap(pathname),
  }

  return (
    <SearchFilterContext.Provider value={value}>
      {children}
    </SearchFilterContext.Provider>
  )
}

export default SearchProvider