'use client'

import { FiSend } from 'react-icons/fi'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ChatInterfaceProps {
  messages: Message[]
  loading: boolean
  onSendMessage: (message: string) => Promise<void>
  chatInput: string
  onChatInputChange: (input: string) => void
  chatEndRef: React.RefObject<HTMLDivElement>
}

export default function ChatInterface({
  messages,
  loading,
  onSendMessage,
  chatInput,
  onChatInputChange,
  chatEndRef,
}: ChatInterfaceProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (chatInput.trim() && !loading) {
      await onSendMessage(chatInput)
      onChatInputChange('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (chatInput.trim() && !loading) {
        handleSubmit(e as any)
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Start a conversation to explore TA concepts</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xl lg:max-w-2xl px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-teal-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none border border-gray-200'
                  }`}
                >
                  <div className="text-sm leading-relaxed space-y-2">
                    {message.content.split('\n\n').map((paragraph, i) => (
                      <div key={i} className="whitespace-pre-wrap">
                        {paragraph}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg border border-gray-200 rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </>
        )}
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <textarea
            value={chatInput}
            onChange={(e) => onChatInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about Transactional Analysis..."
            className="flex-1 resize-none p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            rows={3}
          />
          <button
            type="submit"
            disabled={loading || !chatInput.trim()}
            className="flex-shrink-0 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white rounded-lg p-3 transition-colors flex items-center justify-center"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
