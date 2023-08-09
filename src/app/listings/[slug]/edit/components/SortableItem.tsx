import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

// interface SortableItemProps {
//     props: string[]
// }

export const SortableItem = (props: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

//   console.log('propsid', props.id)
  
  return (
    <div className="flex" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img className='w-64 h-64' src={props.id}></img>
    </div>
  );
}

export default SortableItem