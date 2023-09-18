export type LabelType = 0 | 1;
export type ScoreType = 4 | 2 | -2 | -4;
export type RecomendationContentType =
  | "strongSupport"
  | "weakSupport"
  | "weakObjection"
  | "strongObjection";
export type PowerFlug = true | false;

export interface Content {
  id: number;
  text: string;
  label: LabelType;
  powerFlug: PowerFlug;
  userNameId: number;
  userIconId: number;
}

export interface Post {
  content: Content;
  userName: string;
  userIcon: string;
}

export interface RecomendContent {
  id: number;
  text: string;
  type: RecomendationContentType;
  score: ScoreType; // いいねした時の得点
  skipScore: ScoreType; // skipした時の得点
}

export interface Topic {
  id: number;
  imagePath: string;
  largeImagePath: string;
  title: string;
  text: string;
  textShort: string;
  unavailable?: boolean;
  contents?: Content[];
}
export interface Tutorial {
  id: number;
  imagePath: string;
  text: string;
}

export const MODE = {
  SELECTION: "selection",
  RECOMMENDATION: "recommendation",
} as const;

export type Mode = (typeof MODE)[keyof typeof MODE];
