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
function SmoothSection({ id, children }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ minHeight: '400px' }}
    >
      {isVisible ? (
        <Suspense fallback={<div className="w-full h-64 animate-pulse" />}>
          {children}
        </Suspense>
      ) : (
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
      <SmoothSection id="benefit">
        <Benefit />
      </SmoothSection>

      <SmoothSection id="how-it-works">
        <Work />
      </SmoothSection>

      <SmoothSection id="ingredients">
        <Ingredients />
      </SmoothSection>

      <SmoothSection id="testimonials">
        <Testimonials />
      </SmoothSection>

      <SmoothSection id="buy">
        <Buy />
      </SmoothSection>

    </section>
  )
}