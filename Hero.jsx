const stages = ['Visibility', 'Interest', 'Action', 'Client']
export default function Hero() {
  return (
    <div className="hero-band">
    <header className="hero wrap">
      <p className="brand">Ravee<span>Socials</span></p>
      <h1>Need to turn your <mark>visibility</mark> into <mark>consistent clients?</mark></h1>
      <p className="lead">If you're a health coach/brand looking to get in front of the right people and turn that attention into more programme sign-ups, more booked calls and ultimately more clients, here’s what you need.</p>
      <ol className="path" aria-label="Visibility, Interest, Action, Client">
        <span className="dot" aria-hidden="true" />
        {stages.map((s, i) => <li key={s}><i>{i + 1}</i>{s}</li>)}
      </ol>
      <div className="props" aria-hidden="true">
        <span className="chip c1">More leads</span>
        <span className="chip c2">Increased conversion</span>
        <span className="chip c3">Paying clients</span>
      </div>
      <p className="proof-intro">I've built campaigns for brands with results like these:</p>
    </header>
    </div>
  )
}
