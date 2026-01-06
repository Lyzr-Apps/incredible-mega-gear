'use client'

import { useState } from 'react'
import { FiX, FiCheck, FiX as FiXMark } from 'react-icons/fi'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which three ego states are described in Transactional Analysis?',
    options: ['Parent, Adult, Child', 'Mother, Father, Sibling', 'Id, Ego, Superego', 'Conscious, Unconscious, Preconscious'],
    correctAnswer: 0,
    explanation: 'Eric Berne identified three ego states: Parent (learned behaviors from authority figures), Adult (rational and logical), and Child (emotional and spontaneous behaviors).',
  },
  {
    id: 2,
    question: 'What is a Complementary Transaction?',
    options: [
      'A transaction that conflicts with the expected response',
      'A transaction where the response matches the stimulus appropriately',
      'A transaction involving money exchange',
      'A negative interaction between people',
    ],
    correctAnswer: 1,
    explanation: 'A complementary transaction occurs when the response ego state matches the addressed ego state, leading to smooth communication. This is the most common type of healthy transaction.',
  },
  {
    id: 3,
    question: 'Who developed Transactional Analysis theory?',
    options: ['Sigmund Freud', 'Eric Berne', 'Carl Jung', 'Albert Ellis'],
    correctAnswer: 1,
    explanation: 'Eric Berne, a psychiatrist, developed Transactional Analysis in the 1950s as a method of psychotherapy and analysis of human interaction.',
  },
  {
    id: 4,
    question: 'What are "strokes" in Transactional Analysis?',
    options: [
      'Physical contact between people',
      'Units of recognition or attention that people give each other',
      'Types of psychological games',
      'Different ego state transitions',
    ],
    correctAnswer: 1,
    explanation: 'Strokes are units of recognition or attention that people give each other. They can be positive (warm, supportive) or negative (critical, harsh), and people have a fundamental need for them.',
  },
  {
    id: 5,
    question: 'Which ego state is characterized as rational, logical, and data-driven?',
    options: ['Parent', 'Child', 'Adult', 'Adapted Child'],
    correctAnswer: 2,
    explanation: 'The Adult ego state operates in the "here and now," making decisions based on current information and objective analysis without emotional contamination.',
  },
  {
    id: 6,
    question: 'What is a Life Script in TA?',
    options: [
      'A written biography of a person\'s life',
      'An unconscious life plan developed in childhood that influences life decisions',
      'A formal contract between therapist and client',
      'A daily routine or schedule',
    ],
    correctAnswer: 1,
    explanation: 'A life script is an unconscious life plan formed in childhood based on experiences with parents and authority figures. It influences major life decisions and patterns throughout adulthood.',
  },
  {
    id: 7,
    question: 'What does the "I\'m OK, You\'re OK" position represent?',
    options: [
      'A state of conflict',
      'The healthiest life position promoting genuine relationships and problem-solving',
      'A position of superiority',
      'A position of inferiority and submission',
    ],
    correctAnswer: 1,
    explanation: 'The "I\'m OK, You\'re OK" position is the healthiest of the four life positions. It involves accepting both yourself and others, promoting genuine relationships and effective problem-solving.',
  },
  {
    id: 8,
    question: 'What is a Crossed Transaction?',
    options: [
      'A transaction between people of different cultures',
      'A transaction where the response ego state does not match the expected or addressed ego state',
      'A transaction involving more than two people',
      'A successful business transaction',
    ],
    correctAnswer: 1,
    explanation: 'A crossed transaction occurs when the response goes to a different ego state than the one being addressed, causing communication to break down and often leading to conflict or misunderstanding.',
  },
  {
    id: 9,
    question: 'Which of the following is NOT a type of ego state response mentioned in Child ego state?',
    options: ['Adaptive Child', 'Free Child', 'Rebellious Child', 'Critical Child'],
    correctAnswer: 3,
    explanation: 'The Child ego state is typically divided into three types: Adaptive Child (compliant, seeks approval), Free Child (creative, spontaneous, playful), and Rebellious Child (resistant, defiant).',
  },
  {
    id: 10,
    question: 'What do Psychological Games represent in TA?',
    options: [
      'Entertainment activities between people',
      'Recurring patterns of interaction with hidden motives and predictable outcomes',
      'Competitive sports activities',
      'Children\'s play activities',
    ],
    correctAnswer: 1,
    explanation: 'Psychological games are recurring patterns of transactions with hidden motives that typically end in negative feelings. They serve to reinforce life positions and scripts.',
  },
]

interface QuizProps {
  open: boolean
  onClose: () => void
}

export default function Quiz({ open, onClose }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(QUIZ_QUESTIONS.length).fill(null)
  )
  const [showResults, setShowResults] = useState(false)

  if (!open) return null

  const question = QUIZ_QUESTIONS[currentQuestion]
  const isAnswered = selectedAnswers[currentQuestion] !== null
  const isCorrect = selectedAnswers[currentQuestion] === question.correctAnswer
  const allAnswered = selectedAnswers.every((ans) => ans !== null)

  const handleSelectAnswer = (optionIndex: number) => {
    if (!showResults || currentQuestion === QUIZ_QUESTIONS.length - 1) {
      const newAnswers = [...selectedAnswers]
      newAnswers[currentQuestion] = optionIndex
      setSelectedAnswers(newAnswers)
    }
  }

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(Array(QUIZ_QUESTIONS.length).fill(null))
    setShowResults(false)
  }

  const correctCount = selectedAnswers.filter(
    (answer, index) => answer === QUIZ_QUESTIONS[index].correctAnswer
  ).length

  const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100)

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Quiz Results</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-teal-600 mb-2">{score}%</div>
              <div className="text-2xl font-semibold text-gray-900 mb-2">
                {correctCount} out of {QUIZ_QUESTIONS.length} correct
              </div>
              <p className="text-gray-600">
                {score >= 80
                  ? 'Excellent understanding of TA concepts!'
                  : score >= 60
                    ? 'Good grasp of the material. Review the explanations below.'
                    : 'Keep studying! Review the explanations and take the quiz again.'}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {QUIZ_QUESTIONS.map((q, index) => (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border-2 ${
                    selectedAnswers[index] === q.correctAnswer
                      ? 'border-green-300 bg-green-50'
                      : 'border-red-300 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {selectedAnswers[index] === q.correctAnswer ? (
                      <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <FiXMark className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{q.question}</p>
                      <p className="text-sm text-gray-700 mt-2">
                        Your answer: <span className="font-medium">{q.options[selectedAnswers[index]!]}</span>
                      </p>
                      {selectedAnswers[index] !== q.correctAnswer && (
                        <p className="text-sm text-gray-700 mt-1">
                          Correct answer: <span className="font-medium">{q.options[q.correctAnswer]}</span>
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-2 italic">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors"
              >
                Retake Quiz
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Transactional Analysis Quiz
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-600 transition-all"
                  style={{
                    width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-6">{question.question}</h3>

          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResults && index !== selectedAnswers[currentQuestion]}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-teal-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? isCorrect
                          ? 'border-green-500 bg-green-500'
                          : 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {isAnswered && (
            <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-900 font-semibold mb-2">Explanation:</p>
              <p className="text-sm text-blue-800">{question.explanation}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex-1 px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white font-semibold rounded-lg disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'Submit Quiz' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
