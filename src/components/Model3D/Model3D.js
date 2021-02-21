import React from 'react'
import { useGLTF } from "@react-three/drei/core/useGLTF"

export default (props)=>{
    return <primitive object={useGLTF(props.url, true).scene} dispose={null}/>
}