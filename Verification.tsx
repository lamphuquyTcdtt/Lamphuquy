import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface VerificationProps {
  username: string;
  verificationToken: string;
  onBackToLogin: () => void;
}

const Verification: React.FC<VerificationProps> = ({ username, verificationToken, onBackToLogin }) => {
  const { t } = useTranslation();
  const { verifyEmail } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    setError('');
    setIsLoading(true);
    try {
      await verifyEmail(verificationToken);
      // On success, the AuthContext will set the currentUser and the App component will re-render,
      // hiding this component. No further action is needed here.
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('verificationTitle')}</h2>
      
      {error && <p className="text-red-500 bg-red-100 dark:bg-red-900/20 p-2 rounded-lg text-sm">{error}</p>}

      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t('verificationMessage', { username })}
      </p>

      <div>
        <button
          onClick={handleVerify}
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-violet-400 disabled:cursor-not-allowed"
        >
          {isLoading ? <SpinnerIcon className="w-5 h-5" /> : t('verifyButton')}
        </button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        <button onClick={onBackToLogin} className="font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300">
          {t('backToLogin')}
        </button>
      </p>
    </div>
  );
};

export default Verification;
