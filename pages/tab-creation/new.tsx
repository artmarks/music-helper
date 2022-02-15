import {compareTimeSignature, Footer, Header, Headline, SongBar, SongHead, StandardButton} from '../../general/general'
import {MouseEvent} from 'react';
import { ChordType, duoLine, noteElement, TimeSignatureEnum, TIME_SIGNATURE, musicSheet, ChordSymbol, TIME_ARRAY_MAP, musicElement} from '../../general/generalData';
import React from 'react';
import { ShowOptionView } from '../../general/chordOption';

interface IProps {}

interface IState {
    duoLines?: Array<duoLine>,
    timeSignature?: TimeSignatureEnum,
    modalOpen?: boolean
}

class DuoLineView extends React.Component < IProps, IState > {

    modalOpen: boolean = false
    indexBubble: number = 0
    indexLine: number = 0

    constructor(props : IProps) {
        super(props)
        this.state = {
            duoLines: this.musicSheet.duoLines,
            timeSignature: TimeSignatureEnum.FOUR_QUARTER,
            modalOpen: this.modalOpen
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
        
        let array: Array<number> = TIME_ARRAY_MAP.get(this.musicSheet.timeSignature)!
       
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
        
        if(TIME_SIGNATURE.includes(e.currentTarget.value) ){

            const newSignature = e.currentTarget.value as TimeSignatureEnum
            const compare = compareTimeSignature(this.musicSheet.timeSignature, newSignature)
            if(compare > 0){
                
                this.musicSheet.duoLines.forEach((duoLine) => {
                    const musicElement = duoLine.musicElements.at(duoLine.musicElements.length - 1)
                    if(!musicElement){
                        return
                    }
                    
                    for(let i=0;i<compare;i++){
                        const musicElementClone = {...musicElement}
                        musicElementClone.bar ? musicElementClone.bar++ : musicElementClone.bar = 1;
                        musicElementClone.text = ''  
                        musicElementClone.position = 0
                        musicElementClone.chord = ''

                        duoLine.musicElements.push(musicElementClone)
                    }
                })
                
            }else if(compare < 0){
                this.musicSheet.duoLines.forEach((duoLine) => {
                    duoLine.musicElements.splice(compare )
                })
            }

            this.musicSheet.timeSignature = e.currentTarget.value as TimeSignatureEnum

            this.setState({timeSignature: this.getTimeSignature(), duoLines: this.musicSheet.duoLines});
        }
    }

    getTimeSignature(): TimeSignatureEnum{
        if(this.state.timeSignature !== undefined){
            return this.state.timeSignature 
        }else{
            return TimeSignatureEnum.FOUR_QUARTER
        }
    }

    callbackModal(e?: MouseEvent < Element, globalThis.MouseEvent >, indexBubble?: number, indexLine?: number){
        this.modalOpen = !this.modalOpen
        this.setState({modalOpen: this.modalOpen});

        if(e){
            const target = e.target as HTMLInputElement
            console.log('target', target)
        }
        
        this.indexBubble = indexBubble ? indexBubble: 0;   
        this.indexLine = indexLine ? indexLine: 0
    }

    setChordForBubble(e: musicElement){
        if(e.Chord){
            const indexSearch = this.musicSheet.duoLines.at(this.indexLine)
            if(!indexSearch){
                return
            }
            const musicElement = indexSearch.musicElements.at(this.indexBubble - 1)
            if(musicElement){
                musicElement.chord = e.Chord?.basicChord + e.Chord?.additional
                this.triggerDuoLineChange()
            }
        }
    }

    render() {
        return (
            <div className="bg-gradient-to-r from-gray-200 to-gray-400  flex flex-col justify-center min-h-screen py-2 px-4">
                <Header/>

                <ShowOptionView isOpen={this.modalOpen} label={'testi'} callbackClose={(e: any)=> this.callbackModal(e)}
                    setChordForBubble={(e: musicElement)=>this.setChordForBubble(e)}
                />

                {/* w-10/12 lg:w-[1280px] */}
                <main className=" flex flex-col flex-1 text-center">
                    <Headline text="Create a new tab"/>
                    <SongHead timeCallback={(e: any) => this.changeTimeSignature(e)}  />

                    <SongBar duoLineArray={ this.musicSheet.duoLines} bar={TIME_ARRAY_MAP.get(this.getTimeSignature())}
                        callback={ () => this.triggerDuoLineChange() } callbackModal={(e:any, indexBubble: number, indexLine: number) => this.callbackModal(e,indexBubble, indexLine)}
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
