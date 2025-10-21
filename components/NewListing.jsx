import { useState, useContext } from 'react'
import { useSupabase, supabase } from '../lib/supabaseClient'
import { LangContext } from './Layout'
import { v4 as uuidv4 } from 'uuid'

export default function NewListing({ onCreate }) {
  const { lang } = useContext(LangContext)
  const [form, setForm] = useState({ title:'', title_fa:'', chemical_name:'', chemical_name_fa:'', grade:'', price:'', currency:'USD', quantity:'', description:'', description_fa:'' })
  const [saving, setSaving] = useState(false)

  function update(k,v){ setForm(s=>({...s, [k]:v})) }

  async function submit(e){
    e.preventDefault()
    setSaving(true)
    const payload = { ...form, id: uuidv4(), created_at: new Date().toISOString() }
    if (useSupabase) {
      try {
        const { data, error } = await supabase.from('listings').insert([payload]).select().single()
        if (error) { alert('Error: ' + error.message); setSaving(false); return }
        if (onCreate) onCreate(data)
      } catch(e){ alert('Error: ' + e.message) }
    } else {
      // save to localStorage
      const local = localStorage.getItem('mock_listings')
      const arr = local ? JSON.parse(local) : []
      arr.unshift(payload)
      localStorage.setItem('mock_listings', JSON.stringify(arr))
      if (onCreate) onCreate(payload)
    }
    setForm({ title:'', title_fa:'', chemical_name:'', chemical_name_fa:'', grade:'', price:'', currency:'USD', quantity:'', description:'', description_fa:'' })
    setSaving(false)
  }

  return (
    <form onSubmit={submit} className="card">
      <div style={{display:'grid', gap:8}}>
        <input value={form.title} onChange={e=>update('title', e.target.value)} placeholder={lang==='fa' ? 'عنوان (انگلیسی)' : 'Listing title (English)'} required />
        <input value={form.title_fa} onChange={e=>update('title_fa', e.target.value)} placeholder={lang==='fa' ? 'عنوان (فارسی)' : 'Listing title (Persian)'} />
        <input value={form.chemical_name} onChange={e=>update('chemical_name', e.target.value)} placeholder={lang==='fa' ? 'نام شیمیایی (انگلیسی)' : 'Chemical name (English)'} required />
        <input value={form.chemical_name_fa} onChange={e=>update('chemical_name_fa', e.target.value)} placeholder={lang==='fa' ? 'نام شیمیایی (فارسی)' : 'Chemical name (Persian)'} />
        <div style={{display:'flex', gap:8}}>
          <input value={form.grade} onChange={e=>update('grade', e.target.value)} placeholder={lang==='fa' ? 'گرید' : 'Grade'} />
          <input value={form.price} onChange={e=>update('price', e.target.value)} placeholder={lang==='fa' ? 'قیمت' : 'Price'} />
          <input value={form.quantity} onChange={e=>update('quantity', e.target.value)} placeholder={lang==='fa' ? 'تعداد / واحد' : 'Quantity / Unit'} />
        </div>
        <textarea value={form.description} onChange={e=>update('description', e.target.value)} placeholder={lang==='fa' ? 'توضیحات (انگلیسی)' : 'Description (English)'} />
        <textarea value={form.description_fa} onChange={e=>update('description_fa', e.target.value)} placeholder={lang==='fa' ? 'توضیحات (فارسی)' : 'Description (Persian)'} />
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <button type="submit" disabled={saving}>{saving ? (lang==='fa' ? 'در حال ذخیره...' : 'Saving...') : (lang==='fa' ? 'ایجاد آگهی' : 'Create listing')}</button>
        </div>
      </div>
    </form>
  )
}
