// Linhas exibidas durante o boot do sistema
const bootLines = [
  { type: 'info', tag: '[INFO]',    text: 'Iniciando 3D_OS kernel v1.0.0-arch...' },
  { type: 'ok',   tag: '[  OK  ]', text: 'Módulo BIOS carregado — sequência de inicialização' },
  { type: 'ok',   tag: '[  OK  ]', text: 'Hardware: CPU 8-core / RAM 32GB / GPU RTX 4090' },
  { type: 'ok',   tag: '[  OK  ]', text: 'Montando ext4 em /dev/sda1 — rw,relatime' },
  { type: 'ok',   tag: '[  OK  ]', text: 'Iniciando systemd — PID 1 — versão 255' },
  { type: 'ok',   tag: '[  OK  ]', text: 'Iniciando udev Kernel Device Manager' },
  { type: 'info', tag: '[INFO]',    text: 'Verificando módulos 3D...' },
  { type: 'ok',   tag: '[  OK  ]', text: 'BLENDER_ENGINE v4.2.0 LTS — carregado' },
  { type: 'ok',   tag: '[  OK  ]', text: 'SUBSTANCE_PAINTER v10.1.2 — carregado' },
  { type: 'ok',   tag: '[  OK  ]', text: 'UNREAL_ENGINE_5 v5.4.3 — carregado' },
  { type: 'warn', tag: '[WARN]',   text: 'CodeWalker: verificando licença...' },
  { type: 'ok',   tag: '[  OK  ]', text: 'CodeWalker licença validada — FiveM pipeline ativo' },
  { type: 'ok',   tag: '[  OK  ]', text: 'Rede: connected — IP 192.168.0.100' },
  { type: 'info', tag: '[INFO]',    text: 'Carregando perfil zyur@3d...' },
  { type: 'ok',   tag: '[  OK  ]', text: 'Portfólio montado: 5 projetos em ./projects/' },
  { type: 'ok',   tag: '[  OK  ]', text: 'Câmera CAM_01 — SIGNAL_STRONG' },
  { type: 'ok',   tag: '[  OK  ]', text: '3D_OS inicializado — todos os módulos operacionais' },
]

export default bootLines