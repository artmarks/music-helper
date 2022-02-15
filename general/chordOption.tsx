import { useEffect, useState } from 'react';
import {MdCheck} from 'react-icons/md'
import Modal from 'react-modal';
import { fillOption } from './general';
import { chordArray, chordChangeOptionEnum, ChordSymbol, musicElement } from './generalData';

export function ShowOptionView(props: any){
    
    const [option,setOption] = useState(0)
    const [music,setMusic] = useState(
        {
            ChordType: chordChangeOptionEnum.Empty,
            Chord: {
                basicChord: ChordSymbol.C,
                additional: ''
            },
        } as musicElement
    )
    const [style,setStyle] = useState(
        {}
    )
    
    const setMusicChord = (input: any) => {
        setMusic((music) => ({
            ...music,
            Chord:{
                basicChord: input,
                additional: music.Chord!.additional
            }
        }) )
    }
    const setMusicChordAdd = (input: any) => {
        setMusic((music) => ({
            ...music,
            Chord: {
                basicChord: music.Chord!.basicChord,
                additional: input
            } 
        }) )
    }

    
    useEffect(() => {
        setOption( option => (option = 0))
        setStyle( style => style = {
            overlay: {}, 
            content: {
                height: '75vw',
                width: '90vw'
            }
        })
        // setMusic(music => music = {
        //     ChordType: chordChangeOptionEnum.Empty,
        //     Chord: {
        //         basicChord: ChordSymbol.C,
        //         additional: ''
        //     },
        // })
    }, [])


    return (
        <div className=''>
            <div className=''>
                <Modal isOpen={props.isOpen} contentLabel={props.label} style={style} onRequestClose={()=>{props.callbackClose()}} ariaHideApp={false}>
                <div className='my-2'>
                    <label>View option</label>
                    <select onChange={(e) => {const value = Number(e.target.value); setOption(option => option = value); setStyle(style => style = getStyle(value) )}}>
                        <option value={chordChangeOptionEnum.Empty} >Empty</option>
                        <option value={chordChangeOptionEnum.Chord} >Chord</option>
                        <option value={chordChangeOptionEnum.Tab} >Tab</option>
                        {/* <option value="3" >Notes</option> */}
                    </select>
                </div>

                <div className='my-2'>

                    {
                        option === chordChangeOptionEnum.Chord ? <ChordOptionView callbackChord={(e: any) => {
                            setMusicChord(e);
                        }}
                        callbackAdd={(e: any) => {
                            setMusicChordAdd(e);
                        }}
                        /> 
                        : option === chordChangeOptionEnum.Tab ? ( <TabOption/> )
                        : <EmptyOption/>
                    }
                </div>
                
                <div className='my-2'>
                    <button onClick={(e) => {
                        setMusic(music => music);
                        props.setChordForBubble(music)
                        props.callbackClose()
                    }}
                        className='border-2 p-2 text-green-500' ><MdCheck/></button>
                </div>
                </Modal>
            </div>
            
        </div>
    )
}

function getStyle(value: number): Object{
    return {
        overlay: {},
        content: {
            height: value === chordChangeOptionEnum.Chord ? '30vw' : '75vw',
            width: value === chordChangeOptionEnum.Chord ? '45vw' : '90vw'
        }
    }
}

export function EmptyOption(){
    return (
        <div>
            No Option is set 
        </div>
    )
}

export function TabOption(){
    return (
        <div>
            Tab Option
        </div>
    )
}

export function setChord(){

}

export function ChordOptionView(params: any){

    return (
        <div>
            <div className='my-2'>
                <label className='mr-2'>Chord Base</label>
                <select onChange={(e) => { params.callbackChord(e.target.value)} } className='border-2 rounded-md'>
                    {chordArray.map((value, index)=> {
                        return fillOption(value, index)
                    })}
                </select>
            </div>
            <div className='my-2'>
                <label className='mr-2' >Additional</label>
                <input onChange={(e) => {params.callbackAdd(e.target.value)}} className='px-2' placeholder="any adding"/>
            </div>
        </div>
    )
}