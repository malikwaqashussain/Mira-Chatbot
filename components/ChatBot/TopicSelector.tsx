import React from 'react';

interface TopicSelectorProps {
  selectedTopic: string;
  onTopicSelect: (topic: string) => void;
}

const topics = [
  'Booking a chalet',
  'Changing or canceling a reservation',
  'Payment and refunds',
  'Loyalty points and rewards',
  'General questions or support'
];

export const TopicSelector: React.FC<TopicSelectorProps> = ({ 
  selectedTopic, 
  onTopicSelect 
}) => {
  return (
    <div className="flex flex-col items-start self-stretch">
      <div className="w-[245px] text-[#19191A] text-sm font-normal mb-2">
        You can ask about:
      </div>
      <form className="flex flex-col items-start self-stretch" role="radiogroup" aria-labelledby="topic-selector">
        {topics.map((topic) => (
          <label 
            key={topic}
            className="flex items-center self-stretch px-0 py-2 cursor-pointer hover:bg-gray-50 rounded"
          >
            <div className="flex items-center flex-[1_0_0]">
              <div className="flex justify-center items-center gap-1.5 flex-[1_0_0]">
                <span className="text-[#19191A] text-[10px] font-normal gap-1.5 flex-[1_0_0]">
                  {topic}
                </span>
              </div>
              <div className="flex justify-center items-center gap-2.5 p-0">
                {selectedTopic === topic ? (
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                  >
                    <circle 
                      cx="8" 
                      cy="8" 
                      r="6.25" 
                      fill="#F9FAFB" 
                      stroke="#29397E" 
                      strokeWidth="3.5"
                    />
                  </svg>
                ) : (
                  <div className="flex w-4 h-4 items-start gap-2.5 bg-gray-50 p-0 rounded-lg border-[0.5px] border-solid border-[#BEBFC1]" />
                )}
              </div>
            </div>
            <input
              type="radio"
              name="topic"
              value={topic}
              checked={selectedTopic === topic}
              onChange={(e) => onTopicSelect(e.target.value)}
              className="sr-only"
              aria-describedby={`topic-${topic.replace(/\s+/g, '-').toLowerCase()}`}
            />
          </label>
        ))}
      </form>
    </div>
  );
};
