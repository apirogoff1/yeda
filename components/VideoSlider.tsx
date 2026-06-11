'use client'

import { useState, useEffect } from 'react'

const VIDEOS = [
  '/videos/video1.mp4',
  '/videos/video2.mp4',
  '/videos/video3.mp4',
  '/videos/video4.mp4',
  '/videos/video5.mp4',
]

export default function VideoSlider() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % VIDEOS.length)
        setFading(false)
      }, 800)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        key={current}
        src={VIDEOS[current]}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 2s ease' }}
      />
      <div className="absolute inset-0" style={{background: "rgba(55,60,68,0.72)"}} />
    </div>
  )
}
