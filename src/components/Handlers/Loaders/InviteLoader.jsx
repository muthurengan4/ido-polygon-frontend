import React from "react"
import ContentLoader from "react-content-loader"

const InviteLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1000}
    height={750}
    viewBox="0 0 1200 850"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="7" y="20" rx="0" ry="0" width="10" height="385" /> 
    <rect x="9" y="18" rx="0" ry="0" width="980" height="10" /> 
    <rect x="979" y="22" rx="0" ry="0" width="10" height="383" /> 
    <rect x="152" y="89" rx="0" ry="0" width="80" height="37" /> 
    <rect x="153" y="138" rx="0" ry="0" width="250" height="18" /> 
    <rect x="154" y="167" rx="0" ry="0" width="150" height="19" /> 
    <rect x="156" y="204" rx="0" ry="0" width="680" height="59" /> 
    <rect x="156" y="278" rx="5" ry="5" width="680" height="53" /> 
    <rect x="14" y="395" rx="0" ry="0" width="970" height="10" /> 
    <rect x="6" y="422" rx="0" ry="0" width="10" height="385" /> 
    <rect x="8" y="420" rx="0" ry="0" width="980" height="10" /> 
    <rect x="978" y="424" rx="0" ry="0" width="10" height="383" /> 
    <rect x="13" y="797" rx="0" ry="0" width="970" height="10" /> 
    <rect x="164" y="491" rx="0" ry="0" width="80" height="29" /> 
    <rect x="164" y="536" rx="0" ry="0" width="678" height="9" /> 
    <rect x="165" y="552" rx="0" ry="0" width="678" height="16" /> 
    <rect x="167" y="583" rx="0" ry="0" width="150" height="13" /> 
    <rect x="166" y="610" rx="0" ry="0" width="180" height="9" /> 
    <rect x="165" y="629" rx="0" ry="0" width="678" height="6" /> 
    <circle cx="173" cy="654" r="9" /> 
    <rect x="188" y="651" rx="0" ry="0" width="200" height="6" /> 
    <rect x="164" y="667" rx="0" ry="0" width="680" height="41" /> 
    <rect x="165" y="719" rx="0" ry="0" width="200" height="8" />
  </ContentLoader>
)

export default InviteLoader;