export type Unit = {
  id: 'main' | 'a' | 'b';
  name: string;
  airbnbUrl: string;
  vrboUrl?: string | null;   // Only main unit has VRBO
  fbPageHandle: string;      // Facebook Page numeric ID or username
  googleCalendarId: string;  // already present
};

export const units: Unit[] = [
  {
    id: 'main',
    name: 'Main Unit',
    airbnbUrl:
      'https://www.airbnb.com/rooms/1318250624522250354?source_impression_id=p3_1763256087_P3K18lFSY38q5NXS',
    vrboUrl: 'https://www.vrbo.com/4930072?dateless=true',
    fbPageHandle: '61571078790065',
    googleCalendarId:
      'c_0f01c83b800403808c0f437e7762e83c58c8cc68313f40f4bb2ad671f47a0f02@group.calendar.google.com',
  },
  {
    id: 'a',
    name: 'Unit A',
    airbnbUrl:
      'https://www.airbnb.com/rooms/1318333157071110017?source_impression_id=p3_1763256087_P3u4UgowjH2edJoV',
    vrboUrl: null,
    fbPageHandle: '61571078790065',
    googleCalendarId:
      'c_169c05a073398c9d09acf5a2b165a548b3504914fd153fbab3d907073c3890ff@group.calendar.google.com',
  },
  {
    id: 'b',
    name: 'Unit B',
    airbnbUrl:
      'https://www.airbnb.com/rooms/1318338566291278964?source_impression_id=p3_1763256087_P3s6_EA8k3JWhnX5',
    vrboUrl: null,
    fbPageHandle: '61571078790065',
    googleCalendarId:
      'c_9dd14670fa7078070a6bef04a0155f8de5d6a56be0cd9595078a31bc89bc7886@group.calendar.google.com',
  },
];


