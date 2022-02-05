import React from "react"
import ContentLoader from "react-content-loader"

const EnrollLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1000}
    height={850}
    viewBox="0 0 1200 950"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="9" y="33" rx="0" ry="0" width="10" height="898" /> 
    <rect x="9" y="33" rx="0" ry="0" width="850" height="10" /> 
    <rect x="850" y="35" rx="0" ry="0" width="10" height="897" /> 
    <rect x="10" y="922" rx="0" ry="0" width="850" height="10" /> 
    <rect x="280" y="79" rx="0" ry="0" width="288" height="15" /> 
    <rect x="230" y="101" rx="0" ry="0" width="381" height="11" /> 
    <rect x="270" y="122" rx="0" ry="0" width="300" height="11" /> 
    <rect x="83" y="165" rx="0" ry="0" width="74" height="12" /> 
    <rect x="83" y="190" rx="10" ry="10" width="700" height="35" /> 
    <rect x="83" y="244" rx="0" ry="0" width="74" height="12" /> 
    <rect x="83" y="270" rx="10" ry="10" width="700" height="35" /> 
    <rect x="84" y="319" rx="0" ry="0" width="74" height="12" /> 
    <rect x="84" y="344" rx="10" ry="10" width="700" height="35" /> 
    <rect x="84" y="398" rx="0" ry="0" width="74" height="12" /> 
    <rect x="84" y="424" rx="10" ry="10" width="700" height="35" /> 
    <rect x="84" y="473" rx="0" ry="0" width="74" height="12" /> 
    <rect x="84" y="498" rx="10" ry="10" width="700" height="35" /> 
    <rect x="84" y="552" rx="0" ry="0" width="74" height="12" /> 
    <rect x="84" y="578" rx="10" ry="10" width="700" height="35" /> 
    <rect x="82" y="627" rx="0" ry="0" width="200" height="12" /> 
    <rect x="82" y="653" rx="10" ry="10" width="700" height="121" /> 
    <rect x="230" y="793" rx="0" ry="0" width="406" height="8" /> 
    <rect x="215" y="812" rx="0" ry="0" width="436" height="9" /> 
    <rect x="330" y="832" rx="0" ry="0" width="205" height="10" /> 
    <rect x="82" y="851" rx="10" ry="10" width="700" height="35" />
  </ContentLoader>
)

export default EnrollLoader;