
export interface IDPs {
    id: number,
  }

  export interface IDP extends IDPs {
    states: string,
    districts: string,
    locations: string,
    gevernates: string
  }