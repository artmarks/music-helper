import type { NextPage } from 'next'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import {ChordBubble, Footer,Header, StandardButton} from '../../general/general'
import {FaGuitar, FaPlusCircle} from 'react-icons/fa'
import {MdOutlineMenu} from 'react-icons/md'
import { ChangeEvent, MouseEvent } from 'react';
import { chordElement, chordLine, ChordSymbol, ChordType, duoLine } from '../../general/generalData';
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
    e.preventDefault;
    this.addDuoLine()
  }
  
  addDuoLine(){
    const test: duoLine = {
      name: 'Line ' + this.counter,
      chordLine : [
        {
          position : 0,
          chord: "Em7",
          fontsize: 12,
          type: ChordType.chord
        },
        {
          position : 50,
          chord: "G",
          fontsize: 12,
          type: ChordType.chord
        },
        {
          position : 75,
          chord: "F# dim",
          fontsize: 12,
          type: ChordType.chord
        },
      ],
      fontSize: 12,
      textLine: 'Test Song'
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

  lineNameOnchange(event: ChangeEvent, index: any){
    const target = event.target as HTMLInputElement
    const indexSearch = this.duoLineArray?.at(index)
    if(indexSearch){
      indexSearch.name = target.value
    }
    this.setState({
      duoLineArray: this.duoLineArray
    }); 
  }

  textLineOnchange(event: ChangeEvent, index: any){
    const target = event.target as HTMLInputElement
    const indexSearch = this.duoLineArray?.at(index)
    if(indexSearch){
      indexSearch.textLine = target.value
    }
    this.triggerDuoLineChange()
  }

  addChordToLine(e: MouseEvent, index: any){
    const indexSearch = this.duoLineArray?.at(index)
    if(indexSearch){
      const chord: chordElement = {
        chord : 'C',
        fontsize: 12,
        position: 25,
        type: ChordType.chord
      }
      indexSearch.chordLine.push(chord) 
      this.triggerDuoLineChange()
    }
  }

  triggerDuoLineChange(){
    this.setState({
      duoLineArray: this.duoLineArray
    }); 
  }

  allowDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }
 
  showDuoLine(line: duoLine, index: any){
    return (
      <div className='flex flex-col border-2 min-w-full' onDragOver={(e)=> this.allowDrop(e)} onDragEnd={(e) => {console.log('drag',e)}} >

        <div className='flex flex-row'>
          <input className='w-fit mb-12 mt-1 mx-2 px-1' type="text" placeholder={ line.name } onChange={(e) => this.lineNameOnchange(e,index)}/>
          <button className='mb-11 text-lg' onClick={(e) => this.addChordToLine(e,index)}><FaPlusCircle/></button>
          
        </div>

        
        <div className='flex flex-col m-2 space-y-2 '  >
          <div className='relative flex flex-row'  >
            {line.chordLine.map((value) => {
              return ChordBubble(value.chord,value.position)
            })}        
          </div>
          <input className='px-1 mb-4 border-2 border-transparent hover:border-2 hover:box-content hover:border-green-200 ,' type="text" placeholder={ line.textLine } onChange={(e) => this.textLineOnchange(e,index)}/>
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

  render() {
    return (
      <div className="bg-gradient-to-r from-gray-200 to-gray-400  flex flex-col items-center justify-center min-h-screen py-2">
      <Header/>

      <main className=" flex flex-col w-10/12 lg:w-[1024px] flex-1 px-14 text-center">
        <div className="text-3xl font-bold flex justify-center mb-4">
          <div>Create a new tab</div> 
        </div>

        <div>
          
          <div className='flex-col align space-y-4'>
          {
            this.state.duoLineArray?.map((value,index) => {
              return this.showDuoLine(value,index)                
            })
          }
          </div>
         
        </div>
  
        <div className='flex justify-center mt-6'>
          <div className='flex flex-col space-y-2  mt-9 w-fit'>
          <StandardButton style={'add'} click={ (e: MouseEvent<Element, globalThis.MouseEvent>) => this.clickAddDuoLine(e) } />
          <StandardButton name={'Export'} click={ () => {}} />
          </div>
        </div>
      
      </main>
    
      <Footer/>
    </div>
    );
  }

 
}


export default DuoLineView