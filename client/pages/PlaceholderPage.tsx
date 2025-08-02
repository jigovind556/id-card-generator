import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <Construction className="h-16 w-16 text-gray-400 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">
        This page is under construction. Please continue prompting to have me implement this feature.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
        <p className="text-sm text-blue-800">
          Ready to implement: Forms, Excel upload, ID card preview and printing functionality.
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
