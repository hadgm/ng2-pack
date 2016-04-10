declare namespace app {

  interface IHero {
    _id: string;
    name: string;
    score?: number;
    title?: string;
  }

  interface ICampaign {
    attenders: Array<IHero>;
  }

}

