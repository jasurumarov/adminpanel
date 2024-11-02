import { IoIosMenu } from "react-icons/io";
import React from 'react'
import { FaUser } from "react-icons/fa";

const AdminHeader = ({ setClose }) => {
  const userData = JSON.parse(localStorage.getItem('user-data'))
  return (
    <div className="admin__header">
      <button onClick={() => setClose(p => !p)}><IoIosMenu /></button>
      <div>
        <p>{userData ? `${userData.name} ${userData.lname}` : "John Doe"}</p> <FaUser />      </div>
    </div>
  )
}

export default AdminHeader