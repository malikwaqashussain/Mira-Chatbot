import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  placeholder = "Ask Something..." 
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <footer className="flex items-start self-stretch bg-gray-100 px-4 py-2 rounded-[0px_0px_16px_16px] max-sm:px-3 max-sm:py-1.5">
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-2 flex-[1_0_0] p-0"
      >
        <div className="flex justify-between items-center self-stretch">
          <label htmlFor="chat-input" className="sr-only">
            Enter your message
          </label>
          <input
            id="chat-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="text-[#9EA0A2] text-sm font-normal bg-transparent border-none outline-none flex-1"
            aria-label="Type your message here"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="flex w-10 h-10 justify-center items-center bg-[#29397E] pl-2.5 pr-[9px] pt-[9px] pb-2.5 rounded-[1000px] hover:bg-[#1e2a5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <svg 
              width="21" 
              height="21" 
              viewBox="0 0 21 21" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[21px] h-[21px] flex-shrink-0"
            >
              <path 
                d="M2.975 17.8506L18.2437 11.3056C18.4016 11.2383 18.5362 11.1262 18.6308 10.9831C18.7254 10.8399 18.7758 10.6722 18.7758 10.5006C18.7758 10.329 18.7254 10.1612 18.6308 10.0181C18.5362 9.87499 18.4016 9.76283 18.2437 9.69559L2.975 3.15059C2.84279 3.09292 2.6983 3.06907 2.55457 3.0812C2.41084 3.09333 2.27239 3.14105 2.15171 3.22005C2.03103 3.29906 1.93192 3.40687 1.86332 3.53375C1.79471 3.66063 1.75878 3.8026 1.75875 3.94684L1.75 7.98059C1.75 8.41809 2.07375 8.79434 2.51125 8.84684L14.875 10.5006L2.51125 12.1456C2.07375 12.2068 1.75 12.5831 1.75 13.0206L1.75875 17.0543C1.75875 17.6756 2.3975 18.1043 2.975 17.8506Z" 
                fill="#FCFCFE"
              />
            </svg>
          </button>
        </div>
      </form>
    </footer>
  );
};
