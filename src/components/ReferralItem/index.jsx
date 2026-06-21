const ReferralItem = props=> {
  const {referralDetails} = props
  const {name,serviceName,profit,date} = referralDetails

  return (
  <li>
    <p>{name}</p>
    <p>{serviceName}</p>
    <p>{date}</p>
    <p>{profit}</p>
  </li>
  )
}

export default ReferralItem
