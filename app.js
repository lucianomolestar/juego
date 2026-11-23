
/* ENTRE TODOS · Juego 2D educativo
   Sin bibliotecas ni servidor.
   La partida se guarda en este dispositivo.
*/
'use strict';

const $ = id => document.getElementById(id);

const COLORS = [
  '#d47b62', '#4b8eaa', '#8a72ba', '#d1a044'
];

const FACES = ['⚀','⚁','⚂','⚃','⚄','⚅'];

const TYPES = {
  start: {icon:'⌂',name:'Inicio'},
  choice: {icon:'⚖',name:'Decisión'},
  quiz: {icon:'?',name:'Pista'},
  action: {icon:'✦',name:'Misión'},
  chance: {icon:'✧',name:'Sorpresa'},
  team: {icon:'♧',name:'Equipo'},
  finish: {icon:'★',name:'Meta'}
};

const TILE_TYPES = [
  'start','quiz','choice','action','chance','choice',
  'team','quiz','choice','chance','action','quiz',
  'team','choice','chance','action','quiz','choice',
  'team','chance','quiz','choice','action','team',
  'chance','quiz','choice','action','team','finish'
];

const EVENTS = {
  choice: [
    {
      icon:'🌉',
      title:'Un puente para pocos',
      text:'En la ciudad hay un puente que solo pueden usar quienes tienen muchas estrellas. Otras personas deben dar un gran rodeo. ¿Qué propones?',
      choices:[
        {
          text:'Abrir el puente para que todos puedan usarlo.',
          effect:12,
          stars:1,
          why:'Abrir el acceso facilita que más personas participen. Cuando las reglas cambian, también cambian las oportunidades.'
        },
        {
          text:'Mantenerlo exclusivo para ganar ventaja.',
          effect:-5,
          stars:2,
          why:'Tienes una ventaja personal, pero la ciudad sigue dividida. ¿Qué consecuencias puede tener esa diferencia?'
        },
        {
          text:'Crear otra ruta, pero pedir colaboración.',
          effect:9,
          stars:1,
          why:'Organizar una solución compartida exige esfuerzo, pero puede abrir nuevas oportunidades.'
        }
      ]
    },
    {
      icon:'🏫',
      title:'Una escuela, dos barrios',
      text:'Hay recursos para mejorar una escuela, pero dos barrios los necesitan. Uno de ellos ya tiene más servicios. ¿Cómo tomarías la decisión?',
      choices:[
        {
          text:'Escuchar a ambos barrios y priorizar necesidades.',
          effect:13,
          stars:1,
          why:'Escuchar y conocer las necesidades permite justificar mejor cómo distribuir los recursos.'
        },
        {
          text:'Elegir siempre al barrio con más recursos.',
          effect:-8,
          stars:2,
          why:'Favorecer siempre al mismo grupo puede aumentar la distancia entre barrios.'
        },
        {
          text:'Repartir todo por igual sin investigar.',
          effect:4,
          stars:1,
          why:'Repartir exactamente lo mismo puede parecer justo, pero las necesidades no siempre son iguales.'
        }
      ]
    },
    {
      icon:'🗣️',
      title:'La reunión de la plaza',
      text:'El comité de la plaza toma decisiones sin consultar a quienes la utilizan. Un grupo quiere participar.',
      choices:[
        {
          text:'Invitar a todas las personas a opinar.',
          effect:12,
          stars:1,
          why:'La participación permite incorporar experiencias que antes no eran escuchadas.'
        },
        {
          text:'Dejar que el comité decida siempre.',
          effect:-6,
          stars:2,
          why:'Decidir más rápido no asegura que todas las necesidades se tengan en cuenta.'
        },
        {
          text:'Hacer una encuesta y publicar las propuestas.',
          effect:10,
          stars:1,
          why:'Recoger y compartir opiniones puede mejorar la transparencia de las decisiones.'
        }
      ]
    },
    {
      icon:'🧩',
      title:'Una regla inesperada',
      text:'Una nueva regla permite jugar dos veces seguidas solo a quienes sacaron un 6 antes. ¿Te parece que debería mantenerse?',
      choices:[
        {
          text:'Cambiarla después de escuchar a todos.',
          effect:13,
          stars:1,
          why:'Revisar reglas injustificadamente desiguales puede ayudar a crear acuerdos más equitativos.'
        },
        {
          text:'Mantenerla si me beneficia.',
          effect:-7,
          stars:2,
          why:'Una ventaja puede ser divertida, pero puede dejar sin oportunidades a otras personas.'
        },
        {
          text:'Proponer una ventaja rotativa para todos.',
          effect:10,
          stars:1,
          why:'Compartir oportunidades puede hacer que más personas participen.'
        }
      ]
    },
    {
      icon:'📚',
      title:'La biblioteca cerrada',
      text:'La biblioteca de la ciudad abre solo cuando algunos estudiantes pueden asistir. Muchos nunca llegan a usarla.',
      choices:[
        {
          text:'Organizar horarios accesibles para más estudiantes.',
          effect:12,
          stars:1,
          why:'Adaptar los horarios facilita el acceso a un servicio común.'
        },
        {
          text:'No cambiar nada porque ya existe una biblioteca.',
          effect:-6,
          stars:2,
          why:'Tener un servicio no significa que todas las personas puedan acceder realmente a él.'
        },
        {
          text:'Investigar primero quiénes quedan fuera.',
          effect:9,
          stars:1,
          why:'Conocer a quién afecta el problema es una buena base para decidir.'
        }
      ]
    },
    {
      icon:'🛝',
      title:'El parque compartido',
      text:'La ciudad quiere mejorar un parque. Algunos proponen solo juegos grandes; otros recuerdan que también lo visitan niños pequeños y personas con movilidad reducida.',
      choices:[
        {
          text:'Diseñar espacios para diferentes necesidades.',
          effect:13,
          stars:1,
          why:'Un espacio inclusivo puede ser usado por más personas.'
        },
        {
          text:'Construir únicamente lo que quiere la mayoría.',
          effect:0,
          stars:2,
          why:'Escuchar a la mayoría importa, pero también es importante considerar necesidades que pueden quedar fuera.'
        },
        {
          text:'Preguntar a los diferentes usuarios del parque.',
          effect:10,
          stars:1,
          why:'La participación ayuda a identificar barreras antes de construir.'
        }
      ]
    }
  ],

  quiz: [
    {
      icon:'💡',
      title:'¿Igualdad o equidad?',
      text:'Dos estudiantes quieren leer, pero uno no tiene acceso a libros. ¿Qué opción busca reducir esa diferencia?',
      choices:[
        {
          text:'Prestar libros a quien no tiene acceso.',
          effect:11,
          stars:2,
          why:'¡Buena observación! Ofrecer apoyo según las necesidades puede reducir barreras.'
        },
        {
          text:'Dar un libro extra a quien ya tiene muchos.',
          effect:0,
          stars:0,
          why:'Esa opción aumenta una diferencia existente. Intenta pensar en quién necesita más apoyo.'
        },
        {
          text:'Evitar que ambos lean.',
          effect:-3,
          stars:0,
          why:'Cerrar oportunidades no resuelve la desigualdad.'
        }
      ]
    },
    {
      icon:'🔎',
      title:'Busca la causa',
      text:'En una zona hay menos conexiones a internet. ¿Cuál puede ser una causa que valga la pena investigar?',
      choices:[
        {
          text:'La infraestructura disponible y sus costos.',
          effect:11,
          stars:2,
          why:'¡Exacto! Para comprender una desigualdad conviene estudiar las condiciones y no culpar a las personas.'
        },
        {
          text:'Que sus habitantes no merecen conectarse.',
          effect:-4,
          stars:0,
          why:'Todas las personas merecen respeto. Las oportunidades dependen de muchos factores, no de su valor personal.'
        },
        {
          text:'Que nadie necesita internet para aprender.',
          effect:0,
          stars:0,
          why:'Internet puede ser un recurso importante. La pregunta es qué barreras existen para acceder a él.'
        }
      ]
    },
    {
      icon:'🗳️',
      title:'¿Quién participa?',
      text:'Se elegirá el nuevo uso de una cancha escolar. ¿Qué procedimiento incorpora mejor distintas perspectivas?',
      choices:[
        {
          text:'Escuchar a los diferentes grupos que la usan.',
          effect:11,
          stars:2,
          why:'¡Bien! La participación permite identificar intereses y necesidades.'
        },
        {
          text:'Consultar únicamente a quien juega mejor.',
          effect:0,
          stars:0,
          why:'El talento deportivo no representa necesariamente todas las necesidades.'
        },
        {
          text:'Decidir sin consultar porque es más rápido.',
          effect:-3,
          stars:0,
          why:'La rapidez no reemplaza la participación en una decisión compartida.'
        }
      ]
    },
    {
      icon:'⚖️',
      title:'Reglas para todos',
      text:'¿Qué deberíamos preguntarnos cuando una regla beneficia siempre al mismo grupo?',
      choices:[
        {
          text:'A quién afecta y por qué existe.',
          effect:11,
          stars:2,
          why:'¡Correcto! Analizar las consecuencias y el origen de una regla ayuda a evaluarla.'
        },
        {
          text:'Si me beneficia personalmente, nada más.',
          effect:-3,
          stars:0,
          why:'Mirar solamente la propia ventaja deja sin analizar el efecto sobre los demás.'
        },
        {
          text:'Cómo esconder la regla.',
          effect:-2,
          stars:0,
          why:'Para mejorar la convivencia, las reglas deben poder conocerse y discutirse.'
        }
      ]
    },
    {
      icon:'🧭',
      title:'Dos historias',
      text:'Dos personas explican de forma distinta un mismo problema de su barrio. ¿Qué sería útil hacer?',
      choices:[
        {
          text:'Escuchar a ambas y contrastar información.',
          effect:11,
          stars:2,
          why:'¡Exacto! Comparar fuentes y perspectivas ayuda a comprender mejor una situación.'
        },
        {
          text:'Aceptar la primera explicación sin preguntar.',
          effect:0,
          stars:0,
          why:'Una sola perspectiva puede dejar información importante fuera.'
        },
        {
          text:'Ignorar a ambas personas.',
          effect:-2,
          stars:0,
          why:'Investigar permite acercarse a las causas del problema.'
        }
      ]
    }
  ],

  action: [
    {
      icon:'🧠',
      title:'Reto: tres ideas',
      text:'Piensa en tres cosas que hacen agradable una comunidad. ¿Cuál de estas opciones muestra una buena combinación?',
      choices:[
        {
          text:'Espacios compartidos, respeto y diálogo.',
          effect:10,
          stars:2,
          why:'Las comunidades pueden mejorar cuando combinan espacios, convivencia y participación.'
        },
        {
          text:'Solo edificios altos y muchos anuncios.',
          effect:1,
          stars:1,
          why:'Los edificios por sí solos no garantizan una comunidad inclusiva.'
        }
      ]
    },
    {
      icon:'🤝',
      title:'Reto de colaboración',
      text:'Tu ficha puede recibir una estrella, o puedes sumar progreso para que todos desbloqueen una mejora.',
      choices:[
        {
          text:'Sumar progreso a la comunidad.',
          effect:16,
          stars:0,
          why:'Tu decisión acerca a todos a desbloquear una mejora.'
        },
        {
          text:'Conseguir una estrella individual.',
          effect:1,
          stars:2,
          why:'Ganas puntos personales. A veces las decisiones enfrentan intereses diferentes.'
        }
      ]
    },
    {
      icon:'🧱',
      title:'Reconstruye el camino',
      text:'Una lluvia dejó un camino difícil de usar. Tienen recursos limitados para repararlo.',
      choices:[
        {
          text:'Reparar primero el tramo más necesario.',
          effect:12,
          stars:1,
          why:'Priorizar necesidades ayuda a utilizar mejor los recursos disponibles.'
        },
        {
          text:'Decorar una zona que ya funciona.',
          effect:2,
          stars:2,
          why:'La decoración puede aportar, pero todavía queda una barrera importante.'
        }
      ]
    },
    {
      icon:'🎯',
      title:'Misión relámpago',
      text:'Imagina que dos personas quieren usar el mismo espacio. ¿Cuál sería un buen primer paso?',
      choices:[
        {
          text:'Escuchar sus necesidades y buscar un acuerdo.',
          effect:11,
          stars:2,
          why:'Dialogar puede ayudar a resolver intereses diferentes.'
        },
        {
          text:'Decidir por la persona que habla más fuerte.',
          effect:-2,
          stars:0,
          why:'Hablar más fuerte no hace más justa una propuesta.'
        }
      ]
    }
  ],

  team: [
    {
      icon:'🫶',
      title:'Todos suman',
      text:'Un grupo ha reunido ideas diferentes para mejorar la ciudad. ¿Cómo las aprovecharías?',
      choices:[
        {
          text:'Combinar las mejores y explicar por qué.',
          effect:15,
          stars:1,
          why:'Valorar ideas distintas puede fortalecer una propuesta común.'
        },
        {
          text:'Escoger solo la mía sin escuchar.',
          effect:-4,
          stars:2,
          why:'Una propuesta individual puede ser valiosa, pero también puede mejorar al escuchar otras.'
        }
      ]
    },
    {
      icon:'🌿',
      title:'Una plaza nueva',
      text:'Hay un espacio vacío que podría servir para toda la comunidad.',
      choices:[
        {
          text:'Crear una plaza accesible y con zonas diversas.',
          effect:14,
          stars:1,
          why:'Una plaza bien pensada puede favorecer la convivencia.'
        },
        {
          text:'Reservarlo solo para un pequeño grupo.',
          effect:-5,
          stars:2,
          why:'Limitar el acceso reduce el beneficio colectivo de un espacio compartido.'
        }
      ]
    },
    {
      icon:'🏗️',
      title:'Proyecto conjunto',
      text:'Las personas de dos barrios necesitan un lugar para reunirse, pero ninguno puede construirlo por su cuenta.',
      choices:[
        {
          text:'Unir esfuerzos y repartir responsabilidades.',
          effect:14,
          stars:1,
          why:'La cooperación puede hacer posible lo que parece difícil individualmente.'
        },
        {
          text:'Esperar sin hablar con el otro barrio.',
          effect:0,
          stars:1,
          why:'Sin coordinación puede ser más difícil llegar a una solución.'
        }
      ]
    }
  ],

  chance: [
    {
      icon:'✨',
      title:'¡Una idea brillante!',
      text:'Un grupo comparte materiales que no estaba utilizando. Ahora más personas pueden aprender.',
      choices:[
        {
          text:'¡Qué bien! Continuar.',
          effect:11,
          stars:2,
          why:'Compartir recursos puede ampliar oportunidades.'
        }
      ]
    },
    {
      icon:'🌧️',
      title:'Una semana complicada',
      text:'Una lluvia intensa ha afectado los caminos de la ciudad. Hace falta reorganizar las prioridades.',
      choices:[
        {
          text:'Colaborar con la reparación.',
          effect:8,
          stars:1,
          why:'Responder en conjunto ayuda a superar situaciones difíciles.'
        },
        {
          text:'Ignorar lo ocurrido.',
          effect:-5,
          stars:1,
          why:'Los problemas no suelen desaparecer cuando se ignoran.'
        }
      ]
    },
    {
      icon:'🎈',
      title:'Fiesta del barrio',
      text:'La ciudad celebra que nuevas personas pudieron participar en un proyecto común.',
      choices:[
        {
          text:'Compartir la celebración.',
          effect:9,
          stars:2,
          why:'Reconocer los avances colectivos también fortalece la convivencia.'
        }
      ]
    },
    {
      icon:'📨',
      title:'Llegó una propuesta',
      text:'Varias personas sugieren mejorar una zona olvidada. ¿Qué harías?',
      choices:[
        {
          text:'Leer las propuestas y responder con claridad.',
          effect:11,
          stars:1,
          why:'Responder y explicar decisiones favorece la participación.'
        },
        {
          text:'Guardar las propuestas sin revisarlas.',
          effect:-4,
          stars:2,
          why:'Una propuesta no ayuda si nunca se considera.'
        }
      ]
    }
  ]
};

