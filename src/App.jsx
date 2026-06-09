import { useEffect, useMemo, useRef, useState } from 'react'
import justiceImg from '../images/justice.png'

const dossiers = [
  {
    code: 'LEG-001',
    date: 'MAYO 2026',
    category: 'DERECHO DIGITAL',
    type: 'derecho',
    title: 'Convenio de Budapest',
    classification: 'Cooperacion Internacional',
    href: 'leg001-convenio-budapest.html',
    search: 'leg-001 convenio de budapest derecho digital cooperacion internacional',
  },
  {
    code: 'LEG-002',
    date: 'MAYO 2026',
    category: 'DERECHO DIGITAL',
    type: 'derecho',
    title: 'Proteccion de Datos Personales',
    classification: 'Proteccion de Datos',
    href: 'protecciondatospersonales.html',
    search: 'leg-002 proteccion de datos personales derecho digital proteccion de datos',
  },
  {
    code: 'LEG-003',
    date: 'JUNIO 2026',
    category: 'DERECHO DIGITAL',
    type: 'derecho',
    title: 'Evidencia Digital',
    classification: 'Prueba Digital',
    href: 'evidenciadigital.html',
    search: 'leg-003 evidencia digital derecho digital prueba digital',
  },
  {
    code: 'FOR-001',
    date: 'MAYO 2026',
    category: 'INFORMATICA FORENSE',
    type: 'forense',
    title: 'Pericias Informaticas',
    classification: 'Evidencia Digital',
    href: 'periciasinformaticas.html',
    search: 'for-001 pericias informaticas informatica forense evidencia digital',
  },
  {
    code: 'FOR-002',
    date: 'MAYO 2026',
    category: 'INFORMATICA FORENSE',
    type: 'forense',
    title: 'Cadena de Custodia',
    classification: 'Preservacion de Evidencia',
    href: 'cadenadecustodia.html',
    search: 'for-002 cadena de custodia informatica forense preservacion de evidencia',
  },
  {
    code: 'FOR-003',
    date: 'JUNIO 2026',
    category: 'INFORMATICA FORENSE',
    type: 'forense',
    title: 'Adquisicion Forense',
    classification: 'Obtencion de Evidencia',
    href: 'for-003-adquisicion-forense.html',
    search: 'for-003 adquisicion forense informatica forense obtencion de evidencia',
  },
]

const filters = [
  { id: 'todos', label: '[TODOS]' },
  { id: 'derecho', label: '[DERECHO DIGITAL]' },
  { id: 'forense', label: '[INFORMÁTICA FORENSE]' },
]

const terminalMessages = [
  '> VERIFICANDO_INTEGRIDAD',
  '> INDEXANDO_EXPEDIENTES',
  '> SINCRONIZANDO_ARCHIVO',
]

function formatTime(date) {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function Header() {
  return (
    <div className="header-system">
      <h1 className="titulo-forensia">[ FORENSIA ]</h1>

      <div className="ficha-sistema">
        <p><span>ID:</span> FOR-AR-001</p>
        <p><span>COMPILACIÓN:</span> 1.0.0</p>
        <p><span>ESTADO:</span> EN LÍNEA</p>
        <p><span>VERSIÓN:</span> MAYO 2026</p>
      </div>

      <p className="sistema">
        ARCHIVO DE CIBERCRIMEN E INFORMÁTICA FORENSE
      </p>
    </div>
  )
}

function ModuleFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="archivo-filtros modulos-filtros" aria-label="Filtros de categoria">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`archivo-filtro ${activeFilter === filter.id ? 'active' : ''}`}
          type="button"
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

function HeroPanel({ currentTime, activeFilter, onFilterChange }) {
  const [terminalIndex, setTerminalIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTerminalIndex((currentIndex) => (currentIndex + 1) % terminalMessages.length)
    }, 2800)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="panel-principal">
      <div className="panel-texto">
        <p className="codigo-sistema">ID-SISTEMA: FOR-AR-001</p>
        <p className="version">COMPILACIÓN 1.0.0 | MAYO 2026</p>

        <p className="fuente-documental">
          [FUENTE] Base documental construida a partir de material académico, prácticas de laboratorio,
          análisis forense, legislación digital e investigaciones desarrolladas durante programas de formación
          en Cibercrimen y Ciberseguridad.
        </p>

        <div className="busqueda">
          <span id="estado-terminal">{terminalMessages[terminalIndex]}</span>
          <span className="cursor">_</span>
        </div>

        <p className="codigo-sistema archivo-disponibles">[ARCHIVO] 6 expedientes disponibles</p>

        <div className="barra"></div>

        <p className="status-text">ESTADO BASE DE DATOS: EN LÍNEA</p>

        <p className="reloj">[HORA] {currentTime}</p>

        <p className="acceso-modulos">&gt; MÓDULOS DISPONIBLES</p>

        <ModuleFilters activeFilter={activeFilter} onFilterChange={onFilterChange} />

        <div className="linea-neon-home"></div>
      </div>

      <div className="arte-lateral">
        <img src={justiceImg} alt="Justicia Digital" />
      </div>
    </div>
  )
}

