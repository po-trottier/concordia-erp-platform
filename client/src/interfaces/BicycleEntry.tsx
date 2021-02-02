import { ReactElement } from 'react';

export interface bicycleEntry {
    key: String,
    name: String,
    parts: String[],
    description: String,
    quantity: Number,
    price: Number,
    frameSize: String,
    color: String,
    finish: String,
    grade: String,
    details?: ReactElement
}