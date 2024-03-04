/* empty css                      */import{a as y}from"./assets/vendor-0cb09735.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();function u(e){return e.map(t=>{const{_id:r,book_image:s,title:a,author:n}=t;return`<li class="books-box-itm" id="${r}">
      <div class="books-box-wrap">
              <img
                class="books-img"
                src="${s}"
                alt="${a}"
              />
              <div class="books-overlay">
                <a href="#" data-id="${r}" class="books-overlay-text">
                quick view </a>
              </div>
            </div>
            <div class="books-box-desc">
              <p class="books-box-desc-title">${a}</p>
              <p class="books-box-desc-author">${n}</p>
            </div> 
            </li>`}).join("")}const f=(e,o)=>`<div class="books-container"><h2 class="books-title">Best Sellers Books</h2>${e.map(r=>{const s=r.list_name,a=u(r.books.slice(0,o));return`<div class="books-box-holder">
        <h3 class="books-box-subtitle">${s}</h3>
        <ul class="books-box-list">${a}</ul>
        <button data-categoryName="${s}" class="books-btn-see-more" type="button">see more</button>
      </div>`}).join("")}</div>`,k=e=>`<li class="categories-itm js-categories-current "><a href="#" data-categoryName="">All categories</a></li>${e.map(t=>`<li class="categories-itm"><a href="#" data-categoryName="${t.list_name}">${t.list_name}</a></li>`).join("")}`,p=e=>e.map(t=>{const r=u(t);return`<div class="books-category-box visually-hidden">
      <h2 class="books-box-title">${t.list_name}</h2>
      <ul class="books-category-list">${r}</ul>
    </div>`}).join(""),h="https://books-backend.p.goit.global",d=async(e,o=null)=>{const t=`${h}/books${e}`;try{const r=await y.get(t,{params:o});return console.log("Data from server:",r.data),r.data}catch(r){console.log(r)}},v=async e=>{const o=await d("/top-books/");return f(o,e)},L=async()=>{const e=await d("/category-list/");return k(e)},w=async(e="")=>{const o=await d("/category/",{category:e});return p(o)},l=document.querySelector(".books-box"),c=document.querySelector(".categories-list"),i={default:3,largeScreen:5,smallScreen:1};async function g(e){l.innerHTML=e;const o=document.querySelector(".books-box-desc-title");o&&$(o)}async function B(){const e=await L();c.innerHTML=e}async function b(){const e=window.innerWidth,o=x(e),t=await v(o);g(t)}async function m(e){const o=await w(e);return g(o)}function $(e){const o=e.textContent.split(" "),t=o.pop(),r=o.join(" ")+(o.length>0?` <span class="books-title-color">${t}</span>`:t);e.innerHTML=r}function x(e){return e>=1440?i.largeScreen:e<768?i.smallScreen:i.default}l&&(b(),B(),c.addEventListener("click",C),l.addEventListener("click",S));function C(e){e.preventDefault();const o=e.target;if(o.tagName==="A"){const t=o.dataset.categoryName;c.querySelector(".js-categories-current").classList.remove("js-categories-current"),o.classList.add("js-categories-current"),t===""?b():m(t)}}function S(e){e.preventDefault();const o=e.target;if(o.classList.contains("books-btn-see-more")){const t=o.dataset.categoryName;c.querySelector(".js-categories-current").classList.remove("js-categories-current"),c.querySelector(`[data-categoryName="${t}"]`).classList.add("js-categories-current"),m(t)}}
//# sourceMappingURL=commonHelpers2.js.map
