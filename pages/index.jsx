import Listings from '../components/Listings'
import NewListing from '../components/NewListing'
import { useState } from 'react'

export default function Home(){
  const [refreshKey, setRefreshKey] = useState(0)
  return (
    <div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
        <div>
          <h2 style={{marginTop:0}}>Create a new listing</h2>
          <NewListing onCreate={()=>setRefreshKey(k=>k+1)} />
        </div>
        <div>
          <h2 style={{marginTop:0}}>Listings</h2>
          <Listings key={refreshKey} />
        </div>
      </div>
    </div>
  )
}
