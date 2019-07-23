import { FunctionComponent } from 'react'
import styled from '@emotion/styled'

import { mediaQuery, imageHost } from '../../utils/variables'

export const avatarSizeDesktop = '176px'
export const avatarSizePhone = '160px'

const AvatarImg = styled.img`
  user-select: none;
  ${mediaQuery.phone} {
    width: ${avatarSizePhone};
    height: ${avatarSizePhone};
  }
  ${mediaQuery.desktop} {
    width: ${avatarSizeDesktop};
    height: ${avatarSizeDesktop};
  }

  border-radius: 50%;
`

const Avatar: FunctionComponent = () => (
  <AvatarImg
    className='nozoom'
    draggable={false}
    src={`${imageHost}/avatar.jpg`}
    alt='avatar'
  />
)

export default Avatar
