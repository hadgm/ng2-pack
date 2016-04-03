declare function require(link: string): any

declare namespace app {

  interface IHero {
    _id: string;
    name: string;
    score?: number;
  }

  interface ICampaign {
    attenders: Array<IHero>;
  }

}

