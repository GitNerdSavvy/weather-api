import React from 'react'

function Footer() {
  return (
    <footer style={{ padding: "15px 0", backgroundColor: "black", marginBottom: "0" ,marginTop: "120px" }}>
        <center>Weather App by Sanjeev &copy; {new Date().getFullYear()}</center>
    </footer>
  )
}

export default Footer