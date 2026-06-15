import fs from "fs";
import path from "path";
const root = "src";
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);
  if(e.isDirectory())walk(p);
  else if(/\.(tsx|ts)$/.test(e.name)){let s=fs.readFileSync(p,"utf8");
    const n=s.replace(/bg-white(?![\w/])/g,"bg-card");
    if(n!==s){fs.writeFileSync(p,n);console.log("bg",path.relative(root,p));}}}}
walk(root);
console.log("done");
