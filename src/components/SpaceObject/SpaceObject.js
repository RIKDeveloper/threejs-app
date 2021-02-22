import React, {useRef} from 'react'
import { useFrame } from 'react-three-fiber'
import Model3D from "../Model3D/Model3D"
import { Sphere } from "@react-three/drei"
export default (props)=>{
    const options = {
        O: {limit:props.limitTimeOrbit||365000, indent: props.indent||'0', center:props.centerO||{x:0, y:0, z:0}},
        R: {limit:props.limitTimeRotation||1000}
    }

    let childrenOptions = [],
        light = null,
        children = null

    if(props.children){
        children = []
        if(Array.isArray(props.children)){
            for (let item of props.children){
                childrenOptions.push({
                    O: {limit:item.props.limitTimeOrbit||365000, indent: item.props.indent||'0'},
                    R: {limit:item.props.limitTimeRotation||1000}
                })
                children.push(<mesh name={item.name}>{item}</mesh>)
            }
        } else{
            childrenOptions.push({
                O: {limit:props.children.props.limitTimeOrbit||365000, indent: props.children.props.indent||'0'},
                R: {limit:props.children.props.limitTimeRotation||1000}
            })
            children.push(<mesh name={props.children.props.name}>{props.children}</mesh>)
        }
    }

    const ref = useRef();

    useFrame(()=>{
        const nowTime = new Date().getTime()

        if(!props.stop){
            ref.current.rotation.y = (nowTime % options.R.limit * (6.3 / options.R.limit).toFixed(7))
            ref.current.position.z = +options.O.indent * Math.cos((2 * Math.PI) / options.O.limit * nowTime) + options.O.center.z
            ref.current.position.x = +options.O.indent * Math.sin((2 * Math.PI) / options.O.limit * nowTime) + options.O.center.x

            if(props.children){
                const parent = ref.parent
                // console.log(ref.current.parent.children)
                for (let id in ref.current.parent.children){
                    if (id == 0)
                        continue
                    const item = ref.current.parent.children[id]
                    console.log(id)
                    item.rotation.y = nowTime % options.R.limit * (6.3 / options.R.limit).toFixed(7)
                    item.position.x = +childrenOptions[id-1].O.indent * Math.sin((2 * Math.PI) / childrenOptions[id-1].O.limit * nowTime) + ref.current.position.x
                    item.position.z = +childrenOptions[id-1].O.indent * Math.cos((2 * Math.PI) / childrenOptions[id-1].O.limit * nowTime) + ref.current.position.z
                }
            }
        }
    })

    if(props.light){
        light = (<pointLight
            color={0xffcf48}
            intensity={10}
            distance={2500}
            position={[0,20,0]}/>)
    }

    return(
        <group
            position={props.position}>
            <mesh
                onClick={props.onClick}
                ref={ref}
                name={props.name}>
                <Model3D
                    scale={props.scale}
                    url={props.url}/>
                {light}
                <Sphere radius={40} args={[20,20,20]} position={props.positionSphere}>
                    <meshBasicMaterial attach='material' transparent opacity={0}/>
                </Sphere>
            </mesh>
            {children}


        </group>
    )
}