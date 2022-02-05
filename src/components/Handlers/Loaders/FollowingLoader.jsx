import React from "react"
import ContentLoader from "react-content-loader"

const FollowingLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={350}
    viewBox="0 0 1200 320"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="4" y="21" rx="5" ry="5" width="250" height="250" /> 
    <rect x="4" y="280" rx="0" ry="0" width="50" height="10" /> 
    <rect x="4" y="300" rx="0" ry="0" width="85" height="8" /> 
    <rect x="290" y="21" rx="5" ry="5" width="250" height="250" /> 
    <rect x="290" y="280" rx="0" ry="0" width="50" height="10" /> 
    <rect x="290" y="300" rx="0" ry="0" width="85" height="8" /> 
    <rect x="575" y="21" rx="5" ry="5" width="250" height="250" /> 
    <rect x="575" y="280" rx="0" ry="0" width="50" height="10" /> 
    <rect x="575" y="300" rx="0" ry="0" width="85" height="8" /> 
    <rect x="855" y="21" rx="5" ry="5" width="250" height="250" /> 
    <rect x="855" y="280" rx="0" ry="0" width="50" height="10" /> 
    <rect x="855" y="300" rx="0" ry="0" width="85" height="8" />
  </ContentLoader>
)

export default FollowingLoader;