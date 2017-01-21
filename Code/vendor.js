!function(){"use strict";var e=function(){this.init()};e.prototype={init:function(){var e=this||n;return e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.mobileAutoEnable=!0,e._setup(),e},volume:function(e){var t=this||n;if(e=parseFloat(e),t.ctx||_(),"undefined"!=typeof e&&e>=0&&e<=1){if(t._volume=e,t._muted)return t;t.usingWebAudio&&(t.masterGain.gain.value=e);for(var o=0;o<t._howls.length;o++)if(!t._howls[o]._webAudio)for(var r=t._howls[o]._getSoundIds(),a=0;a<r.length;a++){var i=t._howls[o]._soundById(r[a]);i&&i._node&&(i._node.volume=i._volume*e)}return t}return t._volume},mute:function(e){var t=this||n;t.ctx||_(),t._muted=e,t.usingWebAudio&&(t.masterGain.gain.value=e?0:t._volume);for(var o=0;o<t._howls.length;o++)if(!t._howls[o]._webAudio)for(var r=t._howls[o]._getSoundIds(),a=0;a<r.length;a++){var i=t._howls[o]._soundById(r[a]);i&&i._node&&(i._node.muted=!!e||i._muted)}return t},unload:function(){for(var e=this||n,t=e._howls.length-1;t>=0;t--)e._howls[t].unload();return e.usingWebAudio&&e.ctx&&"undefined"!=typeof e.ctx.close&&(e.ctx.close(),e.ctx=null,_()),e},codecs:function(e){return(this||n)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||n;if(e.state=e.ctx?e.ctx.state||"running":"running",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{var t=new Audio;"undefined"==typeof t.oncanplaythrough&&(e._canPlayEvent="canplay")}catch(n){e.noAudio=!0}else e.noAudio=!0;try{var t=new Audio;t.muted&&(e.noAudio=!0)}catch(e){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||n,t=null;try{t="undefined"!=typeof Audio?new Audio:null}catch(n){return e}if(!t||"function"!=typeof t.canPlayType)return e;var o=t.canPlayType("audio/mpeg;").replace(/^no$/,""),r=e._navigator&&e._navigator.userAgent.match(/OPR\/([0-6].)/g),a=r&&parseInt(r[0].split("/")[1],10)<33;return e._codecs={mp3:!(a||!o&&!t.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!o,opus:!!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!t.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!t.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!t.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(t.canPlayType("audio/x-m4a;")||t.canPlayType("audio/m4a;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(t.canPlayType("audio/x-mp4;")||t.canPlayType("audio/mp4;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),dolby:!!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(t.canPlayType("audio/x-flac;")||t.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_enableMobileAudio:function(){var e=this||n,t=/iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator&&e._navigator.userAgent),o=!!("ontouchend"in window||e._navigator&&e._navigator.maxTouchPoints>0||e._navigator&&e._navigator.msMaxTouchPoints>0);if(!e._mobileEnabled&&e.ctx&&(t||o)){e._mobileEnabled=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var r=function(){var n=e.ctx.createBufferSource();n.buffer=e._scratchBuffer,n.connect(e.ctx.destination),"undefined"==typeof n.start?n.noteOn(0):n.start(0),n.onended=function(){n.disconnect(0),e._mobileEnabled=!0,e.mobileAutoEnable=!1,document.removeEventListener("touchend",r,!0)}};return document.addEventListener("touchend",r,!0),e}},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&"undefined"!=typeof e.ctx.suspend&&n.usingWebAudio){for(var t=0;t<e._howls.length;t++)if(e._howls[t]._webAudio)for(var o=0;o<e._howls[t]._sounds.length;o++)if(!e._howls[t]._sounds[o]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout(function(){e.autoSuspend&&(e._suspendTimer=null,e.state="suspending",e.ctx.suspend().then(function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())}))},3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&"undefined"!=typeof e.ctx.resume&&n.usingWebAudio)return"running"===e.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state?(e.state="resuming",e.ctx.resume().then(function(){e.state="running";for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("resume")}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var n=new e,t=function(e){var n=this;return e.src&&0!==e.src.length?void n.init(e):void console.error("An array of source files must be passed with any new Howl.")};t.prototype={init:function(e){var t=this;return n.ctx||_(),t._autoplay=e.autoplay||!1,t._format="string"!=typeof e.format?e.format:[e.format],t._html5=e.html5||!1,t._muted=e.mute||!1,t._loop=e.loop||!1,t._pool=e.pool||5,t._preload="boolean"!=typeof e.preload||e.preload,t._rate=e.rate||1,t._sprite=e.sprite||{},t._src="string"!=typeof e.src?e.src:[e.src],t._volume=void 0!==e.volume?e.volume:1,t._duration=0,t._state="unloaded",t._sounds=[],t._endTimers={},t._queue=[],t._onend=e.onend?[{fn:e.onend}]:[],t._onfade=e.onfade?[{fn:e.onfade}]:[],t._onload=e.onload?[{fn:e.onload}]:[],t._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],t._onpause=e.onpause?[{fn:e.onpause}]:[],t._onplay=e.onplay?[{fn:e.onplay}]:[],t._onstop=e.onstop?[{fn:e.onstop}]:[],t._onmute=e.onmute?[{fn:e.onmute}]:[],t._onvolume=e.onvolume?[{fn:e.onvolume}]:[],t._onrate=e.onrate?[{fn:e.onrate}]:[],t._onseek=e.onseek?[{fn:e.onseek}]:[],t._onresume=[],t._webAudio=n.usingWebAudio&&!t._html5,"undefined"!=typeof n.ctx&&n.ctx&&n.mobileAutoEnable&&n._enableMobileAudio(),n._howls.push(t),t._autoplay&&t._queue.push({event:"play",action:function(){t.play()}}),t._preload&&t.load(),t},load:function(){var e=this,t=null;if(n.noAudio)return void e._emit("loaderror",null,"No audio support.");"string"==typeof e._src&&(e._src=[e._src]);for(var r=0;r<e._src.length;r++){var i,u;if(e._format&&e._format[r])i=e._format[r];else{if(u=e._src[r],"string"!=typeof u){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}i=/^data:audio\/([^;,]+);/i.exec(u),i||(i=/\.([^.]+)$/.exec(u.split("?",1)[0])),i&&(i=i[1].toLowerCase())}if(n.codecs(i)){t=e._src[r];break}}return t?(e._src=t,e._state="loading","https:"===window.location.protocol&&"http:"===t.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new o(e),e._webAudio&&a(e),e):void e._emit("loaderror",null,"No codec support for selected audio sources.")},play:function(e,t){var o=this,r=null;if("number"==typeof e)r=e,e=null;else{if("string"==typeof e&&"loaded"===o._state&&!o._sprite[e])return null;if("undefined"==typeof e){e="__default";for(var a=0,i=0;i<o._sounds.length;i++)o._sounds[i]._paused&&!o._sounds[i]._ended&&(a++,r=o._sounds[i]._id);1===a?e=null:r=null}}var u=r?o._soundById(r):o._inactiveSound();if(!u)return null;if(r&&!e&&(e=u._sprite||"__default"),"loaded"!==o._state&&!o._sprite[e])return o._queue.push({event:"play",action:function(){o.play(o._soundById(u._id)?u._id:void 0)}}),u._id;if(r&&!u._paused)return t||setTimeout(function(){o._emit("play",u._id)},0),u._id;o._webAudio&&n._autoResume();var d=Math.max(0,u._seek>0?u._seek:o._sprite[e][0]/1e3),_=Math.max(0,(o._sprite[e][0]+o._sprite[e][1])/1e3-d),s=1e3*_/Math.abs(u._rate);u._paused=!1,u._ended=!1,u._sprite=e,u._seek=d,u._start=o._sprite[e][0]/1e3,u._stop=(o._sprite[e][0]+o._sprite[e][1])/1e3,u._loop=!(!u._loop&&!o._sprite[e][2]);var l=u._node;if(o._webAudio){var f=function(){o._refreshBuffer(u);var e=u._muted||o._muted?0:u._volume;l.gain.setValueAtTime(e,n.ctx.currentTime),u._playStart=n.ctx.currentTime,"undefined"==typeof l.bufferSource.start?u._loop?l.bufferSource.noteGrainOn(0,d,86400):l.bufferSource.noteGrainOn(0,d,_):u._loop?l.bufferSource.start(0,d,86400):l.bufferSource.start(0,d,_),s!==1/0&&(o._endTimers[u._id]=setTimeout(o._ended.bind(o,u),s)),t||setTimeout(function(){o._emit("play",u._id)},0)},c="running"===n.state;"loaded"===o._state&&c?f():(o.once(c?"load":"resume",f,c?u._id:null),o._clearTimer(u._id))}else{var p=function(){l.currentTime=d,l.muted=u._muted||o._muted||n._muted||l.muted,l.volume=u._volume*n.volume(),l.playbackRate=u._rate,setTimeout(function(){l.play(),s!==1/0&&(o._endTimers[u._id]=setTimeout(o._ended.bind(o,u),s)),t||o._emit("play",u._id)},0)},m="loaded"===o._state&&(window&&window.ejecta||!l.readyState&&n._navigator.isCocoonJS);if(4===l.readyState||m)p();else{var v=function(){p(),l.removeEventListener(n._canPlayEvent,v,!1)};l.addEventListener(n._canPlayEvent,v,!1),o._clearTimer(u._id)}}return u._id},pause:function(e){var n=this;if("loaded"!==n._state)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var t=n._getSoundIds(e),o=0;o<t.length;o++){n._clearTimer(t[o]);var r=n._soundById(t[o]);if(r&&!r._paused&&(r._seek=n.seek(t[o]),r._rateSeek=0,r._paused=!0,n._stopFade(t[o]),r._node))if(n._webAudio){if(!r._node.bufferSource)return n;"undefined"==typeof r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),n._cleanBuffer(r._node)}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r?r._id:null)}return n},stop:function(e,n){var t=this;if("loaded"!==t._state)return t._queue.push({event:"stop",action:function(){t.stop(e)}}),t;for(var o=t._getSoundIds(e),r=0;r<o.length;r++){t._clearTimer(o[r]);var a=t._soundById(o[r]);if(a&&(a._seek=a._start||0,a._rateSeek=0,a._paused=!0,a._ended=!0,t._stopFade(o[r]),a._node))if(t._webAudio){if(!a._node.bufferSource)return n||t._emit("stop",a._id),t;"undefined"==typeof a._node.bufferSource.stop?a._node.bufferSource.noteOff(0):a._node.bufferSource.stop(0),t._cleanBuffer(a._node)}else isNaN(a._node.duration)&&a._node.duration!==1/0||(a._node.currentTime=a._start||0,a._node.pause());a&&!n&&t._emit("stop",a._id)}return t},mute:function(e,t){var o=this;if("loaded"!==o._state)return o._queue.push({event:"mute",action:function(){o.mute(e,t)}}),o;if("undefined"==typeof t){if("boolean"!=typeof e)return o._muted;o._muted=e}for(var r=o._getSoundIds(t),a=0;a<r.length;a++){var i=o._soundById(r[a]);i&&(i._muted=e,o._webAudio&&i._node?i._node.gain.setValueAtTime(e?0:i._volume,n.ctx.currentTime):i._node&&(i._node.muted=!!n._muted||e),o._emit("mute",i._id))}return o},volume:function(){var e,t,o=this,r=arguments;if(0===r.length)return o._volume;if(1===r.length||2===r.length&&"undefined"==typeof r[1]){var a=o._getSoundIds(),i=a.indexOf(r[0]);i>=0?t=parseInt(r[0],10):e=parseFloat(r[0])}else r.length>=2&&(e=parseFloat(r[0]),t=parseInt(r[1],10));var u;if(!("undefined"!=typeof e&&e>=0&&e<=1))return u=t?o._soundById(t):o._sounds[0],u?u._volume:0;if("loaded"!==o._state)return o._queue.push({event:"volume",action:function(){o.volume.apply(o,r)}}),o;"undefined"==typeof t&&(o._volume=e),t=o._getSoundIds(t);for(var d=0;d<t.length;d++)u=o._soundById(t[d]),u&&(u._volume=e,r[2]||o._stopFade(t[d]),o._webAudio&&u._node&&!u._muted?u._node.gain.setValueAtTime(e,n.ctx.currentTime):u._node&&!u._muted&&(u._node.volume=e*n.volume()),o._emit("volume",u._id));return o},fade:function(e,t,o,r){var a=this,i=Math.abs(e-t),u=e>t?"out":"in",d=i/.01,_=d>0?o/d:o;if(_<4&&(d=Math.ceil(d/(4/_)),_=4),"loaded"!==a._state)return a._queue.push({event:"fade",action:function(){a.fade(e,t,o,r)}}),a;a.volume(e,r);for(var s=a._getSoundIds(r),l=0;l<s.length;l++){var f=a._soundById(s[l]);if(f){if(r||a._stopFade(s[l]),a._webAudio&&!f._muted){var c=n.ctx.currentTime,p=c+o/1e3;f._volume=e,f._node.gain.setValueAtTime(e,c),f._node.gain.linearRampToValueAtTime(t,p)}var m=e;f._interval=setInterval(function(e,n){d>0&&(m+="in"===u?.01:-.01),m=Math.max(0,m),m=Math.min(1,m),m=Math.round(100*m)/100,a._webAudio?("undefined"==typeof r&&(a._volume=m),n._volume=m):a.volume(m,e,!0),m===t&&(clearInterval(n._interval),n._interval=null,a.volume(m,e),a._emit("fade",e))}.bind(a,s[l],f),_)}}return a},_stopFade:function(e){var t=this,o=t._soundById(e);return o&&o._interval&&(t._webAudio&&o._node.gain.cancelScheduledValues(n.ctx.currentTime),clearInterval(o._interval),o._interval=null,t._emit("fade",e)),t},loop:function(){var e,n,t,o=this,r=arguments;if(0===r.length)return o._loop;if(1===r.length){if("boolean"!=typeof r[0])return t=o._soundById(parseInt(r[0],10)),!!t&&t._loop;e=r[0],o._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var a=o._getSoundIds(n),i=0;i<a.length;i++)t=o._soundById(a[i]),t&&(t._loop=e,o._webAudio&&t._node&&t._node.bufferSource&&(t._node.bufferSource.loop=e,e&&(t._node.bufferSource.loopStart=t._start||0,t._node.bufferSource.loopEnd=t._stop)));return o},rate:function(){var e,t,o=this,r=arguments;if(0===r.length)t=o._sounds[0]._id;else if(1===r.length){var a=o._getSoundIds(),i=a.indexOf(r[0]);i>=0?t=parseInt(r[0],10):e=parseFloat(r[0])}else 2===r.length&&(e=parseFloat(r[0]),t=parseInt(r[1],10));var u;if("number"!=typeof e)return u=o._soundById(t),u?u._rate:o._rate;if("loaded"!==o._state)return o._queue.push({event:"rate",action:function(){o.rate.apply(o,r)}}),o;"undefined"==typeof t&&(o._rate=e),t=o._getSoundIds(t);for(var d=0;d<t.length;d++)if(u=o._soundById(t[d])){u._rateSeek=o.seek(t[d]),u._playStart=o._webAudio?n.ctx.currentTime:u._playStart,u._rate=e,o._webAudio&&u._node&&u._node.bufferSource?u._node.bufferSource.playbackRate.value=e:u._node&&(u._node.playbackRate=e);var _=o.seek(t[d]),s=(o._sprite[u._sprite][0]+o._sprite[u._sprite][1])/1e3-_,l=1e3*s/Math.abs(u._rate);!o._endTimers[t[d]]&&u._paused||(o._clearTimer(t[d]),o._endTimers[t[d]]=setTimeout(o._ended.bind(o,u),l)),o._emit("rate",u._id)}return o},seek:function(){var e,t,o=this,r=arguments;if(0===r.length)t=o._sounds[0]._id;else if(1===r.length){var a=o._getSoundIds(),i=a.indexOf(r[0]);i>=0?t=parseInt(r[0],10):(t=o._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),t=parseInt(r[1],10));if("undefined"==typeof t)return o;if("loaded"!==o._state)return o._queue.push({event:"seek",action:function(){o.seek.apply(o,r)}}),o;var u=o._soundById(t);if(u){if(!("number"==typeof e&&e>=0)){if(o._webAudio){var d=o.playing(t)?n.ctx.currentTime-u._playStart:0,_=u._rateSeek?u._rateSeek-u._seek:0;return u._seek+(_+d*Math.abs(u._rate))}return u._node.currentTime}var s=o.playing(t);s&&o.pause(t,!0),u._seek=e,u._ended=!1,o._clearTimer(t),s&&o.play(t,!0),!o._webAudio&&u._node&&(u._node.currentTime=e),o._emit("seek",t)}return o},playing:function(e){var n=this;if("number"==typeof e){var t=n._soundById(e);return!!t&&!t._paused}for(var o=0;o<n._sounds.length;o++)if(!n._sounds[o]._paused)return!0;return!1},duration:function(e){var n=this,t=n._duration,o=n._soundById(e);return o&&(t=n._sprite[o._sprite][1]/1e3),t},state:function(){return this._state},unload:function(){for(var e=this,t=e._sounds,o=0;o<t.length;o++){t[o]._paused||(e.stop(t[o]._id),e._emit("end",t[o]._id)),e._webAudio||(t[o]._node.src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",t[o]._node.removeEventListener("error",t[o]._errorFn,!1),t[o]._node.removeEventListener(n._canPlayEvent,t[o]._loadFn,!1)),delete t[o]._node,e._clearTimer(t[o]._id);var a=n._howls.indexOf(e);a>=0&&n._howls.splice(a,1)}var i=!0;for(o=0;o<n._howls.length;o++)if(n._howls[o]._src===e._src){i=!1;break}return r&&i&&delete r[e._src],n.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,n,t,o){var r=this,a=r["_on"+e];return"function"==typeof n&&a.push(o?{id:t,fn:n,once:o}:{id:t,fn:n}),r},off:function(e,n,t){var o=this,r=o["_on"+e],a=0;if(n){for(a=0;a<r.length;a++)if(n===r[a].fn&&t===r[a].id){r.splice(a,1);break}}else if(e)o["_on"+e]=[];else{var i=Object.keys(o);for(a=0;a<i.length;a++)0===i[a].indexOf("_on")&&Array.isArray(o[i[a]])&&(o[i[a]]=[])}return o},once:function(e,n,t){var o=this;return o.on(e,n,t,1),o},_emit:function(e,n,t){for(var o=this,r=o["_on"+e],a=r.length-1;a>=0;a--)r[a].id&&r[a].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,t)}.bind(o,r[a].fn),0),r[a].once&&o.off(e,r[a].fn,r[a].id));return o},_loadQueue:function(){var e=this;if(e._queue.length>0){var n=e._queue[0];e.once(n.event,function(){e._queue.shift(),e._loadQueue()}),n.action()}return e},_ended:function(e){var t=this,o=e._sprite,r=!(!e._loop&&!t._sprite[o][2]);if(t._emit("end",e._id),!t._webAudio&&r&&t.stop(e._id,!0).play(e._id),t._webAudio&&r){t._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=n.ctx.currentTime;var a=1e3*(e._stop-e._start)/Math.abs(e._rate);t._endTimers[e._id]=setTimeout(t._ended.bind(t,e),a)}return t._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,t._clearTimer(e._id),t._cleanBuffer(e._node),n._autoSuspend()),t._webAudio||r||t.stop(e._id),t},_clearTimer:function(e){var n=this;return n._endTimers[e]&&(clearTimeout(n._endTimers[e]),delete n._endTimers[e]),n},_soundById:function(e){for(var n=this,t=0;t<n._sounds.length;t++)if(e===n._sounds[t]._id)return n._sounds[t];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new o(e)},_drain:function(){var e=this,n=e._pool,t=0,o=0;if(!(e._sounds.length<n)){for(o=0;o<e._sounds.length;o++)e._sounds[o]._ended&&t++;for(o=e._sounds.length-1;o>=0;o--){if(t<=n)return;e._sounds[o]._ended&&(e._webAudio&&e._sounds[o]._node&&e._sounds[o]._node.disconnect(0),e._sounds.splice(o,1),t--)}}},_getSoundIds:function(e){var n=this;if("undefined"==typeof e){for(var t=[],o=0;o<n._sounds.length;o++)t.push(n._sounds[o]._id);return t}return[e]},_refreshBuffer:function(e){var t=this;return e._node.bufferSource=n.ctx.createBufferSource(),e._node.bufferSource.buffer=r[t._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop),e._node.bufferSource.playbackRate.value=e._rate,t},_cleanBuffer:function(e){var n=this;if(n._scratchBuffer){e.bufferSource.onended=null,e.bufferSource.disconnect(0);try{e.bufferSource.buffer=n._scratchBuffer}catch(e){}}return e.bufferSource=null,n}};var o=function(e){this._parent=e,this.init()};o.prototype={init:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._muted=n._muted,e._rate=n._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=Math.round(Date.now()*Math.random()),n._sounds.push(e),e.create(),e},create:function(){var e=this,t=e._parent,o=n._muted||e._muted||e._parent._muted?0:e._volume;return t._webAudio?(e._node="undefined"==typeof n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),e._node.gain.setValueAtTime(o,n.ctx.currentTime),e._node.paused=!0,e._node.connect(n.masterGain)):(e._node=new Audio,e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(n._canPlayEvent,e._loadFn,!1),e._node.src=t._src,e._node.preload="auto",e._node.volume=o*n.volume(),e._node.load()),e},reset:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._muted=n._muted,e._rate=n._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=Math.round(Date.now()*Math.random()),e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorListener,!1)},_loadListener:function(){var e=this,t=e._parent;t._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(t._sprite).length&&(t._sprite={__default:[0,1e3*t._duration]}),"loaded"!==t._state&&(t._state="loaded",t._emit("load"),t._loadQueue()),e._node.removeEventListener(n._canPlayEvent,e._loadFn,!1)}};var r={},a=function(e){var n=e._src;if(r[n])return e._duration=r[n].duration,void d(e);if(/^data:[^;]+;base64,/.test(n)){for(var t=atob(n.split(",")[1]),o=new Uint8Array(t.length),a=0;a<t.length;++a)o[a]=t.charCodeAt(a);u(o.buffer,e)}else{var _=new XMLHttpRequest;_.open("GET",n,!0),_.responseType="arraybuffer",_.onload=function(){var n=(_.status+"")[0];return"0"!==n&&"2"!==n&&"3"!==n?void e._emit("loaderror",null,"Failed loading audio file with status: "+_.status+"."):void u(_.response,e)},_.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete r[n],e.load())},i(_)}},i=function(e){try{e.send()}catch(n){e.onerror()}},u=function(e,t){n.ctx.decodeAudioData(e,function(e){e&&t._sounds.length>0&&(r[t._src]=e,d(t,e))},function(){t._emit("loaderror",null,"Decoding audio data failed.")})},d=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},_=function(){try{"undefined"!=typeof AudioContext?n.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?n.ctx=new webkitAudioContext:n.usingWebAudio=!1}catch(e){n.usingWebAudio=!1}var e=/iP(hone|od|ad)/.test(n._navigator&&n._navigator.platform),t=n._navigator&&n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),o=t?parseInt(t[1],10):null;if(e&&o&&o<9){var r=/safari/.test(n._navigator&&n._navigator.userAgent.toLowerCase());(n._navigator&&n._navigator.standalone&&!r||n._navigator&&!n._navigator.standalone&&!r)&&(n.usingWebAudio=!1)}n.usingWebAudio&&(n.masterGain="undefined"==typeof n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),n.masterGain.gain.value=1,n.masterGain.connect(n.ctx.destination)),n._setup()};"function"==typeof define&&define.amd&&define([],function(){return{Howler:n,Howl:t}}),"undefined"!=typeof exports&&(exports.Howler=n,exports.Howl=t),"undefined"!=typeof window?(window.HowlerGlobal=e,window.Howler=n,window.Howl=t,window.Sound=o):"undefined"!=typeof global&&(global.HowlerGlobal=e,global.Howler=n,global.Howl=t,global.Sound=o)}(),function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var t=n._howls.length-1;t>=0;t--)n._howls[t].stereo(e);return n},HowlerGlobal.prototype.pos=function(e,n,t){var o=this;return o.ctx&&o.ctx.listener?(n="number"!=typeof n?o._pos[1]:n,t="number"!=typeof t?o._pos[2]:t,"number"!=typeof e?o._pos:(o._pos=[e,n,t],o.ctx.listener.setPosition(o._pos[0],o._pos[1],o._pos[2]),o)):o},HowlerGlobal.prototype.orientation=function(e,n,t,o,r,a){var i=this;if(!i.ctx||!i.ctx.listener)return i;var u=i._orientation;return n="number"!=typeof n?u[1]:n,t="number"!=typeof t?u[2]:t,o="number"!=typeof o?u[3]:o,r="number"!=typeof r?u[4]:r,a="number"!=typeof a?u[5]:a,"number"!=typeof e?u:(i._orientation=[e,n,t,o,r,a],i.ctx.listener.setOrientation(e,n,t,o,r,a),i)},Howl.prototype.init=function(e){return function(n){var t=this;return t._orientation=n.orientation||[1,0,0],t._stereo=n.stereo||null,t._pos=n.pos||null,t._pannerAttr={coneInnerAngle:"undefined"!=typeof n.coneInnerAngle?n.coneInnerAngle:360,coneOuterAngle:"undefined"!=typeof n.coneOuterAngle?n.coneOuterAngle:360,coneOuterGain:"undefined"!=typeof n.coneOuterGain?n.coneOuterGain:0,distanceModel:"undefined"!=typeof n.distanceModel?n.distanceModel:"inverse",maxDistance:"undefined"!=typeof n.maxDistance?n.maxDistance:1e4,panningModel:"undefined"!=typeof n.panningModel?n.panningModel:"HRTF",refDistance:"undefined"!=typeof n.refDistance?n.refDistance:1,rolloffFactor:"undefined"!=typeof n.rolloffFactor?n.rolloffFactor:1},t._onstereo=n.onstereo?[{fn:n.onstereo}]:[],t._onpos=n.onpos?[{fn:n.onpos}]:[],t._onorientation=n.onorientation?[{fn:n.onorientation}]:[],e.call(this,n)}}(Howl.prototype.init),Howl.prototype.stereo=function(n,t){var o=this;if(!o._webAudio)return o;if("loaded"!==o._state)return o._queue.push({event:"stereo",action:function(){o.stereo(n,t)}}),o;var r="undefined"==typeof Howler.ctx.createStereoPanner?"spatial":"stereo";if("undefined"==typeof t){if("number"!=typeof n)return o._stereo;o._stereo=n,o._pos=[n,0,0]}for(var a=o._getSoundIds(t),i=0;i<a.length;i++){var u=o._soundById(a[i]);if(u){if("number"!=typeof n)return u._stereo;u._stereo=n,u._pos=[n,0,0],u._node&&(u._pannerAttr.panningModel="equalpower",u._panner&&u._panner.pan||e(u,r),"spatial"===r?u._panner.setPosition(n,0,0):u._panner.pan.value=n),o._emit("stereo",u._id)}}return o},Howl.prototype.pos=function(n,t,o,r){var a=this;if(!a._webAudio)return a;if("loaded"!==a._state)return a._queue.push({event:"pos",action:function(){a.pos(n,t,o,r)}}),a;if(t="number"!=typeof t?0:t,o="number"!=typeof o?-.5:o,"undefined"==typeof r){if("number"!=typeof n)return a._pos;a._pos=[n,t,o]}for(var i=a._getSoundIds(r),u=0;u<i.length;u++){var d=a._soundById(i[u]);if(d){if("number"!=typeof n)return d._pos;d._pos=[n,t,o],d._node&&(d._panner&&!d._panner.pan||e(d,"spatial"),d._panner.setPosition(n,t,o)),a._emit("pos",d._id)}}return a},Howl.prototype.orientation=function(n,t,o,r){var a=this;if(!a._webAudio)return a;if("loaded"!==a._state)return a._queue.push({event:"orientation",action:function(){a.orientation(n,t,o,r)}}),a;if(t="number"!=typeof t?a._orientation[1]:t,o="number"!=typeof o?a._orientation[2]:o,"undefined"==typeof r){if("number"!=typeof n)return a._orientation;a._orientation=[n,t,o]}for(var i=a._getSoundIds(r),u=0;u<i.length;u++){var d=a._soundById(i[u]);if(d){if("number"!=typeof n)return d._orientation;d._orientation=[n,t,o],d._node&&(d._panner||(d._pos||(d._pos=a._pos||[0,0,-.5]),e(d,"spatial")),d._panner.setOrientation(n,t,o)),a._emit("orientation",d._id)}}return a},Howl.prototype.pannerAttr=function(){var n,t,o,r=this,a=arguments;if(!r._webAudio)return r;if(0===a.length)return r._pannerAttr;if(1===a.length){if("object"!=typeof a[0])return o=r._soundById(parseInt(a[0],10)),o?o._pannerAttr:r._pannerAttr;n=a[0],"undefined"==typeof t&&(r._pannerAttr={coneInnerAngle:"undefined"!=typeof n.coneInnerAngle?n.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:"undefined"!=typeof n.coneOuterAngle?n.coneOuterAngle:r._coneOuterAngle,coneOuterGain:"undefined"!=typeof n.coneOuterGain?n.coneOuterGain:r._coneOuterGain,distanceModel:"undefined"!=typeof n.distanceModel?n.distanceModel:r._distanceModel,maxDistance:"undefined"!=typeof n.maxDistance?n.maxDistance:r._maxDistance,panningModel:"undefined"!=typeof n.panningModel?n.panningModel:r._panningModel,refDistance:"undefined"!=typeof n.refDistance?n.refDistance:r._refDistance,rolloffFactor:"undefined"!=typeof n.rolloffFactor?n.rolloffFactor:r._rolloffFactor})}else 2===a.length&&(n=a[0],t=parseInt(a[1],10));for(var i=r._getSoundIds(t),u=0;u<i.length;u++)if(o=r._soundById(i[u])){var d=o._pannerAttr;d={coneInnerAngle:"undefined"!=typeof n.coneInnerAngle?n.coneInnerAngle:d.coneInnerAngle,coneOuterAngle:"undefined"!=typeof n.coneOuterAngle?n.coneOuterAngle:d.coneOuterAngle,coneOuterGain:"undefined"!=typeof n.coneOuterGain?n.coneOuterGain:d.coneOuterGain,distanceModel:"undefined"!=typeof n.distanceModel?n.distanceModel:d.distanceModel,maxDistance:"undefined"!=typeof n.maxDistance?n.maxDistance:d.maxDistance,panningModel:"undefined"!=typeof n.panningModel?n.panningModel:d.panningModel,refDistance:"undefined"!=typeof n.refDistance?n.refDistance:d.refDistance,rolloffFactor:"undefined"!=typeof n.rolloffFactor?n.rolloffFactor:d.rolloffFactor};var _=o._panner;_?(_.coneInnerAngle=d.coneInnerAngle,_.coneOuterAngle=d.coneOuterAngle,_.coneOuterGain=d.coneOuterGain,_.distanceModel=d.distanceModel,_.maxDistance=d.maxDistance,_.panningModel=d.panningModel,_.refDistance=d.refDistance,_.rolloffFactor=d.rolloffFactor):(o._pos||(o._pos=r._pos||[0,0,-.5]),e(o,"spatial"))}return r},Sound.prototype.init=function(e){return function(){var n=this,t=n._parent;n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,e.call(this),n._stereo?t.stereo(n._stereo):n._pos&&t.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var n=this,t=n._parent;return n._orientation=t._orientation,n._pos=t._pos,n._pannerAttr=t._pannerAttr,e.call(this)}}(Sound.prototype.reset);var e=function(e,n){n=n||"spatial","spatial"===n?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.panningModel=e._pannerAttr.panningModel,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.value=e._stereo),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id)}}();