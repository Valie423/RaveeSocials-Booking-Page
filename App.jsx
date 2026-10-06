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
        <h2>If you also want to move from relying mainly on referrals to get clients → having total strangers discover your health offers and consistently turn into paying clients?</h2>
        <a className="btn" href="#book">Book your call</a>
      </section>
      </div>
      <Booking />
      <footer className="foot">© RaveeSocials</footer>
    </main>
  )
}
