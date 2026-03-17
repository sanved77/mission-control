import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import { ScratchPad } from './components/Main/Activities/ScratchPad'
import { Projects } from './components/Main/Activities/Projects'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="scratchpad" element={<ScratchPad />} />
        <Route path="projects" element={<Projects />} />
      </Route>
    </Routes>
  )
}

export default App
