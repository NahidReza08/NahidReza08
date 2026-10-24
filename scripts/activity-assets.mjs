import fs from 'node:fs';
import path from 'node:path';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const text=(x,y,s,size=16,color='#dce9f9',extra='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${esc(s)}</text>`;
export function renderActivity(root){
 const calendar=JSON.parse(fs.readFileSync(path.join(root,'assets/github-contributions.json'),'utf8'));
 const lang=JSON.parse(fs.readFileSync(path.join(root,'assets/github-source-composition.json'),'utf8'));
 const totals=lang.totals;
 const all=Object.entries(totals).sort((a,b)=>b[1]-a[1]);const sum=all.reduce((n,[,v])=>n+v,0);
 const top=all.slice(0,6);if(totals.Java&&!top.some(([n])=>n==='Java'))top.push(['Java',totals.Java]);const named=new Set(top.map(([n])=>n));const other=all.filter(([n])=>!named.has(n)).reduce((n,[,v])=>n+v,0);if(other)top.push(['Other',other]);
 const palette=['#22c9ef','#9a79f7','#22d3a0','#f3b867','#ed789a','#7894ed','#e9a45e','#8da3b8'];
 for(const mode of ['dark','light']){
  const bg=mode==='dark'?'#0c1725':'#f5f9ff',fg=mode==='dark'?'#e7f0ff':'#142a43',muted=mode==='dark'?'#a0b7d1':'#45617e',line=mode==='dark'?'#273a52':'#cad9e9';
  const wrap=(w,h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><rect x="1" y="1" width="${w-2}" height="${h-2}" rx="18" fill="${bg}" stroke="${line}"/><g font-family="Segoe UI,Arial,sans-serif">${body}</g></svg>`;
  let c=text(28,35,'PUBLIC CONTRIBUTION CALENDAR',15,fg,'font-weight="700" letter-spacing="1"')+text(28,61,`${calendar.totalContributions} contributions · ${calendar.from} to ${calendar.to}`,14,muted);
  const start=new Date(calendar.from+'T00:00:00Z'),dow=start.getUTCDay(),step=Math.min(17,784/Math.ceil((calendar.days.length+dow)/7));
  for(let i=0;i<calendar.days.length;i++){
   const d=calendar.days[i],week=Math.floor((i+dow)/7),row=(i+dow)%7;
   const colors=mode==='dark'?['#1b2a3d','#164a61','#18758a','#19a6b9','#2ee4da']:['#e2ebf5','#b6e5ed','#78ccd9','#22a4b7','#057084'];
   c+=`<rect x="${28+week*step}" y="${85+row*17}" width="${step-4}" height="13" rx="3" fill="${colors[d.level]}"/>`;
  }
  c+=text(28,229,'GitHub public profile counts · snapshot '+calendar.snapshot,13,muted);
  fs.writeFileSync(path.join(root,`assets/activity-${mode}.svg`),wrap(840,252,c));
  let cm=text(22,32,'PUBLIC CONTRIBUTIONS',17,fg,'font-weight="700" letter-spacing="1"')+text(22,60,`${calendar.totalContributions} contributions · ${calendar.from} to ${calendar.to}`,16,muted);
  const ms=Math.min(15,436/Math.ceil((calendar.days.length+dow)/7));
  for(let i=0;i<calendar.days.length;i++){const d=calendar.days[i],colors=mode==='dark'?['#1b2a3d','#164a61','#18758a','#19a6b9','#2ee4da']:['#e2ebf5','#b6e5ed','#78ccd9','#22a4b7','#057084'];cm+=`<rect x="${22+Math.floor((i+dow)/7)*ms}" y="${88+(i+dow)%7*19}" width="${ms-2}" height="15" rx="2" fill="${colors[d.level]}"/>`;}
  cm+=text(22,250,'Publicly visible GitHub profile calendar',16,muted)+text(22,278,'Snapshot '+calendar.snapshot,16,muted);
  fs.writeFileSync(path.join(root,`assets/activity-mobile-${mode}.svg`),wrap(480,304,cm));
  const months=new Map();for(const d of calendar.days){const m=d.date.slice(0,7);months.set(m,(months.get(m)||0)+d.count);}const monthly=[...months];
  let trend=text(23,31,'CONTRIBUTION TREND',14,fg,'font-weight="700" letter-spacing="1"')+text(23,54,'Monthly totals · calendar contributions',12,muted);
  const max=Math.max(1,...monthly.map(x=>x[1])),plot=[];
  for(let i=0;i<monthly.length;i++){const x=32+i*344/Math.max(1,monthly.length-1),y=205-monthly[i][1]/max*112;plot.push([x,y]);trend+=text(x,229,monthly[i][0].slice(5),11,muted,'text-anchor="middle"')+text(x,y-10,monthly[i][1],11,fg,'text-anchor="middle"');}
  for(const y of [93,149,205])trend+=`<path d="M23 ${y}h364" stroke="${line}" stroke-dasharray="3 5"/>`;
  trend+=`<polyline points="${plot.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${mode==='dark'?'#27d9ec':'#007d9b'}" stroke-width="3"/>`+plot.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="${mode==='dark'?'#b28cff':'#7840c6'}"/>`).join('');
  trend+=text(23,263,'Month numbers · final month is partial',12,muted)+text(23,287,'Snapshot '+calendar.snapshot,12,muted);
  fs.writeFileSync(path.join(root,`assets/trend-${mode}.svg`),wrap(410,345,trend));
  let l=text(23,31,'PUBLIC REPOSITORY CODE COMPOSITION',12,fg,'font-weight="700" letter-spacing=".4"')+text(23,54,`${lang.repositories.length} repos · implementation branches`,12,muted);
  top.forEach(([name,n],i)=>{
   const yy=83+i*25;
   l+=`<circle cx="27" cy="${yy-5}" r="4" fill="${palette[i]}"/>`+text(39,yy,name,13,fg)+`<rect x="177" y="${yy-12}" width="155" height="9" rx="4" fill="${line}"/><rect x="177" y="${yy-12}" width="${155*n/sum}" height="9" rx="4" fill="${palette[i]}"/>`+text(384,yy,`${(100*n/sum).toFixed(n/sum<.01?2:1)}%`,12,fg,'text-anchor="end"');
  });
  l+=text(23,303,'Source bytes · not a proficiency measurement',12,muted)+text(23,326,'Snapshot '+lang.snapshot,12,muted);
  fs.writeFileSync(path.join(root,`assets/languages-${mode}.svg`),wrap(410,345,l));
 }
 return {contributions:calendar.totalContributions,contributionDays:calendar.days.length,languageBytes:sum,languages:all,repoCount:lang.repositories.length};
}
export function parseCalendar(html,snapshot){
 const tips=new Map([...html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g)].map(m=>[m[1],m[2].replace(/<[^>]+>/g,'').trim()]));
 const from=snapshot.slice(0,4)+'-01-01',days=[];
 for(const m of html.matchAll(/<td\b[^>]*\bdata-date="([^"]+)"[^>]*>/g)){
  if(m[1]<from||m[1]>snapshot)continue;
  const id=m[0].match(/\bid="([^"]+)"/)?.[1],level=Number(m[0].match(/data-level="(\d)"/)?.[1]);
  const tip=tips.get(id);if(!tip)throw new Error('Calendar tooltip missing for '+m[1]);
  const count=tip.startsWith('No contributions')?0:Number(tip.match(/^([\d,]+) contribution/)?.[1]?.replaceAll(',',''));
  if(!Number.isFinite(count)||!Number.isInteger(level)||level<0||level>4)throw new Error('Unrecognized calendar data');
  days.push({date:m[1],count,level});
 }
 days.sort((a,b)=>a.date.localeCompare(b.date));
 const expected=Math.round((new Date(snapshot+'T00:00:00Z')-new Date(from+'T00:00:00Z'))/86400000)+1;
 if(days.length!==expected||new Set(days.map(d=>d.date)).size!==expected)throw new Error('Incomplete year-to-date calendar; omit graphic until resolved');
 return {snapshot,source:`https://github.com/users/NahidReza08/contributions?from=${from}&to=${snapshot}`,scope:'Publicly visible GitHub profile calendar; may include anonymized private contributions if enabled by account owner. Not a count of public commits alone.',from,to:snapshot,totalContributions:days.reduce((n,d)=>n+d.count,0),days};
}
