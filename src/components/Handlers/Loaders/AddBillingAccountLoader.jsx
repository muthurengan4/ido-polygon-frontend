import React from "react"
import ContentLoader from "react-content-loader"

const AddBillingAccountLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1100}
    height={500}
    viewBox="0 0 1200 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="4" y="21" rx="0" ry="0" width="10" height="429" /> 
    <rect x="4" y="21" rx="0" ry="0" width="1198" height="10" /> 
    <rect x="1190" y="23" rx="0" ry="0" width="10" height="427" /> 
    <rect x="500" y="58" rx="0" ry="0" width="181" height="16" /> 
    <rect x="57" y="94" rx="0" ry="0" width="86" height="7" /> 
    <rect x="57" y="111" rx="10" ry="10" width="530" height="45" /> 
    <rect x="58" y="178" rx="0" ry="0" width="86" height="7" /> 
    <rect x="58" y="195" rx="10" ry="10" width="530" height="45" /> 
    <rect x="60" y="265" rx="0" ry="0" width="86" height="7" /> 
    <rect x="60" y="282" rx="10" ry="10" width="530" height="45" /> 
    <rect x="61" y="348" rx="0" ry="0" width="86" height="7" /> 
    <rect x="61" y="365" rx="10" ry="10" width="530" height="45" /> 
    <rect x="610" y="92" rx="0" ry="0" width="86" height="7" /> 
    <rect x="610" y="109" rx="10" ry="10" width="530" height="45" /> 
    <rect x="610" y="177" rx="0" ry="0" width="86" height="7" /> 
    <rect x="610" y="194" rx="10" ry="10" width="530" height="45" /> 
    <rect x="610" y="264" rx="0" ry="0" width="86" height="7" /> 
    <rect x="610" y="281" rx="10" ry="10" width="530" height="45" /> 
    <rect x="610" y="347" rx="0" ry="0" width="86" height="7" /> 
    <rect x="610" y="364" rx="10" ry="10" width="530" height="45" /> 
    <rect x="7" y="440" rx="0" ry="0" width="1198" height="10" />
  </ContentLoader>
)

export default AddBillingAccountLoader;