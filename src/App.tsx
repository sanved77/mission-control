import './App.css'
import { Routes, Route, useParams } from 'react-router-dom'
import { SnackbarProviderWrapper } from './contexts/SnackbarContext'
import Dashboard from './Dashboard'
import { ScratchPad } from './components/Main/Activities/ScratchPad'
import { Projects, ProjectHome } from './components/Main/Activities/Projects'

function ProjectsRoute() {
  const { projectId } = useParams<{ projectId: string }>()
  return <Projects key={projectId} />
}

function App() {
  return (
    <SnackbarProviderWrapper>
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="scratchpad" element={<ScratchPad />} />
        <Route path="projects">
          <Route index element={<ProjectHome />} />
          <Route path=":projectId" element={<ProjectsRoute />} />
        </Route>
      </Route>
    </Routes>
    </SnackbarProviderWrapper>
  )
}

export default App
