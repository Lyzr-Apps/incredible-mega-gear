'use client'

import { FiX, FiChevronRight } from 'react-icons/fi'
import { useState } from 'react'

interface Topic {
  id: string
  title: string
  description: string
  icon: string
}

interface SidebarProps {
  open: boolean
  onClose: () => void
  topics: Topic[]
  onTopicSelect: (topicId: string) => void
  selectedTopic: string | null
}

const topicGroups = [
  {
    name: 'Foundations',
    topics: ['history-founders'],
  },
  {
    name: 'Core Concepts',
    topics: ['ego-states', 'transactions', 'life-positions'],
  },
  {
    name: 'Patterns & Dynamics',
    topics: ['games', 'scripts', 'strokes'],
  },
  {
    name: 'Applications',
    topics: ['therapeutic-applications'],
  },
]

export default function Sidebar({
  open,
  onClose,
  topics,
  onTopicSelect,
  selectedTopic,
}: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['Core Concepts', 'Patterns & Dynamics'])
  )

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName)
    } else {
      newExpanded.add(groupName)
    }
    setExpandedGroups(newExpanded)
  }

  const handleTopicClick = (topicId: string) => {
    onTopicSelect(topicId)
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-serif font-bold text-lg text-gray-900">Topics</h2>
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {topicGroups.map((group) => (
            <div key={group.name} className="border-b border-gray-100">
              <button
                onClick={() => toggleGroup(group.name)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-sm text-gray-700">{group.name}</span>
                <FiChevronRight
                  className={`w-4 h-4 transition-transform ${
                    expandedGroups.has(group.name) ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {expandedGroups.has(group.name) && (
                <div className="bg-gray-50">
                  {group.topics.map((topicId) => {
                    const topic = topics.find((t) => t.id === topicId)
                    if (!topic) return null

                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleTopicClick(topic.id)}
                        className={`w-full px-6 py-2 text-sm text-left hover:bg-gray-100 transition-colors border-l-2 ${
                          selectedTopic === topic.id
                            ? 'border-teal-600 bg-teal-50 text-teal-900 font-medium'
                            : 'border-transparent text-gray-600'
                        }`}
                      >
                        {topic.title}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            Explore Transactional Analysis theory and practice
          </p>
        </div>
      </aside>
    </>
  )
}
