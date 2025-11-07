
import React from 'react';

interface ErrorMessageProps {
  title: string;
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, message }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative my-4" role="alert">
      <strong className="font-bold">{title}</strong>
      <span className="block sm:inline ml-2">{message}</span>
    </div>
  );
};

export default ErrorMessage;
