

export default function Row({currency}) {
  return (
      <div className='' >
        <div>
          <input type='number' />
        <select >
          {currency.map((option) => (
            <option key={option} value={option}>{ option}</option>
          ))}
          </select>
        </div>
      </div>
  )
}
