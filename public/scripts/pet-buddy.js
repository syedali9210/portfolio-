/* ============================================================================
   <pet-buddy-greeting> — self-contained web component.

   The pixel pet buddy walks into the scene, approaches the text, leans in too
   early, overbalances and plops down, gets back up, walks the rest of the way
   and leans in properly. Design + physics from the original "claude pet buddy".

   Usage:
     <script src="pet-buddy.js"></script>
     <pet-buddy-greeting text="Read me!"></pet-buddy-greeting>

     <!-- or with your own markup as the sign content -->
     <pet-buddy-greeting size="150" loop="5">
       <strong>Hello there 👋</strong>
     </pet-buddy-greeting>

   Attributes:
     text      — sign text (fallback when no slotted content). Default "Hi!"
     size      — pet width in px. Default 120.
     autoplay  — "false" to disable (then call el.play()). Default: plays when
                 the component scrolls into view.
     loop      — seconds to wait after finishing before replaying. Off if absent.

   API:      el.play(), el.reset(), el.playing
   Events:   "pet-phase"  detail:{phase}  (enter|lean|oops|sit|stand|approach|success|done)

   Theming (CSS custom properties on the host or any ancestor):
     --pet-buddy-body, --pet-buddy-hi, --pet-buddy-sh, --pet-buddy-sh2,
     --pet-buddy-sign-bg, --pet-buddy-sign-color, --pet-buddy-sign-border
   ============================================================================ */
