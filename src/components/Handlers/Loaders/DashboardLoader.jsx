import React from "react"
import ContentLoader from "react-content-loader"

const DashboardLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1340}
    height={600}
    viewBox="0 0 1000 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <circle cx="155" cy="136" r="111" /> 
    <rect x="323" y="42" rx="10" ry="10" width="300" height="120" /> 
    <rect x="104" y="262" rx="0" ry="0" width="127" height="15" /> 
    <rect x="5" y="298" rx="0" ry="0" width="1190" height="2" /> 
    <rect x="10" y="318" rx="0" ry="0" width="550" height="13" /> 
    <rect x="640" y="316" rx="0" ry="0" width="550" height="13" /> 
    <rect x="5" y="345" rx="0" ry="0" width="1190" height="2" /> 
    <rect x="10" y="367" rx="0" ry="0" width="550" height="13" /> 
    <rect x="640" y="368" rx="0" ry="0" width="550" height="13" /> 
    <rect x="7" y="400" rx="0" ry="0" width="1190" height="2" /> 
    <rect x="9" y="420" rx="0" ry="0" width="550" height="13" /> 
    <rect x="640" y="421" rx="0" ry="0" width="550" height="13" /> 
    <rect x="8" y="453" rx="0" ry="0" width="1190" height="2" /> 
    <rect x="9" y="471" rx="0" ry="0" width="550" height="13" /> 
    <rect x="640" y="472" rx="0" ry="0" width="550" height="13" /> 
    <rect x="8" y="504" rx="0" ry="0" width="1190" height="2" /> 
    <rect x="10" y="524" rx="0" ry="0" width="550" height="13" /> 
    <rect x="640" y="525" rx="0" ry="0" width="550" height="13" /> 
    <rect x="9" y="557" rx="0" ry="0" width="1190" height="2" />
  </ContentLoader>
)

export default DashboardLoader;