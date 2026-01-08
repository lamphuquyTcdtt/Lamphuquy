import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface SignupProps {
  onSwitchToLogin: () => void;
  onSignupSuccess: (username: string, verificationToken: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onSwitchToLogin, onSignupSuccess }) => {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t('errorPasswordsDoNotMatch'));
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const { username: signedUpUsername, verificationToken } = await signup(username, password);
      if (signedUpUsername && verificationToken) {
        onSignupSuccess(signedUpUsername, verificationToken);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">{t('signupTitle')}</h2>
      {error && <p className="text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-2 rounded-lg text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('username')}
          </label>
          <input
            id="username-signup"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm bg-gray-50 dark:bg-gray-700"
          />
        </div>
        <div>
          <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('password')}
          </label>
          <input
            id="password-signup"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm bg-gray-50 dark:bg-gray-700"
          />
        </div>
        <div>
          <label htmlFor="confirm-password-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('confirmPassword')}
          </label>
          <input
            id="confirm-password-signup"
            name="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm bg-gray-50 dark:bg-gray-700"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-violet-400 disabled:cursor-not-allowed"
          >
            {isLoading ? <SpinnerIcon className="w-5 h-5" /> : t('signupButton')}
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        <button onClick={onSwitchToLogin} className="font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300">
          {t('switchToLogin')}
        </button>
      </p>
    </div>
  );
};

export default Signup;
