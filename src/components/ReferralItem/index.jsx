import {useNavigate} from "react-router-dom"

const ReferralItem = props => {
  const {referralDetails} = props
  const {id, name, serviceName, profit, date} = referralDetails
  const navigate = useNavigate()

  const onClickRow = () => {
    navigate(`/referral/${id}`)
  }

  // Format date: YYYY-MM-DD -> YYYY/MM/DD
  const formattedDate = date ? date.replace(/-/g, "/") : ""

  // Format profit: e.g. 1234 -> $1,234
  const formattedProfit = profit !== undefined ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(profit) : ""

  return (
    <li className="referral-row" onClick={onClickRow}>
      <p className="referral-name">{name}</p>
      <p className="referral-service">{serviceName}</p>
      <p className="referral-date">{formattedDate}</p>
      <p className="referral-profit">{formattedProfit}</p>
    </li>
  )
}

export default ReferralItem

