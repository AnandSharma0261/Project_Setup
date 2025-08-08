import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const AuditorStatusChart: React.FC = () => {
  const { auditorStatus } = useAppSelector((state) => state.dashboard);
  
  // Base data for the arcs with actual percentages (these should always total 100%)
  const baseArcData = [
    {
      label: 'Approved',
      value: auditorStatus.approved,
      percentage: 30, // This will be 30% of the circle
      color: '#10B981', // Green/Teal
    },
    {
      label: 'Approval Pending', 
      value: auditorStatus.approvalPending,
      percentage: 50, // This will be 50% of the circle  
      color: '#EF4444', // Red
    },
    {
      label: 'Auto Submitted',
      value: auditorStatus.autoSubmitted,
      percentage: 20, // This will be 20% of the circle
      color: '#F59E0B', // Orange
    }
  ];

  // Ensure percentages total to 100% and calculate proportional angles
  const totalInputPercentage = baseArcData.reduce((sum, arc) => sum + arc.percentage, 0);
  
  // Normalize percentages to ensure they total 100%
  const normalizedArcData = baseArcData.map(arc => ({
    ...arc,
    normalizedPercentage: (arc.percentage / totalInputPercentage) * 100
  }));

  // Calculate angles based on normalized percentages with fixed gaps
  const totalAvailableAngle = 320; // Leave 40 degrees total for gaps (not full 360°)
  const numberOfArcs = normalizedArcData.length;
  const gapBetweenArcs = 15; // Fixed gap between each arc
  const totalGapAngle = gapBetweenArcs * numberOfArcs; // Total angle used for gaps
  const availableForArcs = totalAvailableAngle - totalGapAngle; // Remaining angle for actual arcs
  
  let currentAngle = 20; // Start angle with offset from top
  
  const arcData = normalizedArcData.map((arc, index) => {
    // Calculate arc angle based on percentage of available space (not full circle)
    const arcAngle = (arc.normalizedPercentage / 100) * availableForArcs;
    const startAngle = currentAngle;
    const endAngle = currentAngle + arcAngle;
    
    currentAngle = endAngle + gapBetweenArcs; // Add gap after each arc
    
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
    <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col items-center min-w-[300px] h-full">
      
      {/* Circular Tube Chart */}
      <div className="relative w-64 h-64 mb-8">
        <svg width="256" height="256" viewBox="0 0 256 256">
          
          {/* Thick cylindrical tubes with gaps */}
          {arcData.map((arc, index) => {
            // Calculate dynamic radius for text positioning based on arc center
            const midRadius = 78; // Middle of the tube
            const capRadius = 18; // Radius for end caps
            
            return (
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
                  cx={128 + midRadius * Math.cos((arc.startAngle - 90) * Math.PI / 180)}
                  cy={128 + midRadius * Math.sin((arc.startAngle - 90) * Math.PI / 180)}
                  r={capRadius}
                  fill={arc.color}
                />
                <circle
                  cx={128 + midRadius * Math.cos((arc.endAngle - 90) * Math.PI / 180)}
                  cy={128 + midRadius * Math.sin((arc.endAngle - 90) * Math.PI / 180)}
                  r={capRadius}
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
      
      {/* Legend - Different arrangement like reviewer status */}
      <div className="flex flex-col gap-3 items-center">
        {/* First row - Approval Pending and Auto Submitted */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-6 rounded flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: '#EF4444' }}
            >
              {arcData.find(arc => arc.label === 'Approval Pending')?.displayPercentage || 0}
            </div>
            <span className="text-sm text-gray-600">Approval Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-6 rounded flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: '#F59E0B' }}
            >
              {arcData.find(arc => arc.label === 'Auto Submitted')?.displayPercentage || 0}
            </div>
            <span className="text-sm text-gray-600">Auto Submitted</span>
          </div>
        </div>
        
        {/* Second row - Approved (centered) */}
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-6 rounded flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: '#10B981' }}
          >
            {arcData.find(arc => arc.label === 'Approved')?.displayPercentage || 0}
          </div>
          <span className="text-sm text-gray-600">Approved</span>
        </div>
      </div>
    </div>
  );
};

export default AuditorStatusChart;
