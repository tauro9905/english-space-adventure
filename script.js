'use strict';
const quiz=[
 {q:'Which sentence is correct?',a:['She play soccer.','She plays soccer.','She playing soccer.','She to play soccer.'],c:1,why:'Use -s with he, she, and it.'},
 {q:'Choose the correct negative sentence.',a:['He don’t like pizza.','He doesn’t likes pizza.','He doesn’t like pizza.','He not like pizza.'],c:2,why:'After doesn’t, use the base form of the verb.'},
 {q:'Which question is correct?',a:['Do she study?','Does she studies?','Does she study?','She does study?'],c:2,why:'Does + subject + base verb.'},
 {q:'Select the correct sentence.',a:['They goes to school.','They go to school.','They going school.','They does go school.'],c:1,why:'Use the base verb with they.'},
 {q:'What does Simple Present usually describe?',a:['Daily routines and habits','Only past actions','Only future plans','One action happening right now'],c:0,why:'Use Simple Present for habits, routines, and facts.'}
];
const fill=[
 {q:'My sister ___ English every day.',a:['study','studies','studying','studys'],c:1,why:'For consonant + y, change y to -ies.'},
 {q:'They ___ basketball on Saturdays.',a:['plays','playing','play','does play'],c:2,why:'With they, use the base form.'},
 {q:'He ___ not drink coffee.',a:['do','does','is','are'],c:1,why:'He + does not + base verb.'},
 {q:'___ you wake up early?',a:['Does','Are','Do','Is'],c:2,why:'Do + you + base verb.'},
 {q:'The robot ___ in space.',a:['work','works','working','do work'],c:1,why:'The robot is singular, so add -s.'}
];
const order=[
 {words:['every','day','She','reads','books'],answer:'She reads books every day',why:'Subject + verb + complement + time.'},
 {words:['play','We','soccer','on','Fridays'],answer:'We play soccer on Fridays',why:'We + base verb.'},
 {words:['not','does','He','like','tea'],answer:'He does not like tea',why:'Use does not + base verb.'},
 {words:['you','Do','music','like'],answer:'Do you like music',why:'Do + subject + base verb.'},
 {words:['every','morning','wakes','She','up'],answer:'She wakes up every morning',why:'With she, add -s to wake.'}
];
const games={quiz,fill,order};const gameNames={quiz:'PLANET QUIZ',fill:'MISSING WORD',order:'WORD ORBIT'};
const safeGet=()=>{try{return JSON.parse(localStorage.getItem('esa_progress_v1'))||{score:0,completed:{}}}catch{return {score:0,completed:{}}}};
let progress=safeGet();let game='quiz',index=0,locked=false,selected=[];
const $=id=>document.getElementById(id);
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function persist(){try{localStorage.setItem('esa_progress_v1',JSON.stringify(progress))}catch{}updateProgress()}
function updateProgress() {
  const solved = Object.keys(progress.completed).filter(key => /^(quiz|fill|order)-[0-4]$/.test(key) && progress.completed[key]).length;
  const planets = Math.floor(solved / 3);
  $('score').textContent = progress.score;
  $('passportScore').textContent = progress.score;
  $('passportPlanets').textContent = planets + '/5';
  $('progressLabel').textContent = planets + ' of 5 planets explored';
  $('progressBar').style.width = 20 * planets + '%';
  $('passportBar').style.width = 20 * planets + '%';
  $('rankText').textContent = ['🌱 Rookie Explorer', '🪐 Space Cadet', '🪐 Space Cadet', '🚀 Star Navigator', '🚀 Star Navigator', '🌟 Galactic Grammar Master'][planets];
  $('map-progress').textContent = solved + ' of 15 challenges solved · Earn a planet badge every 3 correct challenges.';
  document.querySelectorAll('.destination').forEach((destination, position) => {
    const earned = position < planets;
    destination.classList.toggle('explored', earned);
    destination.querySelector('small').textContent = earned ? '✓ Badge earned' : 'Explore →';
  });
}
function complete(key){if(!progress.completed[key]){progress.completed[key]=true;progress.score+=10;persist();return true}return false}
function setGame(g){game=g;index=0;locked=false;selected=[];document.querySelectorAll('[data-game]').forEach(t=>{let active=t.dataset.game===g;t.classList.toggle('active',active);t.setAttribute('aria-selected',String(active))});render()}
function render(){locked=false;selected=[];$('feedback').textContent='';$('nextQuestion').hidden=true;let data=games[game];$('gameBadge').textContent=gameNames[game];$('gameCounter').textContent='Question '+(index+1)+' of '+data.length;let item=data[index];if(game==='order'){$('gameContent').innerHTML='<h3>🧩 Put the words in the correct order!</h3><div class="sentence-slot" id="sentenceSlot" aria-live="polite">Tap the words below...</div><div class="word-options" id="wordOptions"></div><div class="button-row" style="margin-top:20px"><button id="clearOrder" class="btn btn-outline">↻ Try again</button><button id="checkOrder" class="btn btn-yellow">Check answer</button></div>';const options=$('wordOptions');item.words.forEach((word,i)=>{let b=document.createElement('button');b.className='word-chip';b.textContent=word;b.dataset.i=i;b.onclick=()=>{if(locked)return;selected.push(i);b.disabled=true;updateSentence()};options.append(b)});$('clearOrder').onclick=()=>{if(locked)return;selected=[];options.querySelectorAll('button').forEach(b=>b.disabled=false);updateSentence()};$('checkOrder').onclick=()=>{if(locked)return;let response=selected.map(i=>item.words[i]).join(' ');respond(response===item.answer,item.why);};return} $('gameContent').innerHTML='<h3>'+escapeHtml(item.q)+'</h3><div class="answers"></div>';let answers=$('gameContent').querySelector('.answers');item.a.forEach((choice,i)=>{let b=document.createElement('button');b.className='answer';b.textContent=choice;b.onclick=()=>{if(locked)return;b.classList.add(i===item.c?'correct':'wrong');respond(i===item.c,item.why);if(i===item.c)answers.querySelectorAll('button').forEach(x=>x.disabled=true);else b.disabled=true};answers.append(b)})}
function updateSentence(){$('sentenceSlot').textContent=selected.length?selected.map(i=>games.order[index].words[i]).join(' '):'Tap the words below...'}
function respond(correct,why){if(!correct){feedback.textContent='💫 Try again. '+why;return}locked=true;let earned=complete(game+'-'+index);$('feedback').textContent=(correct?'🎉 Correct! '+(earned?'+10 stars! ':'Already completed! '):'💫 Not quite. ')+why;if(earned)celebrate();if(game==='order'){document.querySelectorAll('#wordOptions button').forEach(b=>b.disabled=true);$('clearOrder').disabled=true;$('checkOrder').disabled=true}$('nextQuestion').textContent=index===games[game].length-1?'Play again ↻':'Next challenge →';$('nextQuestion').hidden=false}
$('nextQuestion').onclick=()=>{index=(index+1)%games[game].length;render();gameContent.querySelector('h3').setAttribute('tabindex','-1');gameContent.querySelector('h3').focus()};document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>setGame(b.dataset.game));$('resetProgress').onclick=()=>{if(confirm('Reset your stars and completed planets?')){progress={score:0,completed:{}};persist();setGame('quiz')}};
$('copyPrompt').onclick=async()=>{try{await navigator.clipboard.writeText($('promptText').textContent);$('copyPrompt').textContent='✅ Copied!'}catch{window.prompt('Copy this speaking prompt:',$('promptText').textContent)}};
let menuBtn=$('menuBtn');menuBtn.onclick=()=>{let open=$('menu').classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open))};document.querySelectorAll('#menu a').forEach(a=>a.onclick=()=>{$('menu').classList.remove('open');menuBtn.setAttribute('aria-expanded','false')});let dlg=$('imageDialog');document.querySelectorAll('.lightbox-trigger').forEach(btn=>btn.onclick=()=>{$('dialogImage').src=btn.dataset.image;$('dialogImage').alt=btn.dataset.alt;dlg.showModal()});$('closeDialog').onclick=()=>dlg.close();dlg.onclick=e=>{if(e.target===dlg)dlg.close()};updateProgress();render();


