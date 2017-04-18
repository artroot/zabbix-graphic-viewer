function Graphic(a,b){a instanceof Object?(this.mode=null==b?"hour":b,this.autoLoad=!0,this.graphids=a.graphids,this.port=a.port,this.period=a.period,this.stime=a.stime,this.width=a.width,this.height=a.height,this.modes=[{name:"Час",mode:"hour",period:3600},{name:"День",mode:"day",period:86400},{name:"Месяц",mode:"month",period:2592e3}],this.source=document.getElementById("graph_"+this.port), this.source.className='zabbix-graphics'):Console.error("No data!"),this.getLnk=function(a){var b="zabbix";return a.forEach(function(a,c){b+=0==c?"?":"&",b=b+a.name+"="+a.value}),b},this.createControls=function(){var a=this,b=document.createElement("ul");b.className="pagination",this.source.appendChild(b);var c=document.createElement("li"),d=document.createElement("a"),e=document.createElement("span");d.href="javascript:void(0)",d.setAttribute("mode",this.mode),d.setAttribute("aria-label","Previous"),e.innerHTML="&laquo;",b.appendChild(c),c.appendChild(d),d.appendChild(e),d.onclick=function(){a.goBack(this)};var f=[];this.modes.forEach(function(c){var d=document.createElement("li"),e=document.createElement("a");d.className=c.mode==a.mode?"active":"",d.setAttribute("period",c.period),d.setAttribute("mode",c.mode),e.href="javascript:void(0)",e.innerHTML=c.name,b.appendChild(d),d.appendChild(e),d.onclick=function(){a.setMode(this)},f.push(d)});var g=document.createElement("li"),h=document.createElement("a"),i=document.createElement("span");h.href="javascript:void(0)",h.setAttribute("mode",this.mode),h.setAttribute("aria-label","Next"),i.innerHTML="&raquo;",b.appendChild(g),g.appendChild(h),h.appendChild(i),h.onclick=function(){a.goFront(this)},this.controlElements={back:c,front:g,mods:f}},this.createGraphic=function(){self=this,this.graphics=[];var a=new Date(this.stime);this.graphids.forEach(function(b){var c=document.createElement("figure"),d=document.createElement("img");d.src=self.getLnk([{name:"graphid",value:b.graphid},{name:"period",value:self.period},{name:"stime",value:a.incDate(self.mode,0).outNewDateForZabbixFormat()},{name:"width",value:self.width},{name:"height",value:self.height}]),d.setAttribute("graphid",b.graphid),self.source.appendChild(c),c.appendChild(d),self.graphics.push(d)}),this.stime=a.outNewDate()},this.create=function(){this.createControls();var a=document.createElement("p");a.className="timer",a.innerHTML=this.autoLoad?30:0,this.source.appendChild(a),this.createGraphic(),this.timer=a,setInterval(function(){self.autoLoad?a.innerHTML=a.innerHTML-1:a.innerHTML=0},1e3,a),setInterval(function(){if(self.autoLoad){a.innerHTML=30;var b=(new Date).decDate(self.mode,1);self.graphics.forEach(function(a){a.setAttribute("src",self.getLnk([{name:"graphid",value:a.getAttribute("graphid")},{name:"period",value:self.period},{name:"stime",value:b.getUTCFullYear()+("0"+(b.getUTCMonth()+1)).slice(-2)+("0"+b.getUTCDate()).slice(-2)+("0"+b.getHours()).slice(-2)+("0"+b.getUTCMinutes()).slice(-2)+("0"+b.getUTCSeconds()).slice(-2)},{name:"width",value:self.width},{name:"height",value:self.height}]))}),self.stime=b.getUTCFullYear()+"-"+("0"+(b.getUTCMonth()+1)).slice(-2)+"-"+("0"+b.getUTCDate()).slice(-2)+"T"+("0"+b.getHours()).slice(-2)+":"+("0"+b.getUTCMinutes()).slice(-2)+":"+("0"+b.getUTCSeconds()).slice(-2)}},3e4,self,a)},this.setMode=function(a){var b=this;this.autoLoad=!1,this.mode=a.getAttribute("mode"),this.period=a.getAttribute("period"),this.controlElements.mods.forEach(function(a){a.className=""}),a.className="active",this.controlElements.back.setAttribute("mode",this.mode),this.controlElements.front.setAttribute("mode",this.mode);var c=new Date(this.stime);this.graphics.forEach(function(a){a.setAttribute("src",b.getLnk([{name:"graphid",value:a.getAttribute("graphid")},{name:"period",value:b.period},{name:"stime",value:c.incDate(b.mode,0).outNewDateForZabbixFormat()},{name:"width",value:b.width},{name:"height",value:b.height}]))}),this.stime=c.outNewDate()},this.goBack=function(){var a=this,b=new Date(this.stime);this.autoLoad=!1,this.graphics.forEach(function(c){c.setAttribute("src",a.getLnk([{name:"graphid",value:c.getAttribute("graphid")},{name:"period",value:a.period},{name:"stime",value:b.decDate(a.mode,1).outNewDateForZabbixFormat()},{name:"width",value:a.width},{name:"height",value:a.height}]))}),this.stime=b.outNewDate()},this.goFront=function(){var a=this,b=new Date(this.stime).incDate(a.mode,1),c=(new Date).decDate(this.mode,1);b.getYear()+("0"+(b.getUTCMonth()+1)).slice(-2)+("0"+b.getUTCDate()).slice(-2)+("0"+b.getUTCHours()).slice(-2)+("0"+b.getUTCMinutes()).slice(-2)>=c.getYear()+("0"+(c.getUTCMonth()+1)).slice(-2)+("0"+c.getUTCDate()).slice(-2)+("0"+c.getHours()).slice(-2)+("0"+c.getUTCMinutes()).slice(-2)?(this.timer.innerHTML=30,this.autoLoad=!0):(this.timer.innerHTML=0,this.autoLoad=!1,this.graphics.forEach(function(c){c.setAttribute("src",a.getLnk([{name:"graphid",value:c.getAttribute("graphid")},{name:"period",value:a.period},{name:"stime",value:b.outNewDateForZabbixFormat()},{name:"width",value:a.width},{name:"height",value:a.height}]))}),this.stime=b.outNewDate())},Date.prototype.decDate=function(a,b){switch(a){case"hour":this.setHours(this.getHours()-b);break;case"day":this.setDate(this.getDate()-b);break;case"month":this.setMonth(this.getMonth()-b)}return this},Date.prototype.incDate=function(a,b){switch(a){case"hour":this.setHours(this.getHours()+b);break;case"day":this.setDate(this.getDate()+b);break;case"month":this.setMonth(this.getMonth()+b)}return this},Date.prototype.outNewDateForZabbixFormat=function(){return this.getUTCFullYear()+("0"+(this.getUTCMonth()+1)).slice(-2)+("0"+this.getUTCDate()).slice(-2)+("0"+this.getUTCHours()).slice(-2)+("0"+this.getUTCMinutes()).slice(-2)+("0"+this.getUTCSeconds()).slice(-2)},Date.prototype.outNewDate=function(){return this.getUTCFullYear()+"-"+("0"+(this.getUTCMonth()+1)).slice(-2)+"-"+("0"+this.getUTCDate()).slice(-2)+"T"+("0"+this.getUTCHours()).slice(-2)+":"+("0"+this.getUTCMinutes()).slice(-2)+":"+("0"+this.getUTCSeconds()).slice(-2)}}