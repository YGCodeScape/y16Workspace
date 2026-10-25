// ============================================================================
// FOOTER BLUEPRINT CONFIGURATION
// Easily adjust the positions, sizes, and styles of the 2 intersecting circles,
// 2 horizontal lines, and 3 vertical lines below!
// ============================================================================

export const FOOTER_BLUEPRINT_CONFIG = {
  // SVG coordinate canvas (1440 width x 760 height)
  viewBox: "0 0 1440 760",

  // 1. Two Large Intersecting Circles
  circle1: {
    cx: 420,                               // Circle 1 center X (horizontal)
    cy: 380,                               // Circle 1 center Y (vertical)
    r: 340,                                // Radius
    stroke: 'rgba(255, 255, 255, 0.16)',   // Line color and opacity
    strokeWidth: 1.2,                      // Line thickness
  },
  circle2: {
    cx: 920,                               // Circle 2 center X (intersects Circle 1)
    cy: 380,                               // Circle 2 center Y (vertical)
    r: 340,                                // Radius
    stroke: 'rgba(255, 255, 255, 0.16)',   // Line color and opacity
    strokeWidth: 1.2,                      // Line thickness
  },

  // 2. Exactly 2 Horizontal Lines (spans left to right)
  horizontalLines: [
    {
      id: 'h-line-1',
      y: 300,                              // Horizontal Line 1 Y position
      stroke: 'rgba(255, 255, 255, 0.12)', // Line color and opacity
      strokeWidth: 1,                      // Line thickness
    },
    {
      id: 'h-line-2',
      y: 450,                              // Horizontal Line 2 Y position (above footer columns)
      stroke: 'rgba(255, 255, 255, 0.20)', // Line color and opacity
      strokeWidth: 1.2,                    // Line thickness
    },
    {
      id: 'h-line-2',
      y: 532,                              // Horizontal Line 2 Y position (above footer columns)
      stroke: 'rgba(255, 255, 255, 0.20)', // Line color and opacity
      strokeWidth: 1.2,                    // Line thickness
    },
  ],

  // 3. Exactly 3 Vertical Lines (spans top to bottom)
  verticalLines: [
    {
      id: 'v-line-1',
      x: 280,                              // Vertical Line 1 X position (left side)
      stroke: 'rgba(255, 255, 255, 0.18)', // Line color and opacity
      strokeWidth: 1,                      // Line thickness
    },
    {
      id: 'v-line-2',
      x: 1110,                              // Vertical Line 2 X position (center axis)
      stroke: 'rgba(255, 255, 255, 0.18)', // Line color and opacity
      strokeWidth: 1,                      // Line thickness
    },
    {
      id: 'v-line-3',
      x: 1120,                             // Vertical Line 3 X position (right side)
      stroke: 'rgba(255, 255, 255, 0.18)', // Line color and opacity
      strokeWidth: 1.2,                    // Line thickness
    },
    {
      id: 'v-line-4',
      x: 1275,                             // Vertical Line 3 X position (right side)
      stroke: 'rgba(255, 255, 255, 0.18)', // Line color and opacity
      strokeWidth: 1.2,                    // Line thickness
    },
  ],
};
