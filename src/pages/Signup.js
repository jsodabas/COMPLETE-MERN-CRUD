import React, {useState} from 'react'
import { useUserContext } from '../hooks/useUserContext.js'

const Signup = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPasword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useUserContext()

  const submitSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:5000/api/user/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, email, password})
    })

    const json = await response.json()

    console.log(json);
    if(response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({type: 'LOGIN', payload: json})
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setError(json.error)
    }
  }

  return (
    <div>
      <form onSubmit={submitSignup}>
        <label>Don't have an account? Sign up here</label>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Type your username here' />
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Type your email here' />
        <input type='password' value={password} onChange={(e) => setPasword(e.target.value)} placeholder='Type your password here' />
        <input type='submit' value="Done" disabled={isLoading} />
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  )
}

export default Signup