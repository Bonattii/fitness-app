import React from 'react';

interface LabelProps {
  id: string;
  content: string;
}

const Label: React.FC<LabelProps> = ({ id, content }) => (
  <label
    htmlFor={id}
    className="block mb-2 text-sm font-medium text-primary-white"
  >
    {content} <span className="text-secondary-blue">*</span>
  </label>
);

export default Label;
