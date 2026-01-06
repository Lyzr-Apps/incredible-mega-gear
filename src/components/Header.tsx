'use client'

import { FiMenu, FiSearch, FiMoon, FiSun } from 'react-icons/fi'
import { useState, useEffect } from 'react'

interface HeaderProps {
  onMenuClick: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearchSubmit: (e: React.FormEvent) => void
}

export default function Header({
  onMenuClick,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: HeaderProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true'
    setIsDark(darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    localStorage.setItem('darkMode', String(!isDark))
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <FiMenu className="w-5 h-5" />
        </button>
        <div className="text-xl font-serif font-bold text-gray-900">TA Encyclopedia</div>
      </div>

      <form onSubmit={onSearchSubmit} className="flex-1 max-w-md">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search TA concepts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </form>

      <button
        onClick={toggleDarkMode}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Toggle dark mode"
      >
        {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
      </button>
    </header>
  )
}
