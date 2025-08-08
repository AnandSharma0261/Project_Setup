import React from 'react';
import { useAppSelector } from '../../hooks/redux';

interface ReviewerStatusCardProps {
  cardType?: 'reviewer' | 'auditor';
}

const ReviewerStatusCard: React.FC<ReviewerStatusCardProps> = ({ cardType = 'reviewer' }) => {
  const { auditorStatus, reviewerStatus } = useAppSelector((state) => state.dashboard);
  
  const statusData = cardType === 'auditor' ? auditorStatus : reviewerStatus;
  
  // Calculate total for center display
  const total = statusData.autoSubmitted + statusData.approvalInProgress + statusData.approved + statusData.approvalPending;
  
  // Smaller rings with even spacing - 360° divided by 3 = 120° per section
  const arcData = [
    {
      label: 'Reviewed',
      value: 100,
      percentage: 20,
      color: '#10B981', // Green/Teal
      startAngle: 15,   // Start with offset
      endAngle: 95      // 80° arc (smaller size)
    },
    {
      label: 'Review Pending', 
      value: 75,
      percentage: 60,
      color: '#EF4444', // Red
      startAngle: 135,  // 120° section + 15° offset
      endAngle: 215     // 80° arc (smaller size)
    },
    {
      label: 'Review In Progress',
      value: 75,
      percentage: 20,
      color: '#F59E0B', // Orange
      startAngle: 255,  // 240° section + 15° offset
      endAngle: 305     // 50° arc (smallest for 20%)
    }
  ];

  // Function to create thick cylindrical tube path with rounded ends
  const createTubePath = (centerX: number, centerY: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) => {
    const startAngleRad = (startAngle - 90) * Math.PI / 180;
    const endAngleRad = (endAngle - 90) * Math.PI / 180;
    
    // Outer arc points
    const x1 = centerX + outerRadius * Math.cos(startAngleRad);
    const y1 = centerY + outerRadius * Math.sin(startAngleRad);
    const x2 = centerX + outerRadius * Math.cos(endAngleRad);
    const y2 = centerY + outerRadius * Math.sin(endAngleRad);
    
    // Inner arc points
    const x3 = centerX + innerRadius * Math.cos(endAngleRad);
    const y3 = centerY + innerRadius * Math.sin(endAngleRad);
    const x4 = centerX + innerRadius * Math.cos(startAngleRad);
    const y4 = centerY + innerRadius * Math.sin(startAngleRad);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", x1, y1,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 1, x2, y2,
      "L", x3, y3,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 0, x4, y4,
      "Z"
    ].join(" ");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col items-center p-3 sm:p-4 lg:p-5 w-full max-w-sm mx-auto" style={{ minHeight: '400px' }}>
      <h3 className="text-gray-800 font-medium text-lg self-start mb-4">{cardType === 'auditor' ? 'Auditor Status' : 'Reviewer Status'}</h3>
      
      {/* Circular Tube Chart */}
      <div className="relative w-64 h-64 mb-8">
        <svg width="256" height="256" viewBox="0 0 256 256">
          
          {/* Thick cylindrical tubes with gaps */}
          {arcData.map((arc, index) => (
            <g key={index}>
              {/* Main tube with thick stroke and rounded caps */}
              <path
                d={createTubePath(128, 128, 60, 96, arc.startAngle, arc.endAngle)}
                fill={arc.color}
                stroke={arc.color}
                strokeWidth="2"
              />
              
              {/* Rounded end caps */}
              <circle
                cx={128 + 78 * Math.cos((arc.startAngle - 90) * Math.PI / 180)}
                cy={128 + 78 * Math.sin((arc.startAngle - 90) * Math.PI / 180)}
                r="18"
                fill={arc.color}
              />
              <circle
                cx={128 + 78 * Math.cos((arc.endAngle - 90) * Math.PI / 180)}
                cy={128 + 78 * Math.sin((arc.endAngle - 90) * Math.PI / 180)}
                r="18"
                fill={arc.color}
              />
              
              {/* Percentage text on tube */}
              <text
                x={128 + 78 * Math.cos(((arc.startAngle + arc.endAngle) / 2 - 90) * Math.PI / 180)}
                y={128 + 78 * Math.sin(((arc.startAngle + arc.endAngle) / 2 - 90) * Math.PI / 180)}
                fill="white"
                fontSize="18"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {arc.percentage}%
              </text>
            </g>
          ))}
        </svg>
        
        {/* Center total value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold text-teal-500">100</span>
        </div>
      </div>
      
      {/* Legend - Different arrangement like second image */}
      <div className="flex flex-col gap-3 items-center">
        {/* First row - Review Pending and Review In Progress */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-6 rounded flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: '#EF4444' }}
            >
              75
            </div>
            <span className="text-sm text-gray-600">Review Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-6 rounded flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: '#F59E0B' }}
            >
              75
            </div>
            <span className="text-sm text-gray-600">Review In Progress</span>
          </div>
        </div>
        
        {/* Second row - Reviewed (centered) */}
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-6 rounded flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: '#10B981' }}
          >
            100
          </div>
          <span className="text-sm text-gray-600">Reviewed</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewerStatusCard;
