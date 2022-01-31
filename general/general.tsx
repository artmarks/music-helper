import Head from 'next/head';
import { DragEvent } from 'react';
import {FaGithub} from 'react-icons/fa'
import {VscAdd} from 'react-icons/vsc'
import { buttonData, duoLine } from './generalData';


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

function calculateLeftValue(position: number) {
    return Math.floor(position)
}

function allowDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
}

export function ChordBubble(name: string, position:number) {
    const leftStyle ={
        left: calculateLeftValue(position) + '%'
    }
    return (
        <div onDragOver={(e)=> allowDrop(e)} onDragEnd={(e) => {console.log('drag',e)}}>
            <div draggable className= {'absolute -mt-11 flex items-center justify-center '} style={leftStyle} >
                <div className=''>
                    <div className='relative p-2 bg-green-300 rounded-lg flex justify-center items-center text-white text-xl'>
                        {name}
                    <div className='absolute w-fit h-0 border-t-[20px] border-t-green-300 border-r-[12px] border-r-transparent border-l-[12px] border-l-transparent top-[95%]'/>
                </div>
            </div>
          </div>
        </div>
        
    );
}