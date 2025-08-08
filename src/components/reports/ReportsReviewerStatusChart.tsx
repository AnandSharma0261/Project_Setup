import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const ReportsReviewerStatusChart: React.FC = () => {
  const { reviewerStatus } = useAppSelector((state) => state.dashboard);
  
  // Chart data with percentages for vertical growth - Reports specific
  const chartData = [
    { 
      label: 'Approved', 
      value: reviewerStatus.approved, 
      color: '#16DBCC', 
      percentage: 50, // Green - 50% for reports reviewer
      baseRadius: 55,
      maxRadius: 120
    },
    { 
      label: 'Approval Pending', 
      value: reviewerStatus.approvalPending, 
      color: '#FF82AC', 
      percentage: 20, // Pink - 20% for reports reviewer
      baseRadius: 55,
      maxRadius: 120
    },
    { 
      label: 'Auto Submitted', 
      value: reviewerStatus.autoSubmitted, 
      color: '#4C78FF', 
      percentage: 40, // Blue - 40% for reports reviewer
      baseRadius: 55,
      maxRadius: 120
    },
    { 
      label: 'Approval In Progress', 
      value: reviewerStatus.approvalInProgress, 
      color: '#FFBB38', 
      percentage: 35, // Orange - 35% for reports reviewer
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
    <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-sm mx-auto" style={{ minHeight: '200px' }}>
      <h3 className="text-gray-800 font-medium text-lg self-start mb-4">Reviewer Status</h3>
      
      {/* Status indicators - styled like the reference image */}
      <div className="flex flex-col gap-3 items-center w-full mt-4">
        {/* First row - Review Pending and Review in Progress */}
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="px-3 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold bg-red-500">
              75
            </div>
            <span className="text-sm text-gray-600">Review Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 h-6 rounded-full flex items-center justify-center text-black text-sm font-bold bg-yellow-400">
              75
            </div>
            <span className="text-sm text-gray-600">Review In Progress</span>
          </div>
        </div>
        
        {/* Second row - Reviewed (centered) */}
        <div className="flex items-center justify-center gap-2">
          <div className="px-3 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold bg-green-500">
            100
          </div>
          <span className="text-sm text-gray-600">Reviewed</span>
        </div>
      </div>
    </div>
  );
};

export default ReportsReviewerStatusChart;
