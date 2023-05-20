import React from 'react'
import ContentLoader from 'react-content-loader'

const FoodMenusPlaceholder = (props) => {
  return (
    <ContentLoader speed={2} viewBox="0 0 400 160" backgroundColor="#ededed" foregroundColor="#ededed" {...props}>
      <rect x="50" y="6" rx="4" ry="4" width="343" height="20" />
      <rect x="8" y="6" rx="4" ry="4" width="35" height="20" />
      <rect x="50" y="55" rx="4" ry="4" width="343" height="20" />
      <rect x="8" y="55" rx="4" ry="4" width="35" height="20" />
      <rect x="50" y="104" rx="4" ry="4" width="343" height="20" />
      <rect x="8" y="104" rx="4" ry="4" width="35" height="20" />
    </ContentLoader>
  )
}

FoodMenusPlaceholder.metadata = {
  name: 'Abraham Calsin',
  github: 'abrahamcalsin',
  description: 'Loading a list of tasks.',
  filename: 'TaskList'
}

export default FoodMenusPlaceholder
