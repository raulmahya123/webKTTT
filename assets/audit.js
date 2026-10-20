(() => {
 const records=[
  {id:'DEMO-AUD-006',date:'2026-10-20',time:'10:25',action:'Verifikasi laporan pertanggungjawaban',doc:'DEMO-LPJ-024',actor:'Reviewer Keuangan',status:'Sesuai',note:'Contoh: kelengkapan dokumen dan rincian biaya telah ditinjau.'},
  {id:'DEMO-AUD-005',date:'2026-10-20',time:'09:10',action:'Pemeriksaan bukti pengeluaran',doc:'DEMO-RAB-018',actor:'Tim Safeguard',status:'Perlu tinjauan',note:'Contoh: lampiran bukti pengeluaran perlu dilengkapi sebelum persetujuan.'},
  {id:'DEMO-AUD-004',date:'2026-10-19',time:'15:40',action:'Telaah safeguard kegiatan lapangan',doc:'DEMO-AKT-012',actor:'Tim Safeguard',status:'Sesuai',note:'Contoh: daftar pemeriksaan kegiatan telah diisi dan ditelaah.'},
  {id:'DEMO-AUD-003',date:'2026-10-19',time:'11:05',action:'Peninjauan usulan anggaran',doc:'DEMO-RAB-017',actor:'Reviewer Keuangan',status:'Perlu tinjauan',note:'Contoh: penjelasan perubahan alokasi biaya masih dibutuhkan.'},
  {id:'DEMO-AUD-002',date:'2026-10-18',time:'14:20',action:'Pencatatan persetujuan pencairan',doc:'DEMO-PDN-008',actor:'Pengurus',status:'Sesuai',note:'Contoh alur: persetujuan dicatat setelah dokumen ditinjau; tidak ada transfer dana nyata.'},
  {id:'DEMO-AUD-001',date:'2026-10-18',time:'08:45',action:'Pemeriksaan kelengkapan pengajuan',doc:'DEMO-AKT-011',actor:'Sekretariat',status:'Sesuai',note:'Contoh: identitas pengajuan dan daftar lampiran telah diperiksa.'}
 ];
 const get=id=>document.getElementById(id);
 get('total').textContent=records.length;
 get('passed').textContent=records.filter(r=>r.status==='Sesuai').length;
 get('review').textContent=records.filter(r=>r.status!=='Sesuai').length;
 function filtered(){const q=get('search').value.trim().toLocaleLowerCase('id');return records.filter(r=>(!q||[r.id,r.doc,r.action,r.actor].join(' ').toLocaleLowerCase('id').includes(q))&&(!get('status').value||r.status===get('status').value)&&(!get('from').value||r.date>=get('from').value)&&(!get('to').value||r.date<=get('to').value));}
 function render(){const rows=filtered();get('audit-rows').replaceChildren();rows.forEach(r=>{const tr=document.createElement('tr');const values=[r.date+' · '+r.time,r.action,r.actor,r.status];values.forEach((value,index)=>{const td=document.createElement('td');if(index===1){const strong=document.createElement('strong');strong.textContent=value;const small=document.createElement('small');small.textContent=r.doc;td.append(strong,small);}else if(index===3){const badge=document.createElement('span');badge.className='status'+(r.status==='Sesuai'?'':' review');badge.textContent=value;td.append(badge);}else td.textContent=value;tr.append(td);});const td=document.createElement('td');const b=document.createElement('button');b.type='button';b.className='secondary';b.textContent='Lihat';b.setAttribute('aria-label','Lihat '+r.id);b.onclick=()=>showDetail(r);td.append(b);tr.append(td);get('audit-rows').append(tr);});get('empty').hidden=rows.length>0;get('result-count').textContent=rows.length+' dari '+records.length+' aktivitas demo';}
 function showDetail(r){get('detail-body').replaceChildren();for(const [label,value] of [['ID aktivitas',r.id],['Waktu (WIB)',r.date+' '+r.time],['Dokumen',r.doc],['Aktivitas',r.action],['Pelaku',r.actor],['Status',r.status],['Catatan',r.note]]){const dt=document.createElement('dt');dt.textContent=label;const dd=document.createElement('dd');dd.textContent=value;get('detail-body').append(dt,dd);}get('detail').showModal();}
 get('close-detail').onclick=()=>get('detail').close();
 get('filters').onsubmit=e=>e.preventDefault();
 get('filters').addEventListener('input',render);
 get('filters').addEventListener('reset',()=>setTimeout(render,0));
 get('export').onclick=()=>{const cell=value=>'"'+String(value).replaceAll('"','""')+'"';const rows=[['ID','Tanggal WIB','Waktu WIB','Dokumen','Aktivitas','Pelaku','Status','Catatan'],...filtered().map(r=>[r.id,r.date,r.time,r.doc,r.action,r.actor,r.status,r.note])];const blob=new Blob(['\uFEFF'+rows.map(row=>row.map(cell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='log-audit-demo.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 render();
})();
