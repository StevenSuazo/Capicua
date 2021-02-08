import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
 

  return (
    <>
      <h1>Join</h1>
      <div><input placeholder="" className="joinInput" type="text" onChange={} /></div>
      <div><input placeholder="" className="joinInput" type="text" onChange={} /></div>
      <Link>
        <button className="button" type="submit">Sign In</button>
      </Link>
    </>
  )
}

export default Join; 