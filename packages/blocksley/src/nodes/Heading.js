import { Node } from 'prosemirror-model'
//import { setBlockType, textblockTypeInputRule, toggleBlockType } from '@tiptap/core'
import { setBlockType } from 'prosemirror-commands'

export default class Heading extends Node {
  get name () {
    return 'heading'
  }

  get defaultOptions () {
    return {
      levels: [2, 3, 4, 5, 6]
    }
  }

  get schema () {
    return {
      attrs: {
        level: {
          default: 2
        }
      },
      content: 'inline*',
      group: 'block',
      defining: true,
      draggable: false,
      parseDOM: this.options.levels
        .map(level => ({
          tag: `h${level}`,
          attrs: { level }
        })),
      toDOM: node => [`h${node.attrs.level}`, 0]
    }
  }

  commands ({ type, schema }) {
    //return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
    return attrs => toggleNode(type, schema.nodes.paragraph, attrs)
  }

  keys ({ type }) {
    return this.options.levels.reduce((items, level) => ({
      ...items,
      ...{
        [`Shift-Ctrl-${level}`]: setBlockType(type, { level })
      }
    }), {})
  }

  inputRules ({ type }) {
    return this.options.levels.map(level => textblockTypeInputRule(
      new RegExp(`^(#{1,${level}})\\s$`),
      type,
      () => ({ level })
    ))
  }
}
