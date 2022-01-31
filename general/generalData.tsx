
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

export type chordElement = {
    type: ChordType,
    chord: string,
    position: number,
    fontsize: number
}

export enum ChordSymbol {
    C,
    C_SHARP,
    D,
    D_SHARP
}

export type duoLine = {
    name: string,
    chordLine: Array<chordElement>,
    textLine: string,
    fontSize: number
}
