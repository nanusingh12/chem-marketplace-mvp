import { useEffect, useState, useContext } from 'react'
import { useSupabase, supabase } from '../lib/supabaseClient'
import { LangContext } from './Layout'

export default function Listings() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { lang } = useContext(LangContext)

  useEffect(()=>{
    async function load(){
      // If supabase is configured, fetch from DB
      if (useSupabase) {
        try {
          const { data, error } = await supabase.from('listings').select('*').order('created_at', { ascending: false }).limit(100)
          if (error) console.error(error)
          else setItems(data || [])
        } catch(e){ console.error(e) }
      } else {
        // Fallback: use localStorage and bundled mock data
        const local = localStorage.getItem('mock_listings')
        if (local) {
          setItems(JSON.parse(local))
        } else {
          // fetch bundled mock-data.json
          try {
            const res = await fetch('/mock-data.json')
            const data = await res.json()
            localStorage.setItem('mock_listings', JSON.stringify(data))
            setItems(data)
          } catch(e){ console.error(e) }
        }
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="card">{lang==='fa' ? 'در حال بارگذاری...' : 'Loading listings...'}</div>
  if (!items.length) return <div className="card">{lang==='fa' ? 'فعلا آگهی‌ وجود ندارد.' : 'No listings yet — create one below.'}</div>

  return (
    <div>
      {items.map(it => (
        <div key={it.id} className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontWeight:600}}>{lang==='fa' ? (it.title_fa || it.title) : it.title}</div>
              <div style={{fontSize:13, color:'#666'}}>{lang==='fa' ? (it.chemical_name_fa || it.chemical_name) : it.chemical_name} • {it.grade || 'N/A'}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontWeight:600}}>{it.price ? `${it.price} ${it.currency || 'USD'}` : (lang==='fa' ? 'قیمت توافقی' : 'Price on request')}</div>
              <div style={{fontSize:12, color:'#666'}}>{it.quantity || ''}</div>
            </div>
          </div>
          <p style={{marginTop:8}}>{lang==='fa' ? (it.description_fa || it.description) : it.description}</p>
        </div>
      ))}
    </div>
  )
}
