import '@fontsource/inter'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import 'react-resizable/css/styles.css'
import './styles/variables.css'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
