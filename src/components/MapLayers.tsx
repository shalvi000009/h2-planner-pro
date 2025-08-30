import React, { useMemo, useState } from 'react';

type Layers = {
  hydrogen: boolean;
  renewable: boolean;
  demand: boolean;
  transport: boolean;
};

const CATEGORY_META: {
  key: keyof Layers;
  label: string;
  colorClass: string;
  desc?: string;
}[] = [
  { key: 'hydrogen', label: 'Hydrogen Infrastructure', colorClass: 'bg-emerald-500', desc: 'Plants, storage, hubs' },
  { key: 'renewable', label: 'Renewable Energy', colorClass: 'bg-amber-400', desc: 'Wind, solar, hydro' },
  { key: 'demand', label: 'Demand Centers', colorClass: 'bg-red-500', desc: 'Cities, industrial, ports' },
  { key: 'transport', label: 'Transport Routes', colorClass: 'bg-sky-500', desc: 'Pipelines, rail, road' },
];

const MapLayers: React.FC<{
  layers: Layers;
  onLayerToggle: (layer: keyof Layers) => void;
}> = ({ layers, onLayerToggle }) => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    hydrogen: true,
    renewable: true,
    demand: true,
    transport: true,
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORY_META;
    return CATEGORY_META.filter(c => c.label.toLowerCase().includes(q) || (c.desc || '').toLowerCase().includes(q));
  }, [query]);

  const selectAll = () => {
    CATEGORY_META.forEach(c => {
      if (!layers[c.key]) onLayerToggle(c.key);
    });
  };

  const clearAll = () => {
    CATEGORY_META.forEach(c => {
      if (layers[c.key]) onLayerToggle(c.key);
    });
  };

  return (
    <aside className="absolute top-4 left-4 bottom-4 z-[1000] w-72">
      <div className="h-full bg-white backdrop-blur-sm shadow rounded-lg overflow-hidden text-black flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Filters</h4>
            <div className="flex items-center gap-2">
              <button onClick={selectAll} className="text-xs px-2 py-1 rounded bg-black text-white hover:opacity-90">Select all</button>
              <button onClick={clearAll} className="text-xs px-2 py-1 rounded bg-black text-white hover:opacity-90">Clear</button>
            </div>
          </div>
          <div className="mt-2">
            <input
              aria-label="Search filters"
              className="w-full border rounded px-2 py-1 text-sm text-black"
              placeholder="Search filters"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="p-2 overflow-auto flex-1">
          {filtered.map(cat => (
            <div key={cat.key} className="mb-2">
              <div className="w-full flex items-center justify-between px-3 py-2 text-sm">
                <button
                  type="button"
                  aria-expanded={expanded[cat.key] ? 'true' : 'false'}
                  onClick={() => setExpanded(prev => ({ ...prev, [cat.key]: !prev[cat.key] }))}
                  className="flex-1 flex items-center gap-3 text-left hover:bg-gray-50 p-0"
                >
                  <span className={`${cat.colorClass} inline-block w-3 h-3 rounded-full mr-3`} />
                  <div>
                    <div className="font-medium">{cat.label}</div>
                    {cat.desc && <div className="text-xs text-black">{cat.desc}</div>}
                  </div>
                </button>

                <div className="flex items-center gap-2 ml-3">
                  <input
                    id={`chk-${String(cat.key)}`}
                    type="checkbox"
                    checked={!!layers[cat.key]}
                    onChange={() => onLayerToggle(cat.key)}
                    aria-label={`Toggle ${cat.label}`}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <svg className={`w-4 h-4 transition-transform ${expanded[cat.key] ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {expanded[cat.key] && (
                <div className="px-4 py-2 text-xs text-gray-600">
                  <div>Quick toggle for {cat.label.toLowerCase()}.</div>
                  <div className="mt-2">Use the checkbox to show or hide this category on the map.</div>
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && <div className="text-sm text-gray-500 px-3 py-2">No filters match "{query}"</div>}
        </div>
      </div>
    </aside>
  );
};

export default MapLayers;
