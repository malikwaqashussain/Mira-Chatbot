import React from 'react'
import { ChatAvatar } from './ChatAvatar'
import { TopicSelector } from './TopicSelector'
import DOMPurify from 'dompurify'

interface ChatMessageProps {
  message: string
  isUser?: boolean
  showTopicSelector?: boolean
  selectedTopic?: string
  onTopicSelect?: (topic: string) => void
  isEmpty?: boolean
}

const convertMarkdownToHtml = (text: string): string => {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
    .replace(/\\([*_`~#])/g, '$1')
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUser = false,
  showTopicSelector = false,
  selectedTopic = '',
  onTopicSelect = () => {},
  isEmpty = false,
}) => {
  if (isUser) {
    return (
      <div className="flex justify-end items-center gap-[-4px] self-stretch">
        <div className="gap-2.5 text-[#FDFDFE] text-right text-sm font-normal bg-[#29397E] px-[15px] py-3.5 rounded-xl">
          {message}
        </div>
        <ChatAvatar isUser={true} />
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="flex items-center gap-[-4px] self-stretch">
        <ChatAvatar showBubblePointer={false} />
        <div className="flex w-[275px] items-start gap-2.5 bg-gray-50 p-[15px] rounded-xl max-sm:w-full max-sm:max-w-[275px]" />
      </div>
    )
  }

  const processedMessage = convertMarkdownToHtml(message)

  return (
    <article className="flex items-center gap-[-4px] self-stretch">
      <ChatAvatar showBubblePointer={true} />
      <div className="w-[275px] shrink-0 bg-gray-50 p-[15px] rounded-xl max-sm:w-full max-sm:max-w-[275px]">
        {showTopicSelector ? (
          <div className="flex flex-col items-start gap-2.5">
            <div
              className="text-[#19191A] text-sm font-normal"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(processedMessage) }}
            />
            <TopicSelector selectedTopic={selectedTopic} onTopicSelect={onTopicSelect} />
          </div>
        ) : (
          <div
            className="prose prose-sm text-[#19191A] font-normal"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(processedMessage) }}
          />
        )}
      </div>
    </article>
  )
}