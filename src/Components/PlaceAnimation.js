import Placeholder from 'react-bootstrap/Placeholder';
import React from 'react';
function PlaceAnimation({times}) {

const rows=times>0?times:times=1;
const render=Array(rows).fill(rows).map((u,i)=>{return <Placeholder key={i} as="p" animation="glow">
<Placeholder xs={12} />
</Placeholder>})
  return (
    <>
    {render}
    </>
  );
}

export default PlaceAnimation;