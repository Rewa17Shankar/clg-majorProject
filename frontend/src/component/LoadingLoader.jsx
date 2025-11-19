import React, { useEffect } from "react";
import "../styles/LoadingLoader.css";

const LoadingLoader = () => {
  useEffect(() => {
    const features = [
      'Employee Management',
      'Attendance Tracking', 
      'Payroll Automation',
      'Performance Review',
      'Leave Management',
      'Recruitment Portal',
      'Time Tracking',
      'Benefits Admin'
    ];

    const paths = [
      { id: 'path-1' }, { id: 'path-2' }, { id: 'path-3' }, { id: 'path-4' },
      { id: 'path-5' }, { id: 'path-6' }, { id: 'path-7' }
    ];

    let outputLabelsQueue = [];
    let cleanupFunctions = [];

    function getPathElement(pathId) {
      return document.getElementById(pathId);
    }

    function getPointOnPath(pathElement, distance) {
      try {
        const pathLength = pathElement.getTotalLength();
        const point = pathElement.getPointAtLength(distance * pathLength);
        
        const svg = pathElement.closest('svg');
        const svgRect = svg.getBoundingClientRect();
        const viewBox = svg.viewBox.baseVal;
        
        const scaleX = svgRect.width / viewBox.width;
        const scaleY = svgRect.height / viewBox.height;
        
        const screenX = (point.x * scaleX) + svgRect.left;
        const screenY = (point.y * scaleY) + svgRect.top;
        
        return { x: screenX, y: screenY };
      } catch (e) {
        return { x: 0, y: 0 };
      }
    }

    // Smooth easing function for natural movement
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animateFeatureOnPath(feature, pathData, batchStartTime, horizontalPosition = 0) {
      const pathElement = getPathElement(pathData.id);
      const outputPathElement = getPathElement('path-output');
      
      if (!pathElement || !outputPathElement) {
        return;
      }
      
      // Create container for dot and label together (VERTICAL LAYOUT - COLUMN)
      const container = document.createElement('div');
      container.className = 'moving-container';
      container.style.cssText = `
        position: fixed; 
        pointer-events: none; 
        display: flex; 
        flex-direction: column;
        align-items: center; 
        gap: 8px;
        filter: drop-shadow(0 0 8px rgba(65, 209, 255, 0.6));
      `;
      
      // Create dot with glow
      const dot = document.createElement('div');
      dot.className = 'moving-dot';
      dot.style.cssText = `
        width: 12px; 
        height: 12px; 
        flex-shrink: 0;
        box-shadow: 0 0 12px rgba(65, 209, 255, 0.8), 0 0 20px rgba(65, 209, 255, 0.4);
      `;
      
      // Create label with enhanced styling (BELOW THE DOT)
      const label = document.createElement('div');
      label.className = 'text-label';
      label.textContent = feature;
      label.style.cssText = `
        white-space: nowrap; 
        transform: none;
        text-shadow: 0 0 10px rgba(65, 209, 255, 0.5);
        font-weight: 500;
      `;
      
      container.appendChild(dot);
      container.appendChild(label);
      document.body.appendChild(container);
      
      const inputDuration = 4500;
      let animationId = null;
      
      function animateInput(timestamp) {
        const elapsed = timestamp - batchStartTime;
        const linearProgress = Math.min(elapsed / inputDuration, 1);
        
        // Apply smooth easing to the progress
        const progress = easeInOutCubic(linearProgress);
        
        if (linearProgress < 1) {
          const point = getPointOnPath(pathElement, progress);
          container.style.left = point.x + 'px';
          container.style.top = point.y + 'px';
          container.style.transform = 'translate(-50%, -50%)';
          
          // Enhanced fade out - starts earlier and smoother
          if (linearProgress > 0.40) {
            const fadeProgress = (linearProgress - 0.40) / 0.60;
            const easedFade = easeInOutCubic(fadeProgress);
            const opacity = 1 - easedFade;
            container.style.opacity = opacity;
            
            // Smooth scale down with enhanced easing
            const scale = 1 - (easedFade * 0.5);
            const blur = easedFade * 5;
            container.style.transform = `translate(-50%, -50%) scale(${scale})`;
            container.style.filter = `drop-shadow(0 0 8px rgba(65, 209, 255, ${0.6 * opacity})) blur(${blur}px)`;
          }
          
          animationId = requestAnimationFrame(animateInput);
        } else {
          container.remove();
          
          // Reappear on right side with premium entrance (SAME CYAN COLOR)
          const outputTimeout = setTimeout(() => {
            const containerOutput = document.createElement('div');
            containerOutput.className = 'moving-container-output';
            containerOutput.style.cssText = `
              position: fixed; 
              z-index: 999999; 
              pointer-events: none; 
              display: flex; 
              flex-direction: column;
              align-items: center; 
              gap: 10px; 
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.7);
              filter: blur(4px) drop-shadow(0 0 12px rgba(65, 209, 255, 0));
              transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            `;
            
            const dotOutput = document.createElement('div');
            dotOutput.className = 'moving-dot-output';
            dotOutput.style.cssText = `
              width: 12px; 
              height: 12px; 
              flex-shrink: 0;
              box-shadow: 0 0 15px rgba(65, 209, 255, 0.9), 0 0 25px rgba(65, 209, 255, 0.5);
            `;
            
            const labelOutput = document.createElement('div');
            labelOutput.className = 'text-label-output';
            labelOutput.textContent = feature;
            labelOutput.style.cssText = `
              white-space: nowrap; 
              transform: none;
              text-shadow: 0 0 12px rgba(65, 209, 255, 0.6);
              font-weight: 600;
              letter-spacing: 0.5px;
              color: #9fe6fd;
            `;
            
            containerOutput.appendChild(dotOutput);
            containerOutput.appendChild(labelOutput);
            document.body.appendChild(containerOutput);
            
            // Position on the right side
            const outputPoint = getPointOnPath(outputPathElement, 0.15);
            const ITEM_SPACING = 220;
            const horizontalOffset = horizontalPosition * ITEM_SPACING;
            
            containerOutput.style.left = (outputPoint.x + horizontalOffset) + 'px';
            containerOutput.style.top = outputPoint.y + 'px';
            
            // Trigger premium entrance animation
            setTimeout(() => {
              containerOutput.style.opacity = '1';
              containerOutput.style.transform = 'translate(-50%, -50%) scale(1)';
              containerOutput.style.filter = 'blur(0px) drop-shadow(0 0 12px rgba(65, 209, 255, 0.7))';
            }, 50);
            
            outputLabelsQueue.push({ container: containerOutput });
            
            // Hold and then smooth exit
            const fadeTimeout = setTimeout(() => {
              containerOutput.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
              containerOutput.style.opacity = '0';
              containerOutput.style.transform = 'translate(-50%, -50%) scale(0.92)';
              containerOutput.style.filter = 'blur(3px) drop-shadow(0 0 12px rgba(65, 209, 255, 0))';
              
              const removeTimeout = setTimeout(() => {
                if (containerOutput.parentNode) containerOutput.remove();
                
                outputLabelsQueue = outputLabelsQueue.filter(
                  item => item.container !== containerOutput
                );
              }, 700);
              
              cleanupFunctions.push(() => clearTimeout(removeTimeout));
            }, 3000);
            
            cleanupFunctions.push(() => clearTimeout(fadeTimeout));
          }, 200);
          
          cleanupFunctions.push(() => clearTimeout(outputTimeout));
        }
      }
      
      animationId = requestAnimationFrame(animateInput);
      cleanupFunctions.push(() => {
        if (animationId) cancelAnimationFrame(animationId);
        if (container.parentNode) container.remove();
      });
    }

    function startBatch() {
      const availablePaths = [...paths];
      const selectedPaths = [];
      
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * availablePaths.length);
        selectedPaths.push(availablePaths[randomIndex]);
        availablePaths.splice(randomIndex, 1);
      }
      
      const availableFeatures = [...features];
      const selectedFeatures = [];
      
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * availableFeatures.length);
        selectedFeatures.push(availableFeatures[randomIndex]);
        availableFeatures.splice(randomIndex, 1);
      }
      
      const batchStartTime = performance.now();
      
      selectedPaths.forEach((path, index) => {
        animateFeatureOnPath(selectedFeatures[index], path, batchStartTime, index);
      });
    }

    function startLoop() {
      startBatch();
      const interval = setInterval(() => {
        startBatch();
      }, 14000);
      
      cleanupFunctions.push(() => clearInterval(interval));
      
      return () => clearInterval(interval);
    }

    const initialTimeout = setTimeout(() => {
      startLoop();
    }, 800);

    return () => {
      clearTimeout(initialTimeout);
      
      cleanupFunctions.forEach(cleanup => cleanup());
      
      outputLabelsQueue.forEach(item => {
        if (item.container && item.container.parentNode) item.container.remove();
      });
      
      document.querySelectorAll('.moving-container, .moving-container-output').forEach(el => {
        if (el.parentNode) el.remove();
      });
    };
  }, []);

  return (
    <section className="loading-loader-section">
      <div className="bg-grid-loader"></div>
      <div className="particle-loader"></div>
      <div className="particle-loader"></div>
      <div className="particle-loader"></div>
      <div className="particle-loader"></div>
      <div className="particle-loader"></div>

      <div className="loading-loader-container">
        <div className="logo-container-loader">
          <div className="glow-effect-loader"></div>
          <div className="logo-loader-with-image">
            <div className="logo-border-ring"></div>
            <div className="logo-border-ring-outer"></div>
            <img 
              src="/LOGO1.jpg" 
              alt="OnBoard-X Logo" 
              className="logo-image-center"
            />
          </div>
          <div className="logo-text-loader" style={{ textTransform: 'none' }}>OnBoard-X</div>
        </div>

        <svg className="connection-svg-loader" viewBox="0 0 2400 900" preserveAspectRatio="none">
          <defs>
            <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0"/>
              <stop offset="20%" stopColor="#00d4ff" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8"/>
              <stop offset="80%" stopColor="#00d4ff" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
            </linearGradient>

            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#41D1FF" stopOpacity="1"/>
              <stop offset="100%" stopColor="#41D1FF" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="outputBaseGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0"/>
            <stop offset="20%" stopColor="#00d4ff" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8"/>
            <stop offset="80%" stopColor="#00d4ff" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
          </linearGradient>

          <radialGradient id="outputGlowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#41D1FF" stopOpacity="1"/>
            <stop offset="100%" stopColor="#41D1FF" stopOpacity="0"/>
          </radialGradient>

          </defs>
          
          <g id="path-1-group">
            <path className="connection-path-base" 
                  d="M 0 80 L 1200 450" 
                  stroke="url(#baseGradient)" strokeWidth="1.2" fill="none" opacity="0.8"/>
            <path id="path-1" className="connection-path-loader path-1" 
                  d="M 0 80 L 1200 450" 
                  stroke="url(#glowGradient)" strokeWidth="1.2" fill="none"/>
          </g>

          <g id="path-2-group">
            <path className="connection-path-base" 
                  d="M 0 200 L 1200 450" 
                  stroke="url(#baseGradient)" strokeWidth="1.2" fill="none" opacity="0.8"/>
            <path id="path-2" className="connection-path-loader path-2" 
                  d="M 0 200 L 1200 450" 
                  stroke="url(#glowGradient)" strokeWidth="1.2" fill="none"/>
          </g>

          <g id="path-3-group">
            <path className="connection-path-base" 
                  d="M 0 320 L 1200 450" 
                  stroke="url(#baseGradient)" strokeWidth="1.2" fill="none" opacity="0.8"/>
            <path id="path-3" className="connection-path-loader path-3" 
                  d="M 0 320 L 1200 450" 
                  stroke="url(#glowGradient)" strokeWidth="1.2" fill="none"/>
          </g>

          <g id="path-4-group">
            <path className="connection-path-base" 
                  d="M 0 440 L 1200 450" 
                  stroke="url(#baseGradient)" strokeWidth="1.2" fill="none" opacity="0.8"/>
            <path id="path-4" className="connection-path-loader path-4" 
                  d="M 0 440 L 1200 450" 
                  stroke="url(#glowGradient)" strokeWidth="1.2" fill="none"/>
          </g>

          <g id="path-5-group">
            <path className="connection-path-base" 
                  d="M 0 560 L 1200 450" 
                  stroke="url(#baseGradient)" strokeWidth="1.2" fill="none" opacity="0.8"/>
            <path id="path-5" className="connection-path-loader path-5" 
                  d="M 0 560 L 1200 450" 
                  stroke="url(#glowGradient)" strokeWidth="1.2" fill="none"/>
          </g>

          <g id="path-6-group">
            <path className="connection-path-base" 
                  d="M 0 680 L 1200 450" 
                  stroke="url(#baseGradient)" strokeWidth="1.2" fill="none" opacity="0.8"/>
            <path id="path-6" className="connection-path-loader path-6" 
                  d="M 0 680 L 1200 450" 
                  stroke="url(#glowGradient)" strokeWidth="1.2" fill="none"/>
          </g>

          <g id="path-7-group">
            <path className="connection-path-base" 
                  d="M 0 800 L 1200 450" 
                  stroke="url(#baseGradient)" strokeWidth="1.2" fill="none" opacity="0.8"/>
            <path id="path-7" className="connection-path-loader path-7" 
                  d="M 0 800 L 1200 450" 
                  stroke="url(#glowGradient)" strokeWidth="1.2" fill="none"/>
          </g>
          
          <g id="path-output-group">
            <path className="connection-path-base-output" 
                  d="M 1200 450 L 2400 450" 
                  stroke="url(#outputBaseGradient)" strokeWidth="1.5" fill="none" opacity="0.8"/>
            <path id="path-output" className="connection-path-loader path-output" 
                  d="M 1200 450 L 2400 450" 
                  stroke="url(#outputGlowGradient)" strokeWidth="1.5" fill="none"/>
          </g>
        </svg>
      </div>
    </section>
  );
};

export default LoadingLoader;
