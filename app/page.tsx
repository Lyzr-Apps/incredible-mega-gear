'use client'

import { useState, useRef, useEffect } from 'react'
import { FiSearch, FiSend, FiMenu, FiX, FiChevronRight, FiBookOpen } from 'react-icons/fi'
import Sidebar from '@/components/Sidebar'
import ChatInterface from '@/components/ChatInterface'
import TopicGrid from '@/components/TopicGrid'
import Header from '@/components/Header'
import Quiz from '@/components/Quiz'

const AGENT_ID = '695cee9ea45696ac999e3f2f'

const TATopics = [
  {
    id: 'ego-states',
    title: 'Ego States',
    description: 'Parent, Adult, and Child ego states and their characteristics',
    icon: 'FiUser',
  },
  {
    id: 'transactions',
    title: 'Transactions',
    description: 'Complementary, crossed, and ulterior transactions',
    icon: 'FiArrowRightLeft',
  },
  {
    id: 'games',
    title: 'Psychological Games',
    description: 'Games people play and their patterns',
    icon: 'FiTarget',
  },
  {
    id: 'scripts',
    title: 'Life Scripts',
    description: 'Life scripts and script analysis',
    icon: 'FiBookOpen',
  },
  {
    id: 'life-positions',
    title: 'Life Positions',
    description: "I'm OK/You're OK matrix and positions",
    icon: 'FiCompass',
  },
  {
    id: 'therapeutic-applications',
    title: 'Therapeutic Applications',
    description: 'TA in therapy, coaching, and counseling',
    icon: 'FiHeart',
  },
  {
    id: 'strokes',
    title: 'Strokes & Recognition',
    description: 'Units of recognition and stroke economy',
    icon: 'FiStar',
  },
  {
    id: 'history-founders',
    title: 'History & Founders',
    description: 'Eric Berne and development of TA',
    icon: 'FiClock',
  },
]

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; role: 'user' | 'assistant'; content: string }>
  >([])
  const [loading, setLoading] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [quizOpen, setQuizOpen] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleTopicClick = async (topicId: string) => {
    setSelectedTopic(topicId)
    const topic = TATopics.find((t) => t.id === topicId)
    if (topic) {
      const message = `Tell me about ${topic.title}`
      await sendMessage(message)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      await sendMessage(searchQuery)
      setSearchQuery('')
    }
  }

  const sendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message,
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          agent_id: AGENT_ID,
        }),
      })

      const data = await response.json()

      if (data.success) {
        let content = ''

        if (typeof data.response === 'string') {
          content = data.response
        } else if (data.response?.raw_text) {
          content = data.response.raw_text
        } else if (typeof data.response === 'object') {
          // Extract readable text from response object
          const responseText = data.response_text || data.text || data.answer || data.message || ''
          if (responseText) {
            content = responseText
          } else {
            content = JSON.stringify(data.response, null, 2)
          }
        } else {
          content = String(data.response || '')
        }

        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant' as const,
          content: content.trim(),
        }
        setChatMessages((prev) => [...prev, assistantMessage])
      } else {
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant' as const,
          content: 'Sorry, I encountered an error. Please try again.',
        }
        setChatMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: 'Failed to connect to the agent. Please check your connection and try again.',
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        topics={TATopics}
        onTopicSelect={handleTopicClick}
        selectedTopic={selectedTopic}
        onQuizOpen={() => setQuizOpen(true)}
      />

      <div className="flex-1 flex flex-col">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearch}
        />

        <div className="flex-1 overflow-hidden flex">
          {chatMessages.length === 0 && !selectedTopic ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="text-center max-w-2xl">
                <div className="mb-8">
                  <FiBookOpen className="w-16 h-16 mx-auto text-teal-600" />
                </div>
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                  Transactional Analysis Encyclopedia
                </h1>
                <p className="text-lg text-gray-600 mb-12">
                  Explore comprehensive knowledge about Transactional Analysis theory, ego states,
                  psychological games, and therapeutic applications.
                </p>

                <div className="mb-12">
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-6">
                    Popular Topics
                  </p>
                  <TopicGrid
                    topics={TATopics.slice(0, 6)}
                    onTopicSelect={handleTopicClick}
                    selectedTopic={selectedTopic}
                  />
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 text-left">
                  <p className="text-sm font-semibold text-teal-900 mb-3">Getting Started:</p>
                  <ul className="text-sm text-teal-800 space-y-2">
                    <li>Click a topic card to explore a specific concept</li>
                    <li>Use the search bar to find topics by keyword</li>
                    <li>Ask questions in the chat interface</li>
                    <li>Related topics will be suggested for deeper learning</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <ChatInterface
              messages={chatMessages}
              loading={loading}
              onSendMessage={sendMessage}
              chatInput={chatInput}
              onChatInputChange={setChatInput}
              chatEndRef={chatEndRef}
            />
          )}
        </div>
      </div>

      <Quiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  )
}
