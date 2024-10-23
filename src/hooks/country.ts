import { useEffect } from 'react';
import { useAtom } from 'jotai';

import { CountryKey, validCountries } from '@/lib/data';
import { selectedCountryAtom } from '@/lib/store';

const fetchUserCountry = async (): Promise<CountryKey> => {
  const storedCountry = localStorage.getItem('country');
  if (storedCountry && validCountries.includes(storedCountry as CountryKey)) {
    return storedCountry as CountryKey;
  }

  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const name = data.country_name;

    if (!validCountries.includes(name)) {
      throw new Error(`Unsupported country: ${name}`);
    }

    if (!name) {
      throw new Error(`No country found`);
    }

    localStorage.setItem('country', name);

    return name as CountryKey;
  } catch (error) {
    console.error('Error fetching user country:', error);
    return 'Australia';
  }
};

const useCountry = () => {
  const [selectedCountry, setSelectedCountry] = useAtom(selectedCountryAtom);

  useEffect(() => {
    const initializeCountry = async () => {
      if (!selectedCountry) {
        const country = await fetchUserCountry();
        setSelectedCountry(country);
      }
    };

    initializeCountry();
  }, [selectedCountry, setSelectedCountry]);

  return [selectedCountry, setSelectedCountry] as const;
};

export { useCountry };
