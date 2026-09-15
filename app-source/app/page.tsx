'use client';

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  ChevronRight,
  Compass,
  MapPin,
  MousePointer2,
} from 'lucide-react';
import Link from 'next/link';

type PassportRegion =
  | 'Pacific Northwest & Alaska'
  | 'Western'
  | 'Rocky Mountain'
  | 'Southwest'
  | 'Midwest'
  | 'Southeast'
  | 'National Capital'
  | 'Mid-Atlantic'
  | 'North Atlantic';

type Region = {
  id: PassportRegion;
  short: string;
  color: string;
  ink: string;
  states: string[];
};

type StateTile = {
  code: string;
  region: PassportRegion;
  x: number;
  y: number;
  w?: number;
};

type ParkVisit = {
  name: string;
  kind: 'National Park' | 'State Park';
  region: PassportRegion;
  state: string;
  date: string;
  stampDate: string;
  place: string;
  visited: boolean;
  photos?: string[];
  note?: string;
};

const regions: Region[] = [
  {
    id: 'Pacific Northwest & Alaska',
    short: 'PNW + Alaska',
    color: '#2262a8',
    ink: '#153a69',
    states: ['AK', 'WA', 'OR', 'ID'],
  },
  {
    id: 'Western',
    short: 'Western',
    color: '#2f8f24',
    ink: '#1d5f17',
    states: ['CA', 'NV', 'AZ', 'HI'],
  },
  {
    id: 'Rocky Mountain',
    short: 'Rocky Mountain',
    color: '#f1c62a',
    ink: '#8a6b00',
    states: ['MT', 'WY', 'UT', 'CO'],
  },
  {
    id: 'Southwest',
    short: 'Southwest',
    color: '#aaa5a0',
    ink: '#5d5a55',
    states: ['NM', 'TX', 'OK', 'AR', 'LA'],
  },
  {
    id: 'Midwest',
    short: 'Midwest',
    color: '#f05a32',
    ink: '#8d2b17',
    states: ['ND', 'SD', 'NE', 'KS', 'MN', 'IA', 'MO', 'WI', 'IL', 'IN', 'MI', 'OH'],
  },
  {
    id: 'Southeast',
    short: 'Southeast',
    color: '#9740a5',
    ink: '#5b2063',
    states: ['KY', 'TN', 'MS', 'AL', 'GA', 'FL', 'SC', 'NC', 'PR', 'VI'],
  },
  {
    id: 'National Capital',
    short: 'Capital',
    color: '#d94232',
    ink: '#8a261f',
    states: ['DC'],
  },
  {
    id: 'Mid-Atlantic',
    short: 'Mid-Atlantic',
    color: '#cfe4f7',
    ink: '#50708b',
    states: ['PA', 'DE', 'MD', 'VA', 'WV'],
  },
  {
    id: 'North Atlantic',
    short: 'North Atlantic',
    color: '#f0a221',
    ink: '#946111',
    states: ['ME', 'VT', 'NH', 'MA', 'RI', 'CT', 'NY', 'NJ'],
  },
];

