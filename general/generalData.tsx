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

export const SIX_EIGHTH_BAR = [
    1,2,3,4,5,6
]

export const TIME_SIGNATURE: Array<string> = [
    '4/4', '3/4', '2/4', '6/8'
]

export enum TimeSignatureEnum {
    TWO_QUARTERS = '2/4',
    THREE_QUARTER= '3/4',
    FOUR_QUARTER = '4/4',
    SIX_EIGHTH= '6/8',
}

export const TIME_ARRAY_MAP = new Map<TimeSignatureEnum, Array<number>>([
    [TimeSignatureEnum.TWO_QUARTERS, TWO_QUARTER_BAR],
    [TimeSignatureEnum.THREE_QUARTER, THREE_QUARTER_BAR],
    [TimeSignatureEnum.FOUR_QUARTER, FOUR_QUARTER_BAR],
    [TimeSignatureEnum.SIX_EIGHTH, SIX_EIGHTH_BAR],
])

export const chordArray: Array<string> = [
    'C', 'C#', 'D', 'D#', 'E', 'F',
    'G', 'G#', 'A', 'A#', 'B'
]

export enum ChordSymbol {
    C = 'C', C_SHARP = 'C#',
    D = 'D', D_SHARP = 'D#',
    E = 'E',
    F = 'F', F_SHARP = 'F#',
    G = 'G', G_SHARP = 'G#',
    A = 'A', A_SHARP = 'A#',
    B = 'B'
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

export const enum chordChangeOptionEnum {
    Empty = 0,
    Chord = 1,
    Tab = 2
}

export type Chord = {
    basicChord: ChordSymbol
    additional?: string
}

export type Tab = {
    guitarLine: Array<string>,
    tabElement: Array<string>
} 

export type musicElement = {
    ChordType: chordChangeOptionEnum,
    Chord?: Chord,
    Tab?: Tab
} 
