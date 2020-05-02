import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import { sendMessage } from "../actions"

const MessageForm = ({ onSubmit }) => {
  const [input, setInput] = useState("")
  const inputEl = useRef(null)
  
  const onKeyDown = e => {
    if (!e.ctrlKey)
      inputEl.current.focus()
    if (e.key === "Enter" && !e.shiftKey)
      e.preventDefault()
  }

  const onKeyUp = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e.target.value)
      setInput("")
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return (
    <form onSubmit={() => false} style={{position: 'absolute', bottom: '0px', width: '100%'}}>
      <input type="text" ref={inputEl} onKeyUp={onKeyUp} placeholder="Message"
        value={input} onChange={e => setInput(e.target.value)} style={{width: '100%', padding: '5px'}}/> 
    </form>
  )
}

const mapDispatchToProps = dispatch => ({
  onSubmit: msg => dispatch(sendMessage(msg))
})

export default connect(() => ({}), mapDispatchToProps)(MessageForm)