const stateTiles: StateTile[] = [
  { code: 'WA', region: 'Pacific Northwest & Alaska', x: 1, y: 2 },
  { code: 'OR', region: 'Pacific Northwest & Alaska', x: 1, y: 3 },
  { code: 'CA', region: 'Western', x: 1, y: 4, w: 1.15 },
  { code: 'ID', region: 'Pacific Northwest & Alaska', x: 2, y: 3 },
  { code: 'NV', region: 'Western', x: 2, y: 4 },
  { code: 'AZ', region: 'Western', x: 2, y: 5 },
  { code: 'MT', region: 'Rocky Mountain', x: 3, y: 2 },
  { code: 'WY', region: 'Rocky Mountain', x: 3, y: 3 },
  { code: 'UT', region: 'Rocky Mountain', x: 3, y: 4 },
  { code: 'CO', region: 'Rocky Mountain', x: 4, y: 4 },
  { code: 'NM', region: 'Southwest', x: 4, y: 5 },
  { code: 'ND', region: 'Midwest', x: 5, y: 2 },
  { code: 'SD', region: 'Midwest', x: 5, y: 3 },
  { code: 'NE', region: 'Midwest', x: 5, y: 4 },
  { code: 'KS', region: 'Midwest', x: 5, y: 5 },
  { code: 'OK', region: 'Southwest', x: 5, y: 6 },
  { code: 'TX', region: 'Southwest', x: 5.3, y: 7, w: 1.4 },
  { code: 'MN', region: 'Midwest', x: 6, y: 2 },
  { code: 'IA', region: 'Midwest', x: 6, y: 4 },
  { code: 'MO', region: 'Midwest', x: 6, y: 5 },
  { code: 'AR', region: 'Southwest', x: 6, y: 6 },
  { code: 'LA', region: 'Southwest', x: 6.2, y: 7 },
  { code: 'WI', region: 'Midwest', x: 7, y: 3 },
  { code: 'IL', region: 'Midwest', x: 7, y: 4 },
  { code: 'IN', region: 'Midwest', x: 8, y: 4 },
  { code: 'MI', region: 'Midwest', x: 8, y: 3 },
  { code: 'OH', region: 'Midwest', x: 9, y: 4 },
  { code: 'KY', region: 'Southeast', x: 8, y: 5 },
  { code: 'TN', region: 'Southeast', x: 8, y: 6, w: 1.5 },
  { code: 'MS', region: 'Southeast', x: 7, y: 7 },
  { code: 'AL', region: 'Southeast', x: 8, y: 7 },
  { code: 'GA', region: 'Southeast', x: 9, y: 7 },
  { code: 'FL', region: 'Southeast', x: 9.3, y: 8, w: 1.4 },
  { code: 'SC', region: 'Southeast', x: 10, y: 6.8 },
  { code: 'NC', region: 'Southeast', x: 10, y: 6 },
  { code: 'WV', region: 'Mid-Atlantic', x: 9, y: 5 },
  { code: 'VA', region: 'Mid-Atlantic', x: 10, y: 5.5 },
  { code: 'PA', region: 'Mid-Atlantic', x: 10, y: 4 },
  { code: 'MD', region: 'Mid-Atlantic', x: 11, y: 5.2 },
  { code: 'DE', region: 'Mid-Atlantic', x: 11.65, y: 5.15 },
  { code: 'DC', region: 'National Capital', x: 11.35, y: 5.55 },
  { code: 'NY', region: 'North Atlantic', x: 11, y: 3 },
  { code: 'NJ', region: 'North Atlantic', x: 11.7, y: 4.3 },
  { code: 'CT', region: 'North Atlantic', x: 12.3, y: 3.9 },
  { code: 'RI', region: 'North Atlantic', x: 12.9, y: 3.85 },
  { code: 'MA', region: 'North Atlantic', x: 12.45, y: 3.25 },
  { code: 'VT', region: 'North Atlantic', x: 12, y: 2.35 },
  { code: 'NH', region: 'North Atlantic', x: 12.6, y: 2.35 },
  { code: 'ME', region: 'North Atlantic', x: 13.2, y: 1.65 },
  { code: 'AK', region: 'Pacific Northwest & Alaska', x: 1.2, y: 8.3, w: 1.35 },
  { code: 'HI', region: 'Western', x: 3.1, y: 8.65, w: 1.1 },
];

const nationalParks = [
  'Acadia',
  'Arches',
  'Badlands',
  'Big Bend',
  'Bryce Canyon',
  'Canyonlands',
  'Capitol Reef',
  'Carlsbad Caverns',
  'Channel Islands',
  'Crater Lake',
  'Death Valley',
  'Denali',
  'Everglades',
  'Gateway Arch',
  'Glacier',
  'Grand Canyon',
  'Grand Teton',
  'Great Basin',
  'Great Smoky Mountains',
  'Haleakala',
  'Hawaii Volcanoes',
  'Joshua Tree',
  'Kings Canyon',
  'Lassen Volcanic',
  'Mesa Verde',
  'Mount Rainier',
  'Olympic',
  'Petrified Forest',
  'Pinnacles',
  'Redwood',
  'Rocky Mountain',
  'Saguaro',
  'Sequoia',
  'Shenandoah',
  'White Sands',
  'Wind Cave',
  'Yellowstone',
  'Yosemite',
  'Zion',
];

