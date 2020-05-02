import React from "react"
import { connect } from "react-redux"

const MessagesList = ({ messages }) => (
  <div>
    {messages.slice(0,20).map((msg, i) =>
      <div key={i}>
        <div dangerouslySetInnerHTML={{__html: `${msg.payload.time} ${msg.payload.message}`}} />
      </div>
    )}
  </div>
)

const mapStateToProps = ({ messages }) => ({
  messages
})

export default connect(mapStateToProps)(MessagesList)
