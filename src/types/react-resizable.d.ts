declare module 'react-resizable' {
  import { Component, ReactNode, Ref, SyntheticEvent, CSSProperties } from 'react'

  export interface ResizeCallbackData {
    node: HTMLElement
    size: { width: number; height: number }
    handle: string
  }

  export interface ResizableBoxProps {
    width: number
    height: number
    axis?: 'both' | 'x' | 'y' | 'none'
    resizeHandles?: Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'>
    minConstraints?: [number, number]
    maxConstraints?: [number, number]
    onResize?: (e: SyntheticEvent, data: ResizeCallbackData) => void
    onResizeStart?: (e: SyntheticEvent, data: ResizeCallbackData) => void
    onResizeStop?: (e: SyntheticEvent, data: ResizeCallbackData) => void
    handle?: ReactNode | ((handleAxis: string, ref: Ref<HTMLElement>) => ReactNode)
    style?: CSSProperties
    children?: ReactNode
  }

  export class ResizableBox extends Component<ResizableBoxProps> {}
}
