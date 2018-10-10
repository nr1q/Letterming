export default class {
  constructor(element, method) {
    this.element = element
    this.methods = this.setMethods()

    if (method && this.methods[method]) {
      this.methods[method]()
    } else if (method === 'letters' || ! method) {
      this.methods.init()
    } else {
      throw Error('Method ' +  method + ' does not exist on Lettering')
    }
  }

  setMethods() {
    return {
      init: () => {
        return this.inject('char', '')
      },
      words: () => {
        return this.inject('word', ' ')
      },
      lines: () => {
        return this.inject('line', /\n/g)
      }
    };
  }

  inject(classname, splitter) {
    let split
    let text = this.element.textContent.trim()

    if (splitter instanceof RegExp) {
      text = text.replace(/\s*\n\s*/g, "\n")
      split = text.split(splitter)
      splitter = ' '
    } else {
      text = text.replace(/\s+/g, ' ')
      if (!splitter) {
        split = [...text]
      }
      else {
        text = text.replace(/\n/g, ' ')
        split = text.split(splitter)
      }
    }

    let inject = ''

    split.forEach(function(element, index, fragment) {
      fragment[index] = `<span class="${classname+(index+1)}" aria-hidden="true">${element}</span>`
    });

    this.element.setAttribute('aria-label', text)
    this.element.innerHTML = split.join(splitter);
  }
}
