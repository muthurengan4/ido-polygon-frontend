import React from "react"
import ContentLoader from "react-content-loader"

const PaymentLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1000}
    height={700}
    viewBox="0 0 1200 800"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="9" y="33" rx="0" ry="0" width="10" height="700" /> 
    <rect x="9" y="33" rx="0" ry="0" width="597" height="10" /> 
    <rect x="596" y="35" rx="0" ry="0" width="10" height="700" /> 
    <rect x="9" y="725" rx="0" ry="0" width="588" height="10" /> 
    <rect x="8" y="12" rx="0" ry="0" width="59" height="8" /> 
    <rect x="74" y="12" rx="0" ry="0" width="59" height="8" /> 
    <rect x="139" y="12" rx="0" ry="0" width="59" height="8" /> 
    <rect x="54" y="89" rx="0" ry="0" width="166" height="19" /> 
    <rect x="53" y="123" rx="0" ry="0" width="286" height="17" /> 
    <rect x="131" y="176" rx="10" ry="10" width="352" height="150" /> 
    <circle cx="144" cy="372" r="16" /> 
    <rect x="171" y="367" rx="0" ry="0" width="89" height="10" /> 
    <circle cx="143" cy="418" r="16" /> 
    <rect x="170" y="413" rx="0" ry="0" width="89" height="10" /> 
    <rect x="129" y="457" rx="10" ry="10" width="358" height="49" /> 
    <rect x="128" y="528" rx="10" ry="10" width="106" height="43" /> 
    <rect x="254" y="528" rx="10" ry="10" width="106" height="43" /> 
    <rect x="377" y="528" rx="10" ry="10" width="106" height="43" /> 
    <rect x="129" y="588" rx="10" ry="10" width="358" height="49" /> 
    <rect x="132" y="653" rx="0" ry="0" width="346" height="7" /> 
    <rect x="132" y="670" rx="0" ry="0" width="215" height="8" /> 
    <rect x="9" y="752" rx="0" ry="0" width="596" height="12" />
  </ContentLoader>
)

export default PaymentLoader;