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
    this.methods = this.splitMethods()

    if (method && this.methods[method]) {
      this.methods[method]()
    } else if (method === 'letters' || ! method) {
      this.methods.init()
    } else {
      throw Error('Method ' +  method + ' does not exist on Lettering')
    }
  }

  splitMethods() {
    return {
      init: () => {
        return this.inject('char', '')
      },
      words: () => {
        return this.inject('word', /\s/g)
      },
      lines: () => {
        return this.inject('line', /\n/g)
      }
    };
  }

  inject(classname, splitter) {
    // base64 of string 'newLineMark' used
    // to avoid losing `<br>` tags inside `element`
    const nl = 'bmV3TGluZU1hcmsK'
    const re = new RegExp(nl, 'g')

    let text = this.element.textContent

    // fix duplicated spacing chars
    text = text.trim()
      .replace(/\ +/g, ' ')
      .replace(/\s*\n\s*/g, '\n')

    // mark new line positions
    if (splitter !== '') {
      text = text.replace(/\n/g, nl + '\n')
    }

    let split = []
    if (!splitter) {
      split = [...text]
    } else {
      split = text.split(splitter)
    }

    // fix char count on the classname
    let indexOffset = 1

    split.forEach(function(element, index, fragment) {
      if (!splitter && element === '\n') {
        indexOffset--
        fragment[index] = '<br>'
        return
      }

      let joiner = ''
      if (splitter) {
        if (element.indexOf(nl) >= 0) {
          element = element.replace(nl, '')
          joiner = '<br>'
        } else {
          joiner = ' '
        }
      }

      fragment[index] = `<span class="${classname+(index+indexOffset)}" aria-hidden="true">${element}</span>${joiner}`
    });

    this.element.setAttribute('aria-label', text.replace(re, ' '))
    this.element.innerHTML = split.join('');
  }
}
