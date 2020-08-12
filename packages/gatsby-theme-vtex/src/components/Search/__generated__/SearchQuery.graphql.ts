/**
 * Warning: This is an autogenerated file.
 *
 * Changes in this file won't take effect and will be overwritten
 */

// Base Types
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
type Maybe<T> = T | null | undefined
type Scalars = {
  Boolean: boolean
  String: string
  Float: number
  Int: number
}

// Operation related types
export type SearchQueryQueryVariables = Exact<{
  query: Maybe<Scalars['String']>
  map: Maybe<Scalars['String']>
  from: Maybe<Scalars['Int']>
  to: Maybe<Scalars['Int']>
}>

export type SearchQueryQuery = {
  vtex: {
    productSearch: Maybe<{
      products: Maybe<
        Array<
          Maybe<{
            productId: Maybe<string>
            productName: Maybe<string>
            description: Maybe<string>
            linkText: Maybe<string>
            items: Maybe<
              Array<
                Maybe<{
                  itemId: Maybe<string>
                  images: Maybe<
                    Array<
                      Maybe<{
                        imageUrl: Maybe<string>
                        imageText: Maybe<string>
                      }>
                    >
                  >
                  sellers: Maybe<
                    Array<
                      Maybe<{
                        sellerId: Maybe<string>
                        commertialOffer: Maybe<{
                          AvailableQuantity: Maybe<number>
                          Price: Maybe<number>
                          ListPrice: Maybe<number>
                        }>
                      }>
                    >
                  >
                }>
              >
            >
          }>
        >
      >
    }>
  }
}

// Query Related Code

export const SearchQuery = {
  query:
    'query SearchQuery($query: String, $map: String, $from: Int, $to: Int) {\n  vtex {\n    productSearch(query: $query, map: $map, from: $from, to: $to) {\n      products {\n        productId\n        productName\n        description\n        linkText\n        items {\n          itemId\n          images {\n            imageUrl\n            imageText\n          }\n          sellers {\n            sellerId\n            commertialOffer {\n              AvailableQuantity\n              Price\n              ListPrice\n            }\n          }\n        }\n      }\n    }\n  }\n}\n',
  sha256Hash:
    'f357478ca618fe791e1dcfa5b7526a475cfaf749a3badf1be62b43d5ffd3f8ad',
  operationName: 'SearchQuery',
}