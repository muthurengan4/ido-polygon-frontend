import React from "react"
import ContentLoader from "react-content-loader"

const ProfileLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={650}
    viewBox="0 0 1200 650"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="24" y="28" rx="0" ry="0" width="264" height="27" /> 
    <rect x="23" y="74" rx="0" ry="0" width="368" height="19" /> 
    <rect x="24" y="111" rx="0" ry="0" width="280" height="15" /> 
    <rect x="25" y="144" rx="5" ry="5" width="133" height="38" /> 
    <rect x="21" y="215" rx="5" ry="5" width="337" height="383" /> 
    <rect x="369" y="220" rx="5" ry="5" width="220" height="239" />
  </ContentLoader>
)

export default ProfileLoader;