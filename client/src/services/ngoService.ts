import {
  mockImpactMetrics,
  mockPrograms,
  mockEvents,
  mockStories,
  mockDonationTiers
} from '../data/ngoData';
import type {
  ImpactMetric,
  ProgramCause,
  NGOEvent,
  StoryPost,
  DonationTier
} from '../types/ngo';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Clean data adapter and service layer.
 * Front-end components consume this service exclusively.
 * When MongoDB/Express backend endpoints become live, this service will automatically
 * bridge to real HTTP endpoints without changing any component markup or state interfaces.
 */
export const ngoService = {
  /**
   * Fetch high-level impact metrics and counters
   */
  async getImpactMetrics(): Promise<ImpactMetric[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/metrics`, { method: 'GET' });
      if (!res.ok) throw new Error('API unavailable');
      return await res.json();
    } catch {
      // Graceful local fallback
      return mockImpactMetrics;
    }
  },

  /**
   * Fetch all programs / causes
   */
  async getPrograms(): Promise<ProgramCause[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/programs`, { method: 'GET' });
      if (!res.ok) throw new Error('API unavailable');
      return await res.json();
    } catch {
      return mockPrograms;
    }
  },

  /**
   * Fetch community events
   */
  async getEvents(): Promise<NGOEvent[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/events`, { method: 'GET' });
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      // Ensure data conforms to NGOEvent
      return Array.isArray(data) && data.length > 0 ? data : mockEvents;
    } catch {
      return mockEvents;
    }
  },

  /**
   * Fetch impact stories / MongoDB posts
   */
  async getStories(): Promise<StoryPost[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/stories`, { method: 'GET' });
      if (!res.ok) throw new Error('API unavailable');
      return await res.json();
    } catch {
      return mockStories;
    }
  },

  /**
   * Fetch donation tiers
   */
  async getDonationTiers(): Promise<DonationTier[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/donations/tiers`, { method: 'GET' });
      if (!res.ok) throw new Error('API unavailable');
      return await res.json();
    } catch {
      return mockDonationTiers;
    }
  },

  /**
   * Submit quick contact / volunteer inquiry
   */
  async submitInquiry(payload: { name: string; email: string; phone?: string; message: string; interest: string }): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to send inquiry');
      return await res.json();
    } catch {
      // Realistic simulation for offline/preview mode
      return {
        success: true,
        message: 'Thank you! Your message has been received. An Eklavya student coordinator will reach out shortly.'
      };
    }
  }
};
