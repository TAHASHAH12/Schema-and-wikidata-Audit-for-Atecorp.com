export interface Entity {
  relation: string;
  qid: string;
  label: string;
  desc: string;
  why: string;
}

export interface SegmentRow {
  segment: string;
  pages: number;
  v1: number;
  v2: number;
  v1PerPage: number;
  v2PerPage: number;
  traffic: number;
}

export interface PoolRow {
  qid: string;
  label: string;
  desc: string;
  pages: number;
  relations: string[];
}

export interface SamplePage {
  url: string;
  segment: string;
  traffic: number;
  v1: number;
  v2: number;
  entities: Entity[];
}

export interface EntityModel {
  totals: {
    pages: number;
    contentPages: number;
    nonCanonical: number;
    v1Entities: number;
    v2Entities: number;
    v1PerPage: number;
    v2PerPage: number;
    v2PerContentPage: number;
    multiple: number;
    distinctEntities: number;
    pagesWithZeroV1: number;
    pagesWithZeroV2: number;
    candidatePool: number;
    vocabTerms: number;
    classBlocks: number;
    priorV2Entities: number;
    priorV2PerPage: number;
  };
  bySegment: SegmentRow[];
  entityPool: PoolRow[];
  samplePages: SamplePage[];
}

export interface Provenance {
  harvest: {
    classes: { cls: string; count: number; relation: string }[];
    classCount: number;
    candidateEntities: number;
    surfaceForms: number;
  };
  coverage: {
    vocabTerms: number;
    exact: number;
    headConcept: number;
    noEntity: number;
    coreResolved: number;
    coreRejected: number;
    providersResolved: number;
    providersNoEntity: number;
    providerCandidates: string[];
  };
  verification: {
    wrongSense: { term: string; qid: string; label: string; desc: string; kind: string }[];
    myErrors: { term: string; bad: string; bad_label: string; good: string }[];
    deadQids: { qid: string; claimed: string }[];
    v2PoolChecked: number;
  };
}

/* ---- schema audit ---- */

export interface TypeCount { type: string; pages: number; pct: number }

export interface CoverageRow {
  segment: string;
  pages: number;
  traffic: number;
  avgTypes: number;
  types: TypeCount[];
}

export interface Defect {
  id: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  pages: number;
  title: string;
  detail: string;
  fix: string;
}

export interface CompetitorRow {
  domain: string;
  types: number;
  list: string[];
  hasProduct: boolean;
  hasOffer: boolean;
  hasOrg: boolean;
  hasItemList: boolean;
  sampled: boolean;
  note: string;
}

export interface Catalogue {
  cataloguePages: number;
  manufacturers: number;
  auditedPages: number;
  beyondAudit: number;
  sampleDrawn: number;
  sampleLive: number;
  sampleWithProduct: number;
  rate: number;
  ciLo: number;
  ciHi: number;
  nonLive: number;
  estUnmarkedLo: number;
  estUnmarkedHi: number;
}

export interface SchemaFindings {
  catalogue: Catalogue;
  coverage: CoverageRow[];
  defects: Defect[];
  competitors: CompetitorRow[];
  clientTypes: string[];
  productExample: string;
  totals: {
    pages: number; types: number;
    productPages: number; productWith: number; productWithout: number;
    trafficUnmarked: number; trafficMarked: number;
    orgPages: number; noOrgPages: number;
    brandPages: number; categoryPages: number; itemListPages: number;
    standardsPages: number; noJsonLd: number;
    offers: number; offersWithLease: number;
  };
}
