(this.webpackJsonpaletheia=this.webpackJsonpaletheia||[]).push([[0],{12:function(e,t,n){e.exports=n(20)},17:function(e,t,n){},19:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(5),l=n.n(o),c=(n(17),n(3)),s=n.n(c),i=n(6),u=n(7),m=n(8),d=n(10),f=n(9),p=n(11),h=n(1);var v=function(e){var t=e.db,n=Object(a.useState)("none"),o=Object(h.a)(n,2),l=o[0],c=o[1],s=Object(a.useState)([]),i=Object(h.a)(s,2),u=i[0],m=i[1],d=[],f=[];if(t){var p=!0,v=!1,b=void 0;try{for(var y,E=t[Symbol.iterator]();!(p=(y=E.next()).done);p=!0){var g=y.value;d.includes(g.poem)||d.push(g.poem),g.poem==l&&f.push(g)}}catch(N){v=!0,b=N}finally{try{p||null==E.return||E.return()}finally{if(v)throw b}}}for(var w=[],k=0;k<f.length;k++)for(var x=k+1;x<f.length;x++){var j=f[k],_=f[x];w.push(r.a.createElement("option",{key:j.name+_.name,value:j.name+"-vs-"+_.name},j.translator," vs ",_.translator))}return r.a.createElement("div",{id:"wrapper",className:"divided"},r.a.createElement("section",{className:"banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right"},r.a.createElement("div",{className:"content"},r.a.createElement("h1",null,"Aletheia"),r.a.createElement("p",{className:"major"},"A high level translation comparison tool."),!t&&r.a.createElement("p",{className:"major"},r.a.createElement("i",null,"Loading Archive...")),t&&r.a.createElement("div",{className:"fields"},r.a.createElement("div",{className:"field"},r.a.createElement("label",{htmlFor:"poem"},"Poem"),r.a.createElement("select",{name:"poem",id:"poem",onChange:function(e){return c(e.target.value)}},r.a.createElement("option",{value:""},"- Poem -"),d.map((function(e){return r.a.createElement("option",{key:e,value:e},e)})))),r.a.createElement("br",null),r.a.createElement("div",{className:"field"},r.a.createElement("label",{htmlFor:"versions"},"Versions"),r.a.createElement("select",{name:"versions",id:"versions",onChange:function(e){m(e.target.value)}},r.a.createElement("option",{value:""},"- A vs. B -"),w))),r.a.createElement("br",null),t&&r.a.createElement("ul",{className:"actions stacked"},r.a.createElement("li",null,r.a.createElement("a",{href:"/?".concat(u),className:"button big wide smooth-scroll-middle"},"Analyze")))),r.a.createElement("div",{className:"image"},r.a.createElement("img",{src:"images/banner.jpg",alt:""}))))},b=n(2),y=new Set(["the","and","of","to","with","her","in","a","his","i","she","my","from","on","you","that","he","your","for","is","-","as","by","not","all","me","this","have","or","was","it","their","will","him","now","at","be","when","do","what","while","but","has","shall","were","are","through","","there","one","out","these","so","had","nor","down","such","into","our","away","if","who","they","up","first","own","thus","spoke","whom","them","its","once","over","then","went","upon","said","may","we","which"]),E={sad:"\ud83d\ude22",upset:"\ud83d\ude29",angry:"\ud83d\ude20",scared:"\ud83d\ude28",hurt:"\ud83e\udd15",disappointed:"\ud83d\ude1e",pained:"\ud83d\ude27",happy:"\ud83d\ude04",excited:"\ud83e\udd29",satisfied:"\ud83d\ude0a",disgusted:"\ud83d\ude12",dead:"\ud83d\udc80",none:"","@@UNKNOWN@@":""};function g(e){return"hsl(".concat(55+e,", 75%, 75%)")}function w(e){var t=e.doc,n=e.showHeader,a=t.sections.map((function(e){return e.gcp.sent_score*e.gcp.sent_mag})).reduce((function(e,t){return e+t}),0)/t.sections.length,o=function(e){var t=e.corenlp.quotes,n=e.sections,a={},r=!0,o=!1,l=void 0;try{for(var c,s=function(){var e=c.value,t=n.find((function(t){return t.text.includes(e.text)}));if(!t)return"continue";var r=t.gcp.sentences.findIndex((function(t){return t.text.includes(e.text.substring(0,10))})),o=t.gcp.sentences.findIndex((function(t){return t.text.includes(e.text.substring(e.text.length-10))}));if(-1==r||-1==o)return"continue";for(var l=0,s=r;s<=o;s++)l+=t.gcp.sentences[s].sent_score*t.gcp.sentences[s].sent_mag;e.sent=l/(o-r+1),e.speaker in a||(a[e.speaker]=[]),e.canonicalSpeaker in a||(a[e.canonicalSpeaker]=[]),a[e.speaker].push(e),a[e.canonicalSpeaker].push(e)},i=t[Symbol.iterator]();!(r=(c=i.next()).done);r=!0)s()}catch(f){o=!0,l=f}finally{try{r||null==i.return||i.return()}finally{if(o)throw l}}var u=[],m=function(e){var t={name:e,quotes:a[e]};t.sent=t.quotes.map((function(e){return e.sent})).reduce((function(e,n){return e+n*(1/t.quotes.length)}),0),u.push(t)};for(var d in a)m(d);return u.sort((function(e,t){return e.sent-t.sent})),u}(t),l=function(e){var t=e.sections.map((function(e){return e.text})).flat().join(" ").replace(/[\.!"'?,]/g,"").split(" "),n={};t.forEach((function(e){return n[e]=(n[e]||0)+1}));var a=Object.keys(n);a.sort((function(e,t){return n[t]-n[e]}));for(var r=[],o=0;r.length<10&&o<a.length;o++){var l=a[o];y.has(l.toLowerCase())||r.push({word:l,count:n[l]})}return r}(t);return console.log(t),r.a.createElement("section",{className:"banner style1",style:{width:"45%"}},r.a.createElement("div",{className:"content",style:{paddingLeft:"0"}},n?r.a.createElement("h1",null,t.poem," / ",t.book):r.a.createElement("h1",null,"\xa0"),r.a.createElement("h1",{style:{fontSize:"2em"}},t.translator),r.a.createElement("span",{className:"major"},"Words: ",r.a.createElement("b",null,t.word_cnt)),r.a.createElement("br",null),r.a.createElement("span",{className:"major"},"Sentiment: ",r.a.createElement("b",{style:{color:g(100*a)}},a.toFixed(2))),r.a.createElement("br",null),r.a.createElement("br",null),o.map((function(e){return r.a.createElement(j,{speaker:e})})),r.a.createElement("br",null),r.a.createElement("br",null),l.map((function(e){return r.a.createElement(_,{word:e,words:l})}))))}function k(e){var t=e.idx,n=e.docs,a=e.key,o=Object(h.a)(n,2),l=o[0],c=o[1],s=[l.sections[t],c.sections[t]],i=s[0],u=s[1];return[r.a.createElement(x,{key:"a"+a,sec:i,doc:l}),r.a.createElement(x,{key:"b"+a,sec:u,doc:c})]}function x(e){var t=e.sec,n=e.key,a=(e.doc,t.gcp.sent_score*t.gcp.sent_mag*60),o=t.text,l=!0,c=!1,s=void 0;try{for(var i,u=t.gcp.entities[Symbol.iterator]();!(l=(i=u.next()).done);l=!0){var m=i.value;if(!(m.salience<.01)){var d=m.sent_score*m.sent_mag,f=new RegExp("\\b".concat(m.name,"\\b"));o=Math.abs(d)>.5?o.replace(f,'<b style="color: '.concat(g(60*d),'">').concat(m.name,"</b>")):o.replace(f,"<b>".concat(m.name,"</b>"))}}}catch(O){c=!0,s=O}finally{try{l||null==u.return||u.return()}finally{if(c)throw s}}var p=!0,h=!1,v=void 0;try{for(var b,y=t.textrazor[Symbol.iterator]();!(p=(b=y.next()).done);p=!0){var w=b.value,k=new RegExp("\\b".concat(w.text,"\\b"));o=o.replace(k,"<b>".concat(w.text,"</b>"))}}catch(O){h=!0,v=O}finally{try{p||null==y.return||y.return()}finally{if(h)throw v}}var x=t.allennlp.event_to_mind.oreact_top_k_predicted_tokens,j=t.allennlp.event_to_mind.oreact_top_k_log_probabilities,_=[];if("none"!=x[0][0])for(var N in x)j[N]>-3&&_.push(E[x[N][0]]);return r.a.createElement("section",{key:n,className:"style1",style:{width:"45%"}},r.a.createElement("div",{className:"content"},r.a.createElement("blockquote",{style:{borderLeftColor:g(a),marginBottom:"0"},dangerouslySetInnerHTML:{__html:o}}),r.a.createElement("span",null,_.join(" "))),r.a.createElement("br",null))}function j(e){var t=e.speaker,n=Object(a.useState)(!1),o=Object(h.a)(n,2),l=o[0],c=o[1];return r.a.createElement("div",{style:{display:"inline-block",padding:"1.5px"}},r.a.createElement("i",{class:"button small",style:{backgroundColor:g(160*t.sent)},onClick:function(){return c(!l)}},t.name," (",t.quotes.length,")"),l&&t.quotes.map((function(e,t){return r.a.createElement("blockquote",{key:t,style:{borderLeftColor:g(60*e.sent)}},e.text)})))}function _(e){var t=e.word,n=e.words,a=Math.min.apply(Math,Object(b.a)(n.map((function(e){return e.count})))),o=Math.max.apply(Math,Object(b.a)(n.map((function(e){return e.count}))));return r.a.createElement("div",{style:{display:"inline-block",padding:"1.5px"}},r.a.createElement("i",{class:"button small",style:{backgroundColor:"hsla(180, 75%, 75%, ".concat((t.count-a)/o,")")}},t.word," (",t.count,")"))}var N=function(e){var t=e.selected,n=Math.min(t[0].section_cnt,t[1].section_cnt);return r.a.createElement("div",null,r.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",alignItems:"baseline"}},r.a.createElement(w,{doc:t[0],showHeader:!0}),r.a.createElement(w,{doc:t[1]})),Object(b.a)(Array(n).keys()).map((function(e){return r.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",textAlign:"left"}},r.a.createElement(k,{key:e,docs:t,idx:e}))})))},O=(n(19),function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(f.a)(t).call(this,e))).state={db:null},n}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(i.a)(s.a.mark((function t(){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/db.json").then((function(e){return e.json()}));case 2:n=t.sent,e.setState({db:n});case 4:case"end":return t.stop()}}),t)})))()}},{key:"render",value:function(){var e=this.state.db,t=window.location.search,n=null;if(t&&e){var a=t.substring(1).split("-vs-");n=[e.find((function(e){return e.name==a[0]})),e.find((function(e){return e.name==a[1]}))]}return r.a.createElement("div",{className:"App"},!t&&!n&&r.a.createElement(v,{db:e}),n&&r.a.createElement(N,{selected:n}))}}]),t}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[12,1,2]]]);
//# sourceMappingURL=main.2fcf06a6.chunk.js.map