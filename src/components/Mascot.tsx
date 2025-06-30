
import React from 'react';

interface MascotProps {
  type: 'boris' | 'laya' | 'irina';
  size?: 'small' | 'medium' | 'large';
  animate?: boolean;
}

const Mascot: React.FC<MascotProps> = ({ type, size = 'medium', animate = true }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  const mascotData = {
    boris: {
      color: 'bg-blue-500',
      icon: '🛡️',
      name: 'Boris',
      role: 'Segurança'
    },
    laya: {
      color: 'bg-purple-500',
      icon: '👋',
      name: 'Laya',
      role: 'Onboarding'
    },
    irina: {
      color: 'bg-neon-green',
      icon: '📊',
      name: 'Irina',
      role: 'Dados'
    }
  };

  const mascot = mascotData[type];

  return (
    <div className="flex flex-col items-center space-y-2">
      <div 
        className={`
          ${sizeClasses[size]} 
          ${mascot.color} 
          rounded-full 
          flex items-center justify-center 
          text-white text-2xl
          ${animate ? 'animate-pulse' : ''}
          shadow-lg
          border-2 border-white/20
        `}
      >
        {mascot.icon}
      </div>
      <div className="text-center">
        <p className="text-white font-medium text-sm">{mascot.name}</p>
        <p className="text-gray-400 text-xs">{mascot.role}</p>
      </div>
    </div>
  );
};

export default Mascot;
