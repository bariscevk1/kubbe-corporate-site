'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/lib/assets/MarkerCluster.css';
import 'react-leaflet-cluster/lib/assets/MarkerCluster.Default.css';

import { getCentroidForPlaka } from '@/lib/content/turkey-plaka-centroids';
import { TURKEY_BBOX } from '@/lib/geo/turkey-map-geo';
import {
  categoryLabelTr,
  type TurkeyReferenceProject,
} from '@/lib/content/turkey-reference-projects';

/* Pin renkleri — kubbe/nakkaş vb. */
const GOLD = '#c5a059';

function categoryColor(cat: TurkeyReferenceProject['category']): string {
  switch (cat) {
    case 'kubbe':
      return '#c5a059';
    case 'nakkas':
      return '#5eead4';
    case 'oluk':
      return '#93c5fd';
    default:
      return '#a8a29e';
  }
}

function projectIcon(project: TurkeyReferenceProject, selected: boolean) {
  const c = categoryColor(project.category);
  const border = selected ? GOLD : `${c}dd`;
  const size = selected ? 30 : 26;
  const inner = selected ? 8 : 6;
  return L.divIcon({
    className: `reference-map-pin${selected ? ' reference-map-pin--selected' : ''}`,
    html: `<div class="reference-pin-outer" style="position:relative;width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(165deg,#141414,#070707);border:2px solid ${border};box-shadow:0 4px 20px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.07),${selected ? `0 0 0 3px rgba(197,160,89,.22)` : 'none'};"><span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${inner}px;height:${inner}px;border-radius:50%;background:${c};opacity:.95;box-shadow:0 0 10px ${c}55;"></span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function clusterIcon(cluster: L.MarkerCluster): L.DivIcon {
  const n = cluster.getChildCount();
  return L.divIcon({
    className: 'reference-map-cluster',
    html: `<div style="width:46px;height:46px;border-radius:50%;background:linear-gradient(145deg,rgba(22,22,22,.95),rgba(8,8,8,.98));border:2px solid rgba(197,160,89,.5);box-shadow:0 10px 32px rgba(0,0,0,.6),0 0 0 1px rgba(197,160,89,.12),inset 0 1px 0 rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:#e8d5a3;">${n}</div>`,
    iconSize: L.point(46, 46),
  });
}

/** Leaflet [lat, lon] — sadece Türkiye; kaydırma bu kutunun dışına çıkamaz */
const TR_BOUNDS: L.LatLngBoundsExpression = [
  [TURKEY_BBOX.minLat, TURKEY_BBOX.minLon],
  [TURKEY_BBOX.maxLat, TURKEY_BBOX.maxLon],
];

/* Filtre değişince fitBounds; aynı listede seçim değişince flyTo */
function MapCameraSync({
  projectKeys,
  selectedId,
  markers,
}: {
  projectKeys: string;
  selectedId: string | null;
  markers: ReadonlyArray<{ project: TurkeyReferenceProject; position: [number, number] }>;
}) {
  const map = useMap();
  const prevKeysRef = useRef<string | null>(null);

  useEffect(() => {
    if (markers.length === 0) {
      prevKeysRef.current = null;
      return;
    }

    const firstLoad = prevKeysRef.current === null;
    const keysChanged = prevKeysRef.current !== projectKeys;
    prevKeysRef.current = projectKeys;

    if (firstLoad || keysChanged) {
      map.fitBounds(TR_BOUNDS, { padding: [36, 36], maxZoom: 8, animate: !firstLoad });
      return;
    }

    if (!selectedId) return;
    const hit = markers.find((m) => m.project.id === selectedId);
    if (!hit) return;

    const z = Math.min(Math.max(map.getZoom(), 9), 11);
    map.flyTo(hit.position, z, { duration: 0.82, easeLinearity: 0.2 });
  }, [map, projectKeys, selectedId, markers]);

  return null;
}

function MapResizeFix() {
  const map = useMap();
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      map.invalidateSize();
      setTimeout(() => map.invalidateSize(), 250);
    });
    return () => cancelAnimationFrame(t);
  }, [map]);
  return null;
}

export function ReferenceMap({
  projects,
  selectedId,
  onSelect,
}: {
  projects: readonly TurkeyReferenceProject[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const keys = useMemo(() => projects.map((p) => p.id).join('|'), [projects]);

  const markers = useMemo(
    () =>
      projects.map((project) => {
        const plaka = project.plaka.padStart(2, '0');
        const { lat, lon } = getCentroidForPlaka(plaka);
        return { project, position: [lat, lon] as [number, number] };
      }),
    [projects]
  );

  return (
    <div className="reference-leaflet-map group/map relative h-[min(52vw,420px)] min-h-[300px] w-full overflow-hidden rounded-xl ring-1 ring-white/[0.06] transition-[box-shadow,ring-color] duration-500 ease-out hover:shadow-[0_0_0_1px_rgba(197,160,89,0.12),0_24px_48px_-24px_rgba(0,0,0,0.75)] hover:ring-[#c5a059]/30 sm:h-[min(48vw,460px)] sm:min-h-[340px]">
      <MapContainer
        center={[39.1, 35.2]}
        zoom={6}
        minZoom={5}
        maxZoom={14}
        maxBounds={TR_BOUNDS}
        maxBoundsViscosity={1}
        worldCopyJump={false}
        scrollWheelZoom
        className="z-0 h-full w-full [&_.leaflet-control-attribution]:rounded-md [&_.leaflet-control-attribution]:border [&_.leaflet-control-attribution]:border-white/10 [&_.leaflet-control-attribution]:bg-black/55 [&_.leaflet-control-attribution]:text-[10px] [&_.leaflet-control-attribution]:text-slate-500"
        style={{ background: '#0a0a0a' }}
        aria-label="Referans kayıtlarının haritadaki yeri"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          noWrap
        />

        <ZoomControl position="topright" />

        <MapCameraSync projectKeys={keys} selectedId={selectedId} markers={markers} />
        <MapResizeFix />

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={54}
          spiderfyOnMaxZoom
          showCoverageOnHover={false}
          zoomToBoundsOnClick
          removeOutsideVisibleBounds
          iconCreateFunction={clusterIcon}
        >
          {markers.map(({ project, position }) => {
            const sel = selectedId === project.id;
            return (
              <Marker
                key={project.id}
                position={position}
                icon={projectIcon(project, sel)}
                eventHandlers={{
                  click: () => onSelect(project.id),
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1} className="reference-map-tooltip">
                  <span className="line-clamp-2 max-w-[200px]">{project.mosqueName}</span>
                </Tooltip>
                <Popup>
                  <div className="min-w-[180px] max-w-[260px]">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-[#c5a059]/95">
                      {categoryLabelTr(project.category)}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold leading-snug text-neutral-100">{project.mosqueName}</p>
                    <p className="mt-1 text-xs leading-snug text-neutral-500">
                      {project.cityLabel}, plaka {project.plaka.padStart(2, '0')}
                      {project.period ? ` — ${project.period}` : ''}
                    </p>
                    <button
                      type="button"
                      onClick={() => onSelect(project.id)}
                      className="mt-3 w-full rounded-md border border-[#c5a059]/30 bg-[#c5a059]/[0.08] py-2 text-xs font-medium text-[#e8d5a3] transition hover:border-[#c5a059]/50 hover:bg-[#c5a059]/15"
                    >
                      Sağdaki kartta aç
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
      {/* Kurumsal derinlik: vignette + hafif marka sheen (etkileşimi engellemez) */}
      <div
        className="pointer-events-none absolute inset-0 z-[500] overflow-hidden rounded-[inherit]"
        aria-hidden
      >
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_0_80px_rgba(0,0,0,0.45)]" />
        <div className="map-sheen-overlay absolute inset-y-[-5%] left-0 opacity-[0.35]" />
        <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.04]" />
      </div>
    </div>
  );
}
