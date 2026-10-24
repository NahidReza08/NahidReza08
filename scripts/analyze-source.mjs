// Public repository source measurement; never executes downloaded code.
// Optional GITHUB_TOKEN is read only from the environment, never saved/logged.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const cache=process.env.PROFILE_ANALYSIS_CACHE;
const snapshot=process.env.PROFILE_SNAPSHOT||new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Dhaka',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
async function get(url,json=true){let file;if(cache){file=path.join(cache,crypto.createHash('sha256').update(url).digest('hex')+(json?'.json':'.txt'));if(fs.existsSync(file))return json?JSON.parse(fs.readFileSync(file,'utf8')):fs.readFileSync(file,'utf8');}
 const headers={'User-Agent':'NahidReza08-source-composition'};if(url.startsWith('https://api.github.com/')&&process.env.GITHUB_TOKEN)headers.Authorization='Bearer '+process.env.GITHUB_TOKEN;
 const r=await fetch(url,{headers});if(!r.ok)throw new Error(`HTTP ${r.status} for ${url}`);const value=json?await r.json():await r.text();
 // Cache API metadata only. Source code (which could contain hard-coded values)
 // stays in memory, never in this measurement cache or public result files.
 if(file&&json){fs.mkdirSync(cache,{recursive:true});fs.writeFileSync(file,JSON.stringify(value));}return value;
}
const extMap={'.ts':'TypeScript','.tsx':'TypeScript','.js':'JavaScript','.jsx':'JavaScript','.mjs':'JavaScript','.cjs':'JavaScript','.java':'Java','.cs':'C#','.py':'Python','.ipynb':'Python','.c':'C','.h':'C','.cc':'C++','.cpp':'C++','.hpp':'C++','.php':'PHP','.svelte':'Svelte','.html':'HTML','.htm':'HTML','.css':'CSS','.scss':'SCSS','.sass':'Sass','.sh':'Shell','.bash':'Shell','.ps1':'PowerShell','.sql':'SQL','.shader':'ShaderLab','.hlsl':'HLSL','.glsl':'GLSL','.vue':'Vue'};
function classify(p){if(p.toLowerCase().endsWith('.blade.php'))return 'Blade';const named={'Dockerfile':'Dockerfile','Jenkinsfile':'Groovy','Makefile':'Makefile'}[path.basename(p)];return named||extMap[path.extname(p).toLowerCase()];}
const excludedDirs=/(^|\/)(node_modules|library|temp|obj|dist|build|builds|bin|logs|vendor|packages|\.git|\.idea|\.vscode|\.ipynb_checkpoints|__pycache__|coverage|\.next|\.svelte-kit|textmesh pro|standard assets)(\/|$)/i;
function exclusion(f){if(f.type!=='blob')return 'not a file';if(excludedDirs.test(f.path))return 'dependency/generated/vendor/editor/checkpoint directory';if(/(\.min\.|\.bundle\.|\.generated\.|\.g\.cs$|\.designer\.cs$)/i.test(f.path))return 'minified/bundled/generated file';if(!classify(f.path))return 'non-source extension (data/binary/config/docs excluded)';return null;}
const repos=[];for(let page=1;page<=20;page++){const batch=await get(`https://api.github.com/users/NahidReza08/repos?per_page=100&page=${page}`);repos.push(...batch);if(batch.length<100)break;}
const records=[],excludedRepos=[];const totals={};
for(const repo of repos){
 if(repo.fork){excludedRepos.push({repository:repo.name,reason:'fork; excluded consistently from source composition'});continue;}
 const branches=await get(`https://api.github.com/repos/NahidReza08/${repo.name}/branches?per_page=100`);
 const candidates=[repo.default_branch,...branches.map(b=>b.name).filter(n=>['main','master','develop','dev'].includes(n)&&n!==repo.default_branch)];
 const evaluated=[];
 for(const branch of candidates){const b=branches.find(b=>b.name===branch);if(!b)continue;const tree=await get(`https://api.github.com/repos/NahidReza08/${repo.name}/git/trees/${b.commit.sha}?recursive=1`);if(tree.truncated)throw new Error(`Truncated inventory: ${repo.name}/${branch}`);const eligible=tree.tree.filter(f=>!exclusion(f));evaluated.push({branch,commit:b.commit.sha,tree:tree.tree,eligible,eligibleBytes:eligible.reduce((n,f)=>n+(f.size||0),0)});}
 // Prefer default if it contains source; otherwise the conventional branch with
 // the largest eligible source inventory. Never sum duplicate branches.
 const selected=evaluated.find(e=>e.branch===repo.default_branch&&e.eligible.length)||evaluated.sort((a,b)=>b.eligibleBytes-a.eligibleBytes)[0];
 if(!selected){excludedRepos.push({repository:repo.name,reason:'no accessible branch'});continue;}
 const record={repository:repo.name,branch:selected.branch,commit:selected.commit,selectionReason:selected.branch===repo.default_branch?'default branch contains source, or no source branch found':'default has no eligible source; selected implementation-bearing conventional branch',evaluatedBranches:evaluated.map(e=>({branch:e.branch,commit:e.commit,eligibleFiles:e.eligible.length,eligibleBytes:e.eligibleBytes})),languages:{},files:[],exclusions:{}};
 for(const f of selected.tree){const reason=exclusion(f);if(f.type==='blob'&&reason)record.exclusions[reason]=(record.exclusions[reason]||0)+1;}
 let index=0;const results=[];await Promise.all(Array.from({length:6},async()=>{while(index<selected.eligible.length){const f=selected.eligible[index++];const url=`https://raw.githubusercontent.com/NahidReza08/${repo.name}/${selected.commit}/${f.path.split('/').map(encodeURIComponent).join('/')}`;let source=await get(url,false);if(source.startsWith('version https://git-lfs.github.com/spec')){results.push({path:f.path,excluded:'Git LFS pointer; source unavailable'});continue;}
 let method='UTF-8 source bytes including comments/whitespace';if(f.path.endsWith('.ipynb')){const notebook=JSON.parse(source);source=notebook.cells.filter(c=>c.cell_type==='code').map(c=>Array.isArray(c.source)?c.source.join(''):c.source).join('\n');method='UTF-8 code-cell source only; outputs and Markdown omitted';}
 results.push({path:f.path,language:classify(f.path),bytes:Buffer.byteLength(source,'utf8'),sourceSha256:crypto.createHash('sha256').update(source).digest('hex'),method});}}));
 record.files=results.sort((a,b)=>a.path.localeCompare(b.path));for(const f of record.files){if(f.excluded)continue;record.languages[f.language]=(record.languages[f.language]||0)+f.bytes;totals[f.language]=(totals[f.language]||0)+f.bytes;}
 records.push(record);console.log(`${repo.name}/${selected.branch}: ${record.files.length} eligible source files measured`);
}
const result={snapshot,method:'One implementation-bearing branch/commit per non-fork public repository. UTF-8 programming/markup source bytes; notebook code cells only. Extension classification approximates Linguist; not GitHub Linguist API or proficiency. Svelte and Blade files count as their host languages. C .h headers classify as C. No inference from employer work.',exclusions:['fork repositories','node_modules','Unity Library/Temp/Logs/Packages and TextMesh Pro/Standard Assets','build/dist/bin/obj/vendor/editor caches','minified/bundled/generated suffixes','checkpoint notebooks','binary assets/model weights/datasets','config/docs and unrecognized extensions','notebook outputs/Markdown'],repositories:records,excludedRepositories:excludedRepos,totals};
fs.writeFileSync(path.join(root,'assets/github-source-composition.json'),JSON.stringify(result,null,2)+'\n');console.log('TOTALS '+JSON.stringify(totals));
