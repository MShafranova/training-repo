/* empty css                      */import{a as f}from"./assets/vendor-0cb09735.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function u(e){return e.map(t=>{const{_id:a,book_image:s,title:r,author:n}=t;return`<li class="books-box-itm" id="${a}">
      <div class="books-box-wrap">
              <img
                class="books-img"
                src="${s}"
                alt="${r}"
              />
              <div class="books-overlay">
                <a href="#" data-id="${a}" class="books-overlay-text">
                quick view </a>
              </div>
            </div>
            <div class="books-box-desc">
              <p class="books-box-desc-title">${r}</p>
              <p class="books-box-desc-author">${n}</p>
            </div> 
            </li>`}).join("")}const m=(e,o)=>`<div class="books-container"><h2 class="books-title">Best Sellers Books</h2>${e.map(a=>{const s=a.list_name,r=u(a.books.slice(0,o));return`<div class="books-box-holder">
        <h3 class="books-box-subtitle">${s}</h3>
        <ul class="books-box-list">${r}</ul>
        <button data-categoryName="${s}" class="books-btn-see-more" type="button">see more</button>
      </div>`}).join("")}</div>`,k=e=>`<li class="categories-itm js-categories-current "><a href="#" data-categoryName="">All categories</a></li>${e.map(t=>`<li class="categories-itm"><a href="#" data-categoryName="${t.list_name}">${t.list_name}</a></li>`).join("")}`,p=(e,o)=>{const t=u(e);return`<div class="books-category-box visually-hidden">
<h2 class="books-box-title">${o}</h2>
        <ul class="books-category-list">${t}</ul>
        </div>`},h="https://books-backend.p.goit.global",d=async(e,o=null)=>{const t=`${h}/books${e}`;try{return(await f.get(t,{params:o})).data}catch(a){console.log(a)}},v=async e=>{const o=await d("/top-books/");return m(o,e)},L=async()=>{const e=await d("/category-list/");return k(e)},w=async e=>{const o=await d("/category/",{category:e});return p(o,e)},l=document.querySelector(".books-box"),c=document.querySelector(".categories-list"),i={default:3,largeScreen:5,smallScreen:1};async function g(e){l.innerHTML=e;const o=document.querySelector(".books-box-desc-title");o&&$(o)}async function B(){const e=await L();c.innerHTML=e}async function b(){const e=window.innerWidth,o=x(e),t=await v(o);g(t)}async function y(e){const o=await w(e);g(o)}function $(e){const o=e.textContent.split(" "),t=o.pop(),a=o.join(" ")+(o.length>0?` <span class="books-title-color">${t}</span>`:t);e.innerHTML=a}function x(e){return e>=1440?i.largeScreen:e<768?i.smallScreen:i.default}l&&(b(),B(),c.addEventListener("click",C),l.addEventListener("click",S));function C(e){e.preventDefault();const o=e.target;if(o.tagName==="A"){const t=o.dataset.categoryName;c.querySelector(".js-categories-current").classList.remove("js-categories-current"),o.classList.add("js-categories-current"),t===""?b():y(t)}}function S(e){e.preventDefault();const o=e.target;if(o.classList.contains("books-btn-see-more")){const t=o.dataset.categoryName;c.querySelector(".js-categories-current").classList.remove("js-categories-current"),c.querySelector(`[data-categoryName="${t}"]`).classList.add("js-categories-current"),y(t)}}
//# sourceMappingURL=commonHelpers2.js.map