const TOPICS = [
  {
    icon:'⚖️',
    name:'Igualdad de oportunidades',
    text:'No siempre empezamos en las mismas condiciones. Reconocer las barreras permite comprender por qué algunas personas necesitan apoyos diferentes.',
    example:'Ejemplo: ofrecer materiales de lectura a quienes no pueden conseguirlos.'
  },
  {
    icon:'🗣️',
    name:'Participación',
    text:'Participar es poder expresar ideas, escuchar a otras personas y contribuir a decisiones que afectan a un grupo.',
    example:'Ejemplo: consultar a estudiantes antes de cambiar un espacio común.'
  },
  {
    icon:'🌉',
    name:'Acceso',
    text:'Un servicio puede existir y, aun así, resultar difícil de utilizar para algunas personas. Importa comprobar quién puede beneficiarse.',
    example:'Ejemplo: una biblioteca con horarios que funcionen para más estudiantes.'
  },
  {
    icon:'🧩',
    name:'Reglas y acuerdos',
    text:'Las reglas ayudan a organizarnos. También se pueden revisar cuando sus consecuencias generan obstáculos que no están justificados.',
    example:'Ejemplo: cambiar una norma escolar después de escuchar a todos.'
  },
  {
    icon:'🤝',
    name:'Cooperación',
    text:'Trabajar en común permite reunir ideas, habilidades y recursos. No significa que todos deban pensar igual.',
    example:'Ejemplo: dos grupos que se ponen de acuerdo para mejorar una plaza.'
  },
  {
    icon:'🔍',
    name:'Pensamiento crítico',
    text:'Antes de concluir, conviene preguntar qué ocurrió, por qué, quiénes participaron y qué información falta.',
    example:'Ejemplo: comparar distintas fuentes sobre una misma noticia.'
  }
];

