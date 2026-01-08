

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { SendIcon } from './icons/SendIcon';
import { QUICK_CREATE_STYLES } from '../constants';

interface AIAssistantControlsProps {
  history: ChatMessage[];
  onSendMessage: (message: string) => void;
  onGenerateImage: (prompt: string, count: number, aspectRatio: string) => void;
  isLoading: boolean;
  isDisabled: boolean;
}

const AIAssistantControls: React.FC<AIAssistantControlsProps> = ({
  history,
  onSendMessage,
  onGenerateImage,
  isLoading,
  isDisabled,
}) => {
  const { t } = useTranslation();
  const [inputMessage, setInputMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleQuickCreate = (prompt: string) => {
    onSendMessage(prompt);
  };
  
  const parseMessageContent = (content: string) => {
    const parts = content.split(/```/);
    const elements = [];
    for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
            // Regular text
            elements.push(<span key={`text-${i}`}>{parts[i]}</span>);
        } else {
            // Code block (prompt)
            const prompt = parts[i].trim();
            elements.push(
                <div key={`prompt-${i}`} className="my-2">
                    <pre className="bg-gray-200 dark:bg-gray-900/50 p-3 rounded-xl text-xs font-mono whitespace-pre-wrap">
                        {prompt}
                    </pre>
                    <button
                        onClick={() => onGenerateImage(prompt, 1, '1:1')}
                        disabled={isDisabled}
                        className="mt-2 w-full bg-[var(--accent-color)] text-[var(--accent-color-text)] text-sm font-semibold py-2 px-4 rounded-xl hover:bg-[var(--accent-color-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-[var(--ring-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {t('generateImageButton')}
                    </button>
                </div>
            );
        }
    }
    return elements;
  };


  return (
    <div className="flex flex-col h-full">
       <h3 className="text-lg font-semibold mb-4 text-center">{t('tabAIAssistant')} - Airi</h3>
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto pr-2 space-y-4 mb-4">
        {history.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex-shrink-0 shadow-sm"></div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap shadow-sm ${
                msg.role === 'user'
                  ? 'bg-[var(--accent-color)] text-white rounded-br-none'
                  : 'bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-bl-none'
              }`}
            >
              {parseMessageContent(msg.content)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex-shrink-0 shadow-sm"></div>
             <div className="p-3 rounded-2xl bg-[var(--bg-accent)] rounded-bl-none">
                <SpinnerIcon className="w-5 h-5 text-[var(--text-secondary)]" />
             </div>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-[var(--border-color)]">
        <div className="mb-3">
          <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">{t('quickCreateTitle')}</h4>
          <div className="flex flex-wrap gap-2">
            {QUICK_CREATE_STYLES.map(style => (
              <button 
                key={style.key}
                onClick={() => handleQuickCreate(t(style.prompt))}
                disabled={isDisabled}
                className="px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-[var(--ring-color)] bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-600 text-[var(--text-primary)] disabled:opacity-50"
              >
                {t(style.key)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
            placeholder={t('aiAssistantInputPlaceholder')}
            disabled={isDisabled}
            className="w-full pl-4 pr-10 py-2 border border-[var(--border-color)] rounded-full bg-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring-color)] focus:border-transparent transition-colors disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={isDisabled || !inputMessage.trim()}
            className="bg-[var(--accent-color)] text-white rounded-full p-2.5 hover:bg-[var(--accent-color-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-[var(--ring-color)] disabled:opacity-50 transition-colors"
            aria-label={t('sendButton')}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantControls;