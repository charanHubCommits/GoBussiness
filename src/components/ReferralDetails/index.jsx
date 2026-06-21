import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import Header from "../Header/"
import { TailSpin } from "react-loader-spinner"
import "./index.css"

const pageStates = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING"
}

const ReferralDetails = () => {
  const { id } = useParams()
  const [pageState, setPageState] = useState(pageStates.initial)
  const [referralData, setReferralData] = useState(null)

  useEffect(() => {
    const getReferralDetails = async () => {
      setPageState(pageStates.loading)
      const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`
      const token = Cookies.get("jwt_token")
      const Authorization = "Bearer " + token
      const options = {
        method: "GET",
        headers: {
          Authorization
        }
      }

      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error("Failed to fetch")
        }
        const responseJson = await response.json()

        if (responseJson.success && responseJson.data) {
          let foundReferral = null

          if (responseJson.data.id !== undefined && String(responseJson.data.id) === String(id)) {
            foundReferral = responseJson.data
          }

          else if (Array.isArray(responseJson.data.referrals)) {
            foundReferral = responseJson.data.referrals.find(
              ref => String(ref.id) === String(id)
            )
          }

          if (foundReferral) {
            setReferralData(foundReferral)
            setPageState(pageStates.success)
          } else {
            setPageState(pageStates.failure)
          }
        } else {
          setPageState(pageStates.failure)
        }
      } catch (error) {
        setPageState(pageStates.failure)
      }

    }

    getReferralDetails()
  }, [id])

  const renderLoading = () => (
    <div className="referral-details-page">
      <Header />
      <div className="loader-container">
        <TailSpin height="80" width="80" color="#6366f1" visible={true} />
      </div>
    </div>
  )

  const renderNotFound = () => (
    <div className="referral-details-page">
      <Header />
      <div className="details-container error-details-container">
        <Link to="/" className="back-link" aria-label="Back to dashboard">
          &larr; Back to dashboard
        </Link>
        <h1 className="error-title">Referral not found</h1>
      </div>
    </div>
  )

  const renderSuccess = () => {
    const { id: refId, name, serviceName, date, profit } = referralData

    // Format date: YYYY-MM-DD -> YYYY/MM/DD
    const formattedDate = date ? date.replace(/-/g, "/") : ""

    // Format profit: USD format
    const formattedProfit = profit !== undefined ? new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(profit) : ""

    return (
      <div className="referral-details-page">
        <Header />
        <main className="details-container">
          <Link to="/" className="back-link" aria-label="Back to dashboard">
            &larr; Back to dashboard
          </Link>
          <h1 className="details-main-heading">Referral Details</h1>
          <h2 className="partner-name-heading">{name}</h2>

          <dl className="details-list">
            <div className="details-row">
              <dt>Referral ID</dt>
              <dd>{refId}</dd>
            </div>
            <div className="details-row">
              <dt>Service Name</dt>
              <dd>{serviceName}</dd>
            </div>
            <div className="details-row">
              <dt>Date</dt>
              <dd>{formattedDate}</dd>
            </div>
            <div className="details-row">
              <dt>Profit</dt>
              <dd>{formattedProfit}</dd>
            </div>
          </dl>
        </main>
      </div>
    )
  }

  switch (pageState) {
    case pageStates.loading: return renderLoading()
    case pageStates.success: return renderSuccess()
    case pageStates.failure: return renderNotFound()
    default: return renderLoading()
  }
}

export default ReferralDetails

