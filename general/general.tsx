import Head from 'next/head';
import {ChangeEvent, MouseEvent} from 'react';
import {FaGithub} from 'react-icons/fa'
import {VscAdd} from 'react-icons/vsc'
import {MdCancel} from 'react-icons/md'
import {FOUR_QUARTER_BAR, buttonData, CHAR_CHORD_LENGTH, chordArray, duoLine, HEADER_NAME, MAX_CHORD_LENGTH, MIN_CHORD_LENGTH, START_CHORD_LENGTH, TIME_SIGNATURE, TimeSignatureEnum} from './generalData';
import { ShowOptionView } from './chordOption';

export function Footer(){
    return (
        <footer className="bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center w-full h-24 border-t">
            <a
                className="flex items-center justify-center"
                href="https://github.com/artmarks/music-helper"
                target="_blank"
                rel="noopener noreferrer"
            >
            <div className='text-5xl'><FaGithub/></div>
            </a>
        </footer>
    );
}

export function Header(){
    return ( 
        <Head>
        <title>{HEADER_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    );
}

export function StandardButton(props: buttonData){
    return (
        <button data-cy={props.cy} onClick={props.click} className='bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 border-l-4 border-white hover:border-blue-500 rounded flex justify-center'>
            {props.name} {buttonStyleSwitch(props.style)}
        </button>
    );
}

function buttonStyleSwitch(style: String | undefined){
    switch(style){
        case 'add':
            return (<VscAdd data-cy="addNewTabButtonSVG" color={"white"} fontSize={"1.5em"} />);
        default:
            return '';
    }
}

export function fillOption(value: string, index: number) {
    return (
        <option key={index} value={value}>{value}</option>
    )
}

export function Headline(props: any){
    return (
        <div className="text-3xl font-bold flex justify-center mb-4">
            <div data-cy='headline'>{props.text}</div> 
        </div>
    )
}

export function SongHead(props: any) {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col border-2 border-white space-y-2 rounded max-w-[1024px] w-[90vw] min-w-[250px] '>
                
                <div className='mt-2 ml-2 flex flex-col'>
                <input className=' w-1/2 lg:w-[40%] px-2 rounded' type='text' placeholder='Song name' data-cy="songNameInput"/>
                </div>

                <div className='flex flex-wrap ml-2'>

                    <label className='mr-2 mt-1' htmlFor='timeSignatureSelect' >Time signature</label>
                    <select id='timeSignatureSelect' className='rounded mr-4' data-cy="timeSignatureSelect" onChange={(e) =>props.timeCallback(e)}>
                    {TIME_SIGNATURE.map((value, index)=> {
                        return fillOption(value, index)
                    })}
                    </select>

                    <label className='mr-2 mt-1' htmlFor='keySelect'>Song key</label>
                    <select id='keySelect' className='rounded mr-4' onChange={(e) =>props.keyCallback(e)} >
                    {chordArray.map((value, index)=> {
                        return fillOption(value, index)
                    })}
                    </select>

                    <div className='mr-2'>
                        <StandardButton name='Transpose' click={ (e : MouseEvent) => console.log(e) }/>
                    </div> 

                </div>
                <div className='flex flex-col mx-2'>
                <textarea className='rounded h-fit' onKeyUp={(e) => adjustTextarea(e) } placeholder='Description'></textarea>
                </div>

                {/*placeholder*/}
                <div/>

            </div>
        </div>
    )
}

function adjustTextarea(e: React.KeyboardEvent<HTMLTextAreaElement>){
    const element = e.target as HTMLTextAreaElement
    element.style.height = "1px";
    element.style.height = (25+element.scrollHeight)+"px";
  }

function allowDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
}

function lineNameOnchange(event: ChangeEvent, index: number, duoLineArray: Array<duoLine>, callback: Function){
    const target = event.target as HTMLInputElement
    const indexSearch = duoLineArray.at(index)
    if(!indexSearch){
        return
    }
    indexSearch!.name = target.value
    callback()
}

