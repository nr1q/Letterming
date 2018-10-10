/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/ for more details.
 */

/**
 * Lettering 0.1.0
 *
 * Inspired on the original Lettering.js jQuery plugin
 * https://github.com/davatron5000/Lettering.js
 */
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
