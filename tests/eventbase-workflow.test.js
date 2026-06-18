import { describe, expect, it } from 'vitest';
import { getAutoSyncTailLagMessages, getAutoSyncWindowSize } from '../core/eventbase-workflow-utils.js';

describe('EventBase auto-sync helpers', () => {
    it('returns 0 for a zero tail lag value', () => {
        expect(getAutoSyncTailLagMessages({ eventbase_autosync_tail_lag_messages: 0 })).toBe(0);
        expect(getAutoSyncTailLagMessages({ eventbase_autosync_tail_lag_messages: '0' })).toBe(0);
        expect(getAutoSyncTailLagMessages({ eventbase_autosync_tail_lag_messages: 0.0 })).toBe(0);
    });

    it('returns sanitized integers for tail lag values', () => {
        expect(getAutoSyncTailLagMessages({ eventbase_autosync_tail_lag_messages: 3.9 })).toBe(3);
        expect(getAutoSyncTailLagMessages({ eventbase_autosync_tail_lag_messages: -1 })).toBe(0);
        expect(getAutoSyncTailLagMessages({ eventbase_autosync_tail_lag_messages: '10' })).toBe(10);
        expect(getAutoSyncTailLagMessages({ eventbase_autosync_tail_lag_messages: 'abc' })).toBe(0);
    });

    it('computes auto-sync window size from turns correctly', () => {
        expect(getAutoSyncWindowSize({ eventbase_autosync_window_turns: 1 })).toBe(2);
        expect(getAutoSyncWindowSize({ eventbase_autosync_window_turns: 5 })).toBe(10);
        expect(getAutoSyncWindowSize({ eventbase_autosync_window_turns: 0 })).toBe(2);
        expect(getAutoSyncWindowSize({})).toBe(2);
    });
});
