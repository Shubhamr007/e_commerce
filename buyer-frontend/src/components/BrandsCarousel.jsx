import React, { useEffect, useState } from 'react';

const BRANDS = [
  { name: 'UltraCem', logo: '/brands/ultracem.png' },
  { name: 'BuildPro', logo: '/brands/buildpro.png' },
  { name: 'CementCo', logo: '/brands/cementco.png' },
  { name: 'SteelMax', logo: '/brands/steelmax.png' },
  { name: 'Paintify', logo: '/brands/paintify.png' },
  { name: 'TilesHub', logo: '/brands/tileshub.png' },
  { name: 'PlumbRight', logo: '/brands/plumbright.png' },
  { name: 'WoodWorks', logo: '/brands/woodworks.png' },
];

export default function BrandsCarousel() {
  // In real app, fetch from API
  const [brands, setBrands] = useState(BRANDS);

  return (
    <div className="w-full my-6">
      <h2 className="text-lg font-semibold mb-2 text-indigo-700">Trusted Brands</h2>
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-100">
        {brands.map((brand) => (
          <div key={brand.name} className="min-w-[120px] bg-white rounded-xl shadow p-3 flex flex-col items-center justify-center border border-gray-100 hover:border-yellow-400 transition-all duration-200 ease-in-out cursor-pointer">
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-20 h-12 object-contain mb-2"
              onError={e => (e.target.src = '/vite.svg')}
            />
            <span className="text-xs font-medium text-gray-700 text-center">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
