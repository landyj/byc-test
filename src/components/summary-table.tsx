'use client';

import { useAtomValue } from 'jotai';
import { AlertTriangle, Check, FileDown, Info, X } from 'lucide-react';

import { selectedDocumentAtom } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SummaryTable = () => {
  const selectedDocument = useAtomValue(selectedDocumentAtom);

  if (!selectedDocument) return null;

  const summary = selectedDocument.Summary;

  const parseList = (text: string) =>
    text
      .split('\n')
      .filter((item) => item.trim() !== '')
      .map((item) => item.replace('- ', ''));

  return (
    <div className="space-y-4 sm:space-y-6">
      <hr />

      <Card className="bg-secondary">
        <CardContent className="flex items-center justify-between gap-2 p-4">
          <div className="space-y-1">
            <h3 className="font-semibold">{selectedDocument.Company}</h3>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {selectedDocument.Type} Policy
            </p>
          </div>

          <Button size="sm" className="text-xs sm:text-sm" asChild>
            <a href={selectedDocument.PDF} target="_blank" rel="noreferrer">
              <FileDown className="mr-2 h-4 w-4" />
              Policy PDF
            </a>
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <Card className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
          <CardHeader>
            <CardTitle className="flex items-center text-base sm:text-lg">
              <Check className="mr-2" />
              Covered
            </CardTitle>
          </CardHeader>
          <CardContent className="sm:pt-0">
            <ul className="ml-4 list-outside list-disc space-y-2 text-xs sm:ml-6 sm:text-sm">
              {parseList(summary.covered).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          <CardHeader>
            <CardTitle className="flex items-center text-base sm:text-lg">
              <X className="mr-2" />
              Not Covered
            </CardTitle>
          </CardHeader>
          <CardContent className="sm:pt-0">
            <ul className="ml-4 list-outside list-disc space-y-2 text-xs sm:ml-6 sm:text-sm">
              {parseList(summary['not-covered']).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center text-base sm:text-lg">
            <Info className="mr-2 text-blue-500" />
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent className="sm:pt-0">
          <ul className="ml-4 list-outside list-disc space-y-2 text-xs sm:ml-6 sm:text-sm">
            {parseList(summary['additional-info']).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center text-base sm:text-lg">
            <AlertTriangle className="mr-2 text-yellow-500" />
            Gotchas
          </CardTitle>
        </CardHeader>
        <CardContent className="sm:pt-0">
          <ul className="ml-4 list-outside list-disc space-y-2 text-xs sm:ml-6 sm:text-sm">
            {parseList(summary.gotchas).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryTable;
