'use client';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useCountry } from '@/hooks/country';
import { Card, CardContent } from '@/components/ui/card';
import CompanyPicker from '@/components/company-picker';
import FlagPicker from '@/components/flag-picker';
import { ModeToggle } from '@/components/mode-toggle';
import PolicyTypePicker from '@/components/policy-type-picker';
import SummaryTable from '@/components/summary-table';

export default function Component() {
  const [selectedCountry] = useCountry();

  return (
    <main className="flex flex-col py-14">
      <div className="absolute right-4 top-2 flex items-center gap-2">
        <FlagPicker />
        <ModeToggle />
      </div>

      <div className="container flex max-w-[64rem] flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            <img src="logo.png" alt="logo" className="h-8 w-auto sm:h-16" />
            <h1 className="bg-gradient-to-r from-[#8929AD] via-[#436AAC] to-[#43B7B8] bg-clip-text text-center text-3xl font-extrabold text-transparent sm:text-5xl">
              {siteConfig.name}
            </h1>
          </div>

          <h2 className="sm:text-md sm:leading- mt-0 max-w-[42rem] text-muted-foreground sm:-mt-2">
            {siteConfig.description}
          </h2>
        </div>

        <Card
          className={cn(
            'mx-auto w-full max-w-4xl opacity-50 transition-opacity duration-300',
            !!selectedCountry ? 'opacity-100' : 'opacity-0'
          )}
        >
          <CardContent className="space-y-4 pt-4 sm:space-y-6 sm:pt-6">
            <form className="space-y-4 text-left sm:space-y-6">
              <CompanyPicker />
              <PolicyTypePicker />
              <SummaryTable />
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
