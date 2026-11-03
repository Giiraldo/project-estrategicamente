import { BrowserRouter, Route, Routes } from 'react-router-dom'
// Carga en orden los estilos compartidos para mantener la cascada entre páginas.
import './components/Header.css'
import './components/Hero.css'
import './components/ValueProps.css'
import './components/InsightsSection.css'
import './components/ArticleCard.css'
import './components/StatusCard.css'
import './components/AuthLayout.css'
import './pages/About.css'
import './pages/Saved.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ScrollToTop } from './components/ScrollToTop'
import { CurrentUserProvider } from './contexts/CurrentUserProvider'
import { About } from './pages/About'
import { Main } from './pages/Main'
import { NotFound } from './pages/NotFound'
import { Saved } from './pages/Saved'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

function App() {
  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <ScrollToTop />
        <a className="skip-link" href="#main-content">
          Saltar al contenido
        </a>
        <div className="app-shell">
          <Header />
          <main id="main-content" className="app-main">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/saved"
                element={
                  <ProtectedRoute>
                    <Saved />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CurrentUserProvider>
    </BrowserRouter>
  )
}

export default App
