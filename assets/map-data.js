(() => {
 const key='kt-map-points-v1';
 const defaults=[['bogor','Bogor',-6.5971,106.806],['kutai','Kutai Barat',-0.594,115.515],['seram','Seram',-3.1,129.1],['konawe','Konawe',-3.85,122.05],['digoel','Boven Digoel',-6.1,140.3],['aceh','Aceh',4.7,96.8]].map(([id,name,lat,lng])=>({id,name,lat,lng,category:'Wilayah',published:true,note:'Contoh lokasi wilayah. Data lapangan belum terverifikasi.'}));
 const valid=p=>p&&typeof p.id==='string'&&typeof p.name==='string'&&p.name.trim().length>0&&Number.isFinite(p.lat)&&p.lat>=-90&&p.lat<=90&&Number.isFinite(p.lng)&&p.lng>=-180&&p.lng<=180&&typeof p.published==='boolean'&&['Wilayah','Anggota','Proyek'].includes(p.category)&&typeof p.note==='string';
 window.KTMapData={read(){const raw=localStorage.getItem(key);if(raw===null)return structuredClone(defaults);const data=JSON.parse(raw);if(!Array.isArray(data)||!data.every(valid)||new Set(data.map(p=>p.id)).size!==data.length)throw Error('Data peta tidak valid');return data;},write(data){if(!Array.isArray(data)||!data.every(valid)||new Set(data.map(p=>p.id)).size!==data.length)throw Error('Data peta tidak valid');localStorage.setItem(key,JSON.stringify(data));},valid};
})();
