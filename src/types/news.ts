export interface WhatsNewItem {
  id: string
  title: string
  description: string
  descriptionHtml: string
  url: string
  publishedAt: string
  updatedAt: string
  categories: string[]
  services: string[]
  tags: string[]
  isNew: boolean
}

export interface WhatsNewFeed {
  lastUpdated: string
  itemCount: number
  items: WhatsNewItem[]
}