const visits: ParkVisit[] = [
  {
    name: 'Zion',
    kind: 'National Park',
    region: 'Rocky Mountain',
    state: 'UT',
    date: '2026-09-02',
    stampDate: 'SEP 02 2026',
    place: 'Springdale, Utah',
    visited: true,
    photos: ['/images/zion-adventure.jpeg'],
    note: 'A warm canyon evening, red wall after red wall, and the little bison keychains in the foreground.',
  },
  { name: 'Yosemite', kind: 'National Park', region: 'Western', state: 'CA', date: '2025-06-14', stampDate: 'JUN 14 2025', place: 'Yosemite Valley, CA', visited: true },
  { name: 'Sequoia', kind: 'National Park', region: 'Western', state: 'CA', date: '2025-07-04', stampDate: 'JUL 04 2025', place: 'Three Rivers, CA', visited: true },
  { name: 'Kings Canyon', kind: 'National Park', region: 'Western', state: 'CA', date: '2025-07-05', stampDate: 'JUL 05 2025', place: 'Grant Grove, CA', visited: true },
  { name: 'Joshua Tree', kind: 'National Park', region: 'Western', state: 'CA', date: '2025-11-18', stampDate: 'NOV 18 2025', place: 'Twentynine Palms, CA', visited: true },
  { name: 'Pinnacles', kind: 'National Park', region: 'Western', state: 'CA', date: '2026-02-09', stampDate: 'FEB 09 2026', place: 'Paicines, CA', visited: true },
  { name: 'Redwood', kind: 'National Park', region: 'Western', state: 'CA', date: '2026-03-21', stampDate: 'MAR 21 2026', place: 'Crescent City, CA', visited: true },
  { name: 'Death Valley', kind: 'National Park', region: 'Western', state: 'CA', date: '2026-04-12', stampDate: 'APR 12 2026', place: 'Furnace Creek, CA', visited: true },
  { name: 'Lassen Volcanic', kind: 'National Park', region: 'Western', state: 'CA', date: '2026-05-24', stampDate: 'MAY 24 2026', place: 'Mineral, CA', visited: true },
  { name: 'Channel Islands', kind: 'National Park', region: 'Western', state: 'CA', date: '2026-06-08', stampDate: 'JUN 08 2026', place: 'Ventura, CA', visited: true },
  { name: 'Big Basin Redwoods', kind: 'State Park', region: 'Western', state: 'CA', date: '2026-01-20', stampDate: 'JAN 20 2026', place: 'Boulder Creek, CA', visited: true },
  { name: 'Anza-Borrego Desert', kind: 'State Park', region: 'Western', state: 'CA', date: '2026-03-02', stampDate: 'MAR 02 2026', place: 'Borrego Springs, CA', visited: true },
  { name: 'Mount Tamalpais', kind: 'State Park', region: 'Western', state: 'CA', date: '2026-04-26', stampDate: 'APR 26 2026', place: 'Mill Valley, CA', visited: true },
  { name: 'Point Lobos', kind: 'State Park', region: 'Western', state: 'CA', date: '2026-07-19', stampDate: 'JUL 19 2026', place: 'Carmel, CA', visited: true },
];

const sourceNotes = [
  'Passport regions follow the official Passport To Your National Parks regional system.',
  'Cancellation locations list was checked from America’s National Parks on Sep 15, 2026.',
  'Zion photo metadata read locally: JPEG, iPhone 17 Pro Max, 5712 x 4284, created Sep 2, 2026.',
];

function getRegion(id: PassportRegion) {
  return regions.find((region) => region.id === id)!;
}

function countVisits(regionId: PassportRegion) {
  return visits.filter((visit) => visit.region === regionId && visit.visited).length;
}

function CancellationStamp({ visit }: { visit: ParkVisit }) {
  const region = getRegion(visit.region);

  return (
    <div className="cancellation-stamp" style={{ '--stamp-ink': region.ink } as React.CSSProperties}>
      <span className="stamp-ring">Passport</span>
      <strong>{visit.name}</strong>
      <em>{visit.kind}</em>
      <b>{visit.stampDate}</b>
      <small>{visit.place}</small>
    </div>
  );
}