function chordValueChange(event: ChangeEvent<HTMLInputElement>, beat: number, index: number, duoLineArray: Array<duoLine>, callback: Function){
    let width = START_CHORD_LENGTH + event.target.value.length * CHAR_CHORD_LENGTH
    if(width > MAX_CHORD_LENGTH){
      width = MAX_CHORD_LENGTH
    }else if (width < MIN_CHORD_LENGTH){
      width = MIN_CHORD_LENGTH
    } 
    event.target.style.width = width + "px"

    const target = event.target as HTMLInputElement
    const indexSearch = duoLineArray.at(index)
    if(!indexSearch){
        return
    }
    const musicElement = indexSearch.musicElements.at(beat-1)
    musicElement!.chord = target.value

    callback()
    
  }

function textLineOnchange(event: ChangeEvent, beat: number, index: number, duoLineArray: Array<duoLine>, callback: Function ){
    const target = event.target as HTMLInputElement
    const indexSearch = duoLineArray.at(index)
    if(!indexSearch){
        return
    }
    const musicElement = indexSearch.musicElements.at(beat-1)
    musicElement!.text = target.value

    callback()
}

function deleteDuoLine(event: MouseEvent,  index: number, duoLineArray: Array<duoLine>, callback: Function ){
    duoLineArray.splice(index,1)
    callback()
}

function showModificationOption(e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) {
    console.log('mod', e);
    const input = e.target as HTMLInputElement
    const parentDiv = input.parentElement
    // console.log('input.parentElement',input.parentElement);
    // if(parentDiv){
    //     parentDiv.style.height = '25vw'
    //     parentDiv.style.width = '90vw'
    // }
   
}


function showDuoLine(line: duoLine, index: number, duoLine: Array<duoLine>, callback: Function, bar: Array<number>, callbackModal: Function){
    return (
      <div key={'showDuoLine' + index} className='flex flex-col border-2 border-white mt-4 rounded sm:w-full md:w-[49%] lg:w-[49%]' data-cy={"duoline" + index} >

        <div className='flex flex-row mt-1'>
            <input className='w-fit  my-1 mx-2 px-1' type="text" placeholder={ line.name } onChange={(e) => lineNameOnchange(e, index, duoLine, callback)}/>
            <div className='ml-2'>
                <button onClick={(e) => deleteDuoLine(e, index, duoLine, callback)} className='bg-red-400 rounded-lg hover:bg-red-500 text-2xl mt-1'><MdCancel/></button>
            </div>
        </div>

        <div className='flex flex-col '  >
          <div className=' flex flex-wrap'  >
          {line.musicElements.map((beat, beatIndex )=> {
            return (
                <div key={"beatIndex" + beatIndex} className=""> 
                    <div className='flex flex-col'>
                        <div className='ml-1 w-fit'>
                            <div className=''>
                                <div className='relative p-2 bg-green-300 rounded-lg flex justify-center items-center text-white text-xl mb-2'>
                                    <input className='bg-green-300 text-white w-6' placeholder='' onClick={(e) => callbackModal(e)} onChange={(e) => chordValueChange(e, beat.bar, index, duoLine, callback)} />
                                    <div className='absolute h-0 border-t-[20px] border-t-green-300 border-r-[12px] border-r-transparent border-l-[12px] border-l-transparent top-[95%]' />
                                </div>
                            </div>
                        </div>
                    </div><input className='px-1 mx-2 mb-4 rounded-lg border-2 border-transparent hover:border-2 hover:border-green-200 ,' type="text" placeholder="" onChange={(e) => textLineOnchange(e, beat.bar, index, duoLine, callback)} />
                </div> )})
            }
          </div>
        </div>
      </div>
      );
  }



export function SongBar(params: any) {
    return (
        <div>
          <div className='flex flex-wrap align justify-between'>
            {
                params.duoLineArray.map((value: duoLine, index: number) => {
                    return showDuoLine(value, index, params.duoLineArray, params.callback,params.bar, params.callbackModal)            
                })
            }
          </div>
        </div>
    )
}


export function compareTimeSignature(t1 :TimeSignatureEnum, t2: TimeSignatureEnum): number{
    const firstChar1 = t1.charAt(0)
    const firstChar2 = t2.charAt(0)
    if(firstChar1 && firstChar2){
        return Number(firstChar2) - Number(firstChar1)
    }
    return 0
}