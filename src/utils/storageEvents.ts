export interface StorageNotification {
  type: string
  content: { id: string; contentType: string }
  timestamp: number
  contentText?: string
}

type Subscriber = (n: StorageNotification) => void

const subscribers = new Set<Subscriber>()

export const storageEvents = {
  publish(n: StorageNotification) {
    subscribers.forEach((fn) => fn(n))
  },
  subscribe(fn: Subscriber) {
    subscribers.add(fn)
    return () => {
      subscribers.delete(fn)
    }
  },
}
