'use client';

import { useAtom, useAtomValue } from 'jotai';
import { Flag } from 'lucide-react';

import { availableCountriesAtom, selectedCountryAtom } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const flagMap = [
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'New Zealand', flag: '🇳🇿' },
];

const FlagPicker = () => {
  const [selectedCountry, setSelectedCountry] = useAtom(selectedCountryAtom);
  const availableCountries = useAtomValue(availableCountriesAtom);

  const selectedFlag = flagMap.find((f) => f.name === selectedCountry)
    ?.flag || <Flag className="h-4 w-4" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {selectedFlag}
          <span className="sr-only">Select country</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableCountries.map((country) => (
          <DropdownMenuItem
            key={country}
            onClick={() => setSelectedCountry(country)}
          >
            <span className="mr-2">
              {flagMap.find((f) => f.name === country)?.flag}
            </span>
            {country}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FlagPicker;
