import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  className,
  showLabel = false,
  variant = 'default',
}) => {
  const variants = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
  };

  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      <div className={cn('w-full bg-gray-200 rounded-full h-2', className)}>
        <div
          className={cn('h-2 rounded-full transition-all duration-300', variants[variant])}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-600 mt-1 text-right">{clampedValue}%</p>
      )}
    </div>
  );
};
