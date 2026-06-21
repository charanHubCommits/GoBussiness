const MetricItem = props => {
  const {metricDetails} = props
  const {label,value} = metricDetails

  return (
    <li className="metric-item">
      <p>{value}</p>
      <p>{label}</p>
    </li>
  )
}

export default MetricItem
