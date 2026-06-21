import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import MetricItem from "../MetricItem"
import ReferralItem from "../ReferralItem"
import ReferralShareItem from "../ReferralShareItem"
import "./index.css"

const pageStates = {
  initial:"INITIAL",
  success:"SUCCESS",
  failure:"FAILURE",
  loading:"LOADING"
}


const Home = ()=>{
  const [pageState,setPageState] = useState(pageStates.initial)
  const [errorMsg,setErrorMsg] = useState("")
  const [pageData,setPageData] = useState({})
  const [referralData,setReferralData] = useState([])
  
  const getReferrals = async()=> {
    try {
      const url = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals"
      const token = Cookies.get("jwt-token")
      const Authorization = "Bearer "+token
      const options = {
        method:"GET",
        headers:{
          Authorization
        }
      }
      const response = await fetch(url,options)
      const responseJson = await response.json()
      const {data} = responseJson
      console.log(responseJson)
      const {metrics,referral,referrals,serviceSummary} = data

      setPageState(pageStates.success)
      setPageData({metrics,referral,serviceSummary})
      setReferralData(referrals)
      } catch (error) {
          setErrorMsg(error.message)
          setPageState(pageStates.failure)
      }
  }

  useEffect(()=>{
    getReferrals()
  },[])


  const renderSuccessPage = ()=> {
    const {metrics,referral,serviceSummary} = pageData
    const {activeReferrals,service,totalRefEarnings,yourReferrals} = serviceSummary
    const {link,code} = referral

    return (
      <div className="home">
      <h1>Referral Dashboard</h1>
      <p>Track your referrals, earnings, and partner activity in one place.</p>
      <div className="overview-section" role="region" aria-label="Overview metrics">
        <h1>Overview</h1>
        <ul className="metric-list">
          {metrics.map(eachMetric=>(
            <MetricItem key={eachMetric.id} metricDetails={eachMetric}/>
          ))}
        </ul>
      </div>
      <div className="service-summary-section" aria-label="Service summary">
        <h1>Service Summary</h1>
        <ul className="service-list">
          <li className="service-item">
            <p>SERVICE</p>
            <p>{service}</p>
          </li>
          <li className="service-item">
            <p>YOUR REFERRALS</p>
            <p>{yourReferrals}</p>
          </li>
          <li className="service-item">
            <p>ACTIVE REFERRALS</p>
            <p>{activeReferrals}</p>
          </li>
          <li className="service-item">
            <p>TOTAL REF. EARNINGS</p>
            <p>{totalRefEarnings}</p>
          </li>
        </ul>
       </div>
      <div className="share-referral-section">
        <h1>Refer friends and earn more</h1>
          <div>
            <ReferralShareItem label="YOUR REFERRAL LINK" value={link}  />
            <ReferralShareItem label="YOUT REFERRAL CODE" value={code} />
          </div>
      </div>
      <div className="all-referrals-section">
        <h1>All referrals</h1>
        <div className="referral-header">
          <div>
            <label htmlFor="search">Search</label>
            <input type="search" id="search" placeholder="Name or service"/>
          </div>
          <div>
            <label htmlFor="sort-by">Sort by date</label>
            <select defaultValue="desc">
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </div>
          <div>
            <ul className="referral-list">
              <li className="referral-row-header">
                <p>NAME</p>
                <p>SERVICE</p>
                <p>DATE</p>
                <p>PROFIT</p>
              </li>
              {referralData.map(eachReferral=>(
                <ReferralItem key={eachReferral.id} referralDetails={eachReferral}/>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    )
  }

  if(pageState===pageStates.success)return renderSuccessPage()
  else return <h1>Home</h1>
}

export default Home
