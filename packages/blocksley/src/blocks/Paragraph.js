import { Rich } from './Rich'
import { Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export class Paragraph extends Rich {
  constructor (options, data) {
    super(options, data)
    if (options && options.value) {
      this.html = '<p>' + options.value + '</p>'
    }
    this.editor = new Editor({
      content: this.html,
      extensions: [
        StarterKit,
      ]
    })
    this.content = this.editor.getJSON()
  }
}
Paragraph.type = 'Paragraph'
