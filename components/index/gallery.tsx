import { FunctionComponent } from 'react'
import styled from '@emotion/styled'

import { Section, SectionTitle } from './content'
import { mediaQuery, imageHost } from '../../utils/variables'

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
  img {
    ${mediaQuery.phone} {
      height: 108px;
    }
    ${mediaQuery.desktop} {
      height: 176px;
    }
    margin: 4px;
    border-radius: 2px;
  }
`

const Gallery: FunctionComponent = () => (
  <Section>
    <SectionTitle>Gallery</SectionTitle>

    <GalleryContainer>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <img
          key={i}
          src={`${imageHost}/gallery/pic-${i}.jpg`}
          alt={`pic-${i}`}
        />
      ))}
    </GalleryContainer>
  </Section>
)

export default Gallery
