(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{141:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),i=r(232),l=r.n(i),o=r(7),s=r.n(o),c=(r(233),r(234),r(81),r(60)),d=r(79),h=function(e){var t=e.className,i=Object(a.useRef)(null),l=Object(c.c)(d.layoutContext),o=l[0],s=l[1],h=o.width/2,f=o.height/2;return Object(c.b)(s),Object(a.useEffect)(function(){var e=r(239),t=o.width/2,a=o.height/2,n=new e.Container,l=new e.Container,c=new e.Matrix;c.translate(50,50);var d=e.RenderTexture.create(t+100,a+100),h=e.RenderTexture.create(t+100,a+100),f=new e.Sprite(d);f.x=-50,f.y=-50;var v=new e.Sprite(h);v.x=-50,v.y=-50;var x=new e.filters.DisplacementFilter(v),w=new m(.9,.9,.9);f.filters=[x,w],n.addChild(l,f);var b=0,g=e.autoDetectRenderer(t,a,{view:i.current});return s.on("update",function(e){t=e.width/2,a=e.height/2,d.resize(t+100,a+100),h.resize(t+100,a+100),g.resize(t,a)}),s.on("animation-frame",function(){var e=Math.random(),r=Math.max(t,a)/4;b+=(4*Math.random()-2)*e,l.addChild(u.gen(t,a,e)),l.addChild(u.gen(t,a,e));var i=l.children,o=Array.isArray(i),s=0;for(i=o?i:i[Symbol.iterator]();;){var m;if(o){if(s>=i.length)break;m=i[s++]}else{if((s=i.next()).done)break;m=s.value}m.move(l,t,a)}x.scale.x=Math.cos(b)*e*r,x.scale.y=Math.sin(b)*e*r,g.render(f,d,!1,c),g.render(l,d,!1),g.render(n,h,!1,c),g.render(n)}),function(){return s.removeAllListeners()}},c.a),n.a.createElement("canvas",{className:t,ref:i,width:h,height:f})},u=function(e){function t(t,r,a,n,i,l){var o;return(o=e.call(this)||this).x=t,o.y=r,o.dx=a,o.dy=n,o.size=i,o.color=l,o.blendMode=PIXI.BLEND_MODES.ADD,i>0&&(o.beginFill(l),o.drawCircle(0,0,i),o.endFill()),o}return s()(t,e),t.prototype.move=function(e,t,r){this.x+=this.dx,this.y+=this.dy,(this.x<-this.size||this.x>t+this.size||this.y<-this.size||this.y>r+this.size)&&e.removeChild(this)},t.gen=function(e,r,a){var n=a*(Math.max(e,r)/5),i=.1*n+5,l=Math.random()*Math.PI*2;return new t(e/2,r/2,Math.cos(l)*i,Math.sin(l)*i,n,16777215*Math.random()&3355443)},t}(PIXI.Graphics),m=function(e){function t(t,r,a,n,i,l,o,s){var c;return void 0===t&&(t=1),void 0===r&&(r=1),void 0===a&&(a=1),void 0===n&&(n=1),void 0===i&&(i=0),void 0===l&&(l=0),void 0===o&&(o=0),void 0===s&&(s=0),(c=e.call(this)||this).matrix=[t,0,0,0,i/255,0,r,0,0,l/255,0,0,a,0,o/255,0,0,0,n,s/255],c}return s()(t,e),t}(PIXI.filters.ColorMatrixFilter),f=r(341);t.default=function(){return n.a.createElement("div",{className:f.page},n.a.createElement(h,{className:l()(f.background,f.layer)}),n.a.createElement("div",{className:f.layer},n.a.createElement("h1",null,"JongChan Choi"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("a",{href:"https://0xabcdef.com/resume/"},"resume")),n.a.createElement("li",null,n.a.createElement("a",{href:"https://github.com/disjukr"},"github")),n.a.createElement("li",null,n.a.createElement("a",{href:"https://twitter.com/disjukr"},"twitter")))))}},341:function(e,t,r){e.exports={page:"index-module--page--2nb-E",layer:"index-module--layer--12eg-",background:"index-module--background--1Lh-R"}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-2492e9c00e190f08c070.js.map