// Textos do site nos três idiomas
const translations = {

  en: {
    // Sys Header
    sysName:   '3D_OS v1.0.0',
    sysAuth:   'GUEST_ACCESS_GRANTED',
    sysNode:   'gzyur.dev',
    terminal:  'TTY0',
    status:    '200 OK',

    // Page title bar
    pageHome:    'COMPETENCE_ANALYSIS_REPORT',
    pageWork:    'WORK — ls ./projects/',
    pageAbout:   'ABOUT — identity.exe',
    pageContact: 'CONTACT — send_message()',

    // Hint bar
    hintTerminal: 'terminal:',
    hintPages:    'pages:',

    // Nav bar
    navPrompt:  'root@3d/nav > SELECT MODULE',
    navHome:    '01._HOME',
    navWork:    '02._WORK',
    navAbout:   '03._ABOUT',
    navContact: '04._CONTACT',

    // Boot
    bootComplete: '3D_OS v1.0.0 — BOOT COMPLETE',
    bootSub:      'All modules loaded. System operational.',
    bootEnter:    '[ Click or press any key to continue ]',
    bootLabels: [
      'Starting HUD interface...',
      'Mounting cameras...',
      'Loading assets...',
      'System online...',
    ],

    // Terminal — whoami
    whoami: `3D Artist — props, environments and MLOs for games and FiveM.\n5+ years turning briefs into production-ready assets.`,

    // Terminal — status
    sysStatus: [
      { key: 'IDENTITY',   value: 'ZYUR — 3D Artist' },
      { key: 'LOCATION',   value: 'São Paulo, Brazil — remote' },
      { key: 'FOCUS',      value: 'Props · FiveM MLO · Environments' },
      { key: 'TOOLS',      value: 'Blender · Substance Painter · CodeWalker · UE5' },
      { key: 'ARTSTATION', value: 'artstation.com/zyur', highlight: true },
      { key: 'STATUS',     value: 'OPEN_TO_WORK', highlight: true },
      { key: 'RESPONSE',   value: 'within 24h' },
    ],

    // Terminal — tutorial
    tutorial: [
      `Welcome to ZYUR DEV portfolio.`,
      `This is an interactive terminal.`,
      ``,
      ` → type commands in the input below`,
      ` → or click shortcuts in the hint bar above`,
      ` → opening a section splits the screen in two`,
      ` → use  cd ..  to close the right panel`,
      ` → the left terminal is always active`,
      ``,
      `TIP: start with  cd work ,  cd about  or  cd contact`,
    ],

    // Terminal — help
    helpTerminal: [
      { cmd: 'whoami',  desc: 'show identity' },
      { cmd: 'ls',      desc: 'list projects' },
      { cmd: 'help',    desc: 'show commands' },
      { cmd: 'status',  desc: 'system status' },
      { cmd: 'clear',   desc: 'clear terminal' },
      { cmd: 'reboot',  desc: 'restart system' },
      { cmd: 'lang pt', desc: 'português' },
      { cmd: 'lang es', desc: 'español' },
      { cmd: 'lang en', desc: 'english' },
    ],
    helpPages: [
      { cmd: 'cd work',    desc: 'open projects section' },
      { cmd: 'cd about',   desc: 'open about section' },
      { cmd: 'cd contact', desc: 'open contact section' },
      { cmd: 'cd ..',      desc: 'close panel / go back' },
    ],

    // Erros e reboot
    cmdNotFound: (cmd) => `bash: ${cmd}: command not found — type help`,
    shutdownMsg: [
      'Starting reboot sequence...',
      'Saving system state...',
      'Unmounting 3D modules...',
    ],

    // Projetos traduzíveis
    projects: [
      {
        name:  'Nyx — Private Discord Bot',
        brief: 'Private Discord bot with custom command systems and automations.',
        desc:  'Nyx is a private bot built with Discord.js v14. Designed for modularity and performance — each feature isolated in independent modules for easy expansion and maintenance.',
        details: {
          Stack:      'Discord.js v14 · Node.js',
          Type:       'Private Bot',
          Language:   'JavaScript',
          Repository: 'github.com/zyurdev/nyx-bot',
          Status:     'In development',
        },
      },
    ],
    comingSoon: 'new projects coming soon...',

    // About panel
    aboutBio:       `3D Artist focused on assets that work — not just pretty renders.\nEvery project starts with a brief and ends with an optimized, documented deliverable ready for production.\n5+ years in games, FiveM and environments. Available for remote projects globally.`,
    aboutClass:     'MODEL_3D',
    aboutXp:        'SENIOR',
    aboutBase:      'BR / Remote',
    aboutLang:      'PT / EN / ES',
    aboutAlert:     'OPEN TO WORK',
    aboutContracts: 'CONTRACTS: ON',
    aboutRemote:    '[REMOTE_READY]',

    // Contact panel
    contactTitle:   'LETS\nCREATE.',
    contactSub:     '// quote within 24h — no commitment',
    contactName:    'Your name',
    contactEmail:   'your@email.com',
    contactProject: 'Project type',
    contactBudget:  'Budget',
    contactDesc:    'Describe your project...',
    contactSend:    'Send message ↗',
    contactOptions: ['Select...', 'Games / Props', 'FiveM / MLO', 'Environment', 'Character', 'Other'],
    contactBudgets: ['Select...', '$ 100–300', '$ 300–800', '$ 800+'],

    closePanel: 'cd .. ×',
  },

  pt: {
    sysName:   '3D_OS v1.0.0',
    sysAuth:   'ACESSO_CONVIDADO_CONCEDIDO',
    sysNode:   'gzyur.dev',
    terminal:  'TTY0',
    status:    '200 OK',

    pageHome:    'RELATÓRIO_DE_COMPETÊNCIAS',
    pageWork:    'TRABALHOS — ls ./projetos/',
    pageAbout:   'SOBRE — identidade.exe',
    pageContact: 'CONTATO — enviar_mensagem()',

    hintTerminal: 'terminal:',
    hintPages:    'páginas:',

    navPrompt:  'root@3d/nav > SELECIONAR MÓDULO',
    navHome:    '01._INÍCIO',
    navWork:    '02._TRABALHOS',
    navAbout:   '03._SOBRE',
    navContact: '04._CONTATO',

    bootComplete: '3D_OS v1.0.0 — BOOT COMPLETO',
    bootSub:      'Todos os módulos carregados. Sistema operacional.',
    bootEnter:    '[ Clique ou pressione qualquer tecla para continuar ]',
    bootLabels: [
      'Iniciando interface HUD...',
      'Montando câmeras...',
      'Carregando assets...',
      'Sistema online...',
    ],

    whoami: `Modelador 3D — props, cenários e MLOs para games e FiveM.\n5+ anos entregando assets prontos para produção.`,

    sysStatus: [
      { key: 'IDENTIDADE',  value: 'ZYUR — Modelador 3D' },
      { key: 'LOCALIZAÇÃO', value: 'São Paulo, Brasil — remoto' },
      { key: 'FOCO',        value: 'Props · FiveM MLO · Ambientes' },
      { key: 'FERRAMENTAS', value: 'Blender · Substance Painter · CodeWalker · UE5' },
      { key: 'ARTSTATION',  value: 'artstation.com/zyur', highlight: true },
      { key: 'STATUS',      value: 'ABERTO_PARA_TRABALHO', highlight: true },
      { key: 'RESPOSTA',    value: 'até 24h' },
    ],

    tutorial: [
      `Bem-vindo ao portfólio ZYUR DEV.`,
      `Este é um terminal interativo.`,
      ``,
      ` → digite comandos na linha abaixo`,
      ` → ou clique nos atalhos da barra acima`,
      ` → abrir uma seção divide a tela em dois`,
      ` → use  cd ..  para fechar o painel direito`,
      ` → o terminal esquerdo fica sempre ativo`,
      ``,
      `DICA: comece com  cd work ,  cd about  ou  cd contact`,
    ],

    helpTerminal: [
      { cmd: 'whoami',  desc: 'exibe identidade' },
      { cmd: 'ls',      desc: 'lista projetos' },
      { cmd: 'help',    desc: 'mostra comandos' },
      { cmd: 'status',  desc: 'status do sistema' },
      { cmd: 'clear',   desc: 'limpa o terminal' },
      { cmd: 'reboot',  desc: 'reinicia o sistema' },
      { cmd: 'lang pt', desc: 'português' },
      { cmd: 'lang es', desc: 'español' },
      { cmd: 'lang en', desc: 'english' },
    ],
    helpPages: [
      { cmd: 'cd work',    desc: 'abre seção de projetos' },
      { cmd: 'cd about',   desc: 'abre seção sobre' },
      { cmd: 'cd contact', desc: 'abre seção de contato' },
      { cmd: 'cd ..',      desc: 'fecha painel / volta' },
    ],

    cmdNotFound: (cmd) => `bash: ${cmd}: comando não encontrado — digite help`,
    shutdownMsg: [
      'Iniciando sequência de reboot...',
      'Salvando estado do sistema...',
      'Desmontando módulos 3D...',
    ],

    projects: [
      {
        name:  'Nyx — Bot Privado para Discord',
        brief: 'Bot privado para Discord com sistema de comandos e automações customizadas.',
        desc:  'Nyx é um bot privado desenvolvido em Discord.js v14. Construído com foco em modularidade e performance — cada funcionalidade isolada em módulos independentes para facilitar expansão e manutenção.',
        details: {
          Stack:       'Discord.js v14 · Node.js',
          Tipo:        'Bot Privado',
          Linguagem:   'JavaScript',
          Repositório: 'github.com/zyurdev/nyx-bot',
          Status:      'Em desenvolvimento',
        },
      },
    ],
    comingSoon: 'novos trabalhos em breve...',

    aboutBio:       `Modelador 3D com foco em assets que funcionam — não só renders bonitos.\nCada projeto começa com um brief e termina com um deliverable otimizado, documentado e pronto para produção.\n5+ anos em games, FiveM e ambientes. Disponível para projetos remotos globalmente.`,
    aboutClass:     'MODEL_3D',
    aboutXp:        'SENIOR',
    aboutBase:      'BR / Remoto',
    aboutLang:      'PT / EN / ES',
    aboutAlert:     'ABERTO PARA TRABALHO',
    aboutContracts: 'CONTRATOS: ATIVOS',
    aboutRemote:    '[REMOTO_DISPONÍVEL]',

    contactTitle:   'VAMOS\nCRIAR.',
    contactSub:     '// orçamento em até 24h — sem compromisso',
    contactName:    'Seu nome',
    contactEmail:   'seu@email.com',
    contactProject: 'Tipo de projeto',
    contactBudget:  'Orçamento',
    contactDesc:    'Descreva seu projeto...',
    contactSend:    'Enviar mensagem ↗',
    contactOptions: ['Selecione...', 'Games / Props', 'FiveM / MLO', 'Ambiente', 'Personagem', 'Outro'],
    contactBudgets: ['Selecione...', 'R$ 100–300', 'R$ 300–800', 'R$ 800+'],

    closePanel: 'cd .. ×',
  },

  es: {
    sysName:   '3D_OS v1.0.0',
    sysAuth:   'ACCESO_INVITADO_CONCEDIDO',
    sysNode:   'gzyur.dev',
    terminal:  'TTY0',
    status:    '200 OK',

    pageHome:    'INFORME_DE_COMPETENCIAS',
    pageWork:    'TRABAJOS — ls ./proyectos/',
    pageAbout:   'SOBRE — identidad.exe',
    pageContact: 'CONTACTO — enviar_mensaje()',

    hintTerminal: 'terminal:',
    hintPages:    'páginas:',

    navPrompt:  'root@3d/nav > SELECCIONAR MÓDULO',
    navHome:    '01._INICIO',
    navWork:    '02._TRABAJOS',
    navAbout:   '03._SOBRE',
    navContact: '04._CONTACTO',

    bootComplete: '3D_OS v1.0.0 — ARRANQUE COMPLETO',
    bootSub:      'Todos los módulos cargados. Sistema operativo.',
    bootEnter:    '[ Haz clic o presiona cualquier tecla para continuar ]',
    bootLabels: [
      'Iniciando interfaz HUD...',
      'Montando cámaras...',
      'Cargando assets...',
      'Sistema en línea...',
    ],

    whoami: `Artista 3D — props, escenarios y MLOs para games y FiveM.\n5+ años convirtiendo briefs en assets listos para producción.`,

    sysStatus: [
      { key: 'IDENTIDAD',  value: 'ZYUR — Artista 3D' },
      { key: 'UBICACIÓN',  value: 'São Paulo, Brasil — remoto' },
      { key: 'FOCO',       value: 'Props · FiveM MLO · Entornos' },
      { key: 'TOOLS',      value: 'Blender · Substance Painter · UE5' },
      { key: 'CONTACTO',   value: 'artstation.com/zyur', highlight: true },
      { key: 'STATUS',     value: 'ABIERTO_A_TRABAJO', highlight: true },
      { key: 'RESPUESTA',  value: 'en 24h' },
    ],

    tutorial: [
      `Bienvenido al portfolio ZYUR DEV.`,
      `Este es un terminal interactivo.`,
      ``,
      ` → escribe comandos en la línea de abajo`,
      ` → o haz clic en los atajos de la barra de arriba`,
      ` → abrir una sección divide la pantalla en dos`,
      ` → usa  cd ..  para cerrar el panel derecho`,
      ` → el terminal izquierdo siempre permanece activo`,
      ``,
      `TIP: empieza con  cd work ,  cd about  o  cd contact`,
    ],

    helpTerminal: [
      { cmd: 'whoami',  desc: 'mostrar identidad' },
      { cmd: 'ls',      desc: 'listar proyectos' },
      { cmd: 'help',    desc: 'mostrar comandos' },
      { cmd: 'status',  desc: 'estado del sistema' },
      { cmd: 'clear',   desc: 'limpiar terminal' },
      { cmd: 'reboot',  desc: 'reiniciar sistema' },
      { cmd: 'lang pt', desc: 'português' },
      { cmd: 'lang es', desc: 'español' },
      { cmd: 'lang en', desc: 'english' },
    ],
    helpPages: [
      { cmd: 'cd work',    desc: 'abrir sección proyectos' },
      { cmd: 'cd about',   desc: 'abrir sección sobre' },
      { cmd: 'cd contact', desc: 'abrir sección contacto' },
      { cmd: 'cd ..',      desc: 'cerrar panel / volver' },
    ],

    cmdNotFound: (cmd) => `bash: ${cmd}: comando no encontrado — escribe help`,
    shutdownMsg: [
      'Iniciando secuencia de reinicio...',
      'Guardando estado del sistema...',
      'Desmontando módulos 3D...',
    ],

    projects: [
      {
        name:  'Nyx — Bot Privado para Discord',
        brief: 'Bot privado para Discord con sistema de comandos y automatizaciones personalizadas.',
        desc:  'Nyx es un bot privado desarrollado en Discord.js v14. Construido con foco en modularidad y rendimiento — cada funcionalidad aislada en módulos independientes para facilitar expansión y mantenimiento.',
        details: {
          Stack:       'Discord.js v14 · Node.js',
          Tipo:        'Bot Privado',
          Lenguaje:    'JavaScript',
          Repositorio: 'github.com/zyurdev/nyx-bot',
          Status:      'En desarrollo',
        },
      },
    ],
    comingSoon: 'nuevos proyectos próximamente...',

    aboutBio:       `Artista 3D enfocado en assets que funcionan — no solo renders bonitos.\nCada proyecto comienza con un brief y termina con un entregable optimizado, documentado y listo para producción.\n5+ años en games, FiveM y entornos. Disponible para proyectos remotos globalmente.`,
    aboutClass:     'MODEL_3D',
    aboutXp:        'SENIOR',
    aboutBase:      'BR / Remoto',
    aboutLang:      'PT / EN / ES',
    aboutAlert:     'ABIERTO A TRABAJO',
    aboutContracts: 'CONTRATOS: ACTIVOS',
    aboutRemote:    '[REMOTO_DISPONIBLE]',

    contactTitle:   'VAMOS A\nCREAR.',
    contactSub:     '// presupuesto en 24h — sin compromiso',
    contactName:    'Tu nombre',
    contactEmail:   'tu@email.com',
    contactProject: 'Tipo de proyecto',
    contactBudget:  'Presupuesto',
    contactDesc:    'Describe tu proyecto...',
    contactSend:    'Enviar mensaje ↗',
    contactOptions: ['Seleccionar...', 'Games / Props', 'FiveM / MLO', 'Entorno', 'Personaje', 'Otro'],
    contactBudgets: ['Seleccionar...', '$ 100–300', '$ 300–800', '$ 800+'],

    closePanel: 'cd .. ×',
  },
}

export default translations