// Utility function to ensure consistent blog article formatting
export const standardizeBlogFormatting = (element: HTMLElement) => {
  // Ensure proper spacing for headings
  const headings = element.querySelectorAll("h1, h2, h3, h4, h5, h6")
  headings.forEach((heading) => {
    heading.classList.add("mt-8", "mb-4")
  })

  // Ensure proper spacing for paragraphs
  const paragraphs = element.querySelectorAll("p")
  paragraphs.forEach((paragraph) => {
    paragraph.classList.add("mb-4")
  })

  // Ensure proper spacing for lists
  const lists = element.querySelectorAll("ul, ol")
  lists.forEach((list) => {
    list.classList.add("mb-6", "space-y-2")
    if (list.tagName === "UL") list.classList.add("list-disc")
    if (list.tagName === "OL") list.classList.add("list-decimal")
    list.classList.add("pl-6")
  })

  // Ensure proper spacing for list items
  const listItems = element.querySelectorAll("li")
  listItems.forEach((item) => {
    item.classList.add("mb-2")
  })
}
