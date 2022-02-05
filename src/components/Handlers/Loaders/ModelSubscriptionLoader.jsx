import React from "react"
import ContentLoader from "react-content-loader"

const ModelSubscriptionLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={815}
    height={280}
    viewBox="0 0 1200 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="1" y="19" rx="0" ry="0" width="10" height="360" /> 
    <rect x="3" y="19" rx="0" ry="0" width="1033" height="10" /> 
    <rect x="1028" y="19" rx="0" ry="0" width="10" height="360" /> 
    <rect x="2" y="370" rx="0" ry="0" width="1035" height="10" /> 
    <rect x="28" y="51" rx="5" ry="5" width="985" height="30" /> 
    <rect x="28" y="95" rx="5" ry="5" width="985" height="30" /> 
    <rect x="28" y="140" rx="5" ry="5" width="985" height="30" /> 
    <rect x="28" y="184" rx="5" ry="5" width="985" height="30" /> 
    <rect x="28" y="228" rx="5" ry="5" width="985" height="30" /> 
    <rect x="28" y="273" rx="5" ry="5" width="985" height="30" /> 
    <rect x="28" y="317" rx="5" ry="5" width="985" height="30" />
  </ContentLoader>
)

export default ModelSubscriptionLoader;
