import { useEffect, useRef } from 'react'

export function useAutoplay(delay: number = 4000) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const start = (callback: () => void) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(callback, delay)
  }

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      stop()
    }
  }, [])

  return { start, stop }
}