import React from "react"
import ContentLoader from "react-content-loader"

const KYCLoader = (props) => (
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
    <rect x="8" y="50" rx="0" ry="0" width="150" height="13" /> 
    <rect x="8" y="80" rx="0" ry="0" width="348" height="11" /> 
    <rect x="8" y="100" rx="10" ry="10" width="580" height="205" /> 
    <rect x="620" y="100" rx="10" ry="10" width="580" height="205" /> 
    <rect x="8" y="390" rx="0" ry="0" width="150" height="13" /> 
    <rect x="8" y="412" rx="0" ry="0" width="348" height="11" /> 
    <rect x="8" y="438" rx="10" ry="10" width="580" height="205" /> 
    <rect x="620" y="438" rx="10" ry="10" width="580" height="205" /> 
    <rect x="8" y="320" rx="15" ry="15" width="160" height="35" /> 
    <rect x="8" y="661" rx="15" ry="15" width="160" height="35" />
  </ContentLoader>
)

export default KYCLoader;