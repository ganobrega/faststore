/** @jsx jsx */
import { FC, Fragment } from 'react'
import { Checkbox, Label, jsx } from '@vtex/store-ui'
import { Link } from 'gatsby'

interface Brands {
  value: string
  quantity: number
  selected: boolean
  linkEncoded: string
}

type Props = {
  brands: Brands[]
}

const BrandSelector: FC<Props> = ({ brands }) => (
  <Fragment>
    <div>Brands</div>
    <ul sx={{ listStyleType: 'none', mx: 0, px: 0 }}>
      {brands.map(({ linkEncoded, value, selected, quantity }, index) => (
        <li key={`brands-selector-${index}`}>
          <Link to={linkEncoded}>
            <Label>
              <Checkbox checked={selected} readOnly />
              {value} ({quantity})
            </Label>
          </Link>
        </li>
      ))}
    </ul>
  </Fragment>
)

export default BrandSelector