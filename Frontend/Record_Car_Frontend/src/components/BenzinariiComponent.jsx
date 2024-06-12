import MapComponent from './MapComponent';
import React, { useState } from 'react'

const BenzinariiComponent = () => {
    const [oras, setOras] = useState('Timisoara');

  return (
     <div className="">
            <h1>Benzinării din {oras}</h1>
            <input
                type="text"
                value={oras}
                onChange={e => setOras(e.target.value)}
                placeholder="Introdu un oraș"
            />
            <div className="map-wrapper">
              <MapComponent oras={oras} />
            </div>
        </div>
  )
}

export default BenzinariiComponent