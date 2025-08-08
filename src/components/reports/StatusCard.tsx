import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: number | string;
  icon?: LucideIcon;
  bgColor?: string;
  textColor?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ 
  title, 
  value, 
  icon: Icon,
  bgColor = 'bg-blue-500',
  textColor = 'text-white'
}) => {
  return (
    <div className={`${bgColor} ${textColor} rounded-lg p-4 shadow flex items-center justify-between`}>
      {Icon && <Icon className="w-6 h-6 ml-2 opacity-75" />}
      <div className="flex flex-col items-end">
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm mt-1">{title}</div>
      </div>
    </div>
  );
};

export default StatusCard;