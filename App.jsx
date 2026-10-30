import Hero from './Hero'
import Proof from './Proof'
import Booking from './Booking'

export default function App() {
  return (
    <main>
      <div className="dark-zone">
        <Hero />
        <Proof />
        <section className="cta wrap reveal">
          <a className="btn" href="#book">Book Your Strategy Call</a>
        </section>
      </div>
      <Booking />
      <footer className="foot">© RaveeSocials</footer>
    </main>
  )
}
