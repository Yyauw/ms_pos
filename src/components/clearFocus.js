export const clearFocus = () => {
  if (
    document.activeElement &&
    typeof document.activeElement.blur === "function"
  ) {
    console.log("Clearing focus from active element");
    document.activeElement.blur();
  }
};
// This function clears the focus from the currently active element in the document.