function PassportMap({
  selectedRegion,
  onSelectRegion,
}: {
  selectedRegion: PassportRegion;
  onSelectRegion: (region: PassportRegion) => void;
}) {
  return (
    <div className="map-panel">
      <svg className="passport-map" viewBox="0 0 920 610" role="img" aria-label="United States Passport region map">
        <defs>
          <filter id="paper-lift" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="5" floodColor="#2b2418" floodOpacity=".18" />
          </filter>
        </defs>
        <path className="map-paper" d="M70 130 C210 60 370 74 510 96 C653 119 746 95 828 154 C890 198 862 316 786 364 C698 419 560 397 449 430 C330 466 166 476 91 394 C18 315 18 173 70 130Z" />
        {stateTiles.map((state) => {
          const region = getRegion(state.region);
          const regionVisits = countVisits(region.id);
          const isSelected = selectedRegion === region.id;
          const opacity = Math.min(0.92, 0.28 + regionVisits * 0.12);

          return (
            <g
              key={state.code}
              className="state-hitbox"
              role="button"
              tabIndex={0}
              aria-label={`${state.code}, ${region.id}`}
              onClick={() => onSelectRegion(region.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') onSelectRegion(region.id);
              }}
            >
              <rect
                x={state.x * 58}
                y={state.y * 50}
                width={(state.w ?? 1) * 54}
                height="45"
                rx="12"
                fill={region.color}
                opacity={opacity}
                stroke={isSelected ? '#261a12' : '#55412a'}
                strokeWidth={isSelected ? 3 : 1.25}
                filter="url(#paper-lift)"
              />
              <text x={state.x * 58 + ((state.w ?? 1) * 27)} y={state.y * 50 + 29} textAnchor="middle">
                {state.code}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="map-legend">
        {regions.map((region) => (
          <button
            key={region.id}
            className={selectedRegion === region.id ? 'selected' : ''}
            onClick={() => onSelectRegion(region.id)}
            type="button"
          >
            <span style={{ backgroundColor: region.color }} />
            {region.short}
            <b>{countVisits(region.id)}</b>
          </button>
        ))}
      </div>
    </div>
  );
}

function ParkBadge({ name, lit }: { name: string; lit: boolean }) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 3);

  return (
    <div className={lit ? 'park-badge lit' : 'park-badge'} aria-label={`${name}${lit ? ', visited' : ''}`}>
      <span>{initials}</span>
      <small>{name}</small>
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<PassportRegion>('Western');
  const [turning, setTurning] = useState<'forward' | 'backward'>('forward');

  const nationalVisited = useMemo(
    () => new Set(visits.filter((visit) => visit.kind === 'National Park' && visit.visited).map((visit) => visit.name)),
    [],
  );
  const stateVisited = visits.filter((visit) => visit.kind === 'State Park' && visit.visited).length;
  const selectedVisits = visits.filter((visit) => visit.region === selectedRegion && visit.visited);
  const zion = visits[0];
  const maxPage = 4;

  function flip(nextPage: number) {
    const bounded = Math.max(0, Math.min(maxPage, nextPage));
    setTurning(bounded >= page ? 'forward' : 'backward');
    setPage(bounded);
  }

  function openRegion(region: PassportRegion) {
    setSelectedRegion(region);
    flip(2);
  }

  return (
    <main className="adventure-desk">
      <header className="site-masthead">
        <Link className="site-mark" href="/">
          Alice&apos;s Adventure Book
          <span>National parks, state parks, stamps, photographs</span>
        </Link>
        <div className="shelf-counts" aria-label="Current collection counts">
          <span>
            <b>{nationalVisited.size}</b> / 63 national parks
          </span>
          <span>
            <b>{stateVisited}</b> state parks
          </span>
        </div>
      </header>

      <section className={`adventure-book page-${page} ${turning}`} aria-label="Digital flip book">
        <div className="book-cord" aria-hidden="true" />
        <div className="book-spine" aria-hidden="true" />

        {page === 0 && (
          <div className="cover-spread">
            <div className="inside-cover">
              <div className="balloon-cluster" aria-hidden="true">
                {Array.from({ length: 28 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
              <strong>Adventure starts with one stamp.</strong>
            </div>
            <article className="front-cover">
              <div className="corner top" />
              <div className="corner bottom" />
              <div className="cover-title">
                <span>Alice&apos;s</span>
                <h1>
                  <span className="cover-word">Adventure</span>
                  <span className="cover-word">Book</span>
                </h1>
              </div>
              <div className="cover-medallion" aria-hidden="true">
                <Compass size={36} />
              </div>
            </article>
          </div>
        )}

        {page === 1 && (
          <div className="paper-spread">
            <article className="book-page map-left">
              <p className="page-kicker">Passport map</p>
              <h2>Color by region, shade by memory.</h2>
              <p className="book-copy">
                The darker a region gets, the more visits Alice has collected there. Pick a region to open its page.
              </p>
              <div className="source-slip">
                {sourceNotes.map((note) => (
                  <span key={note}>{note}</span>
                ))}
              </div>
            </article>
            <article className="book-page map-right">
              <PassportMap selectedRegion={selectedRegion} onSelectRegion={openRegion} />
            </article>
          </div>
        )}

        {page === 2 && (
          <div className="paper-spread">
            <article className="book-page region-page">
              <p className="page-kicker">Opened region</p>
              <h2>{selectedRegion}</h2>
              <p className="book-copy">
                {selectedVisits.length} saved visits here. California is intentionally heavy for now, with Zion pinned as
                the first 2026 canyon page.
              </p>
              <PassportMap selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
            </article>
            <article className="book-page region-list-page">
              <div className="region-tabs">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    type="button"
                    className={selectedRegion === region.id ? 'active' : ''}
                    onClick={() => setSelectedRegion(region.id)}
                  >
                    <span style={{ backgroundColor: region.color }} />
                    {region.short}
                  </button>
                ))}
              </div>
              <div className="visit-ledger">
                {selectedVisits.map((visit) => (
                  <button
                    key={visit.name}
                    type="button"
                    onClick={() => visit.name === 'Zion' && flip(3)}
                    className={visit.name === 'Zion' ? 'featured' : ''}
                  >
                    <MapPin size={15} />
                    <span>
                      <strong>{visit.name}</strong>
                      <small>
                        {visit.kind} · {visit.place}
                      </small>
                    </span>
                    <ChevronRight size={16} />
                  </button>
                ))}
                {!selectedVisits.length && <p className="quiet-note">A clean page, waiting for a stamp.</p>}
              </div>
            </article>
          </div>
        )}

        {page === 3 && (
          <div className="paper-spread">
            <article className="book-page zion-photo-page">
              <p className="page-kicker">Sep 2, 2026</p>
              <h2>Zion</h2>
              <button className="polaroid" type="button" aria-label="Zion photograph">
                <img src={zion.photos?.[0]} alt="Zion canyon photograph from Alice's trip" />
                <span>IMG_3105 · Zion canyon</span>
              </button>
              <p className="metadata-line">
                <Camera size={14} />
                iPhone 17 Pro Max · JPEG · 5712 x 4284
              </p>
            </article>
            <article className="book-page zion-notes-page">
              <p className="page-kicker">Cancellation page</p>
              <h2>Stamped into the book.</h2>
              <p className="book-copy">{zion.note}</p>
              <div className="stamp-placement">
                <CancellationStamp visit={zion} />
              </div>
              <div className="tiny-photo-stack" aria-hidden="true">
                <img src={zion.photos?.[0]} alt="" />
                <img src={zion.photos?.[0]} alt="" />
              </div>
            </article>
          </div>
        )}

        {page === 4 && (
          <div className="paper-spread collection-spread">
            <article className="book-page">
              <p className="page-kicker">Collection</p>
              <h2>{nationalVisited.size} of 63 U.S. National Parks</h2>
              <p className="book-copy">
                Visited badges light up; unvisited ones stay pressed into the dark paper until Alice gets there.
              </p>
              <div className="mini-stats">
                <span>
                  <b>{nationalVisited.size}</b> national parks
                </span>
                <span>
                  <b>{stateVisited}</b> state parks
                </span>
              </div>
            </article>
            <article className="book-page badge-page">
              <div className="badge-grid">
                {nationalParks.map((park) => (
                  <ParkBadge key={park} name={park} lit={nationalVisited.has(park)} />
                ))}
              </div>
            </article>
          </div>
        )}
      </section>

      <nav className="book-controls" aria-label="Flip book controls">
        <button type="button" onClick={() => flip(page - 1)} disabled={page === 0} aria-label="Previous page">
          <ArrowLeft size={18} />
        </button>
        <div>
          <BookOpen size={16} />
          <span>{page === 0 ? 'Cover' : `Spread ${page} / ${maxPage}`}</span>
        </div>
        <button type="button" onClick={() => flip(page + 1)} disabled={page === maxPage} aria-label="Next page">
          <ArrowRight size={18} />
        </button>
      </nav>

      <footer className="site-footer">
        <span>
          <MousePointer2 size={14} />
          Click the map regions, then flip through the stamps.
        </span>
        <a href="https://github.com/floweralicee/travel-zine">GitHub</a>
      </footer>
    </main>
  );
}
