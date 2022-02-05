import React from "react"
import ContentLoader from "react-content-loader"

const BillingAccountLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1100}
    height={430}
    viewBox="0 0 1200 430"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="21" rx="5" ry="5" width="600" height="396" /> 
    <rect x="630" y="21" rx="5" ry="5" width="570" height="191" /> 
    <rect x="630" y="227" rx="5" ry="5" width="570" height="191" />
  </ContentLoader>
)

export default BillingAccountLoader;