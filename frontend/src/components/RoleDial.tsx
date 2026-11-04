import React, { useState } from 'react';
import { RoleInfo } from '../types/auth';

interface RoleDialProps {
  roles: RoleInfo[];
  selectedRoleId: string | null;
  onSelectRole: (role: RoleInfo) => void;
}

export const RoleDial: React.FC<RoleDialProps> = ({ roles, selectedRoleId, onSelectRole }) => {
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);

  const cx = 300;
  const cy = 300;
  const rIn = 114;
  const rOutDefault = 270;
  const rMid = 196;
  const totalPetals = roles.length;
  const angleStep = 360 / totalPetals;

  // Generate organic flower petal path with rounded outer corners and flared sides
  const getFlowerPetalPath = (index: number, isHoveredOrSelected: boolean) => {
    const midDeg = -90 + index * angleStep;
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    // Proportions matching reference Image 2
    const halfSpanOuter = angleStep * 0.435; // ~14.2 deg (wide outer curve)
    const halfSpanInner = angleStep * 0.285; // ~9.3 deg (tapers neatly to hub)
    const cornerR = 16;                      // 16px corner curve
    const cornerDegOffset = 3.6;             // Angular displacement of corner arc

    const rOut = isHoveredOrSelected ? rOutDefault + 7 : rOutDefault;
    const rBeforeCorner = rOut - cornerR;

    const inStartRad = toRad(midDeg - halfSpanInner);
    const inEndRad = toRad(midDeg + halfSpanInner);
    const outStartRad = toRad(midDeg - halfSpanOuter);
    const outEndRad = toRad(midDeg + halfSpanOuter);

    // Inner hub points
    const xInStart = cx + rIn * Math.cos(inStartRad);
    const yInStart = cy + rIn * Math.sin(inStartRad);
    const xInEnd = cx + rIn * Math.cos(inEndRad);
    const yInEnd = cy + rIn * Math.sin(inEndRad);

    // Flared side edge points right before rounded corner
    const xLeftEdge = cx + rBeforeCorner * Math.cos(outStartRad);
    const yLeftEdge = cy + rBeforeCorner * Math.sin(outStartRad);
    const xRightEdge = cx + rBeforeCorner * Math.cos(outEndRad);
    const yRightEdge = cy + rBeforeCorner * Math.sin(outEndRad);

    // Contact points on outer convex arc right after corners
    const xOuterLeft = cx + rOut * Math.cos(toRad(midDeg - halfSpanOuter + cornerDegOffset));
    const yOuterLeft = cy + rOut * Math.sin(toRad(midDeg - halfSpanOuter + cornerDegOffset));
    const xOuterRight = cx + rOut * Math.cos(toRad(midDeg + halfSpanOuter - cornerDegOffset));
    const yOuterRight = cy + rOut * Math.sin(toRad(midDeg + halfSpanOuter - cornerDegOffset));

    // Control points for the smooth rounded corners
    const xCPLeft = cx + rOut * Math.cos(outStartRad);
    const yCPLeft = cy + rOut * Math.sin(outStartRad);
    const xCPRight = cx + rOut * Math.cos(outEndRad);
    const yCPRight = cy + rOut * Math.sin(outEndRad);

    return `
      M ${xInStart.toFixed(2)} ${yInStart.toFixed(2)}
      L ${xLeftEdge.toFixed(2)} ${yLeftEdge.toFixed(2)}
      Q ${xCPLeft.toFixed(2)} ${yCPLeft.toFixed(2)} ${xOuterLeft.toFixed(2)} ${yOuterLeft.toFixed(2)}
      A ${rOut} ${rOut} 0 0 1 ${xOuterRight.toFixed(2)} ${yOuterRight.toFixed(2)}
      Q ${xCPRight.toFixed(2)} ${yCPRight.toFixed(2)} ${xRightEdge.toFixed(2)} ${yRightEdge.toFixed(2)}
      L ${xInEnd.toFixed(2)} ${yInEnd.toFixed(2)}
      A ${rIn} ${rIn} 0 0 0 ${xInStart.toFixed(2)} ${yInStart.toFixed(2)}
      Z
    `;
  };

  // Base inner color tab at the root of each petal (rIn to rIn + 14)
  const getInnerTabPath = (index: number) => {
    const midDeg = -90 + index * angleStep;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const halfSpan = angleStep * 0.285;
    const rTabOut = rIn + 14;

    const inStartRad = toRad(midDeg - halfSpan);
    const inEndRad = toRad(midDeg + halfSpan);

    const xInStart = cx + (rIn + 1) * Math.cos(inStartRad);
    const yInStart = cy + (rIn + 1) * Math.sin(inStartRad);
    const xInEnd = cx + (rIn + 1) * Math.cos(inEndRad);
    const yInEnd = cy + (rIn + 1) * Math.sin(inEndRad);

    const xOutStart = cx + rTabOut * Math.cos(inStartRad);
    const yOutStart = cy + rTabOut * Math.sin(inStartRad);
    const xOutEnd = cx + rTabOut * Math.cos(inEndRad);
    const yOutEnd = cy + rTabOut * Math.sin(inEndRad);

    return `
      M ${xInStart.toFixed(2)} ${yInStart.toFixed(2)}
      L ${xOutStart.toFixed(2)} ${yOutStart.toFixed(2)}
      A ${rTabOut} ${rTabOut} 0 0 1 ${xOutEnd.toFixed(2)} ${yOutEnd.toFixed(2)}
      L ${xInEnd.toFixed(2)} ${yInEnd.toFixed(2)}
      A ${rIn + 1} ${rIn + 1} 0 0 0 ${xInStart.toFixed(2)} ${yInStart.toFixed(2)}
      Z
    `;
  };

  return (
    <div className="relative flex items-center justify-center select-none">
      <svg
        viewBox="0 0 600 600"
        className="w-[450px] h-[450px] sm:w-[500px] sm:h-[500px] md:w-[540px] md:h-[540px] lg:w-[570px] lg:h-[570px] max-h-[84vh] drop-shadow-2xl overflow-visible transition-all duration-300"
      >
        <defs>
          {/* Subtle soft drop shadow for resting petals */}
          <filter id="petalShadowDrop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3.5" stdDeviation="4" floodColor="#1e1b4b" floodOpacity="0.12" />
          </filter>

          {/* Dynamic glowing shadow per role when active / selected */}
          {roles.map((role) => (
            <React.Fragment key={role.id}>
              {/* Petal radial/linear gradient (bright white center blending to role soft pastel edge) */}
              <linearGradient
                id={`petalGrad-${role.id}`}
                x1="50%"
                y1="85%"
                x2="50%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.98" />
                <stop offset="100%" stopColor={role.bgLight} stopOpacity="1" />
              </linearGradient>

              {/* Glowing shadow when hovered or selected */}
              <filter
                id={`glow-${role.id}`}
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor={role.color} floodOpacity="0.55" />
                <feDropShadow dx="0" dy="3.5" stdDeviation="4.5" floodColor="#000000" floodOpacity="0.15" />
              </filter>
            </React.Fragment>
          ))}
        </defs>

        {/* Outer backing circle providing subtle depth */}
        <circle cx={cx} cy={cy} r={rOutDefault + 6} fill="#ffffff" opacity="0.3" />

        {/* 11 Flower Petals */}
        <g id="petals">
          {roles.map((role, idx) => {
            const isSelected = selectedRoleId === role.id;
            const isHovered = hoveredRoleId === role.id;
            const isActive = isSelected || isHovered;

            // Center of petal content
            const midDeg = -90 + idx * angleStep;
            const midRad = (midDeg * Math.PI) / 180;
            const radialShift = isActive ? 4 : 0;
            const petalCx = cx + (rMid + radialShift) * Math.cos(midRad);
            const petalCy = cy + (rMid + radialShift) * Math.sin(midRad);

            return (
              <g
                key={role.id}
                className="cursor-pointer transition-transform duration-300 group"
                onClick={() => onSelectRole(role)}
                onMouseEnter={() => setHoveredRoleId(role.id)}
                onMouseLeave={() => setHoveredRoleId(null)}
              >
                {/* Organic Petal Body with Rounded Corners, Vibrant Colored Border and Luminous Card Fill matching Reference Image */}
                <path
                  d={getFlowerPetalPath(idx, isActive)}
                  fill={isSelected ? '#faf5ff' : isHovered ? '#ffffff' : `url(#petalGrad-${role.id})`}
                  stroke={isActive ? role.color : role.borderColor}
                  strokeWidth={isActive ? 3.4 : 2.2}
                  strokeOpacity={isActive ? 1 : 0.9}
                  filter={isActive ? `url(#glow-${role.id})` : 'url(#petalShadowDrop)'}
                  className="transition-all duration-300"
                />

                {/* Inner Base Color Tab connecting directly to center rainbow hub */}
                <path
                  d={getInnerTabPath(idx)}
                  fill={role.color}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  opacity={isActive ? 1 : 0.9}
                  className="transition-opacity duration-200"
                />

                {/* Petal Content: Large Colorful Icon (Top) & Bold Label (Underneath) */}
                <foreignObject
                  x={petalCx - 58}
                  y={petalCy - 48}
                  width="116"
                  height="96"
                  className="pointer-events-none"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-0.5">
                    {/* Large Colorful Icon */}
                    <div className="w-13 h-10 sm:w-14 sm:h-11 md:w-15 md:h-12 flex items-center justify-center shrink-0 mb-0.5 transition-transform duration-200 group-hover:scale-110">
                      {role.iconPath ? (
                        <img
                          src={role.iconPath}
                          alt={role.title}
                          className="max-w-full max-h-full object-contain filter drop-shadow-xs"
                          loading="eager"
                        />
                      ) : (
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                          style={{ backgroundColor: role.bgLight, color: role.color }}
                        >
                          {role.title.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Bold Readable Role Title matching reference styling */}
                    <p
                      className="text-[11px] sm:text-[11.5px] md:text-[12px] font-black leading-[1.14] tracking-tight text-center"
                      style={{
                        color: isSelected ? role.color : '#10032e',
                      }}
                    >
                      {role.title.split('\n').map((line, lIdx) => (
                        <span key={lIdx} className="block whitespace-nowrap">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </g>

        {/* Central Circular Hub (High-Res ACU ERP Role-Based Login Circle) */}
        <image
          href="/acu-center-circle.png"
          x={cx - rIn - 4}
          y={cy - rIn - 4}
          width={(rIn + 4) * 2}
          height={(rIn + 4) * 2}
          className="pointer-events-none drop-shadow-lg"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  );
};
