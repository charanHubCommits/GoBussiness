const MetricItem = props => {
  const {metricDetails} = props
  const {label,value} = metricDetails

  return (
    <li className="metric-item">
      <p className="metric-value">{value}</p>
      <p className="metric-label">{label}</p>
    </li>
  )
}

export default MetricItem

