import React from 'react'
import ListApplicants from './ListApplicants'

const Applicants = () => {
  return (
    <div>
      <div className="card">
        <h1
          className="text-center mt-2"
          style={{
            color: "#498BA6",
            textShadow:
              "0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px rgba(60, 64, 67, 0.15)",
            fontFamily: "Poppins, sans-serif, Verdana, Geneva,Tahoma",
          }}
        >
          Aplicantes
        </h1>

        <ListApplicants />
        </div>
      </div>
  )
}

export default Applicants