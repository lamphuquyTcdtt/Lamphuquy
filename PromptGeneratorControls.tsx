
import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { CopyIcon } from './icons/CopyIcon';

interface PromptGeneratorControlsProps {
  analysis: string | null;
  prompt: string | null;
  japanesePrompt: string | null;
  detectedStyle: string | null;
  onGenerateImage: (prompt: string, count: number, aspectRatio: string) => void;
  isDisabled: boolean;
}

const PromptGeneratorControls: React.FC<PromptGeneratorControlsProps> = ({
  analysis,
  prompt,
  japanesePrompt,
  detectedStyle,
  onGenerateImage,
  isDisabled,
}) => {
  const { t } = useTranslation();
  const [copiedEn, setCopiedEn] = useState(false);
  const [copiedJp, setCopiedJp] = useState(false);

  const handleCopy = (type: 'en' | 'jp') => {
    const textToCopy = type === 'en' ? prompt : japanesePrompt;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      if (type === 'en') {
        setCopiedEn(true);
        setTimeout(() => setCopiedEn(false), 2000);
      } else {
        setCopiedJp(true);
        setTimeout(() => setCopiedJp(false), 2000);
      }
    }
  };
  
  const handleGenerate = () => {
    if (prompt) {
      onGenerateImage(prompt, 1, '1:1');
    }
  };

  const ResultBox: React.FC<{title: string, content: string | null, placeholder: string, onCopy?: () => void, copyText?: string}> = ({ title, content, placeholder, onCopy, copyText }) => (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
        {onCopy && (
            <button
                onClick={onCopy}
                disabled={!content || isDisabled}
                className="flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-200 disabled:opacity-50 transition-colors"
            >
                <CopyIcon className="w-4 h-4" />
                {copyText}
            </button>
        )}
      </div>
      <div className="p-3 bg-[var(--bg-accent)] rounded-xl min-h-[100px] text-sm text-[var(--text-primary)] whitespace-pre-wrap font-mono">
        {isDisabled && !content ? (
            <div className="flex items-center justify-center h-full">
                <SpinnerIcon className="w-5 h-5 text-[var(--text-secondary)]" />
            </div>
        ) : (
            content || <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t('promptGeneratorTitle')}</h3>
        <p className="text-sm text-[var(--text-secondary)] bg-pink-100/50 dark:bg-pink-900/20 p-2 rounded-xl mt-2 text-center">
          {t('promptGeneratorInstructions')}
        </p>
      </div>
      
      {detectedStyle && (
        <div>
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('detectedStyleTitle')}</h4>
            <div className="inline-block bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                {detectedStyle}
            </div>
        </div>
      )}

      <ResultBox title={t('aiAnalysisTitle')} content={analysis} placeholder={t('analysisPlaceholder')} />
      <ResultBox title={t('generatedPromptTitle')} content={prompt} placeholder={t('promptPlaceholder')} onCopy={() => handleCopy('en')} copyText={copiedEn ? t('copied') : t('copyPrompt')} />
      <ResultBox title={t('japanesePromptTitle')} content={japanesePrompt} placeholder={t('promptPlaceholderJP')} onCopy={() => handleCopy('jp')} copyText={copiedJp ? t('copied') : t('copyPrompt')} />


      <button
        onClick={handleGenerate}
        disabled={!prompt || isDisabled}
        className="w-full bg-[var(--accent-color)] text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-[var(--accent-color-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)] focus:ring-[var(--ring-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow"
      >
        {t('generateFromPrompt')}
      </button>
    </div>
  );
};

export default PromptGeneratorControls;