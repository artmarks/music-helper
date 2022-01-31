import type { NextPage } from 'next'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import {Footer,Header, StandardButton} from '../../general/general'
import { FaPlusCircle} from 'react-icons/fa'
import { ChangeEvent, MouseEvent } from 'react';
import { ChordType, duoLine, noteElement } from '../../general/generalData';
import React from 'react';
// https://stackoverflow.com/questions/51785616/import-error-when-using-react-icons

// const Home: NextPage = (props) => {
//   return (
  

//   )
// }

// export default Home

interface IProps {
}

interface IState {
  duoLineArray?: Array<duoLine>
}

class DuoLineView extends React.Component<IProps, IState> {

  duoLineArray: Array<duoLine> = [];
  counter: number = 1

  clickAddDuoLine = (e: MouseEvent) => {
    e.preventDefault
    this.addDuoLine()
  }
  
  addDuoLine(){
    const musicElementArray: Array<noteElement> = [];
    [1,2,3,4].map(() => {
      musicElementArray.push(
        {
          position : 0,
          chord: "",
          fontsize: 12,
          type: ChordType.chord,
          bar: this.counter,
          text: ''
        }
      )
    })

    const test: duoLine = {
      name: 'Line ' + this.counter,
      musicElement : musicElementArray,
      fontSize: 12,
      
    }
    this.duoLineArray.push(test);
    this.setState({
      duoLineArray: this.duoLineArray
    }); 
    this.counter++
  }
  
  duoLineDefiniton(line: duoLine) {
    return (
      <div>
        <p>{line.name}</p>
      </div>
    );
  }


  lineNameOnchange(event: ChangeEvent, index: number){
    const target = event.target as HTMLInputElement
    const indexSearch = this.duoLineArray.at(index)
    if(!indexSearch){
        return
    }
    indexSearch!.name = target.value
    this.triggerDuoLineChange()
  }

  textLineOnchange(event: ChangeEvent, beat: number, index: number){
    const target = event.target as HTMLInputElement
    const indexSearch = this.duoLineArray.at(index)
    if(!indexSearch){
        return
    }
    const musicElement = indexSearch.musicElement.at(beat-1)
    musicElement!.text = target.value

    this.triggerDuoLineChange()
  }

  addChordToLine(e: MouseEvent, index: any){
    // const indexSearch = this.duoLineArray?.at(index)
    // if(indexSearch){
    //   const chord: chordElement = {
    //     chord : 'C',
    //     fontsize: 12,
    //     position: 25,
    //     type: ChordType.chord
    //   }
    //   indexSearch.chordLine.push(chord) 
    //   this.triggerDuoLineChange()
    // }
  }

  triggerDuoLineChange(){
    this.setState({
      duoLineArray: this.duoLineArray
    }); 
  }

  allowDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }
 
  chordValueChange(event: ChangeEvent<HTMLInputElement>, beat: number, index: number){
    let width = 6 + event.target.value.length * 11
    if(width > 77){
      width = 77
    }else if (width < 24){
      width = 24
    } 
    event.target.style.width = width + "px"

    const target = event.target as HTMLInputElement
    const indexSearch = this.duoLineArray.at(index)
    if(!indexSearch){
        return
    }
    const musicElement = indexSearch.musicElement.at(beat-1)
    musicElement!.chord = target.value

    this.triggerDuoLineChange()
    
  }

  showDuoLine(line: duoLine, index: any){
    return (
      <div className='flex flex-col border-2 w-[512px] mt-4' onDragOver={(e)=> this.allowDrop(e)} onDragEnd={(e) => {console.log('drag',e)}} >

        <div className='flex flex-row'>
          <input className='w-fit mb-12 mt-1 mx-2 px-1' type="text" placeholder={ line.name } onChange={(e) => this.lineNameOnchange(e,index)}/>
          <button className='mb-11 text-lg' onClick={(e) => this.addChordToLine(e,index)}><FaPlusCircle/></button>
          
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
                    <input className='bg-green-300 text-white w-6' placeholder='' onChange={(e)=> this.chordValueChange(e, beat, index)}/>
                    <div className='absolute w-fit h-0 border-t-[20px] border-t-green-300 border-r-[12px] border-r-transparent border-l-[12px] border-l-transparent top-[95%]' />
                  </div>
                </div>
              </div>
            </div><input className='w-24 px-1 mx-2 mb-4 rounded-lg border-2 border-transparent hover:border-2 hover:border-green-200 ,' type="text" placeholder="" onChange={(e) => this.textLineOnchange(e, beat, index)} /></>
           )})}     
          </div>
        </div>
      </div>
    );
  }

  constructor(props: IProps) {
    super(props)

    this.state = {
      duoLineArray: this.duoLineArray
    }
   
  }

  componentDidMount() {
    
    this.setState(
      {
        duoLineArray : this.duoLineArray
      }
    );
  }

  componentWillUnmount() {
    
  }

  exportState(){
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
        <div className="text-3xl font-bold flex justify-center mb-4">
          <div>Create a new tab</div> 
        </div>

        <div>
          
          <div className='flex flex-wrap align justify-between'>
          {
            this.state.duoLineArray?.map((value,index) => {
              return this.showDuoLine(value,index)                
            })
          }
          </div>
         
        </div>
  
        <div className='flex justify-center mt-6'>
          <div className='flex flex-col space-y-2 mb-2 mt-8 w-fit'>
          <StandardButton style={'add'} click={ (e: MouseEvent<Element, globalThis.MouseEvent>) => this.clickAddDuoLine(e) } />
          <StandardButton name={'Export'} click={ () => {this.exportState()}} />
          </div>
        </div>
      
      </main>
    
      <Footer/>
    </div>
    );
  }

 
}


export default DuoLineView