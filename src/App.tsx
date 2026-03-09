import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import { ScratchPad } from './components/Main/Activities/ScratchPad'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="scratchpad" element={<ScratchPad />} />
      </Route>
    </Routes>
  )
}

export default App