const TIPS = [
  [
    'Nadie llega lejos solo',
    'A veces una regla pequeña cambia las oportunidades de todo un grupo.'
  ],
  [
    'Las necesidades son distintas',
    'Tratar exactamente igual situaciones diferentes no siempre elimina barreras.'
  ],
  [
    'Escuchar también es participar',
    'Una comunidad puede tomar mejores decisiones cuando escucha opiniones diversas.'
  ],
  [
    'Las reglas pueden mejorar',
    'Los acuerdos cambian cuando las personas encuentran maneras más justas de convivir.'
  ],
  [
    'Las causas importan',
    'Una desigualdad puede tener varias causas: económicas, sociales y territoriales.'
  ]
];

let game = null;
let pendingEvent = null;
let busy = false;
let tipIndex = 0;
let muted = true;
let soundContext = null;
let toastTimer = null;

const clamp = (n,min,max) => Math.max(min,Math.min(max,n));

const sleep = ms => new Promise(resolve => setTimeout(resolve,ms));

function showToast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('visible');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    t.classList.remove('visible');
  },2700);
}

function sound(freq=440,length=.08) {
  if(muted) return;

  try {
    soundContext ??= new (
      window.AudioContext || window.webkitAudioContext
    )();

    const o = soundContext.createOscillator();
    const g = soundContext.createGain();

    o.type = 'sine';
    o.frequency.value = freq;

    g.gain.setValueAtTime(.05,soundContext.currentTime);
    g.gain.exponentialRampToValueAtTime(
      .001,
      soundContext.currentTime + length
    );

    o.connect(g);
    g.connect(soundContext.destination);

    o.start();
    o.stop(soundContext.currentTime + length);
  } catch {}
}

