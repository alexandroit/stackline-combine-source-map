declare class Combiner {
    constructor(file?: string, sourceRoot?: string);

    addFile(options: Combiner.FileOptions, offset?: Combiner.Offset): Combiner;
    base64(): string;
    comment(): string;
    _addGeneratedMap(sourceFile: string, source: string, offset?: Combiner.Offset): Combiner;
    _addExistingMap(sourceFile: string, source: string, existingMap: Combiner.SourceMap, offset?: Combiner.Offset): Combiner;
}

declare namespace Combiner {
    interface FileOptions {
        sourceFile: string;
        source: string;
    }

    interface Offset {
        line?: number | undefined;
        column?: number | undefined;
    }

    interface SourceMap {
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

    function create(file?: string, sourceRoot?: string): Combiner;
    function removeComments(source: string): string;
}

export = Combiner;
