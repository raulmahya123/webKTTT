(() => {

 for(const b of document.querySelectorAll('header button')) if(b.textContent.trim()==='menu') b.addEventListener('click',()=>{const nav=document.querySelector('header nav');if(nav){nav.classList.toggle('kt-nav-mobile');b.setAttribute('aria-expanded',nav.classList.contains('kt-nav-mobile'));}});
 const el=document.getElementById('kt-map');if(!el)return;
 if(location.protocol==='file:'){el.innerHTML='<div class="map-loading"><strong>Buka peta melalui website lokal</strong><p>Jalankan BUKA-WEBSITE.cmd di folder proyek, lalu buka tautan di bawah agar layanan peta menerima alamat halaman.</p><a class="kt-login-link" href="http://127.0.0.1:8000/'+location.pathname.split('/').pop()+'">Buka peta interaktif →</a></div>';return;}
 if(!window.L){el.innerHTML='<p class="map-loading">Peta gagal dimuat. Sambungkan internet dan muat ulang halaman.</p>';return;}
 el.innerHTML='';
 const map=L.map(el,{scrollWheelZoom:false}).setView([-2.3,118],5);
 const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
 let notice;
 tiles.on('tileerror',()=>{if(!notice){notice=L.control({position:'bottomleft'});notice.onAdd=()=>{const d=L.DomUtil.create('div','kt-map-note');d.textContent=location.protocol==='file:'?'Buka peta melalui http://127.0.0.1:8000. Jalankan BUKA-WEBSITE.cmd di folder proyek.':'Layanan peta menolak atau gagal memuat tile. Periksa koneksi lalu muat ulang halaman.';return d;};notice.addTo(map);}});
 const group=L.featureGroup().addTo(map);
 const drawPoints=()=>{group.clearLayers();let points;try{points=window.KTMapData.read();}catch(e){el.insertAdjacentHTML('afterend','<p class="kt-map-note">Data CMS tidak dapat dibaca. Periksa penyimpanan browser.</p>');return;}const pathname=location.pathname;points.filter(p=>p.published&&(!(pathname.includes('peta_sebaran_anggota')||pathname.includes('/cms-sebaran-anggota'))||p.category==='Anggota'||p.category==='Wilayah')&&(!(pathname.includes('peta_cakupan_proyek')||pathname.includes('/cms-cakupan-proyek'))||p.category==='Proyek'||p.category==='Wilayah')).forEach(p=>{const popup=document.createElement('div');const strong=document.createElement('strong');strong.textContent=p.name;const note=document.createElement('p');note.textContent=p.note;popup.append(strong,note);L.circleMarker([p.lat,p.lng],{radius:9,color:'#184d3b',weight:2,fillColor:'#c28b59',fillOpacity:.9}).bindPopup(popup).addTo(group);});};
 drawPoints();window.addEventListener('storage',e=>{if(e.key==='kt-map-points-v1')drawPoints();});
 L.control.layers({'OpenStreetMap':tiles},{'Titik peta CMS (demo)':group}).addTo(map);
 const reset=L.control({position:'topleft'});reset.onAdd=()=>{const b=L.DomUtil.create('button','kt-map-note');b.textContent='Indonesia';b.type='button';L.DomEvent.disableClickPropagation(b);b.onclick=()=>map.setView([-2.3,118],5);return b;};reset.addTo(map);
 new ResizeObserver(()=>map.invalidateSize()).observe(el);
})();
