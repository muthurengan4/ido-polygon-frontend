import React from "react"
import ContentLoader from "react-content-loader"

const CardLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1100}
    height={400}
    viewBox="0 0 1200 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="7" y="209" rx="5" ry="5" width="380" height="164" /> 
    <rect x="402" y="209" rx="5" ry="5" width="380" height="164" /> 
    <rect x="800" y="209" rx="5" ry="5" width="380" height="164" /> 
    <rect x="7" y="19" rx="5" ry="5" width="380" height="164" />
  </ContentLoader>
)

export default CardLoader;
