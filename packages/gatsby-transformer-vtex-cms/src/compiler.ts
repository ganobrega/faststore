import assert from 'assert'

import { Block } from './cms'

interface RenderMetaInfo {
  imports: Map<string, string> // components used during rendering
}

const parseBlockName = (name: string) => {
  const splitted = name.split('/')

  if (splitted.length === 1) {
    return {
      component: splitted[0],
    }
  }

  const dependency = splitted.slice(0, splitted.length - 1).join('/')
  const component = splitted[splitted.length - 1]
  return {
    dependency,
    component,
  }
}

export class BlockDOM {
  protected meta: RenderMetaInfo

  constructor(protected blocks: Block[]) {
    this.meta = {
      imports: new Map(),
    }
  }

  public renderToString = (): string => {
    const blocksStr = this.renderBlocksToString(this.blocks)
    const imports = this.renderImportsToString()

    return `
      import React, { FC, Fragment } from 'react'

      ${imports}

      const CMSAutogenPage: FC = () => (
        ${blocksStr}
      )

      export default CMSAutogenPage
    `
  }

  protected renderImportsToString = () => {
    let imports = ''
    for (const [component, dep] of this.meta.imports) {
      const statement = `import ${component} from '${dep}'`
      imports = `${imports}\n${statement}`
    }
    return imports
  }

  protected renderBlocksToString = (blocks: Block[]) => `
    <Fragment>
      ${blocks.map((b) => this.renderBlockToString(b)).join('\n')}
    </Fragment>
  `

  protected renderBlockToString = (block: Block) => {
    const { name, props } = block
    const { component, dependency } = parseBlockName(name)
    const propsStr = this.propsToString(props)

    // Extract meta info from block

    // Sometimes the component is just a <div> or some other
    // builtin component. Let's not import a div in import
    // statements
    if (dependency) {
      // Add block into page imports
      this.meta.imports.set(component, name)
    }

    return `<${component} ${propsStr}></${component}>`
  }

  protected propsToString = (props: any = {}): string =>
    Object.keys(props).reduce((acc, propName) => {
      const prop = props[propName]
      let propStr = ''
      if (typeof prop === 'string') {
        propStr = `"${prop}"`
      } else if (typeof prop === 'number' || typeof prop === 'boolean') {
        propStr = `${prop}`
      } else if (typeof prop === 'object') {
        propStr = `{${JSON.stringify(prop)}}`
      } else {
        throw new Error(
          `Unknown type ${typeof prop} while generating code for prop ${propName}`
        )
      }
      return `${acc} ${propName}=${propStr}`
    }, '')
}
