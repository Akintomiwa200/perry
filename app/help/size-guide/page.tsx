export const metadata = { title: 'Size Guide | Help' }

export default function SizeGuidePage() {
  return (
    <div className="help article">
      <h2>Size Guide</h2>
      <p className="lead">Find your perfect fit. Measurements are in inches.</p>

      <section>
        <h3>Footwear</h3>
        <table className="size-table">
          <thead>
            <tr><th>US</th><th>UK</th><th>EU</th><th>Length (in)</th></tr>
          </thead>
          <tbody>
            <tr><td>5</td><td>2.5</td><td>35</td><td>9&quot;</td></tr>
            <tr><td>6</td><td>3.5</td><td>36</td><td>9.5&quot;</td></tr>
            <tr><td>7</td><td>4.5</td><td>37</td><td>9.8&quot;</td></tr>
            <tr><td>8</td><td>5.5</td><td>38</td><td>10&quot;</td></tr>
            <tr><td>9</td><td>6.5</td><td>39</td><td>10.5&quot;</td></tr>
            <tr><td>10</td><td>7.5</td><td>40</td><td>11&quot;</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>How to Measure</h3>
        <ol>
          <li>Stand on a piece of paper with your heel against a wall</li>
          <li>Mark the longest part of your foot</li>
          <li>Measure from wall to mark</li>
          <li>Add 0.5&quot; for comfort</li>
        </ol>
      </section>

      <section>
        <h3>Clothing (Standard)</h3>
        <table className="size-table">
          <thead>
            <tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hips</th></tr>
          </thead>
          <tbody>
            <tr><td>XS</td><td>32&quot;</td><td>24&quot;</td><td>34&quot;</td></tr>
            <tr><td>S</td><td>34&quot;</td><td>26&quot;</td><td>36&quot;</td></tr>
            <tr><td>M</td><td>36&quot;</td><td>28&quot;</td><td>38&quot;</td></tr>
            <tr><td>L</td><td>38&quot;</td><td>30&quot;</td><td>40&quot;</td></tr>
            <tr><td>XL</td><td>40&quot;</td><td>32&quot;</td><td>42&quot;</td></tr>
          </tbody>
        </table>
      </section>

      <div className="note">
        <strong>Tip:</strong> If between sizes, we recommend sizing up for comfort.
      </div>

      <style jsx>{`
        .article h2 { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: var(--deep); margin-bottom: 0.5rem; }
        .lead { font-size: 1.1rem; color: var(--mid); margin-bottom: 2rem; }
        section { margin-bottom: 2rem; }
        section h3 { font-size: 1.1rem; color: var(--deep); margin-bottom: 0.75rem; }
        ol { list-style: decimal; padding-left: 1.5rem; color: var(--mid); line-height: 2; }
        .size-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .size-table th, .size-table td { padding: 0.75rem; text-align: center; border: 1px solid var(--blush); }
        .size-table th { background: var(--light-gold); color: var(--deep); }
        .size-table td { color: var(--mid); }
        .note { margin-top: 2rem; padding: 1.5rem; background: var(--light-gold); font-size: 0.9rem; color: var(--deep); }
      `}</style>
    </div>
  )
}