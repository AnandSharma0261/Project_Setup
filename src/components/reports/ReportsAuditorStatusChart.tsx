import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const ReportsAuditorStatusChart: React.FC = () => {
  const { auditorStatus } = useAppSelector((state) => state.dashboard);
  
  // Chart data with percentages for vertical growth - Reports Auditor specific
  const chartData = [
    { 
      label: 'Approved', 
      value: auditorStatus.approved, 
      color: '#16DBCC', 
      percentage: 60, // Green - 60% for reports auditor
      baseRadius: 55,
      maxRadius: 120
    },
    { 
      label: 'Approval Pending', 
      value: auditorStatus.approvalPending, 
      color: '#FF82AC', 
      percentage: 25, // Pink - 25% for reports auditor
      baseRadius: 55,
      maxRadius: 120
    },
    { 
      label: 'Auto Submitted', 
      value: auditorStatus.autoSubmitted, 
      color: '#4C78FF', 
      percentage: 45, // Blue - 45% for reports auditor
      baseRadius: 55,
      maxRadius: 120
    },
    { 
      label: 'Approval In Progress', 
      value: auditorStatus.approvalInProgress, 
      color: '#FFBB38', 
      percentage: 30, // Orange - 30% for reports auditor
      baseRadius: 55,
      maxRadius: 120
    },
  ];

  // Calculate segments with vertical growth (radius-wise)
  const pieSegments = chartData.map((item, index) => {
    // Each segment gets 90 degrees (quarter circle)
    const startAngle = index * 90; // 0, 90, 180, 270 degrees
    const endAngle = startAngle + 90;
    
    // Calculate outer radius based on percentage (vertical growth)
    const radiusRange = item.maxRadius - item.baseRadius;
    const outerRadius = item.baseRadius + (item.percentage / 100) * radiusRange;
    
    return {
      ...item,
      startAngle: startAngle,
      endAngle: endAngle,
      innerRadius: item.baseRadius,
      outerRadius: outerRadius,
      angle: 90
    };
  });

  // Function to create SVG path for pie segment
  const createPiePath = (
    centerX: number, 
    centerY: number, 
    radius: number, 
    startAngle: number, 
    endAngle: number, 
    innerRadius: number = 0
  ): string => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    if (innerRadius > 0) {
      const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
      const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);
      
      return [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", innerEnd.x, innerEnd.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
        "Z"
      ].join(" ");
    } else {
      return [
        "M", centerX, centerY,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
      ].join(" ");
    }
  };

  const polarToCartesian = (
    centerX: number, 
    centerY: number, 
    radius: number, 
    angleInDegrees: number
  ): { x: number; y: number } => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between items-center p-5 w-full max-w-sm mx-auto" style={{ minHeight: '400px' }}>
      
      {/* Pie Chart */}
      <div className="relative flex-none mx-auto w-64 h-64">
        <svg width="100%" height="100%" viewBox="0 0 320 320" className="absolute inset-0">
          {pieSegments.map((segment, index) => (
            <path
              key={index}
              d={createPiePath(160, 160, segment.outerRadius, segment.startAngle, segment.endAngle, segment.innerRadius)}
              fill={segment.color}
              className="transition-all duration-500 ease-in-out hover:opacity-80"
            />
          ))}
          {/* Inner white circle */}
          <circle cx="160" cy="160" r="55" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 w-full mt-4">
        {chartData.map((item, idx) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center text-sm font-bold text-white" style={{ background: item.color }}>
              {item.value}
            </div>
            <span className="text-sm text-gray-600 leading-tight">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsAuditorStatusChart;
