import { timeStamp } from 'console';
import { useEffect, useState } from 'react';
import {MdCheck} from 'react-icons/md'
import Modal from 'react-modal';
import { Style } from 'util';
import { fillOption } from './general';
import { chordArray } from './generalData';


export function ShowOptionView(props: any){
    
    const [option,setOption] = useState(0)
    const [style,setStyle] = useState(
        {}
    )
    
    
    
    useEffect(() => {
        setOption( option => (option = 0))
        setStyle( style => style = {
            overlay: {}, 
            content: {
                height: '75vw',
                width: '90vw'
            }
        })
    }, [])

    // const f = {
    //     setStyle( style => style =  {
    //         overlay: {}, content: {
    //             height: '75vw',
    //             width: '90vw'
    //         }
    //     })
    // }
    

    return (
        <div className=''>
            <div className=''>
                <Modal isOpen={props.isOpen} contentLabel={props.label} style={style} onRequestClose={()=>{props.callbackClose()}} ariaHideApp={false}>
                <div>
                    <label>View option</label>
                    <select onChange={(e) => {const value = Number(e.target.value); setOption(option => option = value); setStyle(style => style = getStyle(value) )}}>
                        <option value="0" >Empty</option>
                        <option value="1" >Chord</option>
                        <option value="2" >Tab</option>
                        {/* <option value="3" >Notes</option> */}
                    </select>
                </div>

                {
                    option === 1 ? <ChordOptionView/> 
                    : option === 2 ? ( <TabOption/> )
                    : <EmptyOption/>
                }
                
                <div>
                    <button onClick={(e) => {props.callbackClose()} } className='border-2 p-2 text-green-500' ><MdCheck/></button>
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
            height: value === 1 ? '25vw' : '75vw',
            width: value === 1 ? '45vw' : '90vw'
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

export function ChordOptionView(){

    return (
        <div>
            <div>
                <label className='mr-2'>Chord Base</label>
                <select className='border-2 rounded-md'>
                    {chordArray.map((value, index)=> {
                        return fillOption(value, index)
                    })}
                </select>
            </div>
            <div>
                <input className='px-2' placeholder="any adding"/>
            </div>
        </div>
    )
}