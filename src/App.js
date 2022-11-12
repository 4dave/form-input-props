import { useState, useEffect } from "react"
import "./App.css"
import FormInput from "./FormInput"
import { inputprops } from "./inputs"

function App() {
  const [values, setValues] = useState({})
  const [message, setMessage] = useState("")

  const getData = async () => {
    const response = await fetch(
      "https://go-crud-iommxd4b5q-uc.a.run.app/contacts"
    )
    const data = await response.json()
    setValues(data.data[0])
  }

  useEffect(() => {
    getData()
  }, [])

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const update = (id) => {
    fetch(`https://go-crud-iommxd4b5q-uc.a.run.app/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    setMessage("Success!")
  }

  const showMessages = () => {
    if (message) {
      setTimeout(() => {
        setMessage("")
      }, 3000)
      return <div className="message">{message}</div>
    }
  }

  return (
    <div className="App">
      <h1>Contacts</h1>
      {inputprops.map((input) => (
        <FormInput
          key={input.id}
          defaultValue={values && values[input.name]}
          onChange={onChange}
          {...input}
        />
      ))}
      <button onClick={() => update(values.ID)}>Submit</button>
      {showMessages()}
    </div>
  )
}

export default App
