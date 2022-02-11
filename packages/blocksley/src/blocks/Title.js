import { Block } from './Block'

export class Title extends Block {
  constructor (options, data) {
    super(options, data)
    if(options && options.value) {
      this.value = options.value
    }
    this.html = this.value ? `<h1>${this.value}</h1>` : 'My Title'
  }
}
Title.type = 'Title'
