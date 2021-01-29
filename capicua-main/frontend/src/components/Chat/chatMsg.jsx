import React from 'react'

export default ({ name, message }) =>
  <>
    <div className="send-textarea">
      <strong>{name}:</strong> <em>{message}</em>
    </div>
  </>