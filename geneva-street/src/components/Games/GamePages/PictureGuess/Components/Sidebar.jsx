import React from 'react'

export default function Sidebar(props) {

  return (
    <div className='Sidebar-wrapper'>
        <div className='Sidebar-content'>
            <props.component data={props.componentData}/>
        </div>
    </div>
  )
}
