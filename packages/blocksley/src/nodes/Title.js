import { Node } from '@tiptap/core'
import EFrame from '../components/EFrame'
import { Title as TitleBlock } from '../blocks/Title'

export default class Title extends Node {
  name = 'title'
  /*get name () {
    return 'title'
  }*/

  get schema () {
    return {
      attrs: {
        text: {
          default: null
        }
      },
      content: 'inline*',
      group: 'block',
      defining: true,
      draggable: false,
      parseDOM: [{
        tag: 'title',
        getAttrs: dom => ({
          text: dom.getAttribute('text'),
          width: dom.getAttribute('width'),
          height: dom.getAttribute('height'),
          class: dom.getAttribute('class')
        })
      }],
      toDOM: node => ['title', {
        text: node.attrs.text,
        width: node.attrs.width,
        height: node.attrs.height,
        class: node.attrs.class
      }],
      createBlock (node) {
        return new TitleBlock(node.attrs.text, {
          class: node.attrs.class,
          width: node.attrs.width,
          height: node.attrs.height
        })
      }
    }
  }

  // there are some props available
  // `node` is a Prosemirror Node Object
  // `updateAttrs` is a function to update attributes defined in `schema`
  // `view` is the ProseMirror view instance
  // `options` is an array of your extension options
  // `selected`

  get view () {
    return EFrame
  }
  commands ({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }
}
