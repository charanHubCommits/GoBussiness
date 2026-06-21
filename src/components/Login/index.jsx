import {useState} from "react"
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [errorMsg,setErrorMsg] = useState("")
  const [showError,setShowError] = useState(false) 
  const navigateHome = useNavigate()

  const signIn = async(event)=>{
    event.preventDefault()

    const url = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin" 
    const options = {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({ email, password })
    }
    const response = await fetch(url,options)
    const data = await response.json()

    const {token,message} = data
    if(!token){
      setErrorMsg(message)
      setShowError(true)
      console.log(errorMsg)
    }else {
      Cookies.set("jwt-token",token,{expires: 7});
      navigateHome("/")
    }
  }

  const onChangeEmail = event=> {
    setEmail(event.target.value)
  }

  const onChangePassword = event=> {
    setPassword(event.target.value)
  }

  const LoadPage = ()=> {
    const token = Cookies.get("jwt-token")
    if(token) return <h1>Go to home page</h1>

    return (  
      <div className="login-page">
        <div className="form-container" onSubmit={signIn}>
        <h1 className="company-name">Go Bussiness</h1>
        <p className="tag-line">Sign in to open your referral dashboard.</p>
        <form className="login-form">
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" value={email} onChange={onChangeEmail}/>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={password} onChange={onChangePassword}/>
          {showError&&<p className="error-msg">{errorMsg}</p>}
          <button type="submit">Sign in</button>
        </form>
        </div>
      </div>
    )
  }

  return LoadPage()
}

export default Login
