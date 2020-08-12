/* eslint-disable no-shadow */
import { graphql, PageProps } from 'gatsby'
import React, { FC } from 'react'

import ErrorBoundary from '../components/ErrorBoundary'
import HybridWrapper from '../components/HybridWrapper'
import Layout from '../components/Layout'
import SearchTemplate from '../components/Search'
import SEO from '../components/SEO/siteMetadata'
import { useQuery } from '../hooks/useQuery'
import SearchProvider from '../providers/Search'
import {
  SearchPageQuery,
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables,
} from './__generated__/SearchPageQuery.graphql'
import { useSearchFilters } from '../hooks/useSearchFilters'

type Props = PageProps<SearchPageQueryQuery, SearchPageQueryQueryVariables>

const SearchPage: FC<Props> = ({
  data: initialData,
  pageContext: { staticPath },
}) => {
  const filters = useSearchFilters()

  const { data } = useQuery<
    SearchPageQueryQuery,
    SearchPageQueryQueryVariables
  >({
    ...SearchPageQuery,
    variables: { ...filters, staticPath: true },
    suspense: true,
    initialData: staticPath ? initialData : undefined,
  })

  if (!data) {
    return <div>Not Found</div>
  }

  return (
    <>
      <SEO title={data.vtex.productSearch!.titleTag!} />
      <SearchTemplate search={data} />
    </>
  )
}

const SearchPageContainer: FC<Props> = (props) => {
  const {
    pageContext: { query, map, staticPath },
  } = props

  return (
    <Layout>
      <SearchProvider filters={{ query, map }}>
        <HybridWrapper
          isPrerendered={staticPath}
          fallback={<div>loading...</div>}
        >
          <ErrorBoundary fallback={<div>Error !!</div>}>
            <SearchPage {...props} />
          </ErrorBoundary>
        </HybridWrapper>
      </SearchProvider>
    </Layout>
  )
}

export const query = graphql`
  query SearchPageQuery($query: String, $map: String, $staticPath: Boolean!) {
    vtex {
      productSearch(query: $query, map: $map, from: 0, to: 9)
        @include(if: $staticPath) {
        products {
          ...ProductSummary_syncProduct
        }
        breadcrumb {
          href
          name
        }
        titleTag
      }
      facets(query: $query, map: $map) @include(if: $staticPath) {
        brands {
          value
          quantity
          selected
          linkEncoded
        }
        categoriesTrees {
          link
          name
          quantity
          children {
            link
            name
            quantity
          }
        }
      }
    }
  }
`

export default SearchPageContainer