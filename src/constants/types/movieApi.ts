export type MovieAPI = {
  title: string;
  release_year: string;
  locations: string;
  production_company: string;
  distributer: string;
  director: string;
  writer: string;
  actor_1: string;
  actor_2: string;
  actor_3: string;
  ':@computed_region_6qbp_sg9q': string;
  ':@computed_region_26cr_cadq': string;
  ':@computed_region_ajp5_b2md': string;
};

export type Movie = Omit<
  MovieAPI,
  | ':@computed_region_6qbp_sg9q'
  | ':@computed_region_26cr_cadq'
  | ':@computed_region_ajp5_b2md'
>;
