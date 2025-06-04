export interface GraphNode {
  id: string;
  type: "journal" | "tag" | "category";
  label: string;
  slug?: string;
  date?: string;
  mood?: string;
  category?: string;
  wordCount?: number;
  radius?: number;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  type: "tag" | "category" | "wikilink";
  strength?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
