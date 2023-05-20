import Footer from './common/Footer'
import Header from './common/Header'
import Navbar from './common/Navbar'

export default function FallbackLoader() {
  return (
    <>
      <Header />
      <Navbar />
      <main className="min-h-screen" />
      <Footer />
    </>
  )
}
