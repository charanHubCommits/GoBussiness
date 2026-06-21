import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get("jwt_token")
    if (token) {
      navigate("/")
    }
  }, [navigate])

  const signIn = async (event) => {
    event.preventDefault()

    const url = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    }
    try {
      const response = await fetch(url, options)
      const responseJson = await response.json()
      console.log(responseJson)

      if (!response.ok) {
        const { message } = responseJson
        setShowError(true)
        setErrorMsg(message)
        console.log(message)
      } else {
        const { data } = responseJson;
        const { token, message } = data

        Cookies.set("jwt_token", token, { expires: 7 });
        navigate("/")
      }
    } catch (error) {
      console.log(error.message)
      setErrorMsg("Unknown Error")
      setShowError(true)
    }
  }

  const onChangeEmail = event => {
    setEmail(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  return (
    <div className="login-page">
      <div className="form-container">
        <h1 className="company-name">Go Business</h1>
        <p className="tag-line">Sign in to open your referral dashboard.</p>
        <form className="login-form" onSubmit={signIn}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="you@example.com"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
          />

          {showError && <p className="error-msg">{errorMsg}</p>}
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Login