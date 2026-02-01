import React, { Suspense, lazy, useState, useEffect, useRef } from 'react'
import Home from './Home'

// Lazy load components to keep initial load super fast
const Benefit = lazy(() => import('./Benefit'))
const Work = lazy(() => import('./Work'))
const Ingredients = lazy(() => import('./Ingredients'))
const Testimonials = lazy(() => import('./Testimonials'))
const Buy = lazy(() => import('./Buy'))

/**
 * SmoothSection Component
 * 1. Waits until the user scrolls near it (IntersectionObserver).
 * 2. Triggers the network fetch.
 * 3. Applies a smooth Fade-In + Slide-Up animation.
 */
function SmoothSection({ children }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Load when the section is within 200px of the viewport
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop watching once loaded
        }
      },
      { rootMargin: '200px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={sectionRef}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ minHeight: '300px' }} // Reserve space to prevent layout jumps
    >
      {isVisible ? (
        <Suspense
          fallback={
            // A subtle skeleton loader instead of a blank space
            <div className="w-full h-64 bg-blue-50/50 animate-pulse rounded-xl" />
          }
        >
          {children}
        </Suspense>
      ) : (
        // Invisible placeholder to keep scrollbar stable
        <div className="w-full h-20" />
      )}
    </div>
  )
}

export default function Main() {
  return (
    <section>
      {/* Home loads immediately (Critical Rendering Path) */}
      <Home />

      {/* Subsequent sections load smoothly on scroll */}
      <SmoothSection>
        <Benefit />
      </SmoothSection>

      <SmoothSection>
        <Work />
      </SmoothSection>

      <SmoothSection>
        <Ingredients />
      </SmoothSection>

      <SmoothSection>
        <Testimonials />
      </SmoothSection>

      <SmoothSection>
        <Buy />
      </SmoothSection>
    </section>
  )
}