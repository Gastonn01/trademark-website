// Mock data for when the database is unavailable
export function getMockSearchData(status?: string) {
  const mockData = [
    {
      id: "mock-1",
      form_type: "free-search",
      search_data: {
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        trademarkName: "MockBrand",
        goodsAndServices: "Software services",
      },
      created_at: new Date().toISOString(),
      status: "pending",
    },
    {
      id: "mock-2",
      form_type: "free-search",
      search_data: {
        name: "Jane",
        surname: "Smith",
        email: "jane.smith@example.com",
        trademarkName: "TechSolutions",
        goodsAndServices: "IT consulting",
      },
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      status: "completed",
    },
    {
      id: "mock-3",
      form_type: "free-search",
      search_data: {
        name: "Carlos",
        surname: "Rodriguez",
        email: "carlos@example.com",
        trademarkName: "InnovaTech",
        goodsAndServices: "Technology services",
      },
      created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      status: "processing",
    },
    {
      id: "mock-4",
      form_type: "free-search",
      search_data: {
        name: "Maria",
        surname: "Garcia",
        email: "maria@example.com",
        trademarkName: "FashionStyle",
        goodsAndServices: "Clothing and accessories",
      },
      created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      status: "rejected",
    },
  ]

  // Filter by status if provided
  if (status && status !== "all") {
    return mockData.filter((item) => item.status === status)
  }

  return mockData
}
