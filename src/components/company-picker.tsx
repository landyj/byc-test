'use client';

import { useEffect, useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { Circle } from 'lucide-react';

import { popularCompaniesMap } from '@/lib/data';
import {
  availableCompaniesAtom,
  selectedCompanyAtom,
  selectedCountryAtom,
} from '@/lib/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Favicon from './favicon';

export default function CompanyPicker() {
  const selectedCountry = useAtomValue(selectedCountryAtom);
  const availableCompanies = useAtomValue(availableCompaniesAtom);
  const [selectedCompany, setSelectedCompany] = useAtom(selectedCompanyAtom);

  const popularCompanies = useMemo(
    () => (selectedCountry ? popularCompaniesMap[selectedCountry] || [] : []),
    [selectedCountry]
  );

  const otherCompanies = availableCompanies.filter(
    (company) =>
      !popularCompanies.some(
        (popularCompany) => popularCompany.name === company
      )
  );

  const handleCompanySelect = (company: string) => {
    setSelectedCompany(company);
  };

  useEffect(() => {
    if (
      selectedCompany &&
      !popularCompanies.some((pc) => pc.name === selectedCompany) &&
      !otherCompanies.includes(selectedCompany)
    ) {
      setSelectedCompany(undefined);
    }
  }, [
    selectedCountry,
    popularCompanies,
    otherCompanies,
    selectedCompany,
    setSelectedCompany,
  ]);

  return (
    <div className="space-y-4">
      <Label className="sm:text-md text-sm font-semibold">
        Select Insurance Company
      </Label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {popularCompanies.map((company) => (
          <Button
            key={company.name}
            type="button"
            variant="outline"
            className="flex h-10 w-full items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            onClick={() => handleCompanySelect(company.name)}
          >
            <div
              className={cn(
                'mr-2 aspect-square h-4 w-4 rounded-full border border-primary text-primary',
                selectedCompany === company.name
                  ? 'border-primary'
                  : 'border-muted-foreground group-hover:border-primary'
              )}
            >
              {selectedCompany === company.name && (
                <div className="flex h-full w-full items-center justify-center">
                  <Circle className="h-2.5 w-2.5 fill-current text-current" />
                </div>
              )}
            </div>

            {company.url && (
              <Favicon
                url={company.url}
                alt={company.name}
                className="mr-2 rounded-sm"
              />
            )}
            <span className="truncate">{company.name}</span>
          </Button>
        ))}

        {!!otherCompanies.length && (
          <Select
            value={
              otherCompanies.includes(selectedCompany || '')
                ? selectedCompany
                : ''
            }
            onValueChange={handleCompanySelect}
          >
            <SelectTrigger className="justify-between">
              <div className="flex items-center justify-center">
                <div
                  className={cn(
                    'mr-2 aspect-square h-4 w-4 rounded-full border border-primary text-primary',
                    otherCompanies.includes(selectedCompany || '')
                      ? 'border-primary'
                      : 'border-muted-foreground group-hover:border-primary'
                  )}
                >
                  {otherCompanies.includes(selectedCompany || '') && (
                    <div className="flex h-full w-full items-center justify-center">
                      <Circle className="h-2.5 w-2.5 fill-current text-current" />
                    </div>
                  )}
                </div>
                <SelectValue placeholder="Other" />
              </div>
            </SelectTrigger>

            <SelectContent>
              {otherCompanies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
