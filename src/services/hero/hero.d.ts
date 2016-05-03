interface Hero {
  _id: string;
  name: string;
  score?: number;
  title?: string;
}

interface Campaign {
  attenders: Array<Hero>;
}