function save() {
  if(!game) return;

  try {
    localStorage.setItem(
      'entre-todos-save-v2',
      JSON.stringify(game)
    );
  } catch {}
}

function boardNumbers() {
  const arr = [];

  for(let r=0;r<5;r++) {
    let row = Array.from(
      {length:6},
      (_,i) => r*6+i
    );

    if(r%2) row.reverse();
    arr.push(...row);
  }

  return arr;
}

function makeBoard() {
  const el = $('board');
  el.innerHTML = '';

  boardNumbers().forEach(i => {
    const type = TILE_TYPES[i];
    const data = TYPES[type];

    const cell = document.createElement('div');

    cell.className = `tile ${
      i<10 ? 'origin' : i<20 ? 'meeting' : 'future'
    } ${
      ['choice','team','finish'].includes(type) ? 'special' : ''
    }`;

    cell.dataset.index = i;
    cell.title = `Casilla ${i+1}: ${data.name}`;

    cell.innerHTML = `
      <span class="num">${i+1}</span>
      <span class="glyph" aria-hidden="true">${data.icon}</span>
      <span class="tile-name">${data.name}</span>
      <div class="tokens" aria-label="Jugadores en esta casilla"></div>
    `;

    el.append(cell);
  });
}

function renderBoard() {
  document.querySelectorAll('.tile').forEach(t => {
    const n = Number(t.dataset.index);

    t.classList.toggle(
      'highlight',
      !!game && game.players[game.turn].pos === n
    );

    const holders = t.querySelector('.tokens');
    holders.replaceChildren();

    if(!game) return;

    game.players.forEach((p,k) => {
      if(p.pos === n) {
        const token = document.createElement('span');

        token.className = 'token';
        token.style.background = COLORS[k];
        token.textContent = k+1;
        token.title = p.name;

        holders.append(token);
      }
    });
  });
}

