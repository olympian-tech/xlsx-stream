// NOTICE: Modifications copyright (C) 2023 Olympian Tech
import { Transform } from 'stream';
import * as defaultTemplates from './templates';

/** Class representing a XLSX Row transformation from array to Row. Also adds the necessary XLSX header and footer. */
export default class XLSXRowTransform extends Transform {
    constructor(shouldFormat, templates = {}) {
        super({ objectMode: true });
        this.rowCount = 0;
        this.shouldFormat = shouldFormat;
        this.templates = Object.assign({}, defaultTemplates, templates);
        this.push(this.templates.SheetHeader);
    }
    /**
     * Transform array to row string
     */
    _transform(row, encoding, callback) { // eslint-disable-line
        if (!Array.isArray(row)) return callback();

        const xlsxRow = this.templates.Row(this.rowCount, row, this.shouldFormat);
        this.rowCount++;
        callback(null, xlsxRow);
    }

    _flush(callback) {
        this.push(this.templates.SheetFooter);
        callback();
    }
}
