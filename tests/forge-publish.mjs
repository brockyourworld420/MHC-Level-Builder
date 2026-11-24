/* Forge GitHub publishing regression, entirely mocked; no real repository writes or paid calls. */
import assert from 'node:assert/strict';
import {chromium} from 'playwright';

const pageURL='http://127.0.0.1:8877/asset-studio/';
const repo='brockyourworld420/Motorcycle-hill-climb-racing';
const root='/repos/'+repo;
const parent='a'.repeat(40), baseTree='b'.repeat(40), newTree='c'.repeat(40),newCommit='d'.repeat(40);
const folder='assets/forge-approved/forge-persistence-test/';
const browser=await chromium.launch({headless:true,channel:'chrome'});

async function runCase(alreadyExists, mismatched=false){
 const context=await browser.newContext();
 const page=await context.newPage();
 const exceptions=[];
 const counts={refGets:0,blobs:0,trees:0,commits:0,patches:0};
 page.on('pageerror',error=>exceptions.push(String(error)));
 page.on('dialog',dialog=>dialog.accept());
 await page.route('https://api.github.com/repos/**', async route=>{
  const req=route.request(),method=req.method(),path=new URL(req.url()).pathname.slice(root.length);
  const headers={'access-control-allow-origin':'*','access-control-allow-methods':'GET,POST,PATCH,OPTIONS',
    'access-control-allow-headers':'authorization,accept,x-github-api-version,content-type'};
  const send=async (data,status=200)=>route.fulfill({
    status,headers,contentType:'application/json',body:JSON.stringify(data)
  });
  if(method==='OPTIONS')return route.fulfill({status:204,headers});
  if(method==='GET'&&path==='')return send({full_name:repo});
  if(method==='GET'&&path==='/git/ref/heads/main'){
   counts.refGets++;return send({object:{sha:parent,type:'commit'}});
  }
  if(method==='GET'&&path==='/git/commits/'+parent)return send({tree:{sha:baseTree}});
  if(method==='GET'&&path.startsWith('/git/trees/'+baseTree)){
   const tree=!alreadyExists?[]:mismatched
    ?[{path:folder+'unexpected.png',type:'blob'}]
    :[{path:folder+'rock-01.png',type:'blob'},{path:folder+'review.json',type:'blob'}];
   return send({tree,truncated:false});
  }
  if(method==='POST'&&path==='/git/blobs'){counts.blobs++;return send({sha:'1'.repeat(40)});}
  if(method==='POST'&&path==='/git/trees'){counts.trees++;return send({sha:newTree});}
  if(method==='POST'&&path==='/git/commits'){counts.commits++;return send({sha:newCommit});}
  if(method==='PATCH'&&path==='/git/refs/heads/main'){
   counts.patches++;
   const sent=JSON.parse(req.postData()||'{}');
   assert.equal(sent.sha,newCommit);
   assert.equal(sent.force,false);
   return send({ref:'refs/heads/main',object:{sha:newCommit}});
  }
  return send({message:'Unmocked test endpoint '+method+' '+path},404);
 });
 try{
  await page.goto(pageURL);
  assert.match(await page.locator('.footer-note').textContent(),/v5.1/);
  await page.locator('[data-tab="review"]').click();
  await page.locator('#zip-file').setInputFiles('/tmp/forge-review-test.zip');
  await page.waitForFunction(()=>document.querySelector('#review-status')?.textContent?.includes('forge-persistence-test'));
  await page.locator('.asset-card').getByRole('button',{name:/Approve/}).click();
  await page.locator('[data-tab="connect"]').click();
  await page.locator('#token').fill('github_pat_mock_for_publish_only');
  await page.locator('#connect').click();
  await page.waitForFunction(()=>document.querySelector('#connection-pill')?.textContent?.includes('CONNECTED'));
  await page.locator('[data-tab="review"]').click();
  await page.locator('#send-approved').click();
  await page.waitForFunction(()=>/saved|existing|confirmed/i.test(document.querySelector('#publish-result')?.textContent||''));
  const text=await page.locator('#publish-result').textContent();
  if(mismatched){
   assert.match(text,/different|already exists/i);
   assert.equal(counts.blobs,0);
   assert.equal(counts.patches,0);
  }else{
   assert.match(text,alreadyExists?/Already saved in GitHub/i:/approved PNG\(s\) saved to GitHub/i);
   assert.equal(await page.locator('#send-approved').isDisabled(),true);
   assert.equal(counts.refGets,1,'Do not immediately re-GET a stale GitHub ref');
   assert.equal(counts.patches,alreadyExists?0:1);
   assert.equal(counts.blobs,alreadyExists?0:2);
   const published=await page.evaluate(()=>localStorage.getItem('forge.published.forge-persistence-test'));
   assert.equal(published,'true');
   await page.reload();
   await page.waitForFunction(()=>document.querySelector('#review-status')?.textContent?.includes('saved asset'));
   assert.equal(await page.locator('#send-approved').isDisabled(),true,'No duplicate upload after page reload');
  }
  assert.equal(exceptions.length,0,exceptions.join('\n'));
  console.log('PASS',alreadyExists?'already-published recovery':'successful PATCH without stale verification',
    mismatched?'mismatched pack refused':'','ref GETs',counts.refGets,'writes',counts.patches);
 }finally{await context.close();}
}
try{
 await runCase(false);
 await runCase(true);
 await runCase(true,true);
}finally{await browser.close();}