function render() {
  makeBoard();
  renderBoard();

  if(!game) {
    $('setupPanel').classList.remove('hidden');
    $('turnPanel').classList.add('hidden');

    $('cityScore').textContent = '0 / 100';
    $('cityBar').style.width = '0%';

    $('unlocks').innerHTML = `
      <span>○ Plaza compartida</span>
      <span>○ Biblioteca</span>
      <span>○ Puente abierto</span>
    `;

    return;
  }

  $('setupPanel').classList.add('hidden');
  $('turnPanel').classList.remove('hidden');

  const p = game.players[game.turn];

  $('turnName').textContent = p.name;
  $('turnOrb').style.background = COLORS[game.turn];

  $('turnHint').textContent = p.bot
    ? 'La computadora está jugando.'
    : busy
      ? 'La ficha está avanzando.'
      : 'Lanza el dado para avanzar.';

  $('turnStars').textContent = p.stars;
  $('turnActs').textContent = p.acts;

  $('turnPos').textContent = p.pos === 0
    ? 'Inicio'
    : `${p.pos+1}/30`;

  $('cityScore').textContent = `${game.city} / 100`;
  $('cityBar').style.width = game.city + '%';

  $('rollBtn').disabled = busy || !!pendingEvent || p.bot;

  $('unlocks').innerHTML = '';

  [
    ['Plaza compartida',30],
    ['Biblioteca',60],
    ['Puente abierto',85]
  ].forEach(([name,target]) => {
    const item = document.createElement('span');

    item.className = game.city >= target ? 'on' : '';

    item.textContent =
      (game.city >= target ? '✓ ' : '○ ') + name;

    $('unlocks').append(item);
  });

  const list = $('playersList');
  list.replaceChildren();

  game.players.forEach((q,i) => {
    const line = document.createElement('div');
    line.className = 'player-line';

    line.innerHTML = `
      <span class="dot" style="background:${COLORS[i]}"></span>
      <span></span>
      <b></b>
    `;

    line.children[1].textContent =
      q.name + (game.turn === i ? ' · turno' : '');

    line.children[2].textContent =
      `${q.stars} ★ · ${q.pos+1}/30`;

    list.append(line);
  });

  $('boardMessage').textContent =
    game.city >= 85
      ? '¡La ciudad ya tiene nuevas conexiones!'
      : game.city >= 60
        ? '¡Se han abierto nuevas oportunidades!'
        : game.city >= 30
          ? '¡La plaza cobra vida!'
          : 'Las mejores rutas se construyen juntos.';

  save();
}

