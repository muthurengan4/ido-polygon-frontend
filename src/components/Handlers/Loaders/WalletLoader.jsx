import React from "react"
import ContentLoader from "react-content-loader"

const WalletLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1340}
    height={450}
    viewBox="0 0 1200 450"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="5" y="67" rx="10" ry="10" width="350" height="131" /> 
    <rect x="430" y="67" rx="10" ry="10" width="350" height="131" /> 
    <rect x="850" y="68" rx="10" ry="10" width="350" height="131" /> 
    <rect x="4" y="222" rx="10" ry="10" width="1195" height="200" /> 
    <rect x="1060" y="12" rx="10" ry="10" width="138" height="36" />
  </ContentLoader>
)

export default WalletLoader;
