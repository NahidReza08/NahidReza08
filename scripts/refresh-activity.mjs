// Manual public-data refresh. No tokens, secrets, dependencies or scheduled workflow.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseCalendar,renderActivity} from './activity-assets.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Dhaka',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const headers={'User-Agent':'NahidReza08-public-profile-data','Accept':'application/vnd.github+json'};
async function get(url,html=false){const r=await fetch(url,{headers:{...headers,...(html?{Accept:'text/html'}:{})}});if(!r.ok)throw new Error(`${r.status} fetching ${url}; existing snapshot preserved`);return html?r.text():r.json();}
const cal=await get(`https://github.com/users/NahidReza08/contributions?from=${date.slice(0,4)}-01-01&to=${date}`,true);
const contributions=parseCalendar(cal,date);
// Write snapshots only after every request and calendar validation succeeds.
fs.writeFileSync(path.join(root,'assets/github-contributions.json'),JSON.stringify(contributions,null,2)+'\n');
console.log(renderActivity(root));
console.log('Update the visible README and docs/DATA.md snapshot date/counts to '+date+' and review the diff before publishing.');