function startGame() {
  const n = Number($('playerCount').value);

  game = {
    players: Array.from(
      {length:n===1 ? 2 : n},
      (_,i) => ({
        name: n===1 && i===1
          ? 'La máquina'
          : `Jugador ${i+1}`,
        bot: n===1 && i===1,
        pos:0,
        stars:0,
        acts:0
      })
    ),
    turn:0,
    city:12,
    visits:{
      choice:0,
      quiz:0,
      action:0,
      team:0,
      chance:0
    },
    moves:0,
    version:2
  };

  pendingEvent = null;
  busy = false;

  $('eventOverlay').classList.add('hidden');
  $('finalOverlay').classList.add('hidden');

  render();
  showToast('¡La aventura comienza!');
}

async function roll() {
  if(!game || busy || pendingEvent) return;

  busy = true;
  render();

  const face = $('dice');
  face.classList.add('rolling');

  const value = 1 + Math.floor(Math.random()*6);

  for(let k=0;k<12;k++) {
    face.textContent =
      FACES[Math.floor(Math.random()*6)];

    sound(290+k*16,.025);
    await sleep(65);
  }

  face.classList.remove('rolling');
  face.textContent = FACES[value-1];

  sound(660,.12);

  const p = game.players[game.turn];

  for(let i=0;i<value && p.pos<29;i++) {
    p.pos++;
    renderBoard();

    sound(370+i*40,.05);
    await sleep(210);
  }

  game.moves++;
  busy = false;
  render();

  if(p.pos >= 29) {
    finish();
    return;
  }

  await sleep(300);
  openEvent(TILE_TYPES[p.pos]);
}

function nextEvent(type) {
  const arr = EVENTS[type] || EVENTS.choice;
  const i = game.visits[type] % arr.length;

  game.visits[type]++;

  return arr[i];
}

