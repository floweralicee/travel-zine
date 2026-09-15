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
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import statesTopology from 'us-atlas/states-10m.json';

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

const stateCodesByFips: Record<string, string> = {
  '01': 'AL',
  '02': 'AK',
  '04': 'AZ',
  '05': 'AR',
  '06': 'CA',
  '08': 'CO',
  '09': 'CT',
  '10': 'DE',
  '11': 'DC',
  '12': 'FL',
  '13': 'GA',
  '15': 'HI',
  '16': 'ID',
  '17': 'IL',
  '18': 'IN',
  '19': 'IA',
  '20': 'KS',
  '21': 'KY',
  '22': 'LA',
  '23': 'ME',
  '24': 'MD',
  '25': 'MA',
  '26': 'MI',
  '27': 'MN',
  '28': 'MS',
  '29': 'MO',
  '30': 'MT',
  '31': 'NE',
  '32': 'NV',
  '33': 'NH',
  '34': 'NJ',
  '35': 'NM',
  '36': 'NY',
  '37': 'NC',
  '38': 'ND',
  '39': 'OH',
  '40': 'OK',
  '41': 'OR',
  '42': 'PA',
  '44': 'RI',
  '45': 'SC',
  '46': 'SD',
  '47': 'TN',
  '48': 'TX',
  '49': 'UT',
  '50': 'VT',
  '51': 'VA',
  '53': 'WA',
  '54': 'WV',
  '55': 'WI',
  '56': 'WY',
  '72': 'PR',
};

const stateNamesByCode: Record<string, string> = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  PR: 'Puerto Rico',
};

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

function getRegionForState(stateCode: string) {
  return regions.find((region) => region.states.includes(stateCode));
}

function countStateVisits(stateCode: string) {
  return visits.filter((visit) => visit.state === stateCode && visit.visited).length;
}

function CancellationStamp({ visit }: { visit: ParkVisit }) {
  const region = getRegion(visit.region);
  const stampId = `stamp-${visit.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const parkName = `${visit.name} ${visit.kind}`.toUpperCase();
  const location = visit.place.toUpperCase();

  return (
    <svg
      className="cancellation-stamp"
      viewBox="0 0 220 220"
      role="img"
      aria-label={`${parkName}, ${visit.stampDate}, ${location}`}
      style={{ '--stamp-ink': region.ink } as React.CSSProperties}
    >
      <defs>
        <path id={`${stampId}-topArc`} d="M 31 110 A 79 79 0 0 1 189 110" />
        <path id={`${stampId}-bottomArc`} d="M 189 110 A 79 79 0 0 1 31 110" />
        <filter id={`${stampId}-ink`} x="-14%" y="-14%" width="128%" height="128%">
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.15" xChannelSelector="R" yChannelSelector="G" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 .2 .48 .72 .92 1" />
          </feComponentTransfer>
        </filter>
        <mask id={`${stampId}-wear`}>
          <rect width="220" height="220" fill="white" />
          <circle cx="60" cy="60" r="18" fill="black" opacity=".1" />
          <circle cx="151" cy="69" r="14" fill="black" opacity=".08" />
          <path d="M36 149 C72 137 98 160 133 151 C155 146 170 153 186 163" stroke="black" strokeWidth="9" opacity=".08" fill="none" />
          <path d="M47 90 C87 100 118 77 174 91" stroke="black" strokeWidth="5" opacity=".06" fill="none" />
        </mask>
      </defs>
      <g className="stamp-ink" filter={`url(#${stampId}-ink)`} mask={`url(#${stampId}-wear)`}>
        <circle className="stamp-ring-outer" cx="110" cy="110" r="88" />
        <circle className="stamp-ring-inner" cx="110" cy="110" r="70" />
        <text className="stamp-arc stamp-arc-top">
          <textPath href={`#${stampId}-topArc`} startOffset="50%" textAnchor="middle">
            {parkName}
          </textPath>
        </text>
        <text className="stamp-date" x="110" y="118" textAnchor="middle">
          {visit.stampDate}
        </text>
        <text className="stamp-arc stamp-arc-bottom">
          <textPath href={`#${stampId}-bottomArc`} startOffset="50%" textAnchor="middle">
            {location}
          </textPath>
        </text>
      </g>
    </svg>
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
      <ComposableMap
        className="passport-map"
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 980 }}
        role="img"
        aria-label="United States Passport region map"
      >
        <Geographies geography={statesTopology}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const fips = String(geo.id).padStart(2, '0');
              const stateCode = stateCodesByFips[fips];
              const region = stateCode ? getRegionForState(stateCode) : undefined;
              const stateVisits = stateCode ? countStateVisits(stateCode) : 0;
              const isSelected = region?.id === selectedRegion;
              const fill = region ? region.color : '#ded2bd';
              const opacity = stateVisits > 0 ? Math.min(0.96, 0.58 + stateVisits * 0.07) : 0.32;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className="state-geography"
                  tabIndex={region ? 0 : -1}
                  fill={fill}
                  fillOpacity={opacity}
                  stroke={isSelected ? '#3A2E24' : '#78644d'}
                  strokeWidth={isSelected ? 1.2 : 0.55}
                  aria-label={`${stateNamesByCode[stateCode] ?? 'State'}${region ? `, ${region.id}` : ''}${
                    stateVisits ? `, ${stateVisits} visits` : ''
                  }`}
                  onClick={() => region && onSelectRegion(region.id)}
                  onKeyDown={(event) => {
                    if (region && (event.key === 'Enter' || event.key === ' ')) onSelectRegion(region.id);
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
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
    <main className={`adventure-desk ${page === 0 ? 'intro-mode' : 'reading-mode'}`}>
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
        {page > 0 && <div className="book-cord" aria-hidden="true" />}
        {page > 0 && <div className="book-spine" aria-hidden="true" />}

        {page === 0 && (
          <div className="closed-book-scene">
            <button className="closed-book" type="button" onClick={() => flip(1)} aria-label="Open Alice's Adventure Book">
              <span className="closed-spine">
                <i />
                <i />
              </span>
              <span className="closed-cover">
                <span className="closed-corner top" />
                <span className="closed-corner bottom" />
                <span className="closed-lines top" />
                <span className="closed-lines bottom" />
                <span className="closed-oval" />
                <span className="closed-title" aria-hidden="true">
                  <span>
                    <b>A</b>
                    <b>l</b>
                    <b>i</b>
                    <b>c</b>
                    <b>e</b>
                    <b>&apos;s</b>
                  </span>
                  <span>
                    <b>A</b>
                    <b>d</b>
                    <b>v</b>
                    <b>e</b>
                    <b>n</b>
                    <b>t</b>
                    <b>u</b>
                    <b>r</b>
                    <b>e</b>
                  </span>
                  <span>
                    <b>B</b>
                    <b>o</b>
                    <b>o</b>
                    <b>k</b>
                  </span>
                </span>
                <span className="map-sticker" aria-hidden="true">
                  <Compass size={26} />
                </span>
              </span>
              <span className="closed-rope one" />
              <span className="closed-rope two" />
              <span className="closed-rope three" />
            </button>
            <p>Click to open</p>
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

      {page > 0 && <nav className="book-controls" aria-label="Flip book controls">
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
      </nav>}

      {page > 0 && <footer className="site-footer">
        <span>
          <MousePointer2 size={14} />
          Click the map regions, then flip through the stamps.
        </span>
        <a href="https://github.com/floweralicee/travel-zine">GitHub</a>
      </footer>}
    </main>
  );
}
