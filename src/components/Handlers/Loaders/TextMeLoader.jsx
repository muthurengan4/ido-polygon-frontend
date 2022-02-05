import React from "react"
import ContentLoader from "react-content-loader"

const TextMeLoader = (props) => (
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
    <rect x="6" y="17" rx="10" ry="10" width="1190" height="263" /> 
    <rect x="7" y="320" rx="5" ry="5" width="350" height="164" /> 
    <rect x="430" y="320" rx="5" ry="5" width="350" height="164" /> 
    <rect x="850" y="320" rx="5" ry="5" width="350" height="164" />
  </ContentLoader>
)

export default TextMeLoader;