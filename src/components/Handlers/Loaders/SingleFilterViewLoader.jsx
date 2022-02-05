import React from "react"
import ContentLoader from "react-content-loader"

const SingleFilterViewLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1000}
    height={1200}
    viewBox="0 0 1200 1500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="7" y="17" rx="0" ry="0" width="82" height="18" /> 
    <rect x="106" y="17" rx="0" ry="0" width="79" height="18" /> 
    <rect x="820" y="10" rx="12" ry="12" width="105" height="27" /> 
    <rect x="950" y="10" rx="12" ry="12" width="61" height="26" /> 
    <circle cx="102" cy="166" r="85" /> 
    <rect x="206" y="96" rx="0" ry="0" width="196" height="21" /> 
    <rect x="206" y="140" rx="0" ry="0" width="202" height="13" /> 
    <rect x="206" y="172" rx="0" ry="0" width="172" height="12" /> 
    <rect x="206" y="200" rx="0" ry="0" width="381" height="33" /> 
    <rect x="5" y="268" rx="10" ry="10" width="1005" height="157" /> 
    <rect x="5" y="457" rx="20" ry="20" width="1005" height="45" /> 
    <rect x="5" y="511" rx="20" ry="20" width="1005" height="45" /> 
    <rect x="430" y="577" rx="0" ry="0" width="164" height="21" /> 
    <rect x="7" y="620" rx="5" ry="5" width="300" height="186" /> 
    <rect x="350" y="619" rx="5" ry="5" width="300" height="186" /> 
    <rect x="700" y="618" rx="5" ry="5" width="300" height="186" /> 
    <rect x="7" y="828" rx="5" ry="5" width="300" height="186" /> 
    <rect x="350" y="827" rx="5" ry="5" width="300" height="186" /> 
    <rect x="700" y="826" rx="5" ry="5" width="300" height="186" /> 
    <rect x="3" y="1038" rx="10" ry="10" width="1005" height="138" /> 
    <rect x="2" y="1192" rx="10" ry="10" width="1005" height="138" /> 
    <rect x="3" y="1347" rx="10" ry="10" width="1005" height="138" />
  </ContentLoader>
)

export default SingleFilterViewLoader;