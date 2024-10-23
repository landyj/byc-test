'use client';

import bycData from '~/docs.json';
import { atom } from 'jotai';

import { CountryKey, InsurancePolicy, parseDocuments } from './data';

export const dataAtom = atom<InsurancePolicy[]>(parseDocuments(bycData));

export const selectedCountryAtom = atom<CountryKey | undefined>();

export const selectedCompanyAtom = atom<string | undefined>();

export const selectedPolicyTypeAtom = atom<string | undefined>();

export const availableCountriesAtom = atom<CountryKey[]>((get) => {
  const data = get(dataAtom);
  return Array.from(new Set(data.map((item) => item.Country))) as CountryKey[];
});

export const availableCompaniesAtom = atom<string[]>((get) => {
  const data = get(dataAtom);
  const selectedCountry = get(selectedCountryAtom);
  if (!selectedCountry) return [];
  return Array.from(
    new Set(
      data
        .filter((item) => item.Country === selectedCountry)
        .map((item) => item.Company)
    )
  );
});

export const availablePolicyTypesAtom = atom<string[]>((get) => {
  const data = get(dataAtom);
  const selectedCountry = get(selectedCountryAtom);
  const selectedCompany = get(selectedCompanyAtom);
  if (!selectedCountry || !selectedCompany) return [];
  return Array.from(
    new Set(
      data
        .filter(
          (item) =>
            item.Country === selectedCountry && item.Company === selectedCompany
        )
        .map((item) => item.Type)
    )
  );
});

export const selectedDocumentAtom = atom<InsurancePolicy | undefined>((get) => {
  const data = get(dataAtom);
  const selectedCountry = get(selectedCountryAtom);
  const selectedCompany = get(selectedCompanyAtom);
  const selectedPolicyType = get(selectedPolicyTypeAtom);

  if (!selectedCountry || !selectedCompany || !selectedPolicyType)
    return undefined;

  const filteredData = data.filter(
    (item) =>
      item.Country === selectedCountry &&
      item.Company === selectedCompany &&
      item.Type === selectedPolicyType
  );

  return filteredData.length === 1 ? filteredData[0] : undefined;
});