document.querySelectorAll('[data-destination]').forEach(link => {
  link.addEventListener('click', () => setGame(link.dataset.destination));
});

function celebrate() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const burst = document.createElement('div');
  burst.className = 'star-burst';
  burst.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 12; i++) {
    const star = document.createElement('span');
    const angle = Math.PI * i / 6;
    star.textContent = '✦';
    star.style.setProperty('--x', Math.cos(angle) * 105 + 'px');
    star.style.setProperty('--y', Math.sin(angle) * 80 + 'px');
    burst.append(star);
  }
  $('feedback').append(burst);
  setTimeout(() => burst.remove(), 750);
}

const labControls = ['lab-subject', 'lab-action', 'lab-form'].map($);
function updateSentenceLab() {
  const [subject, action, form] = labControls.map(control => control.value);
  const [base, singular, object] = action.split('|');
  const thirdPerson = ['He', 'She', 'It'].includes(subject);
  let sentence = subject + ' ' + (thirdPerson ? singular : base) + ' ' + object + '.';
  if (form === 'negative') {
    sentence = subject + (thirdPerson ? " doesn't " : " don't ") + base + ' ' + object + '.';
  }
  if (form === 'question') {
    sentence = (thirdPerson ? 'Does ' : 'Do ') + (subject === 'I' ? subject : subject.toLowerCase()) + ' ' + base + ' ' + object + '?';
  }
  $('lab-sentence').textContent = sentence;
}

labControls.forEach(control => control.addEventListener('change', updateSentenceLab));
updateSentenceLab();
if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
  $('lab-listen').hidden = false;
  $('lab-listen').addEventListener('click', () => {
    const line = new SpeechSynthesisUtterance($('lab-sentence').textContent);
    line.lang = 'en-US';
    line.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(line);
  });
}

