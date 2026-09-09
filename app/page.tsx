export default function HomePage() {
  return (
    <main className="landing-page">
      <div className="splash-overlay" aria-label="Cute loading screen">
        <div className="splash-bubble">
          <div className="animal-illustration" aria-hidden="true">
            <span className="ear left"> </span>
            <span className="ear right"> </span>
            <span className="face">
              <span className="eye left"> </span>
              <span className="eye right"> </span>
              <span className="nose"> </span>
              <span className="smile"> </span>
            </span>
          </div>
          <div className="splash-text">
            <strong>Smart Food</strong>
            <span>Save food. Save smiles.</span>
          </div>
        </div>
      </div>

      <section className="hero-shell">
        <div className="hero-glow" />
        <div className="hero-card">
          <div className="brand-row">
            <div className="brand-mark">
              <img src="/smart-food-logo.png" alt="โลโก้บริษัท" />
            </div>
            <div>
              <p className="eyebrow">Food for good</p>
              <h1>Smart Food</h1>
            </div>
          </div>

          <div className="cta-row">
            <button type="button">Customer App</button>
            <button type="button" className="secondary">
              Seller Dashboard
            </button>
          </div>

          <div className="device-grid">
            <article className="phone mockup-1">
              <div className="phone-topbar">
                <span>9:41</span>
                <span>◔◔◔</span>
              </div>
              <div className="mini-card green">
                <div className="points-label">Your Points</div>
                <div className="points-value">320</div>
              </div>
              <div className="food-spot">
                <div className="pet-emoji">🐶</div>
                <div>
                  <strong>Rescue Food</strong>
                  <small>Feed lives</small>
                </div>
              </div>
            </article>

            <article className="phone mockup-2">
              <div className="phone-topbar">
                <span>9:41</span>
                <span>◔◔◔</span>
              </div>
              <div className="product-card">
                <div className="food-image rice">🍚</div>
                <div>
                  <h3>Cooked Rice</h3>
                  <p>12 kg</p>
                </div>
                <button type="button">Donate</button>
              </div>
            </article>

            <article className="phone mockup-3">
              <div className="phone-topbar">
                <span>9:41</span>
                <span>◔◔◔</span>
              </div>
              <div className="summary-box">
                <div className="summary-header">Donation</div>
                <div className="summary-pet">🐕</div>
                <div className="summary-text">Confirm Donation</div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
