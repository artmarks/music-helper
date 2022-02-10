import {Footer, Header, Headline, SongBar, SongHead, StandardButton} from '../../general/general'
import {MouseEvent} from 'react';
import { FOUR_QUARTER_BAR, ChordType, duoLine, noteElement, TimeSignatureEnum, TIME_SIGNATURE, TIME_MAP, musicSheet, ChordSymbol, TWO_QUARTER_BAR, THREE_QUARTER_BAR, TIME_ARRAY_MAP} from '../../general/generalData';
import React from 'react';

interface IProps {}

interface IState {
    duoLines?: Array<duoLine>,
    timeSignature?: TimeSignatureEnum
}

class DuoLineView extends React.Component < IProps, IState > {

    constructor(props : IProps) {
        super(props)
        this.state = {
            duoLines: this.musicSheet.duoLines,
            timeSignature: TimeSignatureEnum.FOUR_QUARTER
        }

    }

    musicSheet: musicSheet = {
        descprition:'',
        duoLines: [],
        name: '',
        songKey: ChordSymbol.C,
        timeSignature: TimeSignatureEnum.FOUR_QUARTER
    }
    counter : number = 1;

    clickAddDuoLine = (e : MouseEvent) => {
        e.preventDefault
        this.addDuoLine()
    }

    addDuoLine() {
        
        let array = []
        switch(this.musicSheet.timeSignature){
            case TimeSignatureEnum.FOUR_QUARTER:
                array = FOUR_QUARTER_BAR
                break;
            case TimeSignatureEnum.THREE_QUARTER:
                array = THREE_QUARTER_BAR
                break;
            case TimeSignatureEnum.TWO_QUARTERS:
            array = TWO_QUARTER_BAR
            break;
        }
        const noteElementArray: Array<noteElement>  = []
        array.forEach((value)=>{
            const notelement: noteElement = {
                bar: value,
                fontsize:12,
                position:0,
                text:'',
                type:ChordType.chord,
                chord: ''
            }
            noteElementArray.push(notelement)
        })

        const duoLine: duoLine = {
            fontSize: 12,
            musicElements: noteElementArray,
            name: 'Line ' + this.counter
        }

        this.musicSheet.duoLines.push(duoLine)
        this.triggerDuoLineChange()
        this.counter ++

    }

    triggerDuoLineChange() {
        this.setState({
            duoLines: this.musicSheet.duoLines,
            timeSignature: this.musicSheet.timeSignature
        });
    }

    componentDidMount() {
        this.setState({
            duoLines: this.musicSheet.duoLines,
            timeSignature: this.musicSheet.timeSignature
        });
    }

    componentWillUnmount() {}

    exportState() {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.musicSheet)));
        element.setAttribute('download', 'song.json');
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
    }

    changeTimeSignature(e: React.FormEvent<HTMLSelectElement>){
        console.log(e)
        
        if(TIME_SIGNATURE.includes(e.currentTarget.value) ){
            //TODO trigger change Event
            this.musicSheet.timeSignature = TIME_MAP.get(e.currentTarget.value) as TimeSignatureEnum
            this.setState({timeSignature: this.getTimeSignature()});
        }
    }

    getTimeSignature(): TimeSignatureEnum{
        if(this.state.timeSignature !== undefined){
            return this.state.timeSignature 
        }else{
            return TimeSignatureEnum.FOUR_QUARTER
        }
    }

    render() {
        return (
            <div className="bg-gradient-to-r from-gray-200 to-gray-400  flex flex-col items-center justify-center min-h-screen py-2">
                <Header/>

                <main className=" flex flex-col w-10/12 lg:w-[1280px] flex-1 px-14 text-center">
                    <Headline text="Create a new tab"/>
                    <SongHead keyCallback={console.log} timeCallback={(e: any) => this.changeTimeSignature(e)}  />

                    <SongBar duoLineArray={ this.state.duoLines} bar={TIME_ARRAY_MAP.get(this.getTimeSignature())}
                        callback={ () => this.triggerDuoLineChange() }
                    />

                    <div className='flex justify-center mt-6'>
                        <div className='flex flex-col space-y-2 mb-2 mt-8 w-fit'>
                            <StandardButton style={'add'} cy='addNewTabButton'
                                click={
                                    (e : MouseEvent < Element, globalThis.MouseEvent >) => this.clickAddDuoLine(e)
                                }/>
                            <StandardButton name={'Export'} cy='addExportTabButton'
                                click={
                                    () => {
                                        this.exportState()
                                    }
                                }/>
                        </div>
                </div>

            </main>
            <Footer/>
        </div>
        );
    }
}

export default DuoLineView
