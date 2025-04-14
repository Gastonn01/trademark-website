/**
 * Utility function to scroll to the top of the page
 * This can be used in onClick handlers for links
 */
export function scrollToTop() {
  // Use setTimeout to ensure this runs after navigation
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, 100)
}
