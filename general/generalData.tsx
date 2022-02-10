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



export const FOUR_QUARTER_BAR = [
    1,2,3,4
]

export const THREE_QUARTER_BAR = [
    1,2,3
]

export const TWO_QUARTER_BAR = [
    1,2
]

export const TIME_SIGNATURE: Array<string> = [
    '4/4', '3/4', '2/4'
]

export enum TimeSignatureEnum {
    TWO_QUARTERS,
    THREE_QUARTER,
    FOUR_QUARTER,
}

export const TIME_MAP = new Map<string,TimeSignatureEnum>([
    ['3/4', TimeSignatureEnum.THREE_QUARTER],
    ['2/4', TimeSignatureEnum.TWO_QUARTERS],
    ['4/4', TimeSignatureEnum.FOUR_QUARTER],
])

export const TIME_ARRAY_MAP = new Map<TimeSignatureEnum, Array<number>>([
    [TimeSignatureEnum.TWO_QUARTERS, TWO_QUARTER_BAR],
    [TimeSignatureEnum.THREE_QUARTER, THREE_QUARTER_BAR],
    [TimeSignatureEnum.FOUR_QUARTER, FOUR_QUARTER_BAR],
])

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
    musicElements: Array<noteElement>,
    fontSize: number,
}

export type musicSheet = {
    name: string,
    duoLines: Array<duoLine>,
    timeSignature: TimeSignatureEnum
    songKey: ChordSymbol
    descprition: string
}