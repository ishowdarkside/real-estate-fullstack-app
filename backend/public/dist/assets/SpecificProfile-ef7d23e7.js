import{g,f as x,o as c,j as e,u as d,c as p,a as f,r as m,S as y}from"./index-0e1f805a.js";import{u as v}from"./useMutation-3ec08b3e.js";const P="/";async function N(s){try{return await(await fetch(`${P}api/auth/profile/${s}`)).json()}catch(i){throw new Error(i)}}function u(){const{profileId:s}=g(),{data:i,isLoading:a}=x({queryKey:["specificProfile"],queryFn:()=>N(s)});return{data:i,isLoading:a}}const w="_errorMessage_3yv26_1",C="_pageBody_3yv26_9",I="_profileContainer_3yv26_13",T="_profileInfo_3yv26_18",R="_indentatiton_3yv26_26",S="_name_3yv26_33",A="_infoReviewWraper_3yv26_39",E="_reviewsWrapper_3yv26_53",b="_catalogBody_3yv26_73",L="_catalogItem_3yv26_83",W="_postContainer_3yv26_100",k="_postInfo_3yv26_114",O="_postLocation_3yv26_122",$="_price_3yv26_132",B="_noContent_3yv26_138",K="_finishedPanel_3yv26_143",U="_finishedPostsWrapper_3yv26_150",J="_finishedTitle_3yv26_163",t={errorMessage:w,pageBody:C,profileContainer:I,profileInfo:T,indentatiton:R,name:S,infoReviewWraper:A,reviewsWrapper:E,catalogBody:b,catalogItem:L,postContainer:W,postInfo:k,postLocation:O,price:$,noContent:B,finishedPanel:K,finishedPostsWrapper:U,finishedTitle:J};function q(){const{activeProfile:s}=c(),i=s.reviews.filter(r=>r.reviewType==="positive"),a=s.reviews.filter(r=>r.reviewType==="negative"),n=s.posts.filter(r=>r.finished),o=s.posts.filter(r=>!r.finished);return e.jsxs("div",{className:t.reviewsWrapper,children:[e.jsxs("div",{children:[e.jsx("img",{src:"/like.svg"}),e.jsxs("span",{children:[i.length," POZITIVNIH OCJENA"]})]}),e.jsxs("div",{children:[e.jsx("img",{src:"/dislike.svg"}),e.jsxs("span",{children:[a.length," NEGATIVNIH OCJENA"]})]}),e.jsxs("div",{children:[e.jsx("img",{src:"/oglas.svg"}),e.jsxs("span",{children:[o.length," AKTIVNIH OGLASA"]})]}),e.jsxs("div",{children:[e.jsx("img",{src:"/trophy.svg"}),e.jsxs("span",{children:[n.length," USPJEŠNIH PRODAJA"]})]})]})}function M(){const{activeProfile:s}=c();return s?e.jsxs("div",{className:t.profileInfo,children:[e.jsx("span",{children:s.role==="User"?"KORISNIK":"AGENCIJA"}),e.jsxs("div",{className:t.infoReviewWraper,children:[e.jsxs("div",{className:t.indentatiton,children:[e.jsx("span",{className:t.name,children:s.agencyName||s.fullName}),s.contactPerson&&e.jsxs("span",{children:["Kontakt osoba: ",s.contactPerson]}),e.jsx("span",{children:s.email}),s.phoneNumber&&e.jsx("span",{children:s.phoneNumber}),s.about&&e.jsx("span",{children:s.about}),s.website&&e.jsx("span",{children:s.website})]}),e.jsx(q,{})]})]}):null}function F(){const{activeProfile:s}=c();if(!s)return null;const i=s.posts.filter(n=>!n.finished),a=s.posts.filter(n=>n.finished);return i.length===0?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:t.noContent,children:"Korisnik nema aktivnih oglasa"}),e.jsx(l,{posts:a})]}):e.jsxs("div",{className:t.catalogBody,children:[e.jsx("span",{children:"Aktivni oglasi"}),e.jsx("div",{className:"container",children:e.jsx("div",{className:t.postContainer,children:i.map(n=>e.jsx(h,{item:n},n._id))})}),e.jsx(l,{posts:a})]})}function h({item:s}){const i=d();return e.jsxs("div",{className:t.catalogItem,onClick:()=>i(`/app/post/${s._id}`),children:[e.jsx("img",{src:`/${s.imgs[0]}`}),e.jsxs("div",{className:t.postInfo,children:[e.jsx("span",{className:t.title,children:s.title}),e.jsxs("span",{className:t.price,children:[s.price.toLocaleString("en-US")," KM"]}),e.jsxs("div",{className:t.postLocation,children:[e.jsx("img",{src:"/pin.svg"}),e.jsx("span",{children:s.location[0].toUpperCase()+s.location.slice(1)})]})]})]})}function l({posts:s}){return s.length===0?null:e.jsxs("div",{className:t.finishedPanel,children:[e.jsx("span",{className:t.finishedTitle,children:"Završeni oglasi"}),e.jsx("div",{className:t.finishedPostsWrapper,children:s.map(i=>e.jsx(h,{item:i},i._id))})]})}const j="/";async function G(s){try{return await(await fetch(`${j}api/auth/rate/${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reviewType:"positive"})})).json()}catch(i){throw new Error(i)}}async function H(s){try{return await(await fetch(`${j}api/auth/rate/${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reviewType:"negative"})})).json()}catch(i){throw new Error(i)}}function Q(){const s=p(),{mutate:i,isLoading:a}=v({mutationFn:n=>G(n),onSuccess:n=>{n.status==="success"&&s.invalidateQueries({queryKey:["specificProfile"]})}});return{mutate:i,isLoading:a}}function D(){const s=p(),{mutate:i,isLoading:a}=v({mutationFn:n=>H(n),onSuccess:n=>{n.status==="success"&&s.invalidateQueries({queryKey:["specificProfile"]})}});return{mutate:i,isLoading:a}}const V="_ratePanel_vvb6u_1",Z={ratePanel:V};function z(){const{data:s}=f(),{data:i}=u(),{mutate:a}=D(),{mutate:n}=Q();if(!s)return null;const{validProfile:o}=i,r=o.reviews.find(_=>_.reviewer==s._id);return e.jsxs("div",{className:Z.ratePanel,children:[e.jsx("span",{children:"Ocjenite profil"}),e.jsxs("div",{children:[e.jsx("button",{onClick:()=>n(i.validProfile._id),className:r&&r.reviewType==="positive"?"positive":"",children:e.jsx("img",{src:"/like.svg"})}),e.jsx("button",{onClick:()=>a(i.validProfile._id),className:r&&r.reviewType==="negative"?"negative":"",children:e.jsx("img",{src:"/dislike.svg"})})]})]})}function ee(){const{data:s,isLoading:i}=u(),{setActiveProfile:a}=c(),{data:n}=f(),o=d();return m.useEffect(()=>{var r;if(n&&(s!=null&&s.validProfile)&&n._id===((r=s.validProfile)==null?void 0:r._id))return o("/app/me");!i&&s.status==="success"&&a(s.validProfile)},[s,i,a,n,o]),i?e.jsx(y,{}):s.status==="fail"?e.jsx("span",{className:t.errorMessage,children:"Profil nije pronađen 🤷🏽‍♀️"}):e.jsx("div",{className:t.pageBody,children:e.jsxs("div",{className:`container ${t.profileContainer}`,children:[e.jsx(M,{}),e.jsx(z,{}),e.jsx(F,{})]})})}export{ee as default};