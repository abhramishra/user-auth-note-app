import React, { useState, useEffect } from 'react'
import NavBar from './component/NavBar'
function App() {
  const [ userLogin, setUserLogin ] = useState(false)
  const handleToggle = () => {
    console.log("inside handleToggle")
    setUserLogin(!userLogin)
  }
  useEffect(() => {
      if (localStorage.getItem('token')) {
          handleToggle()
      }
  },[])

  return (
    <div>
      <h2>User Auth</h2>
      <NavBar userLogin={userLogin} handleToggle={handleToggle}/>
    </div>
  );
}

export default App;
