# 概要

- BEMのルールに従っているかチェックする
  - Block要素にはmarginを設定しない
  - 他は後ほど追加

# インストール方法

- ソースコードをダウンロード
- 圧縮されていたら解凍
- Chrome 拡張の設定画面を開く
  - chrome://extensions/
- 右上のデベロッパーモードを ON
- 左上のパッケージ化されていない拡張機能を読み込む を押下
- ダウンロードしたディレクトリを選択

# ブックマークレット

- `.header` のみ、スタイルのチェック対象から除外しています。必要に応じて配列 `t` を編集してください

```
javascript:(()=>{"use strict";let e={block:{margin:"0px",position:"static","max-width":"none","max-height":"none"},element:{},modifier:{}},t=["header"],l=/^(?<block>[a-zA-Z]+)$/,a=/^(?<block>[a-zA-Z]+)__(?<element>[a-zA-Z]+)$/,s=/^(?<base>[a-zA-Z]+(__[a-zA-Z]+)?)--(?<modifier>[a-zA-Z]+)$/,r=e=>l.test(e),i=e=>a.test(e),n=e=>s.test(e),o=new Set,c=new Set,d=new Set,u=!0,f=[],h=(t,l)=>{let a=document.createElement("div");a.setAttribute("class",t),E.appendChild(a);let s=getComputedStyle(a);Object.entries(e[l]).forEach(([e,a])=>{let r=s.getPropertyValue(e);r!==a&&(f.push(`${l}要素のセレクタ (.${t}) に${e} (${r}) が付いています！！`),u=!1)})},m=(e,t)=>{let l=e.parentNode;return"HTML"!==l.tagName&&(!!l.classList.contains(t)||m(l,t))},p=(e,t)=>{let l=a.exec(t);if(!l)return!0;let s=l.groups.block;return m(e,s)},b=(e,t)=>{let l=s.exec(t);if(!l)return!0;let a=l.groups.base;return e.classList.contains(a)};document.querySelectorAll("*").forEach(e=>{Array.from(e.classList.values()).forEach(l=>{if(!(!u||t.includes(l))){if(r(l))o.add(l);else if(i(l)){c.add(l);let a=p(e,l);a||(f.push(`element要素 (${l}) の親にblock要素がありません！！`),u=!1)}else if(n(l)){d.add(l);let s=b(e,l);s||(f.push(`modifier要素 (${l}) がマルチクラスになっていません！！`),u=!1)}else f.push(`class名 ${l} がBEMの命名に沿っていません！`)}})});let E=document.createElement("div");document.body.appendChild(E),o.forEach(e=>h(e,"block")),c.forEach(e=>h(e,"element")),d.forEach(e=>h(e,"modifier")),E.remove(),u&&f.push("OK!"),alert(f.join("\n"))})();
```
