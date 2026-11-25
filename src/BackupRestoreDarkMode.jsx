import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useState, useRef } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Download,
  Upload,
  Lock,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
  Database,
  Layers,
  Sparkles,
  Info,
  ChevronRight,
} from 'lucide-react';
import {
  createBackupPackage,
  inspectBackupFile,
  decryptAndPreviewBackup,
  restoreBackup,
} from './utils/backupService';
import { exportBackupNatively } from './utils/nativeBackup';
import { MAX_BACKUP_FILE_BYTES } from './utils/backupLimits';
import { getBackupErrorMessage } from './utils/backupErrorMessages';
import { toast } from './components/ui/toast/index.js';

export default function BackupRestoreDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const [activeTab, setActiveSubTab] = useState('create'); // 'create' | 'restore'

  // --- Create Backup State ---
  const [createPassphrase, setCreatePassphrase] = useState('');
  const [confirmPassphrase, setConfirmPassphrase] = useState('');
  const [showCreatePass, setShowCreatePass] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createProgress, setCreateProgress] = useState(null); // { stage, percent, message }
  const [createError, setCreateError] = useState('');
  const [createdResult, setCreatedResult] = useState(null); // { envelope, fileName, sizeBytes }

  // --- Restore Backup State ---
  const [selectedFileContent, setSelectedFileContent] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileInspection, setFileInspection] = useState(null);
  const [restorePassphrase, setRestorePassphrase] = useState('');
  const [showRestorePass, setShowRestorePass] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [restorePreview, setRestorePreview] = useState(null);
  const [restoreMode, setRestoreMode] = useState('merge'); // 'merge' | 'replace'
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreProgress, setRestoreProgress] = useState(null);
  const [restoreError, setRestoreError] = useState('');
  const [restoreSuccess, setRestoreSuccess] = useState(null);

  const fileInputRef = useRef(null);
  const pendingReaderRef = useRef(null);

  const handleBack = () => {
    if (goBack) goBack();
    else if (setActiveTab) setActiveTab('settings_profile_dark_mode');
  };

  // Evaluate passphrase strength
  const getPassphraseStrength = (pass) => {
    if (!pass) return { score: 0, label: 'Empty', color: 'text-slate-500' };
    if (pass.length < 8) return { score: 1, label: 'Too short (min 8)', color: 'text-rose-400' };
    if (pass.length < 12) return { score: 2, label: 'Fair (recommend 12+)', color: 'text-amber-400' };
    return { score: 3, label: 'Strong', color: 'text-emerald-400' };
  };

  const createStrength = getPassphraseStrength(createPassphrase);

  // Handle Create Backup
  const handleCreateBackup = async (e) => {
    if (e) e.preventDefault();
    if (isCreating) return;

    setCreateError('');
    setCreatedResult(null);

    if (!createPassphrase || createPassphrase.length < 8) {
      setCreateError('Passphrase must be at least 8 characters long (12+ recommended).');
      return;
    }
    if (createPassphrase !== confirmPassphrase) {
      setCreateError('Passphrases do not match. Please verify confirmation.');
      return;
    }

    setIsCreating(true);
    setCreateProgress({ stage: 'START', percent: 5, message: 'Initializing cryptographic engine...' });

    try {
      const packageResult = await createBackupPackage(createPassphrase, {
        onProgress: (p) => setCreateProgress(p),
      });

      // Export directly via native share or browser download
      const exportRes = await exportBackupNatively(packageResult.envelope);

      setCreatedResult({
        envelope: packageResult.envelope,
        fileName: exportRes.fileName,
        sizeBytes: exportRes.sizeBytes,
        manifest: packageResult.manifest,
      });
      setCreateProgress(null);
      toast.success(t('toasts.backupCreated', 'Backup archive created successfully'));
    } catch (err) {
      console.error('[BackupRestore] Create backup error:', err);
      const errMsg = getBackupErrorMessage(err, 'Failed to generate encrypted backup');
      setCreateError(errMsg);
      setCreateProgress(null);
      toast.error(errMsg);
    } finally {
      setIsCreating(false);
    }
  };

  // Handle File Input Change
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    pendingReaderRef.current?.abort();
    setSelectedFileName(file.name);
    setSelectedFileContent(null);
    setFileInspection(null);
    setRestoreError('');
    setRestorePreview(null);
    setRestoreSuccess(null);

    // Block oversized archives BEFORE FileReader allocates a giant string.
    if (file.size > MAX_BACKUP_FILE_BYTES) {
      setRestoreError(getBackupErrorMessage({ code: 'BACKUP_FILE_TOO_LARGE' }));
      return;
    }
    const reader = new FileReader();
    pendingReaderRef.current = reader;
    reader.onload = (event) => {
      const content = event.target?.result;
      setSelectedFileContent(content);

      const inspection = inspectBackupFile(content);
      setFileInspection(inspection);
      if (!inspection.valid) {
        setRestoreError(inspection.error || 'The selected file is not a valid Momentum backup.');
      }
    };
    reader.onerror = () => {
      setRestoreError('Failed to read the selected file.');
    };
    reader.readAsText(file);
  };

  // Handle Decrypt and Preview
  const handleDecryptPreview = async (e) => {
    if (e) e.preventDefault();
    if (!selectedFileContent || isDecrypting) return;

    setRestoreError('');
    setIsDecrypting(true);

    try {
      const previewRes = await decryptAndPreviewBackup(selectedFileContent, restorePassphrase);
      setRestorePreview(previewRes.preview);
      toast.info(t('toasts.backupDecrypted', 'Backup decrypted and validated'));
    } catch (err) {
      console.error('[BackupRestore] Decrypt preview error:', err);
      const errMsg = getBackupErrorMessage(err, 'Failed to decrypt backup.');
      setRestoreError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsDecrypting(false);
    }
  };

  // Handle Confirm Restore
  const handleConfirmRestore = async () => {
    if (!selectedFileContent || !restorePassphrase || isRestoring) return;

    setRestoreError('');
    setIsRestoring(true);
    setRestoreProgress({ stage: 'START', percent: 5, message: 'Starting staged restoration...' });

    try {
      const res = await restoreBackup(selectedFileContent, restorePassphrase, {
        mode: restoreMode,
        onProgress: (p) => setRestoreProgress(p),
      });

      setRestoreSuccess(res);
      setRestoreProgress(null);
      if (res.requiresReload) {
        toast.info(t('backup.restoreReloadTitle', 'Restore saved — restart required'));
      } else {
        toast.success(t('toasts.dataRestored', 'All data restored successfully'));
      }
    } catch (err) {
      console.error('[BackupRestore] Restore error:', err);
      const errMsg = getBackupErrorMessage(err, 'Restoration failed. Please retry safely.');
      setRestoreError(errMsg);
      setRestoreProgress(null);
      toast.error(errMsg);
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-y-auto pb-24">
      {/* Top Header Bar */}
      <MomentumGlassHeader isDarkMode={true}>
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
          title={t('common.back', 'Back')}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-base font-bold text-white tracking-tight">{t('backup.backupAndRestore', 'Backup & Restore')}</h1>
          <span className="text-[11px] text-teal-400 font-medium">{t('backup.aesGcmEncrypted', 'AES-256-GCM Encrypted')}</span>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
          <ShieldCheck className="w-5 h-5" />
        </div>
      </MomentumGlassHeader>

      <main className="max-w-md lg:max-w-5xl w-full mx-auto px-5 lg:px-8 pt-5 pb-28 flex flex-col gap-5">
        {/* Mode Selector Segmented Tabs */}
        <div className="grid grid-cols-2 p-1 bg-white/5 border border-white/10 rounded-2xl">
          <button
            onClick={() => {
              setActiveSubTab('create');
              setCreateError('');
            }}
            className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'create'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{t('backup.createBackup', 'Create Backup')}</span>
          </button>
          <button
            onClick={() => {
              setActiveSubTab('restore');
              setRestoreError('');
            }}
            className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'restore'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>{t('backup.restoreData', 'Restore Data')}</span>
          </button>
        </div>

        {/* Hidden File Input for Native Web / Hybrid Upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".momentum-backup,.json"
          onChange={handleFileSelect}
          className="hidden"
          data-testid="momentum-backup-file-input"
        />

        {/* ============================================================== */}
        {/* SUBTAB 1: CREATE BACKUP                                       */}
        {/* ============================================================== */}
        {activeTab === 'create' && (
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 items-start gap-5">
            {/* ── LEFT COLUMN: Security Architecture & Information ── */}
            <div className="w-full lg:col-span-6 flex flex-col gap-5">
            {/* Security Architecture Card */}
            <div className="p-4 rounded-3xl bg-black/40 border border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">{t('backup.authLocalEncryption', 'Authenticated Local Encryption')}</h2>
                  <p className="text-xs text-slate-400">{t('backup.encryptionInfo', 'Protected with AES-256-GCM & PBKDF2 (600,000 rounds)')}</p>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-2xl border border-white/5 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-teal-400 font-semibold">
                  <Database className="w-3.5 h-3.5" />
                  <span>{t('backup.whatIsIncluded', 'What is included:')}</span>
                </div>
                <p className="text-[11px] text-slate-400 pl-5">
                  {t('backup.includedDetails', 'Tasks & routines, finance accounts & transactions, notes & binary attachments (images/audio/docs), custom tasbeeh, calendar events, prayer history, and appearance settings.')}
                </p>
                <div className="flex items-center gap-2 text-amber-400 font-semibold mt-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>{t('backup.zeroKnowledgePrinciple', 'Zero-knowledge principle:')}</span>
                </div>
                <p className="text-[11px] text-slate-400 pl-5">
                  {t('backup.zeroKnowledgeDetails', 'Momentum has no master password and cannot recover forgotten passphrases. Device PIN and biometrics are never included in the backup.')}
                </p>
              </div>
            </div>

                        </div>

            {/* ── RIGHT COLUMN: Passphrase Input & Export ── */}
            <div className="w-full lg:col-span-6 flex flex-col gap-5">
              <form onSubmit={handleCreateBackup} className="p-5 rounded-3xl bg-slate-900/90 border border-white/10 flex flex-col gap-4">
              {/* Passphrase Input */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-semibold text-slate-300">{t('backup.backupPassphrase', 'Backup Passphrase')}</label>
                </div>
                <div className="relative">
                  <input
                    type={showCreatePass ? 'text' : 'password'}
                    value={createPassphrase}
                    onChange={(e) => setCreatePassphrase(e.target.value)}
                    placeholder={t('backup.chooseStrongPassphrase', 'Choose a strong passphrase (12+ characters)')}
                    disabled={isCreating}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 pr-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCreatePass(!showCreatePass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    title={showCreatePass ? 'Hide passphrase' : 'Show passphrase'}
                  >
                    {showCreatePass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Passphrase */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 px-1">{t('backup.confirmPassphrase', 'Confirm Passphrase')}</label>
                <input
                  type={showCreatePass ? 'text' : 'password'}
                  value={confirmPassphrase}
                  onChange={(e) => setConfirmPassphrase(e.target.value)}
                  placeholder={t('backup.repeatPassphrasePlaceholder', 'Repeat backup passphrase exactly')}
                  disabled={isCreating}
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                />
              </div>

              {/* Error Banner */}
              {createError && (
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{createError}</span>
                </div>
              )}

              {/* Progress Indicator */}
              {createProgress && (
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs text-primary font-semibold">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      {createProgress.message}
                    </span>
                    <span>{createProgress.percent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300 rounded-full"
                      style={{ width: `${createProgress.percent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                disabled={isCreating || !createPassphrase || createPassphrase.length < 8}
                className="w-full h-13 mt-1 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                {isCreating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t('backup.encryptingBundling', 'Encrypting & Bundling...')}</span>
                  </>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span>{t('backup.createEncryptedBackup', 'Create Encrypted Backup')}</span>
                  </>
                )}
              </button>
            </form>

            {/* Created Result Success Card */}
            {createdResult && (
              <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{t('backup.backupGenerated', 'Backup Generated & Encrypted')}</h3>
                    <p className="text-xs text-emerald-300">{t('backup.fileReadyStorage', 'File ready for transfer or safe storage')}</p>
                  </div>
                </div>

                <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 flex flex-col gap-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">{t('backup.fileName', 'File Name:')}</span>
                    <span className="font-mono text-white text-[11px] truncate max-w-[200px]">
                      {createdResult.fileName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">{t('backup.fileSize', 'File Size:')}</span>
                    <span className="font-medium text-slate-200">
                      {(createdResult.sizeBytes / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">{t('backup.totalItems', 'Total Items:')}</span>
                    <span className="font-medium text-slate-200">
                      {t('backup.manifestSummary', '{{tasks}} tasks • {{notes}} notes • {{attachments}} files', {
                        tasks: createdResult.manifest?.recordCounts?.tasks || 0,
                        notes: createdResult.manifest?.recordCounts?.notes || 0,
                        attachments: createdResult.manifest?.recordCounts?.attachments || 0
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => exportBackupNatively(createdResult.envelope, createdResult.fileName)}
                    className="w-full h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('backup.downloadFileAgain', 'Download File Again')}</span>
                  </button>
                  <button
                    onClick={() => {
                      setCreatedResult(null);
                      setCreatePassphrase('');
                      setConfirmPassphrase('');
                    }}
                    className="w-full h-11 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
                      </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SUBTAB 2: RESTORE BACKUP                                       */}
        {/* ============================================================== */}
        {activeTab === 'restore' && (
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 items-start gap-5">
            {/* ── LEFT COLUMN: File Selection & Inspection ── */}
            <div className="w-full lg:col-span-6 flex flex-col gap-5">
            {/* Step 1: File Selection */}
            <div className="p-4 rounded-3xl bg-black/40 border border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">{t('backup.selectBackupFile', 'Select Backup File')}</h2>
                  <p className="text-xs text-slate-400">{t('backup.supportsArchives', 'Supports .momentum-backup archives')}</p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".momentum-backup,.json"
                onChange={handleFileSelect}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-white/15 hover:border-primary/50 bg-white/5 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
              >
                <FileCheck className="w-6 h-6 text-slate-400" />
                <span className="text-xs font-semibold text-slate-200">
                  {selectedFileName ? selectedFileName : t('backup.chooseBackupFile', 'Choose .momentum-backup file')}
                </span>
                <span className="text-[10px] text-slate-400">{t('backup.tapBrowseFiles', 'Tap to browse files')}</span>
              </button>

              {fileInspection?.valid && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl text-[11px] text-emerald-300 flex items-center justify-between">
                  <span>{t('backup.validEnvelope', { version: fileInspection.version })}</span>
                  <span className="font-mono text-[10px] text-emerald-400">{fileInspection.kdfAlgorithm}</span>
                </div>
              )}
              {restoreError && !fileInspection?.valid && (
                <div role="alert" className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{restoreError}</span>
                </div>
              )}
            </div>

            {/* Step 2: Passphrase & Decrypt Preview */}
            {selectedFileContent && fileInspection?.valid && !restorePreview && (
              <form onSubmit={handleDecryptPreview} className="p-4 rounded-3xl bg-black/40 border border-white/10 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Lock className="w-4 h-4 text-teal-400" />
                  <span>{t('backup.enterPassphraseDecrypt', 'Enter Passphrase to Decrypt')}</span>
                </div>

                <div className="relative">
                  <input
                    type={showRestorePass ? 'text' : 'password'}
                    value={restorePassphrase}
                    onChange={(e) => setRestorePassphrase(e.target.value)}
                    placeholder={t('backup.enterPassphrasePlaceholder', 'Enter backup passphrase')}
                    disabled={isDecrypting}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 pr-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRestorePass(!showRestorePass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  >
                    {showRestorePass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {restoreError && (
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{restoreError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!restorePassphrase || isDecrypting}
                  className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  {isDecrypting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{t('backup.authenticatingDecrypting', 'Authenticating & Decrypting...')}</span>
                    </>
                  ) : (
                    <>
                      <ChevronRight className="w-4 h-4" />
                      <span>{t('backup.decryptAndPreview', 'Decrypt & Preview')}</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 3: Verified Preview & Restore Action */}
            {restorePreview && !restoreSuccess && (
              <div className="p-5 rounded-3xl bg-black/40 border border-white/10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{t('backup.backupContentsVerified', 'Backup Contents Verified')}</h3>
                    <p className="text-xs text-slate-400">
                      {t('backup.createdDate', 'Created {{date}}', { date: new Date(restorePreview.createdAt).toLocaleDateString() })}
                    </p>
                  </div>
                </div>

                {/* Inventory Table */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col">
                    <span className="text-slate-400 text-[10px]">{t('nav.tasks', 'Tasks')}</span>
                    <span className="text-base font-bold text-white">{restorePreview.recordCounts.tasks}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col">
                    <span className="text-slate-400 text-[10px]">{t('nav.routines', 'Habits')}</span>
                    <span className="text-base font-bold text-white">{restorePreview.recordCounts.routines}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col">
                    <span className="text-slate-400 text-[10px]">{t('backup.notesReflections', 'Notes & Reflections')}</span>
                    <span className="text-base font-bold text-white">{restorePreview.recordCounts.notes}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col">
                    <span className="text-slate-400 text-[10px]">{t('backup.financeTransactions', 'Finance Transactions')}</span>
                    <span className="text-base font-bold text-white">{restorePreview.recordCounts.transactions}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col">
                    <span className="text-slate-400 text-[10px]">{t('backup.attachmentsBin', 'Attachments (Images/Audio/PDF)')}</span>
                    <span className="text-base font-bold text-teal-400">{restorePreview.recordCounts.attachments}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col">
                    <span className="text-slate-400 text-[10px]">{t('backup.customWallpapers', 'Custom Wallpapers')}</span>
                    <span className="text-base font-bold text-indigo-400">{restorePreview.recordCounts.customWallpapers}</span>
                  </div>
                </div>

                {/* Restore Policy Selector */}
                <div className="flex flex-col gap-2 pt-1">
                  <label className="text-xs font-semibold text-slate-300">{t('backup.restorationPolicy', 'Restoration Policy')}</label>
                  <div className="flex flex-col gap-2">
                    <label
                      onClick={() => setRestoreMode('merge')}
                      className={`p-3 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                        restoreMode === 'merge'
                          ? 'bg-teal-500/10 border-teal-500/30'
                          : 'bg-white/5 border-white/5 opacity-70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="restoreMode"
                        checked={restoreMode === 'merge'}
                        onChange={() => setRestoreMode('merge')}
                        className="mt-0.5"
                      />
                      <div className="flex flex-col text-xs">
                        <span className="font-bold text-white">{t('backup.preserveMerge', 'Preserve & Merge (Recommended)')}</span>
                        <span className="text-[11px] text-slate-400">
                          {t('backup.preserveMergeDesc', 'Adds missing records and attachments. Existing local data is safely preserved without duplicate transactions.')}
                        </span>
                      </div>
                    </label>

                    <label
                      onClick={() => setRestoreMode('replace')}
                      className={`p-3 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                        restoreMode === 'replace'
                          ? 'bg-amber-500/10 border-amber-500/30'
                          : 'bg-white/5 border-white/5 opacity-70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="restoreMode"
                        checked={restoreMode === 'replace'}
                        onChange={() => setRestoreMode('replace')}
                        className="mt-0.5"
                      />
                      <div className="flex flex-col text-xs">
                        <span className="font-bold text-white">{t('backup.replaceLiveRecords', 'Replace Live Records')}</span>
                        <span className="text-[11px] text-slate-400">
                          {t('backup.replaceLiveRecordsDesc', 'Overwrites live user records with backup contents. Local App Lock and PIN security settings are still preserved.')}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Restore Progress Indicator */}
                {restoreProgress && (
                  <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs text-teal-400 font-semibold">
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        {restoreProgress.message}
                      </span>
                      <span>{restoreProgress.percent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-400 transition-all duration-300 rounded-full"
                        style={{ width: `${restoreProgress.percent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {restoreError && (
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{restoreError}</span>
                  </div>
                )}

                {/* Confirmation Actions */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleConfirmRestore}
                    disabled={isRestoring}
                    className="w-full h-13 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40"
                  >
                    {isRestoring ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{t('backup.applyingRestoration', 'Applying Restoration...')}</span>
                      </>
                    ) : (
                      <>
                        <ChevronRight className="w-4 h-4" />
                        <span>{t('backup.confirmRestoreData', 'Confirm & Restore Data')}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRestorePreview(null);
                      setRestorePassphrase('');
                    }}
                    disabled={isRestoring}
                    className="w-full h-11 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Restore Success Card */}
            {restoreSuccess?.requiresReload && (
              <div role="alert" className="p-5 rounded-3xl border border-amber-500/40 bg-amber-500/10 flex flex-col gap-3">
                <h3 className="text-sm font-bold">{t('backup.restoreReloadTitle', 'Restore saved — restart required')}</h3>
                <p className="text-xs leading-relaxed">{t('backup.restoreReloadDescription', 'Your restored records were saved, but could not be loaded into this session. Restart Momentum before editing. Do not repeat the restore or clear app data.')}</p>
                <button type="button" onClick={() => window.location.reload()} className="w-full h-12 rounded-2xl bg-amber-600 text-white font-semibold text-sm">
                  {t('backup.restartMomentum', 'Restart Momentum')}
                </button>
              </div>
            )}
            {restoreSuccess && !restoreSuccess.requiresReload && (
              <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{t('backup.dataRestoredSuccessfully', 'Data Restored Successfully')}</h3>
                    <p className="text-xs text-emerald-300">
                      {t('backup.restoredInMode', { mode: restoreSuccess.mode === 'merge' ? t('common.merge', { defaultValue: 'Merge' }) : t('common.replace', { defaultValue: 'Replace' }) })}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3.5 rounded-2xl border border-white/5">
                  {t('backup.restoreSummaryDesc', 'All supported records, dates, financial balances, and durable attachment files have been verified in IndexedDB and rehydrated into the active session.')}
                </p>

                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {t('backup.returnToSettings', 'Return to Settings')}
                </button>
              </div>
            )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
