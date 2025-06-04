import React, { useState } from 'react';
import { useLabReports } from '../contexts/LabReportsContext';
import { ReportCard } from '../components/lab/ReportCard';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { Upload, FileText, AlertCircle, X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LabReports() {
  const { reports, addReport, deleteReport, updateReportStatus } = useLabReports();
  const [isUploading, setIsUploading] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedReportDetails, setSelectedReportDetails] = useState<LabReport | null>(null);

  const navigate = useNavigate();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setShowToast(null);

    const tempId = Date.now().toString();

    addReport({
      id: tempId,
      name: file.name,
      uploadDate: new Date().toISOString(),
      status: 'pending',
      analysis: undefined,
      deficienciesDetected: [],
      suggestedSupplements: [],
      notes: '',
    });

    setShowToast('Uploading report...');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      setShowToast('Analyzing report...');

      await new Promise(resolve => setTimeout(resolve, 2000));

      updateReportStatus(tempId, 'analyzed', {
        summary: 'Simulated analysis: Vitamin D levels slightly low.',
        deficienciesDetected: ['Vitamin D'],
        suggestedSupplements: ['Vitamin D3', 'Calcium'],
        notes: 'This is a dummy analysis result for demo.'
      });

      setShowToast('Analysis complete! Redirecting...');

      setTimeout(() => {
        navigate('/supplements');
      }, 1000);

    } catch (error) {
      console.error('Upload/Analysis failed:', error);
      setShowToast('Upload or analysis failed.');

      const existingReport = reports.find(r => r.id === tempId);
      if (existingReport) {
        updateReportStatus(tempId, 'failed', existingReport.analysis, existingReport.deficienciesDetected, existingReport.suggestedSupplements, existingReport.notes);
      }
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }, 1000);
    }
  };

  const handleDelete = (id: string) => {
    deleteReport(id);
    setShowToast('Report deleted successfully!');
  };

  const handleView = (id: string) => {
    const report = reports.find(r => r.id === id);
    if (report) {
      setSelectedReportDetails(report);
      setIsDetailsModalOpen(true);
    }
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedReportDetails(null);
  };

  return (
    <div className="min-h-screen bg-gradient-main pb-28 flex flex-col safe-area-padding">
      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-mint text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-base animate-fade-in">
          {showToast}
        </div>
      )}

      {/* Header */}
      <div className="glass m-3 p-5 rounded-3xl">
        <h1 className="text-2xl font-bold text-slate mb-2">Lab Reports</h1>
        <p className="text-slate/70">Upload and manage your medical reports</p>
      </div>

      {/* Upload Section */}
      <div className="glass m-3 p-5 rounded-3xl">
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors
            ${isUploading ? 'border-mint/50 bg-mint/10' : 'border-slate/20 hover:border-mint/50 hover:bg-mint/5'}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-mint mb-2" />
                <p className="mb-1 text-sm text-slate/70">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate/50">PDF, JPG, or PNG (MAX. 10MB)</p>
              </>
            )}
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Reports List */}
      <div className="m-3 sm:m-4 space-y-3 sm:space-y-4">
        {reports.length === 0 ? (
          <div className="glass p-8 rounded-3xl text-center">
            <FileText className="w-12 h-12 text-slate/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate mb-2">No Reports Yet</h3>
            <p className="text-slate/70">Upload your first lab report to get started</p>
          </div>
        ) : (
          reports.map(report => (
            <ReportCard
              key={report.id}
              report={report}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))
        )}
      </div>

      {/* Disclaimer */}
      <div className="m-3 p-4 bg-yellow-50 rounded-xl flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-800">
          Your reports are encrypted and stored securely. We never share your medical data with third parties.
        </p>
      </div>

      {/* Report Details Modal */}
      {isDetailsModalOpen && selectedReportDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-slate">Report Details</h3>
              <button onClick={closeDetailsModal}>
                <X className="w-5 h-5 text-slate/70" />
              </button>
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <p><strong>Name:</strong> {selectedReportDetails.name}</p>
              <p><strong>Uploaded on:</strong> {new Date(selectedReportDetails.uploadDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {selectedReportDetails.status}</p>
              {selectedReportDetails.analysis && (
                <div>
                  <p><strong>Analysis Summary:</strong></p>
                  <p>{selectedReportDetails.analysis.summary}</p>
                </div>
              )}
               {/* Add more detailed fields from LabReport type as needed */}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  handleDelete(selectedReportDetails.id);
                  closeDetailsModal();
                }}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete Report
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bottom-nav-spacer" />
      <BottomNavigation />
    </div>
  );
}
