'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', move)

    let frame: number
    const animate = () => {
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px'
        dotRef.current.style.top = my + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top = ry + 'px'
      }
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none', mixBlendMode: 'multiply' }}>
      <div
        className="cursor-ring"
        ref={ringRef}
        style={{
          position: 'fixed', width: 36, height: 36,
          border: '1.5px solid var(--terracotta)', borderRadius: '50%',
          transform: 'translate(-50%,-50%)', opacity: 0.6,
          transition: 'width .25s, height .25s',
          pointerEvents: 'none',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed', width: 8, height: 8,
          background: 'var(--terracotta)', borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
