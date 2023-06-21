import React from 'react'
import { N800 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

function Card({children}) {
  return (
    <div
        className="p-6"
        style={{
            color: token('color.text', N800),
            backgroundColor: token('elevation.surface.overlay', '#fff'),
            boxShadow: token(
                'elevation.shadow.overlay',
                '0px 4px 8px rgba(9, 30, 66, 0.25), 0px 0px 1px rgba(9, 30, 66, 0.31)',
            ),
            borderRadius: 4,
            // margin: `${token('space.200', '16px')} auto`,
        }}
  >
      {children}
    </div>
  )
}

export default Card
