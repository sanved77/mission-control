import MonacoEditor from '@monaco-editor/react'
import { APP_CONTENT_FONT_WEIGHT, APP_FONT_FAMILY } from '../../../../styles/appFont'

export interface EditorProps {
  value: string
  onChange: (value: string) => void
  wordWrap?: boolean
}

export default function ScratchPadEditor({ value, onChange, wordWrap = false }: EditorProps) {
  return (
    <MonacoEditor
      height="100%"
      language="text"
      theme="vs-dark"
      value={value}
      onChange={(val) => onChange(val ?? '')}
      options={{
        lineNumbers: 'on',
        minimap: { enabled: false },
        fontSize: 13,
        fontFamily: APP_FONT_FAMILY,
        fontWeight: String(APP_CONTENT_FONT_WEIGHT),
        scrollBeyondLastLine: false,
        padding: { top: 16 },
        renderLineHighlight: 'all',
        cursorBlinking: 'smooth',
        matchBrackets: 'always',
        automaticLayout: true,
        wordWrap: wordWrap ? 'on' : 'off',
      }}
      loading={null}
    />
  )
}
