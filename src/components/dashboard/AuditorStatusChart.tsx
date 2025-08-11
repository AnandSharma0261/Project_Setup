import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const AuditorStatusChart: React.FC = () => {
  const { auditorStatus } = useAppSelector((state) => state.dashboard);
  
  // Base data for the arcs with actual percentages (these should always total 100%)
  const baseArcData = [
    {
      label: 'Audit Not Started',
      value: auditorStatus.approvalPending,
      percentage: 50, // This will be 50% of the circle
      color: '#EF4444', // Red
    },
    {
      label: 'Audit In Progress', 
      value: auditorStatus.autoSubmitted,
      percentage: 30, // This will be 30% of the circle  
      color: '#F59E0B', // Orange
    },
    {
      label: 'Audit Completed',
      value: auditorStatus.approved,
      percentage: 20, // This will be 20% of the circle
      color: '#10B981', // Green/Teal
    }
  ];

  // Ensure percentages total to 100% and calculate proportional angles
  const totalInputPercentage = baseArcData.reduce((sum, arc) => sum + arc.percentage, 0);
  
  // Normalize percentages to ensure they total 100% (in case they don't add up exactly)
  const normalizedArcData = baseArcData.map(arc => ({
    ...arc,
    normalizedPercentage: (arc.percentage / totalInputPercentage) * 100
  }));

  // Calculate angles based on actual percentages - each percentage = 3.6 degrees (360/100)
  const gapBetweenArcs = 29; // Reduced gap between arcs for closer spacing (in degrees)
  const totalGapAngle = gapBetweenArcs * normalizedArcData.length;
  const availableForArcs = 360 - totalGapAngle; // Remaining degrees for actual arcs
  
  let currentAngle = 15; // Start with offset from top (15 degrees offset for better positioning)
  
  const arcData = normalizedArcData.map((arc, index) => {
    // Calculate arc angle: each 1% = availableForArcs/100 degrees
    const arcAngle = (arc.normalizedPercentage / 100) * availableForArcs;
    const startAngle = currentAngle;
    const endAngle = currentAngle + arcAngle;
    
    // Move to next position with larger gap to prevent overlap
    currentAngle = endAngle + gapBetweenArcs;
    
    return {
      ...arc,
      startAngle,
      endAngle,
      arcAngle,
      displayPercentage: Math.round(arc.normalizedPercentage) // Round for display
    };
  });

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
    <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between items-center p-3 sm:p-4 lg:p-5 w-full max-w-lg mx-auto" style={{ minHeight: '440px' }}>
      
      {/* Circular Tube Chart */}
      <div className="relative w-64 h-64 flex-none">
        <svg width="256" height="256" viewBox="0 0 256 256">
          
          {/* Thick cylindrical tubes with gaps */}
          {arcData.map((arc, index) => {
            // Calculate dynamic radius for text positioning based on arc center
            const midRadius = 78; // Middle of the tube
            const capRadius = 12; // Smaller radius for end caps to prevent overlap
            
            return (
              <g key={index}>
                {/* Main tube with thick stroke and rounded caps */}
                <path
                  d={createTubePath(128, 128, 60, 96, arc.startAngle, arc.endAngle)}
                  fill={arc.color}
                  stroke={arc.color}
                  strokeWidth="2"
                />
                
                {/* Perfectly circular rounded end caps covering full tube thickness */}
                <circle
                  cx={128 + midRadius * Math.cos((arc.startAngle - 90) * Math.PI / 180)}
                  cy={128 + midRadius * Math.sin((arc.startAngle - 90) * Math.PI / 180)}
                  r={18}
                  fill={arc.color}
                />
                <circle
                  cx={128 + midRadius * Math.cos((arc.endAngle - 90) * Math.PI / 180)}
                  cy={128 + midRadius * Math.sin((arc.endAngle - 90) * Math.PI / 180)}
                  r={18}
                  fill={arc.color}
                />
                
                {/* Percentage text on tube - only show if arc is large enough */}
                {arc.arcAngle > 30 && (
                  <text
                    x={128 + midRadius * Math.cos(((arc.startAngle + arc.endAngle) / 2 - 90) * Math.PI / 180)}
                    y={128 + midRadius * Math.sin(((arc.startAngle + arc.endAngle) / 2 - 90) * Math.PI / 180)}
                    fill="white"
                    fontSize="18"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {arc.displayPercentage}%
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* Center total value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold text-teal-500">100</span>
        </div>
      </div>
      
      {/* Legend - Bottom positioned like ChecksheetStatus */}
      <div className="flex flex-col gap-3 items-center w-full mt-4">
        {/* First row - Audit Not Started and Audit In Progress */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-6 rounded flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: '#EF4444' }}
            >
              75
            </div>
            <span className="text-sm text-gray-600">Audit Not Started</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-6 rounded flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: '#F59E0B' }}
            >
              75
            </div>
            <span className="text-sm text-gray-600">Audit In Progress</span>
          </div>
        </div>
        
        {/* Second row - Audit Completed (centered) */}
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-6 rounded flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: '#10B981' }}
          >
            100
          </div>
          <span className="text-sm text-gray-600">Audit Completed</span>
        </div>
      </div>
    </div>
  );
};

export default AuditorStatusChart;
