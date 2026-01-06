'use client'

import {
  FiUser,
  FiArrowRightLeft,
  FiTarget,
  FiBookOpen,
  FiCompass,
  FiHeart,
  FiStar,
  FiClock,
} from 'react-icons/fi'

interface Topic {
  id: string
  title: string
  description: string
  icon: string
}

interface TopicGridProps {
  topics: Topic[]
  onTopicSelect: (topicId: string) => void
  selectedTopic: string | null
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FiUser,
  FiArrowRightLeft,
  FiTarget,
  FiBookOpen,
  FiCompass,
  FiHeart,
  FiStar,
  FiClock,
}

export default function TopicGrid({ topics, onTopicSelect, selectedTopic }: TopicGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {topics.map((topic) => {
        const IconComponent = iconMap[topic.icon]

        return (
          <button
            key={topic.id}
            onClick={() => onTopicSelect(topic.id)}
            className={`p-6 rounded-lg border-2 text-left transition-all hover:shadow-lg ${
              selectedTopic === topic.id
                ? 'border-teal-600 bg-teal-50'
                : 'border-gray-200 bg-white hover:border-teal-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {IconComponent && (
                  <IconComponent className="w-8 h-8 text-teal-600" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{topic.title}</h3>
                <p className="text-sm text-gray-600">{topic.description}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
