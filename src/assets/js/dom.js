export function addClass (el, className) {
  if(hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')

  return reg.test(el.className)
}

//获取dom自定义属性的值，或者给dom元素的属性赋值
export function getData (el, name, val) {
  const PREFIX = 'data-'
  const NAME = PREFIX + name
  if (val) {
    return el.setAttribute(NAME, val)
  } else {
    return el.getAttribute(NAME)
  }
}