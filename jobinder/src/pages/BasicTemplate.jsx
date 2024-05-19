//import React from 'react'
import PropTypes from 'prop-types'
import JobFooter from '../components/JobFooter/JobFooter'
import JobNavbar from '../components/JobNavbar/JobNavbar'
//import { useEffect, useState } from 'react'
import { useMediaQuery } from "react-responsive";

const BasicTemplate = ({children}) => {
  
  
  const isUltraWide = useMediaQuery({
    query: "(min-width: 2000px)",
  });
  
  return (
    <div className={isUltraWide?'container':''}>
      <JobNavbar />
        <span>{children}</span>
      <JobFooter />

    </div>
  )
}

BasicTemplate.propTypes = {
    children: PropTypes.node.isRequired,
    }

export default BasicTemplate