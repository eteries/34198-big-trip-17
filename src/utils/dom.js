const highlightElement = (element, isValid) => {
  if (!isValid) {
    element.style.outline = '1px solid red';
    return;
  }

  element.style.outline = null;
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { highlightElement, isEscapeKey };
