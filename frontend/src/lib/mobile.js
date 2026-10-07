// Browser-only build: no Capacitor shell, no native plugins. Callers that still
// import these names get no-ops so the rest of the app can stay local-first.
export const MOBILE = false

export async function isAndroid() { return false }
export async function nativeLoad() { return null }
export async function nativeSave() {}
export async function readJsonFile() { return null }
export async function writeJsonFile() {}
export async function loadRemoteFile() { return null }
export async function saveRemoteFile() {}
export async function syncReminder() { return true }
export function initReminderSync() {}
export function onAppActive() {}
export async function shareExport() {}
export async function shareExportBlob() {}
export async function printHtml() {}
export async function writeAutoBackup() {}

export const AUTO_BACKUP_DIR = 'openGym'
export const AUTO_BACKUP_KEEP = 14
export const REMINDER_WINDOW_DAYS = 60
export function buildReminderNotifications() { return [] }
