import React from "react"
import ContentLoader from "react-content-loader"

const SettingsLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1100}
    height={500}
    viewBox="0 0 1200 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="4" y="19" rx="0" ry="0" width="153" height="12" /> 
    <rect x="5" y="46" rx="10" ry="10" width="350" height="61" /> 
    <rect x="400" y="46" rx="10" ry="10" width="350" height="61" /> 
    <rect x="800" y="46" rx="10" ry="10" width="350" height="61" /> 
    <rect x="5" y="129" rx="10" ry="10" width="350" height="61" /> 
    <rect x="400" y="129" rx="10" ry="10" width="350" height="61" /> 
    <rect x="800" y="129" rx="10" ry="10" width="350" height="61" /> 
    <rect x="5" y="214" rx="10" ry="10" width="350" height="61" /> 
    <rect x="5" y="302" rx="0" ry="0" width="153" height="12" /> 
    <rect x="5" y="329" rx="10" ry="10" width="350" height="72" /> 
    <rect x="400" y="329" rx="10" ry="10" width="350" height="61" /> 
    <rect x="800" y="329" rx="10" ry="10" width="350" height="61" /> 
    <rect x="5" y="419" rx="10" ry="10" width="350" height="61" />
  </ContentLoader>
)

export default SettingsLoader;