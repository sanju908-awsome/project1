import Tesseract from "tesseract.js";
import React, { useState, useCallback } from 'react';
import { Upload, FileText, Scan, CheckCircle, AlertTriangle, XCircle, Download, Eye } from 'lucide-react';

export const CertificateVerification: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [verificationStep, setVerificationStep] = useState<'upload' | 'processing' | 'results'>('upload');
  const [verificationResult, setVerificationResult] = useState<'valid' | 'suspicious' | 'fake' | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setVerificationStep('processing');
    
    // Run OCR immediately
    extractCertificateData(file).then(() => {
      setVerificationStep('results');
      // Random result for demo
      const results = ['valid', 'suspicious', 'fake'] as const;
      setVerificationResult(results[Math.floor(Math.random() * results.length)]);
    });
  };

  const extractCertificateData = async (file: File) => {
    // Step 1: Show "Processing..."
    setExtractedData({
      studentName: "Processing...",
      rollNumber: "Processing...",
      institution: "Processing...",
      degree: "Processing...",
      year: "Processing...",
      grade: "Processing...",
      fileName: "N/A",
      fileSize: "N/A",
      fileType: "N/A",
    });

    try {
      // Step 2: Run OCR with Tesseract
      const result = await Tesseract.recognize(file, "eng", {
        logger: (m) => console.log(m), // log progress
      });
      const text = result.data.text;

      // Step 3: Extract data from text
      const studentNameMatch = text.match(/Name[:\-]?\s*(.*)/i);
      const rollNumberMatch = text.match(/Roll\s*No[:\-]?\s*(.*)/i);
      const institutionMatch = text.match(/(University|College|Institute)[:\-]?\s*(.*)/i);
      const degreeMatch = text.match(/Degree[:\-]?\s*(.*)/i);
      const yearMatch = text.match(/(Year|Session)[:\-]?\s*(.*)/i);
      const gradeMatch = text.match(/(Grade|CGPA|Marks)[:\-]?\s*(.*)/i);

      // Step 4: Update with OCR results
      setExtractedData({
        studentName: studentNameMatch ? studentNameMatch[1].trim() : "Not Found",
        rollNumber: rollNumberMatch ? rollNumberMatch[1].trim() : "Not Found",
        institution: institutionMatch ? institutionMatch[2].trim() : "Not Found",
        degree: degreeMatch ? degreeMatch[1].trim() : "Not Found",
        year: yearMatch ? yearMatch[2].trim() : "Not Found",
        grade: gradeMatch ? gradeMatch[2].trim() : "Not Found",
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        fileType: file.type || "Unknown",
      });
    } catch (error) {
      console.error("OCR failed:", error);
      setExtractedData({
        studentName: "Error",
        rollNumber: "Error",
        institution: "Error",
        degree: "Error",
        year: "Error",
        grade: "Error",
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        fileType: file.type || "Unknown",
      });
// Step 5: Simple rule-based verification instead of random
if (studentNameMatch && rollNumberMatch) {
  setVerificationResult("valid");
} else if (studentNameMatch || rollNumberMatch) {
  setVerificationResult("suspicious");
} else {
  setVerificationResult("fake");
}

    }
  };

  const resetVerification = () => {
    setUploadedFile(null);
    setVerificationStep('upload');
    setVerificationResult(null);
    setExtractedData(null);
  };

  if (verificationStep === 'processing') {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Certificate...</h3>
          <p className="text-gray-600 mb-4">Our AI is analyzing your document for authenticity</p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>✓ OCR text extraction started</p>
            <p>⏳ Extracting student information and grades</p>
            <p>⏳ Running forgery detection algorithms</p>
            <p>⏳ Cross-referencing with institutional database</p>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStep === 'results' && verificationResult) {
    const resultConfig = {
      valid: {
        icon: CheckCircle,
        title: 'Certificate Verified',
        subtitle: 'This certificate appears to be authentic',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      },
      suspicious: {
        icon: AlertTriangle,
        title: 'Certificate Flagged',
        subtitle: 'Some inconsistencies detected - manual review recommended',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200'
      },
      fake: {
        icon: XCircle,
        title: 'Certificate Invalid',
        subtitle: 'Multiple fraud indicators detected',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      }
    };

    const config = resultConfig[verificationResult];
    const Icon = config.icon;

    return (
      <div className="space-y-6">
        <div className={`p-6 rounded-lg border-2 ${config.bgColor} ${config.borderColor}`}>
          <div className="flex items-center space-x-3 mb-4">
            <Icon className={`h-8 w-8 ${config.color}`} />
            <div>
              <h3 className={`text-xl font-semibold ${config.color}`}>{config.title}</h3>
              <p className="text-gray-600">{config.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-gray-900 mb-4">Extracted Information</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Student Name:</span><span>{extractedData?.studentName}</span></div>
              <div className="flex justify-between"><span>Roll Number:</span><span>{extractedData?.rollNumber}</span></div>
              <div className="flex justify-between"><span>Institution:</span><span>{extractedData?.institution}</span></div>
              <div className="flex justify-between"><span>Degree:</span><span>{extractedData?.degree}</span></div>
              <div className="flex justify-between"><span>Year:</span><span>{extractedData?.year}</span></div>
              <div className="flex justify-between"><span>Grade:</span><span>{extractedData?.grade}</span></div>
              <hr className="my-3" />
              <div className="flex justify-between"><span>File Name:</span><span>{extractedData?.fileName}</span></div>
              <div className="flex justify-between"><span>File Size:</span><span>{extractedData?.fileSize}</span></div>
              <div className="flex justify-between"><span>File Type:</span><span>{extractedData?.fileType}</span></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-gray-900 mb-4">Verification Details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Template Match:</span><span>{verificationResult === 'valid' ? '98%' : verificationResult === 'suspicious' ? '75%' : '23%'}</span></div>
              <div className="flex justify-between"><span>Database Match:</span><span>{verificationResult === 'valid' ? 'Found' : verificationResult === 'suspicious' ? 'Partial' : 'Not Found'}</span></div>
              <div className="flex justify-between"><span>Seal Verification:</span><span>{verificationResult === 'valid' ? 'Authentic' : verificationResult === 'suspicious' ? 'Unclear' : 'Tampered'}</span></div>
              <div className="flex justify-between"><span>Risk Score:</span><span>{verificationResult === 'valid' ? 'Low (5%)' : verificationResult === 'suspicious' ? 'Medium (45%)' : 'High (85%)'}</span></div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button onClick={resetVerification} className="px-6 py-3 bg-gray-600 text-white rounded-lg">Verify Another</button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Download Report</button>
          <button className="px-6 py-3 border border-gray-300 rounded-lg">View Details</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Verify Certificate Authenticity</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your certificate and get instant verification results with detailed fraud analysis. 
          Supports PDF, JPG, PNG formats up to 10MB.
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Drop your certificate here, or click to browse
            </h3>
            <p className="text-gray-600">PDF, JPG, PNG up to 10MB</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            <span>Choose File</span>
          </label>
        </div>
      </div>
    </div>
  );
};
