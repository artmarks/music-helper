import Head from 'next/head';
import {ChangeEvent} from 'react';
import {FaGithub} from 'react-icons/fa'
import {VscAdd} from 'react-icons/vsc'
import {buttonData, chordArray, duoLine} from './generalData';


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
        <title>Music Helper :)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    );
}

export function StandardButton(props: buttonData){
    return (
        <button onClick={props.click} className='bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 border-l-4 border-white hover:border-blue-500 rounded flex justify-center'>
            {props.name} {buttonStyleSwitch(props.style)}
        </button>
    );
}

function buttonStyleSwitch(style: String | undefined){
    switch(style){
        case 'add':
            return (<VscAdd color={"white"} fontSize={"1.5em"} />);
        default:
            return '';
    }
}

export function fillOption(value: string) {
    return (
        <option value={value}>{value}</option>
    )
}

export function Headline(props: any){
    return (
        <div className="text-3xl font-bold flex justify-center mb-4">
            <div>{props.text}</div> 
        </div>
    )

}

export function SongHead() {
    return (
        <div className='flex flex-col border-2 border-white space-y-2 rounded'>
            <div className='mt-2 ml-2 flex flex-col'>
              <input className=' w-1/2 lg:w-[40%] px-2 rounded' type='text' placeholder='Song name' />
            </div>
            <div className='flex flex-wrap ml-2 space-x-4'>
              <label htmlFor='timeSignatureSelect' >Time signature</label>
              <select id='timeSignatureSelect' className='rounded'>
                <option>3/4</option>
                <option selected>4/4</option>
              </select>

              <label htmlFor='keySelect'>Song key</label>
              <select id='keySelect' className='rounded'>
                {chordArray.map((value)=> {
                  return fillOption(value)
                })}
              </select>
            </div>
            <div className='flex flex-col mx-2'>
              <textarea className='rounded h-fit' onKeyUp={(e) => adjustTextarea(e) } placeholder='Description'></textarea>
            </div>
            <div>

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
    let width = 6 + event.target.value.length * 11
    if(width > 77){
      width = 77
    }else if (width < 24){
      width = 24
    } 
    event.target.style.width = width + "px"

    const target = event.target as HTMLInputElement
    const indexSearch = duoLineArray.at(index)
    if(!indexSearch){
        return
    }
    const musicElement = indexSearch.musicElement.at(beat-1)
    musicElement!.chord = target.value

    callback()
    
  }

function textLineOnchange(event: ChangeEvent, beat: number, index: number, duoLineArray: Array<duoLine>, callback: Function ){
    const target = event.target as HTMLInputElement
    const indexSearch = duoLineArray.at(index)
    if(!indexSearch){
        return
    }
    const musicElement = indexSearch.musicElement.at(beat-1)
    musicElement!.text = target.value

    // this.triggerDuoLineChange()
    callback()
}



function showDuoLine(line: duoLine, index: any, duoLineArray: Array<duoLine>, callback: Function){
    return (
      <div className='flex flex-col border-2 border-white w-[512px] mt-4 rounded' onDragOver={(e)=> allowDrop(e)} onDragEnd={(e) => {console.log('drag',e)}} >

        <div className='flex flex-row'>
          <input className='w-fit mb-12 mt-1 mx-2 px-1' type="text" placeholder={ line.name } onChange={(e) => lineNameOnchange(e, index, duoLineArray, callback)}/>
          
        </div>

        
        <div className='flex flex-col m-2 space-y-2 '  >
          <div className='relative flex flex-wrap'  >
            {/* TODO dynamic solution */}
           {[1,2,3,4].map((beat )=> {
            return ( 
          <><div className='flex flex-col'>
              <div className={'absolute -mt-[52px] flex items-center justify-center '}>
                <div className=''>
                  <div draggable className='relative p-2 bg-green-300 rounded-lg flex justify-center items-center text-white text-xl'>
                    <input className='bg-green-300 text-white w-6' placeholder='' onChange={(e)=> chordValueChange(e, beat, index, duoLineArray, callback)}/>
                    <div className='absolute w-fit h-0 border-t-[20px] border-t-green-300 border-r-[12px] border-r-transparent border-l-[12px] border-l-transparent top-[95%]' />
                  </div>
                </div>
              </div>
            </div><input className='w-24 px-1 mx-2 mb-4 rounded-lg border-2 border-transparent hover:border-2 hover:border-green-200 ,' type="text" placeholder="" onChange={(e) => textLineOnchange(e, beat, index, duoLineArray, callback)} /></>
           )})}     
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
            params.duoLineArray?.map((value: duoLine, index: any) => {
              return showDuoLine(value, index, params.duoLineArray, params.callback)                
            })
          }
          </div>
        </div>
    )
}
