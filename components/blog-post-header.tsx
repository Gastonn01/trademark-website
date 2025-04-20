interface BlogPostHeaderProps {
  title: string
  date?: string
  author?: string
  category?: string
  description?: string
  authorTitle?: string
  estimatedReadingTime?: number
}

export function BlogPostHeader({
  title,
  date,
  author,
  category,
  description,
  authorTitle,
  estimatedReadingTime,
}: BlogPostHeaderProps) {
  return (
    <div className="mb-8 p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-2 mt-4">{title}</h1>
      {description && <p className="text-gray-700 mb-4 text-lg">{description}</p>}
      <div className="text-gray-600 text-sm flex flex-wrap items-center">
        {date && (
          <span className="mr-4 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {date}
          </span>
        )}
        {author && (
          <span className="mr-4 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            By {author}
            {authorTitle && <span className="text-gray-500 ml-1">• {authorTitle}</span>}
          </span>
        )}
        {estimatedReadingTime && (
          <span className="mr-4 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20V10"></path>
              <path d="M18 20V4"></path>
              <path d="M6 20v-6"></path>
            </svg>
            {estimatedReadingTime} min read
          </span>
        )}
        {category && (
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Category: {category}
          </span>
        )}
      </div>
    </div>
  )
}
