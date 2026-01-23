'use server';

import { createServerSupabase } from './server';

export interface SiteSummary {
  id: number;
  namesite: string;
  county: string | null;
  inspectdate: string | null;
}

export interface InspectionDetail {
  id: number;
  namesite: string;
  _type: string | null;
  county: string | null;
  _naregion: string | null;
  inspectdate: string | null;
  naturalness_score: string | null;
  naturalness_details: string | null;
  notes: string | null;
}

export async function getSitesOnline(): Promise<SiteSummary[]> {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from('sites_list_fnr')
    .select('namesite, county, inspectdate')
    .order('namesite', { ascending: true });

  if (error) throw new Error(error.message || 'Failed to fetch sites');

  return (data ?? []).map((site: any, i: number) => ({
    id: i + 1,
    namesite: site.namesite,
    county: site.county,
    inspectdate: site.inspectdate,
  }));
}

export async function getSiteByName(namesite: string): Promise<SiteSummary[]> {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from('sites_list_fnr')
    .select('namesite, county, inspectdate')
    .eq('namesite', namesite)
    .order('inspectdate', { ascending: false })
    .limit(1);

  if (error) throw new Error(error.message || 'Failed to fetch site');

  return (data ?? []).map((site: any, i: number) => ({
    id: i + 1,
    namesite: site.namesite,
    county: site.county,
    inspectdate: site.inspectdate,
  }));
}

export async function getInspectionDetailsOnline(namesite: string): Promise<InspectionDetail[]> {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from('sites_detail_fnr_test')
    .select('namesite, _type, county, _naregion, inspectdate, naturalness_score, naturalness_details, notes')
    .eq('namesite', namesite)
    .order('inspectdate', { ascending: false });

  if (error) throw new Error(error.message || 'Failed to fetch inspection details');

  return (data ?? []).map((insp: any, i: number) => ({
    id: i + 1,
    namesite: insp.namesite,
    _type: insp._type,
    county: insp.county,
    _naregion: insp._naregion,
    inspectdate: insp.inspectdate,
    naturalness_score: insp.naturalness_score,
    naturalness_details: insp.naturalness_details,
    notes: insp.notes,
  }));
}