function openEvent(type) {
  const ev = nextEvent(type);

  pendingEvent = {
    event:ev,
    type
  };

  const {name} = TYPES[type];

  $('eventCategory').textContent = name.toUpperCase();

  $('eventProgress').textContent =
    `Casilla ${game.players[game.turn].pos+1} de 30`;

  $('eventIllustration').textContent = ev.icon;
  $('eventTitle').textContent = ev.title;
  $('eventText').textContent = ev.text;

  $('eventFeedback').classList.add('hidden');
  $('continueBtn').classList.add('hidden');

  const opts = $('eventOptions');
  opts.replaceChildren();

  ev.choices.forEach((c,i) => {
    const b = document.createElement('button');

    b.type = 'button';
    b.className = 'choice';

    b.textContent =
      `${String.fromCharCode(65+i)}. ${c.text}`;

    b.addEventListener('click',() => choose(i));

    opts.append(b);
  });

  $('eventOverlay').classList.remove('hidden');

  setTimeout(() => {
    opts.querySelector('button')?.focus();
  },60);

  if(game.players[game.turn].bot) {
    setTimeout(() => {
      if(pendingEvent) choose(0);
    },900);
  }
}

function choose(i) {
  if(
    !game ||
    !pendingEvent ||
    pendingEvent.chosen !== undefined
  ) return;

  const ev = pendingEvent.event;
  const c = ev.choices[i];

  if(!c) return;

  pendingEvent.chosen = i;

  const p = game.players[game.turn];

  game.city = clamp(
    game.city + c.effect,
    0,
    100
  );

  p.stars = Math.max(0,p.stars+c.stars);
  p.acts++;

  const opts = $('eventOptions');

  Array.from(opts.children).forEach((b,j) => {
    b.disabled = true;
    b.classList.toggle('chosen',i===j);
  });

  $('eventFeedback').textContent =
    `${c.effect>=0 ? '✦' : '↝'} ${c.why}  ${
      c.effect>=0 ? '+' : ''
    }${c.effect} para la ciudad · +${c.stars} estrellas.`;

  $('eventFeedback').classList.remove('hidden');
  $('continueBtn').classList.remove('hidden');

  sound(c.effect>=0 ? 700 : 280,.15);

  render();

  if(p.bot) {
    setTimeout(continueTurn,1300);
  }
}

function continueTurn() {
  if(
    !game ||
    !pendingEvent ||
    pendingEvent.chosen === undefined
  ) return;

  pendingEvent = null;

  $('eventOverlay').classList.add('hidden');

  game.turn = (game.turn+1) % game.players.length;

  render();

  if(game.players[game.turn].bot) {
    setTimeout(roll,700);
  }
}

function finish() {
  const p = game.players[game.turn];

  $('finalTitle').textContent =
    `¡${p.name} llegó a la meta!`;

  $('finalText').textContent =
    game.city >= 75
      ? 'Además de llegar, construyeron una ciudad con más espacios compartidos y oportunidades.'
      : game.city >= 40
        ? 'Han logrado algunos cambios. Aún quedan caminos y oportunidades por mejorar.'
        : 'Llegaron a la meta, pero varias barreras siguen presentes. ¿Qué decisiones cambiarían en otra partida?';

  const ranking = $('finalRanking');
  ranking.replaceChildren();

  [...game.players]
    .sort((a,b) => b.stars-a.stars)
    .forEach(q => {
      const row = document.createElement('div');
      const left = document.createElement('strong');
      const right = document.createElement('span');

      left.textContent = q.name;

      right.textContent =
        `${q.stars} ★ · ${q.acts} decisiones`;

      row.append(left,right);
      ranking.append(row);
    });

  $('finalOverlay').classList.remove('hidden');

  try {
    localStorage.removeItem('entre-todos-save-v2');
  } catch {}

  sound(750,.4);
}


function volverAlMenu() {
  if (busy) {
    showToast('Termina el movimiento antes de cambiar de modo.');
    return;
  }

  // Recordar el modo de la partida anterior
  if (game) {
    const modoAnterior = game.players.some(p => p.bot)
      ? 1
      : game.players.length;

    $('playerCount').value = String(modoAnterior);
  }

  // Detener la partida actual
  game = null;
  pendingEvent = null;
  busy = false;

  // Borrar el progreso anterior
  localStorage.removeItem('entre-todos-save-v2');

  // Cerrar las ventanas del juego
  $('eventOverlay').classList.add('hidden');
  $('finalOverlay').classList.add('hidden');

  // Mostrar otra vez el menú inicial
  render();

  showToast('¡Elige tu nuevo modo de juego!');
}


