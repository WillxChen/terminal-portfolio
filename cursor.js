const cursor = document.querySelector(".cursor");
const computedFontSize = window.getComputedStyle(
  document.querySelector("textarea")
).fontSize;

const cursorWidth = parseInt(computedFontSize) * 0.6;
cursor.style.width = `${cursorWidth}px`;

const shiftCursor = (position) => {
  cursor.style.left = `${position * cursorWidth}px`;
};

export default shiftCursor;
