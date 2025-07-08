import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const marketplaces = ['StarkBid', 'OpenSea', 'SudoSwap', 'Ramble'];
export function getRandomMarketplace() {
  return marketplaces[Math.floor(Math.random() * marketplaces.length)];
}