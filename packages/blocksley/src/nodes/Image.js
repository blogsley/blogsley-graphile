import { Node } from '@tiptap/core'
import EFrame from '../components/EFrame'
import { Image } from '../blocks/Image'

export default class ImageNode extends Node {
  name = 'image'
  constructor(options = {}) {
    super(options)
  }

  init () {
    return null
  }

  get schema () {
    return {
      attrs: {
        src: {
          default: null
        },
        width: {
          default: 256
        },
        height: {
          default: 256
        },
        class: {
          default: null
        }
      },
      group: 'block',
      selectable: false,
      draggable: true,
      parseDOM: [{
        tag: 'img',
        getAttrs: dom => ({
          src: dom.getAttribute('src'),
          width: dom.getAttribute('width'),
          height: dom.getAttribute('height'),
          class: dom.getAttribute('class')
        })
      }],
      toDOM: node => ['img', {
        src: node.block.src,
        width: node.block.width,
        height: node.block.height,
        class: node.block.class,
        style: 'object-fit:cover'
      }],
      createBlock (node) {
        return new Image({
          src: node.attrs.src,
          class: node.attrs.class,
          width: parseInt(node.attrs.width),
          height: parseInt(node.attrs.height)
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
  commands (cmd) {
    console.log('command')
    console.log(cmd)
    const { type } = cmd
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }
}
