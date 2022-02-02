import {Footer, Header, Headline, SongBar, SongHead, StandardButton} from '../../general/general'
import {MouseEvent} from 'react';
import { bar, ChordType, duoLine, noteElement, TimeSignatureEnum} from '../../general/generalData';
import React from 'react';

interface IProps {}

interface IState {
    duoLineArray?: Array < duoLine >
}

class DuoLineView extends React.Component < IProps, IState > {

    duoLineArray : Array < duoLine > = [];
    counter : number = 1;

    clickAddDuoLine = (e : MouseEvent) => {
        e.preventDefault
        this.addDuoLine()
    }

    addDuoLine() {
        const musicElementArray: Array < noteElement > = [];
        bar.map(() => {
            musicElementArray.push({
                position: 0,
                chord: "",
                fontsize: 12,
                type: ChordType.chord,
                bar: this.counter,
                text: ''
            })
        })

        const emptyLine: duoLine = {
            name: 'Line ' + this.counter,
            musicElement: musicElementArray,
            fontSize: 12,
            timeSignature: TimeSignatureEnum.THREE_QUARTER
        }
        this.duoLineArray.push(emptyLine);
        this.triggerDuoLineChange()
        this.counter ++
    }

    triggerDuoLineChange() {
        this.setState({duoLineArray: this.duoLineArray});
    }

    constructor(props : IProps) {
        super(props)
        this.state = {
            duoLineArray: this.duoLineArray
        }

    }

    componentDidMount() {
        this.setState({duoLineArray: this.duoLineArray});
    }

    componentWillUnmount() {}

    exportState() {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.duoLineArray)));
        element.setAttribute('download', 'song.json');
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
    }

    render() {
        return (
            <div className="bg-gradient-to-r from-gray-200 to-gray-400  flex flex-col items-center justify-center min-h-screen py-2">
                <Header/>

                <main className=" flex flex-col w-10/12 lg:w-[1280px] flex-1 px-14 text-center">
                    <Headline text="Create a new tab"/>
                    <SongHead/>

                    <SongBar duoLineArray={ this.state.duoLineArray}
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
