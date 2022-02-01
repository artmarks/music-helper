export const MAX_CHORD_LENGTH: number = 77
export const MIN_CHORD_LENGTH: number = 24
export const START_CHORD_LENGTH: number = 6
export const CHAR_CHORD_LENGTH: number = 11

export const HEADER_NAME: string = "Music Helper :)"

export type buttonData = {
    name?: string,
    style?: string,
    symbol?: string,
    click: any,
    cy?: string
};

export enum ChordType {
    chord,
    tab,
    mix
}

export type noteElement = {
    type: ChordType,
    chord?: string,
    text: string,
    position: number,
    bar: number
    fontsize: number
}

export const timeSignature: Array<string> = [
    '3/4', '4/4', '2/4'
]

export const bar = [
    1,2,3,4
]

export enum TimeSignatureEnum {
    THREE_QUARTER,
    FOUR_QUARTER,
    TWO_QUARTERS
}

export const chordArray: Array<string> = [
    'C', 'C#', 'D', 'D#', 'E', 'F',
    'G', 'G#', 'A', 'A#', 'B'
]

export enum ChordSymbol {
    C, C_SHARP,
    D, D_SHARP,
    E,
    F, F_SHARP,
    G, G_SHARP,
    A, A_SHARP,
    B
}

export type duoLine = {
    name: string,
    musicElement: Array<noteElement>,
    fontSize: number,
    timeSignature: TimeSignatureEnum
}