function initPages() {
  document.querySelectorAll('.navbtn').forEach(btn => {
    btn.addEventListener('click',() => {
      document.querySelectorAll('.navbtn').forEach(x => {
        x.classList.toggle('active',x===btn);
      });

      document.querySelectorAll('.page').forEach(p => {
        p.classList.toggle(
          'active',
          p.id===btn.dataset.section
        );
      });

      window.scrollTo({
        top:0,
        behavior:'smooth'
      });
    });
  });

  $('topics').replaceChildren();

  TOPICS.forEach(t => {
    const card = document.createElement('article');

    card.className = 'topic';

    card.innerHTML = `
      <div class="topic-icon"></div>
      <h3></h3>
      <p></p>
      <small></small>
    `;

    card.children[0].textContent = t.icon;
    card.children[1].textContent = t.name;
    card.children[2].textContent = t.text;
    card.children[3].textContent = t.example;

    $('topics').append(card);
  });

  const legend = $('legend');
  legend.replaceChildren();

  Object.entries(TYPES)
    .filter(([k]) => k!=='start' && k!=='finish')
    .forEach(([k,v]) => {
      const item = document.createElement('span');

      item.innerHTML = `<i>${v.icon}</i> ${v.name}`;

      legend.append(item);
    });
}

function loadSaved() {
  try {
    const saved = JSON.parse(
      localStorage.getItem('entre-todos-save-v2')
    );

    if(
      saved?.version===2 &&
      Array.isArray(saved.players) &&
      saved.players.length>=2 &&
      saved.players.length<=4 &&
      Number.isInteger(saved.turn) &&
      saved.turn>=0 &&
      saved.turn<saved.players.length &&
      Number.isFinite(saved.city) &&
      saved.visits &&
      saved.players.every(p =>
        Number.isInteger(p.pos) &&
        p.pos>=0 &&
        p.pos<=29 &&
        typeof p.name==='string' &&
        Number.isFinite(p.stars)
      )
    ) {
      game = saved;
      pendingEvent = null;
      busy = false;

      return true;
    }
  } catch {}

  return false;
}

function updateTip() {
  const [title,body] = TIPS[tipIndex++ % TIPS.length];

  $('tipTitle').textContent = title;
  $('tipBody').textContent = body;
}

$('startBtn').addEventListener('click',startGame);

$('restartBtn').addEventListener('click',() => {
  if(confirm('¿Empezar una partida nueva? Se perderá la anterior.')) {
    startGame();
  }
});

$('rollBtn').addEventListener('click',roll);

$('continueBtn').addEventListener('click',continueTurn);

$('playAgainBtn').addEventListener('click',startGame);

$('nextTipBtn').addEventListener('click',updateTip);

$('soundToggle').addEventListener('click',() => {
  muted = !muted;

  $('soundToggle').textContent = muted ? '♪' : '♫';

  $('soundToggle').setAttribute(
    'aria-label',
    muted
      ? 'Activar efectos sonoros'
      : 'Desactivar efectos sonoros'
  );

  showToast(
    muted ? 'Sonido desactivado' : 'Sonido activado'
  );
});

document.addEventListener('keydown',e => {
  if(
    e.key==='Escape' &&
    !$('eventOverlay').classList.contains('hidden')
  ) {
    showToast('Elige una opción para seguir jugando.');
  }
});

initPages();
updateTip();
loadSaved();
render();


// BOTÓN PARA CAMBIAR DE MODO DURANTE LA PARTIDA

const botonMenu = document.createElement('button');

botonMenu.textContent = 'Cambiar modo de juego';
botonMenu.type = 'button';
botonMenu.className = 'btn-menu';

botonMenu.addEventListener('click', () => {
  const confirmar = confirm(
    '¿Quieres volver al menú? La partida actual se perderá.'
  );

  if (confirmar) {
    volverAlMenu();
  }
});

$('turnPanel').appendChild(botonMenu);


// BOTÓN PARA CAMBIAR DE MODO AL FINALIZAR

const botonFinal = document.createElement('button');

botonFinal.textContent = 'Elegir otro modo';
botonFinal.type = 'button';
botonFinal.className = 'btn-menu';

botonFinal.addEventListener('click', volverAlMenu);

$('finalOverlay').appendChild(botonFinal);


if(game && game.players[game.turn].bot) {
  setTimeout(roll,850);
}
