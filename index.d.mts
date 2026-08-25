export interface FileOptions {
  sourceFile: string;
  source: string;
}

export interface Offset {
  line?: number | undefined;
  column?: number | undefined;
}

export interface SourceMap {
  version: number;
  file?: string | null | undefined;
  sourceRoot?: string | undefined;
  sources?: Array<string | null> | undefined;
  sourcesContent?: Array<string | null> | undefined;
  names?: string[] | undefined;
  mappings?: string | unknown[] | undefined;
  sections?: unknown[] | undefined;
  [key: string]: unknown;
}

export interface Combiner {
  addFile(options: FileOptions, offset?: Offset): Combiner;
  base64(): string;
  comment(): string;
  _addGeneratedMap(sourceFile: string, source: string, offset?: Offset): Combiner;
  _addExistingMap(sourceFile: string, source: string, existingMap: SourceMap, offset?: Offset): Combiner;
}

export function create(file?: string, sourceRoot?: string): Combiner;
export function removeComments(source: string): string;

declare const combine: {
  create: typeof create;
  removeComments: typeof removeComments;
};

export default combine;
