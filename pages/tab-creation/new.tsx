import type { NextPage } from 'next'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import {ChordBubble, Footer,Header, StandardButton} from '../../general/general'
import {FaGuitar} from 'react-icons/fa'
import {MdOutlineMenu} from 'react-icons/md'
import { MouseEvent } from 'react';
import { ChordSymbol, ChordType, duoLine } from '../../general/generalData';
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

  click = (e: MouseEvent) => {
    e.preventDefault;
    this.addDuoLine()
    console.log(1,this.duoLineArray)
  }
  
  addDuoLine(){
    console.log('addDuoLine');
    const test: duoLine = {
      name: 'Line ' + this.counter,
      chordLine : [
        {
          position : 10,
          chord: ChordSymbol.C,
          fontsize: 12,
          type: ChordType.chord
        }
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

  showDuoLine(line: duoLine){
    return (
      <div className='flex flex-row space-x-2'>
        <div className='border-2 border-white flex flex-row space-x-2 p-3 w-2/12'>
          <div>
            {line.name}
          </div>
          <div className='mt-1'>
            <button className='text-xl hover:text-green-100'><MdOutlineMenu/></button>
          </div>
        </div>
        <div className='flex flex-col space-y-2 w-10/12'>
          {ChordBubble('Em7', 67)}        
          <input type="text" value={ line.textLine }/>
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

      <main className="flex flex-col w-full flex-1 px-14 text-center">
        <div className="text-3xl font-bold flex justify-center mb-4">
          <div>Create a new tab</div> 
        </div>

        <div>
          
          <div className='flex flex-col space-y-4 w-full'>
          {
            this.state.duoLineArray?.map((value,index) => {
              return this.showDuoLine(value)                
            })
          }
          </div>
         
        </div>
        <div className='flex justify-center'>
          <div className='flex flex-col space-y-2  mt-9 w-fit'>
          <StandardButton style={'add'} click={ (e: MouseEvent<Element, globalThis.MouseEvent>) => this.click(e) } />
          <StandardButton name={'Export Hard'} click={ () => {}} />
          </div>
        </div>
      
      </main>
    
      <Footer/>
    </div>
    );
  }

 
}


export default DuoLineView