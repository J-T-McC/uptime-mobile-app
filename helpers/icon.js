import { appTheme } from '~/theme/app'
import { Icon } from '@ui-kitten/components'
import React, { useEffect } from 'react'

const getUptimeStatusIconColor = (status) => {
  switch (status) {
    case 'up' :
      return appTheme['color-success-500']
    case 'down':
      return appTheme['color-danger-500']
    default:
      return appTheme['text-basic-color']
  }
}

const getUptimeStatusIcon = (status) => {
  switch (status) {
    case 'up' :
      return 'checkmark-circle-outline'
    case 'down':
      return 'arrow-circle-down-outline'
    default:
      return 'more-horizontal-outline'
  }
}

const UptimeIcon = (props = { status, animation: null }) => {
  const icon = React.useRef()

  useEffect(() => {
    if(props.animation) {
      icon.current.startAnimation()
    }
  }, [])

  const animationAttribute = props.animation ? {
    animation: props.animation,
    animationConfig: { cycles: Infinity }
} : {}

  return (
    <Icon
      ref={icon}
      {...animationAttribute}
      name={getUptimeStatusIcon(props.status)}
      fill={getUptimeStatusIconColor(props.status)}
      width={25}
      height={25}
    />
  )
}

export {
  getUptimeStatusIconColor,
  getUptimeStatusIcon,
  UptimeIcon
}