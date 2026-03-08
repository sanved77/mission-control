import { useRef, useState, useEffect, type Ref } from 'react'
import throttle from 'lodash/throttle'
import { Box } from '@mui/material'
import KeyboardDoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight'
import { ResizableBox, type ResizeCallbackData } from 'react-resizable'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import LogBoard from './components/LogBoard'

const MIN_SIDEBAR = 250
const MIN_MAIN = 700
const MIN_LOGBOARD = 350

// react-resizable rotates handles: e=315deg, w=135deg. Counter-rotate so the icon stays correct.
const HANDLE_COUNTER_ROTATION: Record<string, string> = {
  e: 'rotate(-315deg)',
  w: 'rotate(-135deg)',
}

function createResizeHandle(Icon: React.ComponentType<{ sx?: object }>) {
  return (handleAxis: string, ref: Ref<HTMLElement>) => (
    <span
      ref={ref as Ref<HTMLSpanElement>}
      className={`react-resizable-handle react-resizable-handle-${handleAxis}`}
      style={{
        backgroundImage: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Resize"
    >
      <span style={{ transform: HANDLE_COUNTER_ROTATION[handleAxis] ?? 'none' }}>
        <Icon sx={{ fontSize: 20, opacity: 0.7 }} />
      </span>
    </span>
  )
}

const ResizeHandleRight = createResizeHandle(KeyboardDoubleArrowRight)
const ResizeHandleLeft = createResizeHandle(KeyboardDoubleArrowLeft)

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )
  const containerHeight = window.innerHeight
  const [sidebarWidth, setSidebarWidth] = useState(
    Math.floor(0.15 * (typeof window !== 'undefined' ? window.innerWidth : 1200))
  )
  const [logboardWidth, setLogboardWidth] = useState(
    Math.floor(0.2 * (typeof window !== 'undefined' ? window.innerWidth : 1200))
  )
  const [isSidebarResizing, setIsSidebarResizing] = useState(false)
  const [isLogboardResizing, setIsLogboardResizing] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const throttledUpdateWidth = throttle(
      () => setContainerWidth(el.offsetWidth),
      50
    )
    const ro = new ResizeObserver(() => throttledUpdateWidth())
    ro.observe(el)
    return () => {
      throttledUpdateWidth.cancel()
      ro.disconnect()
    }
  }, [])

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <ResizableBox
        width={sidebarWidth}
        height={containerHeight}
        axis="x"
        resizeHandles={['e']}
        handle={ResizeHandleRight}
        minConstraints={[MIN_SIDEBAR, containerHeight]}
        maxConstraints={[
          containerWidth - MIN_MAIN - MIN_LOGBOARD,
          containerHeight,
        ]}
        onResizeStart={() => setIsSidebarResizing(true)}
        onResizeStop={() => setIsSidebarResizing(false)}
        onResize={(_e, data: ResizeCallbackData) =>
          setSidebarWidth(data.size.width)}
        style={{ flexShrink: 0 }}
      >
        <Box
          sx={{
            height: '100%',
            boxSizing: 'border-box',
            borderRight: isSidebarResizing ? '2px solid white' : 'none',
          }}
        >
          <Sidebar />
        </Box>
      </ResizableBox>
      <Box sx={{ flex: 1, minWidth: MIN_MAIN, flexShrink: 0 }}>
        <Main />
      </Box>
      <ResizableBox
        width={logboardWidth}
        height={containerHeight}
        axis="x"
        resizeHandles={['w']}
        handle={ResizeHandleLeft}
        minConstraints={[MIN_LOGBOARD, containerHeight]}
        maxConstraints={[
          containerWidth - sidebarWidth - MIN_MAIN,
          containerHeight,
        ]}
        onResizeStart={() => setIsLogboardResizing(true)}
        onResizeStop={() => setIsLogboardResizing(false)}
        onResize={(_e, data: ResizeCallbackData) =>
          setLogboardWidth(data.size.width)}
        style={{ flexShrink: 0 }}
      >
        <Box
          sx={{
            height: '100%',
            boxSizing: 'border-box',
            borderLeft: isLogboardResizing ? '2px solid white' : 'none',
          }}
        >
          <LogBoard />
        </Box>
      </ResizableBox>
    </Box>
  )
}