function SearchPanel({ query, onQueryChange, visibleCount }) {
  const label = visibleCount === 1 ? 'expediente visible' : 'expedientes visibles'

  return (
    <section className="archivo-control" aria-label="Filtro de expedientes">
      <p className="acceso-modulos">&gt; CONSULTA DE EXPEDIENTES</p>

      <div className="archivo-busqueda">
        <label htmlFor="buscador-expedientes">[ QUERY ]</label>
        <input
          id="buscador-expedientes"
          type="search"
          placeholder="buscar por codigo, titulo o clasificacion"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>

      <p className="archivo-resultado" id="archivo-resultado">
        [ RESULTADO ] {visibleCount} {label}
      </p>
    </section>
  )
}

function ArchiveIntel({ allDossiers, visibleDossiers }) {
  const [openPanel, setOpenPanel] = useState(null)
  const [isCompactView, setIsCompactView] = useState(false)
  const derechoCount = allDossiers.filter((dossier) => dossier.type === 'derecho').length
  const forenseCount = allDossiers.filter((dossier) => dossier.type === 'forense').length

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)')

    function updateViewMode(event) {
      setIsCompactView(event.matches)
    }

    updateViewMode(mediaQuery)
    mediaQuery.addEventListener('change', updateViewMode)

    return () => mediaQuery.removeEventListener('change', updateViewMode)
  }, [])

  function togglePanel(panel) {
    if (!isCompactView) {
      return
    }

    setOpenPanel((currentPanel) => currentPanel === panel ? null : panel)
  }

  const estadoOpen = !isCompactView || openPanel === 'estado'
  const mapaOpen = !isCompactView || openPanel === 'mapa'

  return (
    <section className="archivo-intel" aria-label="Estado y mapa del archivo">
      <div className={`estado-archivo-panel intel-panel ${estadoOpen ? 'active' : ''}`}>
        <button
          className="intel-toggle"
          type="button"
          onClick={() => togglePanel('estado')}
          aria-expanded={estadoOpen}
        >
          <span>[ ESTADO DEL ARCHIVO ]</span>
          <span>{isCompactView ? (estadoOpen ? '[ CERRAR ]' : '[ ABRIR ]') : '[ ABIERTO ]'}</span>
        </button>

        {estadoOpen && (
          <div className="estado-grid">
            <div>
              <span>EXPEDIENTES INDEXADOS</span>
              <strong>{allDossiers.length}</strong>
            </div>
            <div>
              <span>RESULTADOS ACTIVOS</span>
              <strong>{visibleDossiers.length}</strong>
            </div>
            <div>
              <span>DERECHO DIGITAL</span>
              <strong>{derechoCount}</strong>
            </div>
            <div>
              <span>INFORMÁTICA FORENSE</span>
              <strong>{forenseCount}</strong>
            </div>
            <div>
              <span>ESTADO</span>
              <strong>SINCRONIZADO</strong>
            </div>
            <div>
              <span>INTEGRIDAD</span>
              <strong>VERIFICADA</strong>
            </div>
          </div>
        )}
      </div>

      <div className={`mapa-expedientes intel-panel ${mapaOpen ? 'active' : ''}`}>
        <button
          className="intel-toggle"
          type="button"
          onClick={() => togglePanel('mapa')}
          aria-expanded={mapaOpen}
        >
          <span>[ MAPA DE EXPEDIENTES ]</span>
          <span>{isCompactView ? (mapaOpen ? '[ CERRAR ]' : '[ ABRIR ]') : '[ ABIERTO ]'}</span>
        </button>

        {mapaOpen && (
          <pre>{`FORENSIA_ARCHIVE
├── LEG
│   ├── LEG-001
│   ├── LEG-002
│   └── LEG-003
└── FOR
    ├── FOR-001
    ├── FOR-002
    └── FOR-003`}</pre>
        )}
      </div>
    </section>
  )
}

function DossierCard({ dossier }) {
  return (
    <a href={dossier.href} target="_blank" rel="noopener noreferrer">
      <div className="dossier">
        <svg className="dossier-frame" viewBox="0 0 450 330" preserveAspectRatio="none" aria-hidden="true">
          <path d="M42 1 H415 L449 35 V191 L425 214 V292 L396 329 H51 L1 294 V38 Z" />
        </svg>
        <p className="badge-activo">EXPEDIENTE ACTIVO</p>

        <h2>{dossier.code}</h2>

        <p className="metadata">
          <span className="led"></span>
          EXPEDIENTE &bull; {dossier.date}
        </p>

        <div className="separador"></div>

        <p className="categoria">{dossier.category}</p>

        <div className="separador"></div>

        <p>{dossier.title}</p>

        <div className="separador"></div>

        <p>
          <span className="etiqueta">CLASIFICACIÓN:</span> {dossier.classification}
        </p>
      </div>
    </a>
  )
}

