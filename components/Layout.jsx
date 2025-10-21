import Link from 'next/link'
import { useState, createContext } from 'react'

export const LangContext = createContext({ lang: 'en', setLang: ()=>{} })

export default function Layout({ children }) {
  const [lang, setLang] = useState('en')
  const isRTL = lang === 'fa'
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className={isRTL ? 'rtl' : ''}>
        <header>
          <div style={{fontWeight:600}}>Chem Marketplace</div>
          <div className="lang-toggle">
            <label style={{fontSize:12}}>EN</label>
            <input type="checkbox" onChange={e=>setLang(e.target.checked ? 'fa' : 'en')} />
            <label style={{fontSize:12}}>فارسی</label>
          </div>
        </header>
        <main className="container">{children}</main>
      </div>
    </LangContext.Provider>
  )
}
