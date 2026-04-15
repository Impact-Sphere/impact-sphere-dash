export type ProjectCategory =
  | "Environment"
  | "Education"
  | "Healthcare"
  | "Tech Equity"
  | "Disaster Relief";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  image: string;
  funded: number;
  raised: string;
  goal: string;
  featured?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface CategoryFilterItem {
  id: string;
  label: string;
  active?: boolean;
}
