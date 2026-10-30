const TOPICS = ['For health coaches', 'Weight loss', 'Nutrition', 'PCOS', 'Fitness', 'Hormonal health']
const AUDIENCE = [
  'Already have a paid programme or health offer',
  'Get most of their clients from referrals but want a reliable way to reach new people',
  'Have tried posting content, running ads, or both without the results they wanted',
  'Are ready to invest in a proper strategy and hands-on implementation',
]

function Marquee() {
  return (
    <div className="marquee" role="img" aria-label="For health coaches: weight loss, nutrition, PCOS, fitness, hormonal health">
      <div className="marquee-track" aria-hidden="true">
        {[0, 1, 2, 3].map(k => <ul key={k}>{TOPICS.map(t => <li key={t}>{t}</li>)}</ul>)}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <div className="hero-band">
      <Marquee />
      <header className="hero wrap">
        <h1>I’ll Build and Run the Strategy That Attracts <mark>Qualified Leads</mark> and Turns Them Into <mark>Paying Clients</mark>, So You Get <mark>3-4X More Booked Calls and Clients</mark> in 90 Days</h1>
        <p className="lead">You don’t need to post more content or keep trying random tactics. You need a strategy that connects your offer to the right audience and gives them a clear path to becoming clients.</p>
        <p className="for">This service is for health coaches who:</p>
        <ul className="checks">{AUDIENCE.map(a => <li key={a}>{a}</li>)}</ul>
      </header>
    </div>
  )
}
