import { useState, useEffect } from "react"
import "./App.css"
import FormInput from "./FormInput"
import { inputprops } from "./inputs"

function App() {
  const [values, setValues] = useState({})
  const [message, setMessage] = useState("")

  const getData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/contacts`)
    const data = await response.json()
    setValues(data.data[0])
  }

  useEffect(() => {
    getData()
  }, [message])

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const update = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    setMessage("Updated!")
  }

  const create = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    setMessage("Created!")
  }

  const remove = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/contacts/${id}`, {
      method: "DELETE",
    }).then(() => {
      setMessage("Deleted!")
    })
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
      {values && values.ID ? (
        <>
          <button onClick={() => update(values.ID)}>Update</button>
          <button onClick={() => remove(values.ID)}>Delete</button>
        </>
      ) : (
        <button onClick={() => create(values)}>Save</button>
      )}
      {showMessages()}
    </div>
  )
}

export default App
