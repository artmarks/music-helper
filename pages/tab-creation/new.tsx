import {compareTimeSignature, Footer, Header, Headline, SongBar, SongHead, StandardButton} from '../../general/general'
import {MouseEvent} from 'react';
import { FOUR_QUARTER_BAR, ChordType, duoLine, noteElement, TimeSignatureEnum, TIME_SIGNATURE, TIME_MAP, musicSheet, ChordSymbol, TWO_QUARTER_BAR, THREE_QUARTER_BAR, TIME_ARRAY_MAP} from '../../general/generalData';
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
            //TODO trigger change Event

            const newSignature = e.currentTarget.value as TimeSignatureEnum
            const compare = compareTimeSignature(this.musicSheet.timeSignature, newSignature)
            const old = this.musicSheet.timeSignature
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
                const absoluteCompare = compare * (-1)
                this.musicSheet.duoLines.forEach((duoLine) => {
                    const old = duoLine.musicElements.length - 1
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

    callbackModal(){
        console.log(this.modalOpen);
        this.modalOpen = !this.modalOpen
        this.setState({modalOpen: this.modalOpen});

    }

    render() {
        return (
            <div className="bg-gradient-to-r from-gray-200 to-gray-400  flex flex-col justify-center min-h-screen py-2 px-4">
                <Header/>

                <ShowOptionView isOpen={this.modalOpen} label={'testi'} callbackClose={()=> this.callbackModal()} />

                {/* w-10/12 lg:w-[1280px] */}
                <main className=" flex flex-col flex-1 text-center">
                    <Headline text="Create a new tab"/>
                    <SongHead keyCallback={console.log} timeCallback={(e: any) => this.changeTimeSignature(e)}  />

                    <SongBar duoLineArray={ this.musicSheet.duoLines} bar={TIME_ARRAY_MAP.get(this.getTimeSignature())}
                        callback={ () => this.triggerDuoLineChange() } callbackModal={() => this.callbackModal()}
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
