import type { NextPage } from 'next'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { Footer,Header, Headline, SongBar, SongHead, StandardButton} from '../../general/general'
import { FaPlusCircle} from 'react-icons/fa'
import { ChangeEvent, MouseEvent } from 'react';
import { ChordType, duoLine, noteElement } from '../../general/generalData';
import React from 'react';
// https://stackoverflow.com/questions/51785616/import-error-when-using-react-icons

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




  triggerDuoLineChange(){
    this.setState({
      duoLineArray: this.duoLineArray
    }); 
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
        <Headline text="Create a new tab" />
        <SongHead/>

        <SongBar duoLineArray={this.state.duoLineArray} callback={() => this.triggerDuoLineChange()} />
  
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