(() => {
  'use strict';
  if (customElements.get('pet-buddy-greeting')) return;

  const TEMPLATE = /* html */`
  <style>
    :host{ display:block; width:100%; }
    *{ box-sizing:border-box; }
    .stage{
      --pet-body: var(--pet-buddy-body, #db744f);
      --pet-hi:   var(--pet-buddy-hi,   #ec9a78);
      --pet-sh:   var(--pet-buddy-sh,   #b95a3c);
      --pet-sh2:  var(--pet-buddy-sh2,  #8f4530);
      --pet-eye:  #141414;
      --pet-glint:#ffffff;
      position:relative; width:100%;
      height:calc(var(--pet-w) * 1.2);
      overflow:hidden;
    }
    .sign{
      position:absolute; right:6%;
      bottom:calc(var(--pet-w) * 0.52);
      background:var(--pet-buddy-sign-bg, #2a2a2e);
      color:var(--pet-buddy-sign-color, #ececec);
      border:1px solid var(--pet-buddy-sign-border, rgba(255,255,255,.16));
      border-radius:10px; padding:8px 12px;
      font-size:calc(var(--pet-w) * 0.11); font-weight:700; line-height:1.35;
      box-shadow:0 10px 24px rgba(0,0,0,.4);
      transform:rotate(-3deg); white-space:nowrap;
    }
    .pet-travel{ position:absolute; left:0; bottom:4px; will-change:transform; }
    svg.pet{
      width:var(--pet-w); height:auto; display:block;
      filter:drop-shadow(0 8px 14px rgba(0,0,0,.45));
    }

    /* ---- rig pivots (from the original) ---- */
    .pet-root{ transform-box:fill-box; transform-origin:50% 100%; }
    .raise{ transform-box:fill-box; transform-origin:50% 100%; opacity:0; }
    .shin,.shin-s{ transform-box:fill-box; }

    /* ---- view perspective: side profile while traveling, front for the gag.
       Hard sprite swap + a chunky squash snap = the "turning" beat. ---- */
    .view-front-g, .view-side-g{ display:none; }
    .stage.view-front .view-front-g{ display:block; }
    .stage.view-side  .view-side-g{ display:block; }
    svg.pet{ transform-origin:50% 100%; }
    @keyframes viewSnap{ 0%{ transform:scaleX(.68); } 100%{ transform:scaleX(1); } }
    .stage.snap svg.pet{ animation:viewSnap .18s steps(2); }
    .eyeball{ transform-box:fill-box; transform-origin:50% 50%; animation:blink 4.8s ease-in-out infinite; }
    @keyframes blink{0%,92%,100%{transform:scaleY(1)}96%{transform:scaleY(.06)}}

    /* sparkle emote */
    .spark{ opacity:0; transform-box:fill-box; transform-origin:50% 100%; }
    @keyframes sparkPop{
      0%  { opacity:0; transform: translateY(5px)  scale(.3); }
      40% { opacity:1; transform: translateY(-3px) scale(1);  }
      100%{ opacity:0; transform: translateY(-12px) scale(.7); }
    }
    .stage.emote .spark{ animation: sparkPop .6s steps(4); }

    /* ---- the gag phases: lean / oops / sit / stand / success ----
       All lean rotations tilt CLOCKWISE (toward the text on the right).
       forwards fill holds each pose until the next phase takes over. */
    /* The body only shifts and tilts a little — the reaching arms and
       stretching legs (JS springs) do the actual "leaning". */
    @keyframes slipLean{
      0%  {transform:translateY(0)    translateX(0)    rotate(0deg)}
      100%{transform:translateY(-8px) translateX(9px)  rotate(3.5deg)}
    }
    .stage.slip-lean .pet-root{animation:slipLean 400ms steps(5) forwards}

    @keyframes slipOops{
      0%  {transform:translateY(-8px) translateX(9px)  rotate(3.5deg)}
      100%{transform:translateY(-3px) translateX(16px) rotate(8deg)}
    }
    .stage.slip-oops .pet-root{animation:slipOops 180ms steps(2) forwards}

    @keyframes slipSit{
      0%  {transform:translateY(-3px) translateX(16px) rotate(8deg) scaleY(1)}
      55% {transform:translateY(16px) translateX(4px)  rotate(3deg) scaleY(.83)}
      100%{transform:translateY(26px) translateX(0)    rotate(0deg) scaleY(.7)}
    }
    .stage.slip-sit .pet-root{animation:slipSit 320ms steps(5) forwards}

    @keyframes slipStand{
      0%  {transform:translateY(26px) rotate(0deg)  translateX(0)   scaleY(.7)}
      55% {transform:translateY(-6px) rotate(-4deg) translateX(-1px) scaleY(1.06)}
      100%{transform:translateY(0)    rotate(0deg)  translateX(0)   scaleY(1)}
    }
    .stage.slip-stand .pet-root{animation:slipStand 480ms cubic-bezier(.34,1.56,.64,1) forwards}

    @keyframes slipSuccess{
      0%  {transform:translateY(0)    translateX(0)    rotate(0deg)}
      100%{transform:translateY(-9px) translateX(11px) rotate(4deg)}
    }
    .stage.slip-success .pet-root{animation:slipSuccess 400ms steps(5) forwards}

    @media (prefers-reduced-motion: reduce){
      .stage *{ animation:none !important; }
    }
  </style>

  <div class="stage">
    <div class="sign"><slot><span class="fallback-text">Hi!</span></slot></div>
    <div class="pet-travel">
      <svg class="pet" viewBox="-8 -46 278.5 204" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" aria-label="Pixel pet buddy">
        <defs>
          <filter class="f-outline" x="-25%" y="-25%" width="150%" height="150%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="3.4" result="d"/>
            <feFlood flood-color="#8f4530"/>
            <feComposite in2="d" operator="in" result="o"/>
            <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <!-- flat silhouettes for the 3D slab extrude (ids are instance-scoped) -->
          <g class="sil-front">
            <rect x="56.25" y="0" width="150" height="112.5"/>
            <rect x="0" y="37.5" width="56.25" height="37.5"/>
            <rect x="206.25" y="37.5" width="56.25" height="37.5"/>
            <rect x="56.25" y="112.5" width="18.75" height="37.5"/>
            <rect x="93.75" y="112.5" width="18.75" height="37.5"/>
            <rect x="150"   y="112.5" width="18.75" height="37.5"/>
            <rect x="187.5" y="112.5" width="18.75" height="37.5"/>
          </g>
          <g class="sil-side">
            <rect x="83" y="0" width="96" height="112.5"/>
            <rect x="179" y="37.5" width="40" height="37.5"/>
            <rect x="95.25" y="112.5" width="18.75" height="37.5"/>
            <rect x="147"   y="112.5" width="18.75" height="37.5"/>
          </g>
        </defs>
        <g class="pet-root">

          <!-- ============ SIDE VIEW (profile, facing right — travel view) ============ -->
          <g class="view-side-g">
            <!-- 3D slab: dark offset silhouettes along the trailing iso axis -->
            <g fill="var(--pet-sh2)">
              <use class="use-sil-s" transform="translate(-18,10)" opacity=".5"/>
              <use class="use-sil-s" transform="translate(-9,5)" opacity=".85"/>
            </g>
            <g fill="var(--pet-body)">
              <rect x="83" y="0" width="96" height="112.5"/>
              <rect x="83"      y="0"       width="96"    height="9.375" fill="var(--pet-hi)"/>
              <rect x="83"      y="9.375"   width="9.375" height="93.75" fill="var(--pet-hi)"/>
              <rect x="169.625" y="0"       width="9.375" height="103.125" fill="var(--pet-sh)"/>
              <rect x="83"      y="103.125" width="96"    height="9.375" fill="var(--pet-sh)"/>
              <rect x="112"     y="84"      width="7.5" height="7.5" fill="var(--pet-sh)" opacity=".45"/>
              <rect x="140"     y="72"      width="7.5" height="7.5" fill="var(--pet-sh)" opacity=".35"/>

              <!-- near arm, reaching along the travel direction -->
              <rect x="179" y="37.5" width="40" height="37.5"/>
              <rect x="179" y="37.5" width="40" height="6" fill="var(--pet-hi)"/>

              <!-- two profile legs (front + back pair collapse into one column each) -->
              <g fill="var(--pet-sh)">
                <g>
                  <rect x="95.25" y="112.5" width="18.75" height="18.75"/>
                  <rect class="shin-s" x="95.25" y="125.25" width="18.75" height="24.75" fill="var(--pet-sh2)"/>
                  <rect x="98.625" y="120.75" width="12" height="9"/>
                </g>
                <g>
                  <rect x="147" y="112.5" width="18.75" height="18.75"/>
                  <rect class="shin-s" x="147" y="125.25" width="18.75" height="24.75" fill="var(--pet-sh2)"/>
                  <rect x="150.375" y="120.75" width="12" height="9"/>
                </g>
              </g>
            </g>
            <!-- single profile eye near the leading edge -->
            <g class="eyeball" fill="var(--pet-eye)">
              <rect x="149" y="18.75" width="18.75" height="18.75"/>
              <rect x="152" y="21.75" width="5.5" height="5.5" fill="var(--pet-glint)"/>
            </g>
          </g>

          <!-- ============ FRONT VIEW (the classic buddy — gag view) ============ -->
          <g class="view-front-g">
          <!-- 3D slab: dark offset silhouettes along the trailing iso axis -->
          <g fill="var(--pet-sh2)">
            <use class="use-sil-f" transform="translate(-18,10)" opacity=".5"/>
            <use class="use-sil-f" transform="translate(-9,5)" opacity=".85"/>
          </g>
          <g fill="var(--pet-body)">
            <rect x="56.25" y="0" width="150" height="112.5"/>
            <g>
              <rect x="56.25"  y="0"       width="150"    height="9.375" fill="var(--pet-hi)"/>
              <rect x="56.25"  y="9.375"   width="9.375"  height="93.75" fill="var(--pet-hi)"/>
              <rect x="196.875" y="0"      width="9.375"  height="103.125" fill="var(--pet-sh)"/>
              <rect x="56.25"  y="103.125" width="150"    height="9.375" fill="var(--pet-sh)"/>
              <rect x="93.75"  y="84.375"  width="7.5" height="7.5" fill="var(--pet-sh)" opacity=".45"/>
              <rect x="140.625" y="90"     width="7.5" height="7.5" fill="var(--pet-sh)" opacity=".45"/>
              <rect x="121.875" y="72"     width="7.5" height="7.5" fill="var(--pet-sh)" opacity=".35"/>
            </g>

            <rect class="turnL" x="56.25"  y="0" width="9" height="112.5" fill="var(--pet-sh2)" opacity="0"/>
            <rect class="turnR" x="197.25" y="0" width="9" height="112.5" fill="var(--pet-sh2)" opacity="0"/>

            <g class="armL">
              <rect x="28.125" y="37.5" width="28.125" height="37.5"/>
              <rect class="forearm" x="0" y="37.5" width="28.125" height="37.5"/>
              <rect x="28.125" y="37.5" width="28.125" height="6" fill="var(--pet-hi)"/>
            </g>
            <g class="armR">
              <rect x="206.25"  y="37.5" width="28.125" height="37.5"/>
              <rect class="forearm" x="234.375" y="37.5" width="28.125" height="37.5"/>
              <rect x="206.25"  y="37.5" width="28.125" height="6" fill="var(--pet-hi)"/>
            </g>

            <rect class="turnArmL" x="0"     y="37.5" width="9" height="37.5" fill="var(--pet-sh2)" opacity="0"/>
            <rect class="turnArmR" x="253.5" y="37.5" width="9" height="37.5" fill="var(--pet-sh2)" opacity="0"/>

            <rect class="raise raiseL" x="28.125" y="-28" width="28.125" height="65.5"/>
            <rect class="raise raiseR" x="206.25" y="-28" width="28.125" height="65.5"/>

            <g fill="var(--pet-sh)">
              <g class="leg">
                <rect x="56.25" y="112.5" width="18.75" height="18.75"/>
                <rect class="shin" x="56.25" y="125.25" width="18.75" height="24.75" fill="var(--pet-sh2)"/>
                <rect x="59.625" y="120.75" width="12" height="9"/>
              </g>
              <g class="leg">
                <rect x="93.75" y="112.5" width="18.75" height="18.75"/>
                <rect class="shin" x="93.75" y="125.25" width="18.75" height="24.75" fill="var(--pet-sh2)"/>
                <rect x="97.125" y="120.75" width="12" height="9"/>
              </g>
              <g class="leg">
                <rect x="150" y="112.5" width="18.75" height="18.75"/>
                <rect class="shin" x="150" y="125.25" width="18.75" height="24.75" fill="var(--pet-sh2)"/>
                <rect x="153.375" y="120.75" width="12" height="9"/>
              </g>
              <g class="leg">
                <rect x="187.5" y="112.5" width="18.75" height="18.75"/>
                <rect class="shin" x="187.5" y="125.25" width="18.75" height="24.75" fill="var(--pet-sh2)"/>
                <rect x="190.875" y="120.75" width="12" height="9"/>
              </g>
            </g>
          </g>

          <g class="eyes">
            <g class="eyeball" fill="var(--pet-eye)">
              <rect x="75" y="18.75" width="18.75" height="18.75"/>
              <rect x="168.75" y="18.75" width="18.75" height="18.75"/>
              <rect x="78" y="21.75" width="5.5" height="5.5" fill="var(--pet-glint)"/>
              <rect x="171.75" y="21.75" width="5.5" height="5.5" fill="var(--pet-glint)"/>
            </g>
          </g>
          </g><!-- /view-front-g -->

          <g class="spark" fill="#ffffff">
            <rect x="112" y="-14" width="6" height="6"/>
            <rect x="146" y="-14" width="6" height="6"/>
            <rect x="130" y="-20" width="6" height="6"/>
          </g>
        </g>
      </svg>
    </div>
  </div>`;

  /* tiny spring integrator — the physics core from the original */
  class Spring{
    constructor(x=0,k=190,c=20){ this.x=x; this.v=0; this.t=x; this.k=k; this.c=c; }
    step(dt){
      const n = Math.max(1, Math.ceil(dt/0.008)), h = dt/n;
      for(let i=0;i<n;i++){
        const a = -this.k*(this.x-this.t) - this.c*this.v;
        this.v += a*h; this.x += this.v*h;
      }
    }
    jump(x){ this.x = this.t = x; this.v = 0; }
  }

  const PHASES = ['slip-lean','slip-oops','slip-sit','slip-stand','slip-success'];
  const TAU = Math.PI*2, FOLD_MAX = 14;
  const TICK = 1/12, ANGQ = 2, PIX = 3;
  const q = (v,s) => Math.round(v/s)*s;
  const clamp = (v,a,b) => Math.max(a, Math.min(b, v));

  class PetBuddyGreeting extends HTMLElement{
    static get observedAttributes(){ return ['text','size']; }

    constructor(){
      super();
      this.attachShadow({mode:'open'});
      this.shadowRoot.innerHTML = TEMPLATE;

      const $ = sel => this.shadowRoot.querySelector(sel);
      this._stage  = $('.stage');
      this._sign   = $('.sign');
      this._travel = $('.pet-travel');
      this._root   = $('.pet-root');
      this._eyes   = $('.eyes');
      this._svg    = $('svg.pet');
      this._fallback = $('.fallback-text');
      this._shins  = [...this.shadowRoot.querySelectorAll('.shin')];
      this._sideShins = [...this.shadowRoot.querySelectorAll('.shin-s')];
      this._forearms = [$('.armL .forearm'), $('.armR .forearm')];
      this._raises   = [$('.raiseL'), $('.raiseR')];
      this._turns  = { L:$('.turnL'), R:$('.turnR'), aL:$('.turnArmL'), aR:$('.turnArmR') };

      // shadow-scope the outline filter + silhouette defs (unique per instance)
      const uid = Math.random().toString(36).slice(2,8);
      const filt = $('.f-outline');
      filt.setAttribute('id', 'outline-' + uid);
      this._root.setAttribute('filter', `url(#outline-${uid})`);
      $('.sil-front').setAttribute('id', 'silf-' + uid);
      $('.sil-side').setAttribute('id', 'sils-' + uid);
      this.shadowRoot.querySelectorAll('.use-sil-f').forEach(u => u.setAttribute('href', '#silf-' + uid));
      this.shadowRoot.querySelectorAll('.use-sil-s').forEach(u => u.setAttribute('href', '#sils-' + uid));

      // springs
      this._travelX = new Spring(0, 55, 14);
      this._knees   = [0,0,0,0].map(() => new Spring(0, 190, 20));
      this._raise   = [new Spring(0,210,15), new Spring(0,210,15)];
      this._reach   = [new Spring(0,170,16), new Spring(0,170,16)];   // forearm extension [L,R]
      this._pose = 'none';   // none | lean | oops | sit | success — drives limb articulation

      this._walking = false;
      this._flailUntil = 0; this._splayUntil = 0;
      this._gaitT = 0; this._acc = 0; this._last = 0;
      this._timers = []; this._playing = false;
      this._raf = null;
      this._reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /* ------------- lifecycle ------------- */
    connectedCallback(){
      this._applyAttrs();
      // start hidden off-screen until measured
      requestAnimationFrame(() => {
        this._measure();
        this._setView('side');
        this._travelX.jump(this._startX);
        this._render(performance.now());
        this._loop();
        if(this.getAttribute('autoplay') !== 'false') this._armAutoplay();
      });
    }
    disconnectedCallback(){
      cancelAnimationFrame(this._raf);
      this._clearTimers();
      if(this._io) this._io.disconnect();
    }
    attributeChangedCallback(){ if(this.isConnected) this._applyAttrs(); }

    _applyAttrs(){
      const size = parseFloat(this.getAttribute('size')) || 120;
      this._petW = size;
      this._stage.style.setProperty('--pet-w', size + 'px');
      this._fallback.textContent = this.getAttribute('text') || 'Hi!';
    }

    _measure(){
      this._signLeft = this._sign.offsetLeft;
      this._startX = -1.3 * this._petW;
      this._stop1  = Math.max(this._petW*0.1, this._signLeft - this._petW*1.4);  // lean-from-a-distance spot
      this._stop2  = this._signLeft - this._petW*1.02;                            // right next to the text
    }

    _armAutoplay(){
      if(!('IntersectionObserver' in window)){ this.play(); return; }
      this._io = new IntersectionObserver(entries => {
        if(entries.some(e => e.isIntersecting)){ this._io.disconnect(); this.play(); }
      }, {threshold: 0.4});
      this._io.observe(this);
    }

    /* ------------- public API ------------- */
    get playing(){ return this._playing; }

    play(){
      if(this._playing) return;
      this._measure();
      if(this._reduce){
        // static end pose: standing by the text, facing front
        this._setView('front');
        this._travelX.jump(this._stop2);
        this._render(performance.now());
        this._emit('done');
        return;
      }
      this._playing = true;
      this._clearPhases();

      let t = 0;
      const at = (ms, fn) => { this._timers.push(setTimeout(fn, ms)); };
      const now = () => performance.now();

      /* 1 — enter: walk in from off-screen, seen from the side (profile) */
      this._emit('enter');
      this._setView('side');
      this._walking = true;
      this._travelX.t = this._stop1;
      t += 1200;

      /* 2 — arrive: rotate to face the front... */
      at(t, () => { this._walking = false; this._setView('front'); });
      t += 220;

      /* ...then lean in from a distance: arms reach, legs stretch */
      at(t, () => { this._emit('lean'); this._pose = 'lean'; this._stage.classList.add('slip-lean'); });
      t += 400;

      /* 3 — overbalance */
      at(t, () => {
        this._emit('oops');
        this._pose = 'oops';
        this._swapPhase('slip-lean','slip-oops');
        this._flailUntil = now() + (180+320+480);
        this._splayUntil = now() + (180+320+480);
      });
      t += 180;

      /* 4 — plop down + dazed beat */
      at(t, () => { this._emit('sit'); this._pose = 'sit'; this._swapPhase('slip-oops','slip-sit'); });
      t += 320 + 480;

      /* 5 — stand back up */
      at(t, () => { this._emit('stand'); this._pose = 'none'; this._swapPhase('slip-sit','slip-stand'); });
      t += 480;

      /* 6 — turn to profile and walk the rest of the way */
      at(t, () => {
        this._emit('approach');
        this._stage.classList.remove('slip-stand');
        this._setView('side');
        this._walking = true;
        this._travelX.t = this._stop2;
      });
      t += 700;

      /* 7 — rotate back to front and lean in properly this time */
      at(t, () => { this._walking = false; this._setView('front'); });
      t += 220;

      at(t, () => {
        this._emit('success');
        this._pose = 'success';
        this._stage.classList.add('slip-success');
        this._stage.classList.remove('emote'); void this._root.getBBox;
        this._stage.classList.add('emote');
        this._timers.push(setTimeout(() => this._stage.classList.remove('emote'), 620));
      });
      t += 400 + 900;

      /* done — hold the lean as the resting pose */
      at(t, () => {
        this._playing = false;
        this._emit('done');
        const loop = this.getAttribute('loop');
        if(loop !== null){
          const delay = (parseFloat(loop) || 4) * 1000;
          this._timers.push(setTimeout(() => { this.reset(); this.play(); }, delay));
        }
      });
    }

    reset(){
      this._clearTimers();
      this._clearPhases();
      this._playing = false;
      this._walking = false;
      this._pose = 'none';
      this._flailUntil = this._splayUntil = 0;
      this._gaitT = 0;
      this._measure();
      this._setView('side');
      this._travelX.jump(this._startX);
      this._knees.forEach(s => s.jump(0));
      this._raise.forEach(s => s.jump(0));
      this._reach.forEach(s => s.jump(0));
      this._root.style.transform = '';
      this._render(performance.now());
    }

    /* ------------- internals ------------- */
    _emit(phase){ this.dispatchEvent(new CustomEvent('pet-phase', {detail:{phase}, bubbles:true})); }

    /* perspective swap: side profile <-> front, with a chunky squash snap */
    _setView(v){
      if(this._view === v) return;
      this._view = v;
      this._stage.classList.toggle('view-front', v === 'front');
      this._stage.classList.toggle('view-side',  v === 'side');
      this._stage.classList.remove('snap'); void this._stage.offsetWidth;
      this._stage.classList.add('snap');
      this._timers.push(setTimeout(() => this._stage.classList.remove('snap'), 220));
    }
    _swapPhase(a,b){ this._stage.classList.remove(a); this._stage.classList.add(b); }
    _clearPhases(){ PHASES.forEach(c => this._stage.classList.remove(c)); this._stage.classList.remove('emote'); }
    _clearTimers(){ this._timers.forEach(clearTimeout); this._timers = []; }

    _loop(){
      const step = (nowT) => {
        let dt = (nowT - (this._last || nowT))/1000; this._last = nowT;
        dt = clamp(dt || 0.016, 0.001, 0.05);

        const flailNow = performance.now() < this._flailUntil;
        const splayNow = performance.now() < this._splayUntil;

        if(this._walking) this._gaitT += dt;
        this._travelX.step(dt);
        this._raise.forEach(s => { s.t = flailNow ? 1 : 0; s.step(dt); });

        /* legs: gait while walking; splay while sitting; otherwise articulate
           by pose — leaning right means the trailing (left) legs stretch out
           behind while the leading (right) legs tuck under the shifted body */
        const dir = this._walking ? Math.sin(TAU * this._gaitT * 0.75) : 0;
        const LEG_POSE = { lean:[-16,6], oops:[-22,10], success:[-14,6] };
        this._knees.forEach((s,i) => {
          const side = i < 2 ? -1 : 1;
          if(splayNow)            s.t = FOLD_MAX*1.6*side;
          else if(this._walking)  s.t = FOLD_MAX*dir*side;
          else if(LEG_POSE[this._pose]) s.t = LEG_POSE[this._pose][side < 0 ? 0 : 1];
          else                    s.t = 0;
          s.step(dt);
        });

        /* arms: forearms extend toward the text on a lean (the "reach") */
        const ARM_POSE = { lean:[-10,16], oops:[-14,20], success:[-8,20] };
        const reach = ARM_POSE[this._pose] || [0,0];
        this._reach[0].t = reach[0]; this._reach[1].t = reach[1];
        this._reach.forEach(s => s.step(dt));

        this._acc += dt;
        if(this._acc >= TICK || this._reduce){ this._acc = 0; this._render(nowT); }
        this._raf = requestAnimationFrame(step);
      };
      this._raf = requestAnimationFrame(step);
    }

    _render(nowT){
      const scale = this._petW / 278.5;   // svg px -> css px

      /* travel + in-place sway */
      const sway = this._walking ? q(7*Math.sin(TAU*this._gaitT*0.75), PIX) : 0;
      this._travel.style.transform = `translateX(${q(this._travelX.x, PIX) + sway*scale}px)`;

      /* body: crab scuttle while walking; CSS owns the slip phases otherwise */
      if(this._walking){
        const s = this._gaitT*1.5;
        const bob  = q(-3*Math.abs(Math.sin(TAU*s)), PIX);
        const roll = q( 3*Math.sin(TAU*s*0.5), ANGQ);
        this._root.style.transform = `translateY(${bob}px) rotate(${roll}deg)`;
        const onL = sway > 0 ? 1 : 0, onR = sway < 0 ? 1 : 0;
        this._turns.L.style.opacity = onL; this._turns.aL.style.opacity = onL;
        this._turns.R.style.opacity = onR; this._turns.aR.style.opacity = onR;
      } else {
        this._turns.L.style.opacity = 0; this._turns.aL.style.opacity = 0;
        this._turns.R.style.opacity = 0; this._turns.aR.style.opacity = 0;
        this._root.style.transform = '';   // release to the slip-* CSS animations
      }

      /* eyes: glance toward the text while moving/leaning, dazed when sitting */
      const sitting = performance.now() < this._splayUntil;
      this._eyes.style.transform = sitting ? 'translate(0px,3.5px)' : 'translate(7px,3.5px)';

      /* arms: hard pose-swap raise (flail) + forearm reach extension */
      this._raise.forEach((s,i) => {
        const up = s.x > 0.5;
        this._forearms[i].style.opacity = up ? 0 : 1;
        this._raises[i].style.opacity   = up ? 1 : 0;
        this._raises[i].style.transform = `translateY(${q((1-s.x)*16, PIX)}px)`;
      });
      this._forearms[0].style.transform = `translateX(${q(this._reach[0].x, PIX)}px)`;
      this._forearms[1].style.transform = `translateX(${q(this._reach[1].x, PIX)}px)`;

      /* legs: dogleg knee slides (front view: 4 crab legs; side view: the two
         profile legs stride with opposite phases via knees 0 and 2).
         While leaning, the stretched trailing shins also extend DOWN — the
         body rises off them, so the longer leg keeps its foot near the
         ground and the whole pose reads as a real tip-toe stretch. */
      const leanPose = this._pose === 'lean' || this._pose === 'oops' || this._pose === 'success';
      this._knees.forEach((s,i) => {
        const yExt = leanPose ? q(Math.max(0, -s.x * (i < 2 ? 0.55 : 0.3)), PIX) : 0;
        this._shins[i].style.transform = `translate(${q(s.x, PIX)}px, ${yExt}px)`;
      });
      if(this._sideShins.length === 2){
        this._sideShins[0].style.transform = `translateX(${q(this._knees[0].x, PIX)}px)`;
        this._sideShins[1].style.transform = `translateX(${q(this._knees[2].x, PIX)}px)`;
      }
    }
  }

  customElements.define('pet-buddy-greeting', PetBuddyGreeting);
})();
