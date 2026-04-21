export function WavyDivider({ position = 'bottom', fill = '#FFFFFF', style = {}, flipped = false }) {
  const isTop = position === 'top'
  
  // Transform handles position and optional horizontal flipping for variety
  const transforms = []
  if (isTop) transforms.push('rotate(180deg)')
  if (flipped) transforms.push('scaleX(-1)')
  
  return (
    <svg
      viewBox="0 0 1440 120"
      style={{
        position: 'absolute',
        left: 0,
        [isTop ? 'top' : 'bottom']: -1,
        width: '100%',
        height: 'auto',
        zIndex: 10,
        display: 'block',
        transform: transforms.join(' '),
        transformOrigin: 'center',
        pointerEvents: 'none',
        ...style
      }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill={fill}
        d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
      />
    </svg>
  )
}
