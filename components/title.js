import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import dayjs from 'dayjs'

import { color } from '../utils/config'

const Container = styled.div`
  margin-bottom: 32px;
`

const TitleContainer = styled.h1`
  margin-top: 0;
  margin-bottom: 4px;
  font-style: ${({ inChinese }) => (inChinese ? 'normal' : 'italic')};
  font-weight: 700;
`

const MetadataContainer = styled.div`
  font-size: 0.8rem;
  color: ${color.gray3};
`

const Metadata = styled.span`
  color: ${color.gray3};
`

export default function Title(props) {
  return (
    <Container>
      <TitleContainer {...props}>{props.title}</TitleContainer>
      <MetadataContainer>
        {props.created && (
          <Metadata>
            {props.inChinese
              ? `创建于 ${dayjs(props.created).format('YYYY年MM月DD日')}`
              : `Created - ${dayjs(props.created).format('MMM DD, YYYY')}`}
          </Metadata>
        )}
        {props.updated && (
          <Metadata>
            {' '}
            ・{' '}
            {props.inChinese
              ? `更新于 ${dayjs(props.updated).format('YYYY年MM月DD日')}`
              : `Updated - ${dayjs(props.updated).format('MMM DD, YYYY')}`}
          </Metadata>
        )}
      </MetadataContainer>
    </Container>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  updated: PropTypes.string,
  inChinese: PropTypes.bool
}
