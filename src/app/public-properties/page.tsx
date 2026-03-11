'use client';

import * as React from 'react';
import axios from 'axios';
import { Building2, MapPin, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';

export default function PublicPropertiesPage() {
  const [properties, setProperties] = React.useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProps = async () => {
      try {
        const url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/properties';
        const res = await axios.get(url);
        setProperties(res.data);
      } catch (err) {
        console.error('Failed to load properties', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProps();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Featured Properties</h1>
        
        {isLoading ? (
          <div className="text-slate-500 animate-pulse">Loading amazing properties...</div>
        ) : properties.length === 0 ? (
          <div className="text-slate-500 text-center py-10 bg-white rounded-xl shadow-sm w-full border border-slate-200">
            No properties listed yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden group hover:shadow-xl transition-all">
                <div className="h-56 bg-slate-200 relative overflow-hidden flex items-center justify-center">
                  {property.images && property.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={property.images[0]} alt={property.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <Building2 className="w-16 h-16 text-slate-400" />
                  )}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    ₹{property.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-1 mb-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-6">
                    {property.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center text-sm font-medium text-slate-800">
                      <Tag className="w-4 h-4 mr-2 text-slate-400" />
                      {property.builderName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
