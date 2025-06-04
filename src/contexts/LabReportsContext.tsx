import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface LabReport {
  id: string;
  name: string;
  uploadDate: string;
  status: 'analyzed' | 'pending' | 'failed';
  fileUrl?: string;
  analysis?: {
    summary: string;
    recommendations: string[];
    deficienciesDetected?: string[];
    suggestedSupplements?: string[];
    notes?: string;
  };
}

interface LabReportsContextType {
  reports: LabReport[];
  addReport: (report: Omit<LabReport, 'id' | 'uploadDate'>) => void;
  deleteReport: (id: string) => void;
  getReport: (id: string) => LabReport | undefined;
  updateReportStatus: (id: string, status: LabReport['status'], analysis?: LabReport['analysis'], deficienciesDetected?: string[], suggestedSupplements?: string[], notes?: string) => void;
}

const mockReports: LabReport[] = [
  {
    id: '1',
    name: 'Blood Test Report - Jan 2024',
    uploadDate: '2024-01-15',
    status: 'analyzed',
    analysis: {
      summary: 'Normal ranges for most markers. Vitamin D levels slightly low.',
      recommendations: ['Consider Vitamin D supplementation', 'Maintain current diet']
    }
  },
  {
    id: '2',
    name: 'Thyroid Function Test',
    uploadDate: '2024-02-01',
    status: 'pending'
  },
  {
    id: '3',
    name: 'Complete Blood Count',
    uploadDate: '2024-02-10',
    status: 'failed',
    analysis: {
      summary: 'Unable to process report. Please try uploading again.',
      recommendations: []
    }
  }
];

const LabReportsContext = createContext<LabReportsContextType | undefined>(undefined);

export function LabReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<LabReport[]>(mockReports);

  const addReport = (report: Omit<LabReport, 'id' | 'uploadDate'>) => {
    const newReport: LabReport = {
      ...report,
      id: Math.random().toString(36).substr(2, 9),
      uploadDate: new Date().toISOString().split('T')[0],
      deficienciesDetected: report.deficienciesDetected || [],
      suggestedSupplements: report.suggestedSupplements || [],
      notes: report.notes || '',
    };
    setReports(prev => [newReport, ...prev]);
  };

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(report => report.id !== id));
  };

  const getReport = (id: string) => {
    return reports.find(report => report.id === id);
  };

  const updateReportStatus = (id: string, status: LabReport['status'], analysis?: LabReport['analysis'], deficienciesDetected?: string[], suggestedSupplements?: string[], notes?: string) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === id 
          ? { 
              ...report, 
              status,
              analysis: analysis !== undefined ? analysis : report.analysis,
              deficienciesDetected: deficienciesDetected !== undefined ? deficienciesDetected : report.deficienciesDetected,
              suggestedSupplements: suggestedSupplements !== undefined ? suggestedSupplements : report.suggestedSupplements,
              notes: notes !== undefined ? notes : report.notes,
            } 
          : report
      )
    );
  };

  return (
    <LabReportsContext.Provider value={{ reports, addReport, deleteReport, getReport, updateReportStatus }}>
      {children}
    </LabReportsContext.Provider>
  );
}

export function useLabReports() {
  const context = useContext(LabReportsContext);
  if (context === undefined) {
    throw new Error('useLabReports must be used within a LabReportsProvider');
  }
  return context;
} 