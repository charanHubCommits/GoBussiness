import {useState,useEffect} from 'react'



const Home = ()=>{
  const pageStates = {
    initial:"INITIAL",
    success:"SUCCESS",
    failure:"FAILURE",
    loading:"LOADING"
  }

  const [pageState,setPageState] = useState(pageStates.initial)
  
  const getReferrals = async()=> {
    const url = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals"
    const options = {
      method:"GET"
    }
    const response = await fetch(url,options)
    const data = response.json()
    console.log(data)
  }

  useEffect(()=>{
    getReferrals()
  },[])

  const LoadPage = ()=> (<h1>Home</h1>)

  return LoadPage()
}

export default Home
