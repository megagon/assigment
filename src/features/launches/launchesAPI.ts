import { RootState } from '../../app/store';
import { Pad } from '../pad/padAPI';

const API_ROOT = 'https://lldev.thespacedevs.com/2.2.0';
const DEFAULT_PAGE_SIZE = '100';

const getUrl = (slug: string, params: Record<string, string> | undefined) => `${API_ROOT}/${slug}?${params ? new URLSearchParams(params) : ''}`;

export type Launch = {
  id: string,
  launch: string,
  name: string,

  agencies: [],
  window_start: string,
  pad: Pad

};
export type LaunchPage = {
  count: number,
  results: Launch[],
};

export type FetchLaunchesApiArgs = {
  selectedDate: RootState['lauches']['selectedDate'];
  includeFailed: boolean,
  includeSuccess: boolean
};
export type ThespacedevsParams = {
  window_start__gte: string,
  window_end__lte: string,
  limit: string,
  status: string,
};
const getStatus = (fail: boolean, success: boolean) => {
  if (fail && success) return '';
  if (success && !fail) return '3';
  if (fail && !success) return '4';
  return '';
};
export async function fetchLaunchesApi({
  selectedDate,
  includeFailed, includeSuccess,
}: FetchLaunchesApiArgs) {
  const args: ThespacedevsParams = {
    window_start__gte: selectedDate.from.toISOString(),
    window_end__lte: selectedDate.to.toISOString(),
    status: getStatus(includeFailed, includeSuccess),
    limit: DEFAULT_PAGE_SIZE,
  };
  const launches: LaunchPage = await (await fetch(getUrl('launch', args))).json();
  return launches;
}
