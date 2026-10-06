import { IMAGES } from './config'

export default function Proof() {
  return (
    <section className="proof wrap" aria-label="Case studies">
      {/* 1 — Nyamah (text quote, no screenshot) */}
      <article className="case reveal">
        <span className="tag">01 · Client words</span>
        <h3 className="name">Nyamah</h3>
        <blockquote>“Our booth got so many people, none of us could even take a break for 2 seconds, which we didn’t even plan for. It was a lot of people.”</blockquote>
        <div className="cols">
          <div><h4>What I did</h4><p>Created the content strategy 45 days ahead of the event to build awareness and interest around the pop-up.</p></div>
          <div><h4>Result</h4><p>The event sold out, with the team experiencing much more foot traffic than they anticipated.</p></div>
        </div>
        <ol className="timeline" aria-label="45 days before, event day, sold out">
          <li>45 days before</li><li>Event day</li><li className="hit">Sold out</li>
        </ol>
      </article>

      {/* 2 — Screenshot 1 FIRST, then 26% */}
      <article className="case reveal">
        <span className="tag">02 · Campaign result</span>
        <img className="shot wide" src={IMAGES.screenshot1} width="801" height="303" loading="lazy"
          alt="Screenshot of Instagram messages from people saying they are interested in and have submitted their programme applications" />
        <p className="big"><b>26%</b> of total conversions came from the organic strategy I created.</p>
        <h4>What I did</h4>
        <p>Created an organic content strategy designed to generate qualified leads for the programme, working alongside the ads.</p>
      </article>

      {/* 3 — Screenshot 2 */}
      <article className="case reveal">
        <span className="tag">03 · Client review</span>
        <img className="shot tall" src={IMAGES.screenshot2} width="735" height="901" loading="lazy"
          alt="Screenshot of a client's written review of working with Valentina, praising her initiative, creativity and the launch plan she created for a pop-up" />
      </article>
    </section>
  )
}
