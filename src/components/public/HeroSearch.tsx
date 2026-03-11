'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/common/Button';

export function HeroSearch() {
  return (
    <div className="relative z-20 -mt-8 mx-auto max-w-5xl px-4">
      <div className="bg-white rounded-xl shadow-2xl p-2 flex flex-col md:flex-row items-center gap-2 w-full border border-slate-200">
        
        {/* Buy/Rent Dropdown */}
        <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-slate-200 px-4 py-2">
          <select className="w-full bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer appearance-none">
            <option>Buy</option>
            <option>Rent</option>
          </select>
        </div>

        {/* Localities Dropdown */}
        <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-slate-200 px-4 py-2">
          <select className="w-full bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer appearance-none">
            <option>All Localities</option>
            <option>Gachibowli</option>
            <option>Kondapur</option>
            <option>Banjara Hills</option>
          </select>
        </div>

        {/* BHK Dropdown */}
        <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-slate-200 px-4 py-2">
          <select className="w-full bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer appearance-none">
            <option>Any BHK</option>
            <option>1 BHK</option>
            <option>2 BHK</option>
            <option>3 BHK</option>
            <option>4+ BHK</option>
          </select>
        </div>

        {/* Budget Input */}
        <div className="flex-2 w-full px-4 py-2">
          <input 
            type="text" 
            placeholder="Budget (e.g. ₹50L)" 
            className="w-full bg-transparent text-slate-700 focus:outline-none placeholder-slate-400"
          />
        </div>

        {/* Search Button */}
        <div className="w-full md:w-auto px-2 pb-2 md:pb-0 pt-2 md:pt-0">
          <Button className="w-full md:w-auto bg-[#312061] hover:bg-[#201540] text-white rounded-lg px-8 py-6 text-lg font-bold">
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>
        
      </div>
    </div>
  );
}
