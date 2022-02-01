
export type buttonData = {
    name?: string,
    style?: string,
    symbol?: string,
    click: any,
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

export const chordArray: Array<string> = [
    'C', 'C#', 'D', 'D#', 'E', 'F',
    'G', 'G#', 'A', 'A#', 'B'
]

export enum ChordSymbol {
    C,
    C_SHARP,
    D,
    D_SHARP
}

export type duoLine = {
    name: string,
    musicElement: Array<noteElement>,
    fontSize: number
}
