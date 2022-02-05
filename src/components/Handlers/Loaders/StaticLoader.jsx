import React from "react"
import ContentLoader from "react-content-loader"

const StaticLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1100}
    height={700}
    viewBox="0 0 1200 750"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="4" y="21" rx="0" ry="0" width="10" height="698" /> 
    <rect x="4" y="21" rx="0" ry="0" width="1190" height="10" /> 
    <rect x="1185" y="23" rx="0" ry="0" width="10" height="695" /> 
    <rect x="9" y="709" rx="0" ry="0" width="1185" height="10" /> 
    <rect x="32" y="59" rx="0" ry="0" width="176" height="12" /> 
    <rect x="1015" y="58" rx="0" ry="0" width="154" height="37" /> 
    <circle cx="54" cy="109" r="7" /> 
    <rect x="67" y="106" rx="0" ry="0" width="88" height="5" /> 
    <circle cx="55" cy="133" r="7" /> 
    <rect x="68" y="130" rx="0" ry="0" width="88" height="5" /> 
    <circle cx="55" cy="158" r="7" /> 
    <rect x="68" y="155" rx="0" ry="0" width="88" height="5" /> 
    <circle cx="56" cy="182" r="7" /> 
    <rect x="69" y="179" rx="0" ry="0" width="88" height="5" /> 
    <rect x="29" y="218" rx="0" ry="0" width="1140" height="3" /> 
    <rect x="33" y="238" rx="0" ry="0" width="177" height="15" /> 
    <rect x="34" y="264" rx="0" ry="0" width="159" height="13" /> 
    <rect x="32" y="299" rx="0" ry="0" width="1140" height="48" /> 
    <rect x="32" y="364" rx="0" ry="0" width="1140" height="74" /> 
    <rect x="32" y="453" rx="0" ry="0" width="1140" height="76" /> 
    <rect x="32" y="543" rx="0" ry="0" width="1140" height="95" /> 
    <rect x="32" y="652" rx="0" ry="0" width="1140" height="36" />
  </ContentLoader>
)

export default StaticLoader;