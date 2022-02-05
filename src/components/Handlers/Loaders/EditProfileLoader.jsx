import React from "react"
import ContentLoader from "react-content-loader"

const EditProfileLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={750}
    viewBox="0 0 1200 750"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="4" y="21" rx="0" ry="0" width="10" height="698" /> 
    <rect x="4" y="21" rx="0" ry="0" width="594" height="10" /> 
    <rect x="589" y="23" rx="0" ry="0" width="10" height="695" /> 
    <rect x="9" y="709" rx="0" ry="0" width="588" height="10" /> 
    <rect x="210" y="54" rx="0" ry="0" width="207" height="13" /> 
    <rect x="49" y="94" rx="0" ry="0" width="111" height="11" /> 
    <rect x="49" y="114" rx="10" ry="10" width="504" height="87" /> 
    <rect x="48" y="221" rx="0" ry="0" width="104" height="8" /> 
    <rect x="48" y="237" rx="10" ry="10" width="504" height="45" /> 
    <rect x="49" y="299" rx="0" ry="0" width="105" height="9" /> 
    <rect x="49" y="316" rx="10" ry="10" width="501" height="76" /> 
    <rect x="49" y="409" rx="0" ry="0" width="104" height="8" /> 
    <rect x="49" y="425" rx="10" ry="10" width="504" height="45" /> 
    <rect x="50" y="483" rx="0" ry="0" width="104" height="8" /> 
    <rect x="50" y="499" rx="10" ry="10" width="504" height="45" /> 
    <rect x="51" y="561" rx="0" ry="0" width="104" height="8" /> 
    <rect x="51" y="577" rx="10" ry="10" width="504" height="45" /> 
    <rect x="52" y="639" rx="10" ry="10" width="499" height="46" />
  </ContentLoader>
)

export default EditProfileLoader;