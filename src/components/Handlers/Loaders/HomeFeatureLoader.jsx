import React from "react"
import ContentLoader from "react-content-loader"

const HomeFeatureLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1300}
    height={280}
    viewBox="0 0 1300 280"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="4" y="21" rx="5" ry="5" width="220" height="180" /> 
    <rect x="4" y="214" rx="0" ry="0" width="50" height="10" /> 
    <rect x="4" y="232" rx="0" ry="0" width="85" height="8" /> 
    <rect x="240" y="21" rx="5" ry="5" width="220" height="180" /> 
    <rect x="240" y="214" rx="0" ry="0" width="50" height="10" /> 
    <rect x="240" y="232" rx="0" ry="0" width="85" height="8" /> 
    <rect x="475" y="19" rx="5" ry="5" width="220" height="180" /> 
    <rect x="475" y="212" rx="0" ry="0" width="50" height="10" /> 
    <rect x="475" y="230" rx="0" ry="0" width="85" height="8" /> 
    <rect x="710" y="19" rx="5" ry="5" width="220" height="180" /> 
    <rect x="710" y="212" rx="0" ry="0" width="50" height="10" /> 
    <rect x="710" y="230" rx="0" ry="0" width="85" height="8" /> 
    <rect x="945" y="18" rx="5" ry="5" width="220" height="180" /> 
    <rect x="945" y="211" rx="0" ry="0" width="50" height="10" /> 
    <rect x="945" y="229" rx="0" ry="0" width="85" height="8" /> 
    <rect x="1180" y="18" rx="5" ry="5" width="65" height="180" /> 
    <rect x="1180" y="211" rx="0" ry="0" width="45" height="10" /> 
    <rect x="1180" y="229" rx="0" ry="0" width="61" height="8" />
  </ContentLoader>
)

export default HomeFeatureLoader;