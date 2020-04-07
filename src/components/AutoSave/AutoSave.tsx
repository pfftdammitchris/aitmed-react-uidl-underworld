import React from 'react'

export type Cache = Record<string, StoredData>

export interface AutoSaveProps {
  autoSave?: boolean
  pageName?: string
  storedKey: string
  yml?: string
  storedObj?: any
  render?: (options: { cache: null | Cache; id: string }) => any
  children?:
    | React.ReactNode
    | ((options: { cache: null | Cache; id: string }) => any)
  interval?: number
}

export function getKey(key: string) {
  return `autosave-${key}`
}

export function createStorageStamp(
  pageName: string | undefined,
  data: any,
): string {
  const date = String(new Date().toISOString())
  const formattedData: StoredData = {
    [date]: { pageName, data },
  }
  return JSON.stringify(formattedData)
}

export interface StoredData {
  [dateISOString: string]: {
    pageName: string | undefined
    data: any // remember this has to be a string when it gets to local storage
  }
}

export function cutBy(num: number = 10, obj: any) {
  let keys: string[] = typeof obj === 'object' ? Object.keys(obj) : []
  keys = keys.reverse()
  if (keys.length > num) keys.length = num
  return keys.reduce((acc, key: string) => {
    acc[key] = obj[key]
    return acc
  }, {})
}

function AutoSave({
  autoSave = true,
  storedKey = '',
  storedObj,
  render,
  children,
  interval = 15000,
}: AutoSaveProps) {
  const [cache, setCache] = React.useState<null | Cache>(null)
  const autoSaveRef = React.useRef<any>()

  const id = React.useMemo(() => getKey(storedKey), [storedKey])
  console.log(storedObj)

  function save() {
    let storedData = window.localStorage.getItem(id)
    if (storedData) {
      try {
        storedData = JSON.parse(storedData)
      } catch (error) {
        console.error(error)
      }
    }
    const date = String(new Date().toISOString())
    const nextStoredItem = {
      [date]: storedObj,
    }
    const nextStoredObj = cutBy(10, {
      ...(typeof storedData === 'object' ? storedData : {}),
      ...cache,
      ...nextStoredItem,
    })

    window.localStorage.setItem(id, JSON.stringify(nextStoredObj))
    setCache(nextStoredObj)
  }

  // Initiates the cache from storage
  React.useEffect(() => {
    let storedData
    try {
      storedData = window.localStorage.getItem(id)
      if (storedData) storedData = JSON.parse(storedData) || {}
      setCache(storedData)
    } catch (error) {
      console.error(error)
    }
  }, [cache, id])

  React.useEffect(() => {
    autoSaveRef.current = setInterval(() => {
      save()
    }, interval)
    return function cleanup() {
      clearInterval(autoSaveRef.current)
    }
    // eslint-disable-next-line
  }, [])

  if (render) return render({ cache, id })
  if (children) {
    if (typeof children === 'function') return children({ cache, id })
    return children
  }
  return null
}

export default AutoSave