function DossierCarousel({ dossiers }) {
  const trackRef = useRef(null)

  if (dossiers.length === 0) {
    return null
  }

  function moveCarousel(direction) {
    const track = trackRef.current

    if (!track) {
      return
    }

    track.scrollBy({
      left: direction * track.clientWidth * 0.78,
      behavior: 'smooth',
    })
  }

  return (
    <div className="dossier-carousel">
      <button
        className="dossier-carousel-control"
        type="button"
        onClick={() => moveCarousel(-1)}
        aria-label="Ver expedientes anteriores"
      >
        &lt;&lt;
      </button>

      <div className="grid-dossiers grid-derecho dossier-track" ref={trackRef}>
        {dossiers.map((dossier) => (
          <DossierCard key={dossier.code} dossier={dossier} />
        ))}
      </div>

      <button
        className="dossier-carousel-control"
        type="button"
        onClick={() => moveCarousel(1)}
        aria-label="Ver mas expedientes"
      >
        &gt;&gt;
      </button>
    </div>
  )
}

function DossierSection({ id, title, dossiers }) {
  if (dossiers.length === 0) {
    return null
  }

  return (
    <>
      <h2 id={id} className="seccion">
        {title}
        <span className="contador">[{dossiers.length} EXPEDIENTES]</span>
      </h2>

      <DossierCarousel dossiers={dossiers} />
    </>
  )
}

function ViewSelector({ viewMode, onViewModeChange }) {
  return (
    <div className="vista-selector" aria-label="Selector de vista del archivo">
      <button
        className={viewMode === 'tarjetas' ? 'active' : ''}
        type="button"
        onClick={() => onViewModeChange('tarjetas')}
      >
        [ VISTA TARJETAS ]
      </button>
      <button
        className={viewMode === 'matriz' ? 'active' : ''}
        type="button"
        onClick={() => onViewModeChange('matriz')}
      >
        [ VISTA MATRIZ ]
      </button>
    </div>
  )
}

function MatrixView({ dossiers }) {
  if (dossiers.length === 0) {
    return null
  }

  return (
    <section className="matriz-archivo" aria-label="Vista matriz de expedientes">
      <div className="matriz-header">
        <span>CÓDIGO</span>
        <span>ÁREA</span>
        <span>EXPEDIENTE</span>
        <span>CLASIFICACIÓN</span>
        <span>FECHA</span>
        <span>ACCESO</span>
      </div>

      {dossiers.map((dossier) => (
        <a
          className="matriz-row"
          href={dossier.href}
          key={dossier.code}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>{dossier.code}</span>
          <span>{dossier.category}</span>
          <span>{dossier.title}</span>
          <span>{dossier.classification}</span>
          <span>{dossier.date}</span>
          <span>[ ABRIR ]</span>
        </a>
      ))}
    </section>
  )
}

function SystemLog({ visibleCount }) {
  return (
    <div className="system-log">
      <p className="log">[SIS] Base de conocimiento cargada correctamente.</p>
      <p className="log">[BD] {visibleCount} registros indexados.</p>
      <p className="log">[RED] Sincronización completada.</p>
    </div>
  )
}

function App() {
  const [activeFilter, setActiveFilter] = useState('todos')
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState('tarjetas')
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(formatTime(new Date()))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const visibleDossiers = useMemo(() => {
    const normalizedQuery = normalizeText(query)

    return dossiers.filter((dossier) => {
      const matchesFilter = activeFilter === 'todos' || dossier.type === activeFilter
      const matchesQuery = normalizeText(dossier.search).includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, query])

  const derechoDossiers = visibleDossiers.filter((dossier) => dossier.type === 'derecho')
  const forenseDossiers = visibleDossiers.filter((dossier) => dossier.type === 'forense')

  function handleFilterChange(filter) {
    setActiveFilter(filter)

    window.setTimeout(() => {
      const target = filter === 'forense' ? document.getElementById('forense') : document.getElementById('derecho')
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  return (
    <>
      <div className="contenedor-principal">
        <Header />

        <HeroPanel
          currentTime={currentTime}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <SearchPanel
          query={query}
          onQueryChange={setQuery}
          visibleCount={visibleDossiers.length}
        />

        <ArchiveIntel allDossiers={dossiers} visibleDossiers={visibleDossiers} />

        <div className="archivo-vista-header">
          {viewMode === 'tarjetas' ? (
            <h2 id="derecho" className="seccion">
              DERECHO DIGITAL
              <span className="contador">[{derechoDossiers.length} EXPEDIENTES]</span>
            </h2>
          ) : (
            <h2 id="derecho" className="seccion">
              EXPEDIENTES INDEXADOS
              <span className="contador">[{visibleDossiers.length} REGISTROS]</span>
            </h2>
          )}

          <ViewSelector viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {viewMode === 'tarjetas' ? (
          <>
            <DossierCarousel dossiers={derechoDossiers} />
            <DossierSection id="forense" title="INFORMÁTICA FORENSE" dossiers={forenseDossiers} />
          </>
        ) : (
          <MatrixView dossiers={visibleDossiers} />
        )}

        <SystemLog visibleCount={visibleDossiers.length} />
      </div>

      <footer>
        FORENSIA // REPOSITORIO DE EVIDENCIA DIGITAL // CIB
      </footer>
    </>
  )
}

export default App
