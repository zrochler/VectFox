/**
 * Utility helpers for EventBase auto-sync logic that are safe to test in isolation.
 */

/**
 * Resolve the auto-sync extraction window size in MESSAGES from the per-user
 * turns setting (1 turn = 2 messages: 1 user + 1 AI reply). Clamped to 1-20 turns.
 * Auto-sync uses this instead of settings.eventbase_window_size so its cadence is
 * independent of the one-off Vectorize Content window.
 * @param {object} settings - VectFox settings
 * @returns {number} window size in messages
 */
export function getAutoSyncWindowSize(settings) {
    const turns = Math.max(1, Math.min(20, settings?.eventbase_autosync_window_turns ?? 1));
    return turns * 2;
}

/**
 * Resolve how many trailing messages auto-sync should leave behind.
 * Auto-sync only. Manual Vectorize Content / backfill ignores this.
 * @param {object} settings
 * @returns {number}
 */
export function getAutoSyncTailLagMessages(settings) {
    const value = Number(settings?.eventbase_autosync_tail_lag_messages ?? 0);
    if (!Number.isFinite(value) || value <= 0) return 0;
    return Math.max(0, Math.trunc(value));
}
