export interface Hero {
  _id: string;
  name: string;
  score?: number;
  title?: string;
}

export interface Campaign {
  attenders: Array<Hero>;
}



