import React from "react"
import ContentLoader from "react-content-loader"

const RequestViewLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1000}
    height={800}
    viewBox="0 0 1300 1050"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="1" y="19" rx="0" ry="0" width="10" height="547" /> 
    <rect x="3" y="19" rx="0" ry="0" width="1050" height="10" /> 
    <rect x="1043" y="23" rx="0" ry="0" width="10" height="542" /> 
    <rect x="2" y="558" rx="0" ry="0" width="1051" height="10" /> 
    <circle cx="505" cy="75" r="31" /> 
    <rect x="440" y="121" rx="0" ry="0" width="127" height="7" /> 
    <rect x="450" y="160" rx="0" ry="0" width="104" height="9" /> 
    <circle cx="505" cy="219" r="26" /> 
    <rect x="96" y="285" rx="5" ry="5" width="850" height="40" /> 
    <rect x="96" y="339" rx="5" ry="5" width="850" height="40" /> 
    <rect x="98" y="394" rx="5" ry="5" width="850" height="40" /> 
    <rect x="450" y="448" rx="0" ry="0" width="103" height="8" /> 
    <circle cx="500" cy="496" r="26" /> 
    <rect x="465" y="529" rx="0" ry="0" width="74" height="10" /> 
    <rect x="3" y="587" rx="0" ry="0" width="9" height="196" /> 
    <rect x="5" y="587" rx="0" ry="0" width="1050" height="9" /> 
    <rect x="1045" y="588" rx="0" ry="0" width="9" height="194" /> 
    <rect x="5" y="776" rx="0" ry="0" width="1050" height="9" /> 
    <rect x="50" y="613" rx="0" ry="0" width="200" height="17" /> 
    <rect x="50" y="638" rx="0" ry="0" width="150" height="13" /> 
    <rect x="50" y="679" rx="0" ry="0" width="200" height="16" /> 
    <rect x="50" y="703" rx="0" ry="0" width="150" height="12" /> 
    <rect x="550" y="615" rx="0" ry="0" width="200" height="12" /> 
    <rect x="550" y="637" rx="0" ry="0" width="150" height="12" /> 
    <rect x="4" y="801" rx="0" ry="0" width="9" height="196" /> 
    <rect x="6" y="801" rx="0" ry="0" width="1050" height="9" /> 
    <rect x="1048" y="802" rx="0" ry="0" width="9" height="194" /> 
    <rect x="6" y="990" rx="0" ry="0" width="1050" height="9" /> 
    <rect x="156" y="828" rx="5" ry="5" width="745" height="143" />
  </ContentLoader>
)

export default RequestViewLoader;