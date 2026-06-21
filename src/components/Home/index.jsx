import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Header from "../Header/"
import MetricItem from "../MetricItem"
import ReferralItem from "../ReferralItem"
import ReferralShareItem from "../ReferralShareItem"
import {TailSpin} from "react-loader-spinner"
import "./index.css"

const pageStates = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING"
}

const Home = () => {
  const [pageState, setPageState] = useState(pageStates.initial)
  const [errorMsg, setErrorMsg] = useState("")
  const [pageData, setPageData] = useState({})
  const [referralData, setReferralData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchPageData = async () => {
      setPageState(pageStates.loading)
      try {
        const token = Cookies.get("jwt_token")
        const Authorization = "Bearer " + token
        
        // Build URL parameters
        const params = new URLSearchParams()
        if (searchQuery) {
          params.append("search", searchQuery)
        }
        params.append("sort", sortOrder)
        
        const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?${params.toString()}`
        
        const options = {
          method: "GET",
          headers: {
            Authorization
          }
        }
        const response = await fetch(url, options)
        if (!response.ok) {
          let errMsg = `Error ${response.status}: ${response.statusText}`
          try {
            const errBody = await response.json()
            if (errBody && errBody.message) {
              errMsg = `${errBody.message} (${response.status})`
            }
          } catch (e) {
            // ignore
          }
          throw new Error(errMsg)
        }
        
        const responseJson = await response.json()
        const {data} = responseJson
        const {metrics, referral, referrals, serviceSummary} = data
        
        setPageData({metrics, referral, serviceSummary})
        setReferralData(referrals)
        setPageState(pageStates.success)
        setCurrentPage(1) // Reset pagination on search/sort
      } catch (error) {
        setErrorMsg(error.message)
        setPageState(pageStates.failure)
      }
    }
    
    fetchPageData()
  }, [searchQuery, sortOrder])

  const renderLoadingPage = () => (
    <div className="loader-container">
      <TailSpin height="80" width="80" color="#6366f1" visible={true} />
    </div>
  )

  const renderSuccessPage = () => {
    const {metrics, referral, serviceSummary} = pageData
    const {activeReferrals, service, totalRefEarnings, yourReferrals} = serviceSummary
    const {link, code} = referral

    // Pagination Logic
    const itemsPerPage = 10
    const totalItems = referralData.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = totalItems > 0 ? (currentPage - 1) * itemsPerPage : 0
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
    const paginatedReferrals = referralData.slice(startIndex, endIndex)

    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }

    return (
      <div className="home">
        <Header />
        
        <main className="dashboard-content">
          <div className="dashboard-header-text">
            <h1>Referral Dashboard</h1>
            <p>Track your referrals, earnings, and partner activity in one place.</p>
          </div>

          <section className="overview-section" role="region" aria-label="Overview metrics">
            <h1>Overview</h1>
            <ul className="metric-list">
              {metrics.map(eachMetric => (
                <MetricItem key={eachMetric.id} metricDetails={eachMetric}/>
              ))}
            </ul>
          </section>

          <section className="service-summary-section" aria-label="Service summary">
            <h1>Service summary</h1>
            <ul className="service-list">
              <li className="service-item">
                <p>Service</p>
                <p>{service}</p>
              </li>
              <li className="service-item">
                <p>Your Referrals</p>
                <p>{yourReferrals}</p>
              </li>
              <li className="service-item">
                <p>Active Referrals</p>
                <p>{activeReferrals}</p>
              </li>
              <li className="service-item">
                <p>Total Ref. Earnings</p>
                <p>{totalRefEarnings}</p>
              </li>
            </ul>
          </section>

          <section className="share-referral-section" aria-label="Share referral">
            <h1>Refer friends and earn more</h1>
            <div className="share-cards">
              <ReferralShareItem label="Your Referral Link" value={link} />
              <ReferralShareItem label="Your Referral Code" value={code} />
            </div>
          </section>

          <section className="all-referrals-section">
            <h1>All referrals</h1>
            
            <div className="referral-header">
              <div className="filter-controls">
                <div className="search-wrapper">
                  <label htmlFor="search">Search</label>
                  <input 
                    type="search" 
                    id="search" 
                    placeholder="Name or service…" 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    aria-label="Search referrals"
                  />
                </div>
                
                <div className="sort-wrapper">
                  <label htmlFor="sort-by">
                    Sort by date
                    <select 
                      id="sort-by"
                      value={sortOrder}
                      onChange={e => setSortOrder(e.target.value)}
                    >
                      <option value="desc">Newest first</option>
                      <option value="asc">Oldest first</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="referral-list-container">
                {paginatedReferrals.length === 0 ? (
                  <p className="no-entries">No matching entries</p>
                ) : (
                  <ul className="referral-list">
                    <li className="referral-row-header">
                      <p>NAME</p>
                      <p>SERVICE</p>
                      <p>DATE</p>
                      <p>PROFIT</p>
                    </li>
                    {paginatedReferrals.map(eachReferral => (
                      <ReferralItem key={eachReferral.id} referralDetails={eachReferral}/>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pagination-container">
                <p className="pagination-summary">
                  Showing {totalItems > 0 ? startIndex + 1 : 0}–{endIndex} of {totalItems} entries
                </p>
                <div className="pagination-controls">
                  <button 
                    type="button" 
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Previous
                  </button>
                  
                  {totalPages > 1 && pageNumbers.map(number => (
                    <button
                      key={number}
                      type="button"
                      className={`page-num-btn ${currentPage === number ? 'active' : ''}`}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </button>
                  ))}

                  <button 
                    type="button" 
                    className="pagination-btn"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>

            </div>
          </section>
        </main>

        <footer className="footer-container">
          <span className="footer-brand">Go Business</span>
          <nav aria-label="Footer" className="footer-nav">
            <a href="#about" className="footer-link">About</a>
            <a href="#privacy" className="footer-link">Privacy</a>
          </nav>
          <span className="footer-copyright">© 2024 Go Business</span>
        </footer>
      </div>
    )
  }

  const renderFailurePage = () => (
    <div className="home">
      <Header />
      <div className="error-container" role="alert">
        <h1>Error while loading page</h1>
        <p className="error-msg-text">{errorMsg}</p>
        <button type="button" className="retry-btn" onClick={() => {
          setSearchQuery("")
          setSortOrder("desc")
        }}>
          Retry
        </button>
      </div>
    </div>
  )

  switch (pageState) {
    case pageStates.loading: return renderLoadingPage()
    case pageStates.success: return renderSuccessPage()
    case pageStates.failure: return renderFailurePage()
    default: return renderLoadingPage()
  }
}

export default Home

