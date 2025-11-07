import React from 'react';

interface IconProps {
  className?: string;
}

const MapPinIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const CoffeeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 0h10.5c.621 0 1.125-.504 1.125-1.125v-6.75c0-.621-.504-1.125-1.125-1.125H6.375c-.621 0-1.125.504-1.125 1.125v6.75c0 .621.504 1.125 1.125 1.125z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25V6m0 2.25V6m0 2.25V6m3.75 2.25V6m-7.5 2.25V6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15.75H9" />
  </svg>
);

const ParkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c2.375-3.003 3.375-4.93 3.375-6.188 0-1.257-1.018-2.275-2.275-2.275S10.825 14.305 10.825 15.562c0 1.258 1 3.185 3.375 6.188zM9.75 12s.75-.5 2.25-.5 2.25.5 2.25.5m-4.5 0s.75 3 2.25 3 2.25-3 2.25-3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-2.375-3.003-3.375-4.93-3.375-6.188 0-1.257 1.018-2.275 2.275-2.275S13.175 14.305 13.175 15.562c0 1.258-1 3.185-3.375 6.188z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
    </svg>
);

const RestaurantIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18h16.5a1.5 1.5 0 011.5 1.5v16.5a1.5 1.5 0 01-1.5 1.5H3.75A1.5 1.5 0 012.25 19.5V4.5A1.5 1.5 0 013.75 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v7.5M8.25 12h7.5" />
  </svg>
);

const StoreIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5m0 0V9m0 4.5h.008m4.492 0H18m-.008 0V9m0 4.5h.008m-4.5 4.5v-7.5m0 0V9m0 4.5h.008M9 21v-7.5m0 0V9m0 4.5h.008m-4.5 4.5V9m0 3.5h.008M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const MinusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

export const ArrowPathIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691V5.25a2.25 2.25 0 00-2.25-2.25h-4.5a2.25 2.25 0 00-2.25 2.25v4.5m4.5 0h4.992" />
    </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

export const getIconForPlace = (title: string): React.FC<IconProps> => {
    const lowerTitle = title.toLowerCase();
    // Fix: Corrected typo `lower-title` to `lowerTitle`.
    if (lowerTitle.includes('cafe') || lowerTitle.includes('coffee')) return CoffeeIcon;
    if (lowerTitle.includes('park') || lowerTitle.includes('garden')) return ParkIcon;
    if (lowerTitle.includes('restaurant') || lowerTitle.includes('diner') || lowerTitle.includes('eatery') || lowerTitle.includes('food')) return RestaurantIcon;
    if (lowerTitle.includes('store') || lowerTitle.includes('shop') || lowerTitle.includes('market')) return StoreIcon;
    return MapPinIcon;
};