import MonacoEditor from '@monaco-editor/react'

export interface EditorProps {
  value: string
  onChange: (value: string) => void
}

export default function ScratchPadEditor({ value, onChange }: EditorProps) {
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
        fontFamily: '"Courier New", Consolas, Monaco, monospace',
        scrollBeyondLastLine: false,
        padding: { top: 16 },
        renderLineHighlight: 'all',
        cursorBlinking: 'smooth',
        matchBrackets: 'always',
        automaticLayout: true,
        wordWrap: 'off',
      }}
      loading={null}
    />
  )
}
